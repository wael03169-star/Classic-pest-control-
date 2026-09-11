import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { analyticsStore } from "./server/store";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Google GenAI Client
let genAIClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({ apiKey });
  }
  return genAIClient;
}

const SYSTEM_INSTRUCTION = `
أنت "مساعد كلاسيك" (Classic Assistant)، المساعد الذكي الرسمي لخدمة العملاء في شركة كلاسيك لمكافحة الحشرات (CLASSIC PEST CONTROL).
تتحدث باللغة العربية بأسلوب محترم، مهذب، وبسيط، وتفهم اللهجة المصرية الدارجة وترد بطريقة سهلة ومريحة للعميل.

وظيفتك الأساسية:
1. الرد على أسئلة العملاء عن خدمات الشركة بطريقة مختصرة وواضحة.
2. مساعدة العميل في تحديد الخدمة التي قد تناسب مشكلته.
3. معرفة وتحديد نوع المكان (منزل، شقة، فيلا، شركة، مطعم، فندق، مدرسة، مصنع، مخزن).
4. جمع بيانات العميل عند رغبته في طلب الخدمة خطوة بخطوة أو في رسائل واضحة:
   - الاسم
   - رقم الهاتف
   - نوع المكان
   - المدينة / المنطقة
   - نوع المشكلة (نوع الحشرة أو الآفة)
   - الخدمة المطلوبة
   - أفضل وقت للتواصل
5. بعد جمع كافة البيانات، اعرض للعميل ملخصًا واضحًا للطلب بصيغة مرتبة واطلب منه تأكيده وتوجيهه للتواصل المباشر مع خدمة العملاء عبر WhatsApp على الرقم 01157970073.

معلومات خدمات كلاسيك لمكافحة الحشرات المعتمدة:
- مكافحة الصراصير (الألماني، الأمريكي، الشرقي) بأحدث تقنيات الجل الآمن والمبيدات عديمة الرائحة دون الحاجة لإخلاء المنزل غالبًا.
- مكافحة النمل (الأسود، الأبيض / الأرضة، الفرعوني) بحقن الفواصل ومعاملة التربة والأساسات.
- مكافحة بق الفراش ببرامج إبادة شاملة ومكثفة مع متابعة دورية.
- مكافحة القوارض والفئران بمحطات طعوم آمنة ومصائد متطورة وسد منافذ الدخول.
- مكافحة الحشرات الطائرة (الذباب والبعوض) بالرذاذ المتناهي الصغر (ULV) والتبخير للمساحات المفتوحة والحدائق.
- مكافحة سوس الخشب والآفات الخاصة بالمنشآت.
- برامج التعقيم والتطهير الشامل وعقود الصيانة الدورية للشركات والمطاعم والمصانع والمخازن والمنشآت الفندقية والطبية مع تقارير متابعة فنية.

قواعد صارمة ومهمة جدًا:
1. لا تخترع أبدًا أي أسعار محددة، أو مواعيد ثابتة، أو عروض ترويجية، أو شهادات أو تراخيص غير مصرح بها.
   - إذا سألك العميل عن السعر: وضّح أن السعر يعتمد بدقة على مساحة المكان، ونوع المنشأة، ودرجة الإصابة، ونوع المبيد المطلوب، ويتم إعطاء السعر النهائي مجانًا بعد التنسيق مع فريق خدمة العملاء على 01157970073.
2. إذا لم تكن متأكدًا أو كان السؤال خارج نطاق خدمات الشركة أو معلوماتها، قل للعميل نصًا:
   "لا أملك معلومات كافية للإجابة عن هذا السؤال، ويمكنك التواصل مباشرة مع فريق CLASSIC PEST CONTROL عبر WhatsApp على 01157970073."
3. رقم WhatsApp ورقم الاتصال الرسمي المعتمد دائمًا هو: 01157970073.
4. صفحة Facebook الرسمية لـ CLASSIC PEST CONTROL هي: https://www.facebook.com/share/1J9Bb5w3Zp/
`;

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Classic Pest Control Assistant" });
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, userMessage } = req.body;

    if (!userMessage && (!messages || messages.length === 0)) {
      return res.status(400).json({ error: "No message provided" });
    }

    const currentMsg = userMessage || (messages && messages[messages.length - 1]?.content) || "";

    const ai = getGeminiClient();

    if (!ai) {
      // Graceful fallback if API key is not yet configured by user
      return res.json({
        reply: null,
        fallback: true,
        message: "Gemini API key not configured, using built-in knowledge engine."
      });
    }

    // Build chat history for Gemini
    const contents: any[] = [];
    if (messages && Array.isArray(messages)) {
      for (const m of messages.slice(-10)) {
        if (m.role === "user") {
          contents.push({ role: "user", parts: [{ text: m.content }] });
        } else if (m.role === "assistant") {
          contents.push({ role: "model", parts: [{ text: m.content }] });
        }
      }
    }

    // Ensure latest message is present
    if (contents.length === 0 || contents[contents.length - 1].parts[0].text !== currentMsg) {
      contents.push({ role: "user", parts: [{ text: currentMsg }] });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5,
        maxOutputTokens: 800,
      }
    });

    const replyText = response.text || "";
    return res.json({
      reply: replyText,
      fallback: false
    });
  } catch (error: any) {
    console.error("Gemini API Chat Error:", error);
    return res.json({
      reply: null,
      fallback: true,
      error: error.message || "Failed to contact AI service"
    });
  }
});

// Helper for parsing user-agent
function parseUserAgent(ua = ""): { device: 'Mobile' | 'Tablet' | 'Desktop'; browser: string; os: string } {
  let device: 'Mobile' | 'Tablet' | 'Desktop' = 'Desktop';
  if (/iPad|Tablet|PlayBook/i.test(ua)) {
    device = 'Tablet';
  } else if (/Mobile|Android|iPhone|iPod|BlackBerry|IEMobile/i.test(ua)) {
    device = 'Mobile';
  }

  let os = 'Windows';
  if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Mac OS/i.test(ua)) os = 'macOS';
  else if (/Linux/i.test(ua)) os = 'Linux';
  else if (/Windows/i.test(ua)) os = 'Windows';

  let browser = 'Chrome';
  if (/Edg/i.test(ua)) browser = 'Edge';
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = device === 'Mobile' ? 'Safari Mobile' : 'Safari';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';
  else if (/Chrome/i.test(ua)) browser = device === 'Mobile' ? 'Chrome Mobile' : 'Chrome';

  return { device, browser, os };
}

// -------------------------------------------------------------
// ANALYTICS & VISIT TRACKING API
// -------------------------------------------------------------

// Record a page visit
app.post("/api/track/visit", (req, res) => {
  try {
    const { path: pagePath, pageTitle, referrer, sessionId, country, city } = req.body;
    const ua = (req.headers["user-agent"] as string) || "";
    const { device, browser, os } = parseUserAgent(ua);
    const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "127.0.0.1";

    const record = analyticsStore.recordVisit({
      path: pagePath || "/",
      pageTitle: pageTitle || "الرئيسية",
      referrer: referrer || "direct",
      sessionId: sessionId || `sess_${Date.now()}`,
      device,
      browser,
      os,
      country: country || "مصر",
      city: city || (ip.includes("127.0.0.1") ? "القاهرة" : "الجيزة"),
      ip: ip.split(",")[0].trim(),
    });

    res.json({ success: true, visitId: record.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Record user interactions (WhatsApp click, Call click, Facebook page click, Chat Assistant open)
app.post("/api/track/event", (req, res) => {
  try {
    const { eventType, label, path: pagePath, sessionId } = req.body;
    if (!eventType) return res.status(400).json({ error: "Missing eventType" });

    const eventRecord = analyticsStore.recordEvent({
      eventType,
      label: label || eventType,
      path: pagePath || "/",
      sessionId: sessionId || "anon",
    });

    res.json({ success: true, eventId: eventRecord.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// LEADS & SERVICE REQUESTS API
// -------------------------------------------------------------

// Save new customer inquiry/order (from Chat Assistant, Contact Form, or Quote Request)
app.post("/api/leads", (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      placeType,
      location,
      problemType,
      serviceRequested,
      preferredTime,
      notes,
      source,
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone are required" });
    }

    const lead = analyticsStore.addLead({
      name,
      phone,
      email: email || "",
      placeType: placeType || "منشأة سكنية",
      location: location || "القاهرة",
      problemType: problemType || "مكافحة حشرات عامة",
      serviceRequested: serviceRequested || "معاينة ومكافحة",
      preferredTime: preferredTime || "في أقرب وقت",
      notes: notes || "",
      source: source || "نموذج تواصل الموقع",
      status: "new",
    });

    res.json({ success: true, lead });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// ADMIN DASHBOARD APIs
// -------------------------------------------------------------

// Get overall stats (visits, referrers, devices, leads)
app.get("/api/admin/stats", (_req, res) => {
  try {
    const stats = analyticsStore.getStats();
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get recent visits log
app.get("/api/admin/visits", (req, res) => {
  try {
    const limit = Number(req.query.limit) || 100;
    const source = req.query.source as string;
    const visits = analyticsStore.getVisits(limit, source);
    res.json(visits);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get customer leads
app.get("/api/admin/leads", (req, res) => {
  try {
    const status = req.query.status as string;
    const q = req.query.q as string;
    const leads = analyticsStore.getLeads(status, q);
    res.json(leads);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update lead status or notes
app.patch("/api/admin/leads/:id", (req, res) => {
  try {
    const { id } = req.params;
    const updated = analyticsStore.updateLead(id, req.body);
    if (!updated) return res.status(404).json({ error: "Lead not found" });
    res.json({ success: true, lead: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Delete lead
app.delete("/api/admin/leads/:id", (req, res) => {
  try {
    const { id } = req.params;
    const success = analyticsStore.deleteLead(id);
    res.json({ success });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Start server function with Vite dev middleware / static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Classic Pest Control Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

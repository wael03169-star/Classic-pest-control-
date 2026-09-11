import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

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

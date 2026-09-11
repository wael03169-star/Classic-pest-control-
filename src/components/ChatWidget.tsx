import React, { useState, useEffect, useRef } from 'react';
import { COMPANY_CONFIG, getWhatsAppUrl, getPhoneCallUrl } from '../data/config';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw, 
  ChevronDown, 
  Building2, 
  Home, 
  ShieldCheck, 
  AlertCircle, 
  ExternalLink,
  ArrowRight,
  Clock,
  User,
  MapPin,
  FileText
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
  isOrderSummary?: boolean;
  orderData?: ServiceOrderData;
  quickReplies?: string[];
}

export interface ServiceOrderData {
  name?: string;
  phone?: string;
  placeType?: string;
  location?: string;
  problemType?: string;
  serviceRequested?: string;
  preferredTime?: string;
}

interface ChatWidgetProps {
  lang?: 'ar' | 'en';
}

const QUICK_SHORTCUTS = [
  'أريد طلب خدمة',
  'ما هي خدماتكم؟',
  'لدي مشكلة حشرات',
  'أريد مكافحة القوارض',
  'أريد التواصل مع الشركة',
];

const PLACE_TYPES = [
  'منزل / شقة',
  'فيلا',
  'شركة / مكتب',
  'مطعم / كافيه',
  'فندق',
  'مدرسة / منشأة تعليمية',
  'مصنع',
  'مخزن / مستودع',
];

const COMMON_PROBLEMS = [
  'صراصير (ألماني / كبير)',
  'نمل (أسود / أبيض)',
  'بق الفراش',
  'فئران وقوارض',
  'ذباب وبعوض',
  'سوس خشب وآفات خاصة',
  'وقاية وتعقيم عام',
];

const PREFERRED_TIMES = [
  'صباحًا (9:00 ص - 1:00 م)',
  'مساءً (1:00 م - 6:00 م)',
  'ليلاً (6:00 م - 10:00 م)',
  'أي وقت متاح',
];

const INITIAL_GREETING = `أهلًا بك في CLASSIC PEST CONTROL 👋
أنا مساعد كلاسيك، كيف يمكنني مساعدتك اليوم؟`;

const UNKNOWN_INFO_DISCLAIMER = `لا أملك معلومات كافية للإجابة عن هذا السؤال، ويمكنك التواصل مباشرة مع فريق CLASSIC PEST CONTROL عبر WhatsApp على 01157970073.`;

export const ChatWidget: React.FC<ChatWidgetProps> = ({ lang = 'ar' }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasUnread, setHasUnread] = useState<boolean>(true);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  // Service booking step-by-step form state
  const [isCollectingOrder, setIsCollectingOrder] = useState<boolean>(false);
  const [orderStep, setOrderStep] = useState<number>(0);
  const [orderData, setOrderData] = useState<ServiceOrderData>({});

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      role: 'assistant',
      content: INITIAL_GREETING,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      quickReplies: QUICK_SHORTCUTS,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const handleResetChat = () => {
    setIsCollectingOrder(false);
    setOrderStep(0);
    setOrderData({});
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        role: 'assistant',
        content: INITIAL_GREETING,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        quickReplies: QUICK_SHORTCUTS,
      },
    ]);
  };

  // Helper to construct WhatsApp link with order details
  const getOrderWhatsAppUrl = (data: ServiceOrderData) => {
    const lines = [
      `*طلب خدمة جديد عبر مساعد كلاسيك الذكي* 🛡️`,
      `---------------------------------`,
      `• *الاسم:* ${data.name || 'غير محدد'}`,
      `• *رقم الهاتف:* ${data.phone || 'غير محدد'}`,
      `• *نوع المكان:* ${data.placeType || 'غير محدد'}`,
      `• *المدينة / المنطقة:* ${data.location || 'غير محدد'}`,
      `• *نوع المشكلة:* ${data.problemType || 'غير محدد'}`,
      `• *الخدمة المطلوبة:* ${data.serviceRequested || 'مكافحة آفات متكاملة'}`,
      `• *أفضل وقت للتواصل:* ${data.preferredTime || 'في أقرب وقت'}`,
      `---------------------------------`,
      `يرجى تأكيد موعد المعاينة والتفاصيل. شكراً لكم!`,
    ];
    const encoded = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/201157970073?text=${encoded}`;
  };

  // Built-in intelligent Fallback & Guided Engine for Classic Pest Control
  const handleIntelligentLocalResponse = (rawText: string, currentHistory: ChatMessage[]) => {
    const text = rawText.trim().toLowerCase();

    // 1. If currently in middle of structured order collection
    if (isCollectingOrder) {
      handleStepCollection(rawText);
      return;
    }

    // 2. Check for service booking triggers
    if (
      text.includes('طلب خدمة') || 
      text.includes('عايز احجز') || 
      text.includes('اريد حجز') || 
      text.includes('احجز معاينة') || 
      text.includes('طلب معاينة') || 
      text.includes('اطلب خدمة') ||
      text.includes('حجز خدمة')
    ) {
      startOrderCollection();
      return;
    }

    // 3. Price inquiry check (Never invent prices)
    if (
      text.includes('سعر') || 
      text.includes('اسعار') || 
      text.includes('أسعار') || 
      text.includes('تكلفة') || 
      text.includes('بكام') || 
      text.includes('كام يكلف')
    ) {
      appendAssistantMessage(
        `تختلف التكلفة بدقة حسب نوع المنشأة (شقة، فيلا، مطعم، مصنع)، ومساحة المكان، ونوع الحشرة ودرجة الإصابة ونوع المبيدات المطلوبة.

لذلك نحن لا نخترع أسعارًا تقديرية غير دقيقة؛ بل يقوم فريقنا الفني بتقديم تقدير سعر ومعاينة فورية مجانية ومناسبة لحالتك بالضبط.

يمكنك الضغط على "أريد طلب خدمة" لتسجيل بياناتك، أو التواصل المباشر مع فريقنا عبر WhatsApp على 01157970073.`,
        ['أريد طلب خدمة', 'التواصل عبر WhatsApp', 'ما هي خدماتكم؟']
      );
      return;
    }

    // 4. Contact inquiry
    if (
      text.includes('تواصل') || 
      text.includes('رقمكم') || 
      text.includes('رقم التليفون') || 
      text.includes('واتساب') || 
      text.includes('عنوان') || 
      text.includes('اتصل')
    ) {
      appendAssistantMessage(
        `يسعدنا تواصلك معنا مباشرة عبر قنواتنا الرسمية:
📞 *رقم الاتصال المباشر:* 01157970073
💬 *محادثة WhatsApp:* 01157970073
🕒 *أوقات العمل:* متاحون على مدار الساعة 24/7 طوال أيام الأسبوع لخدمتكم وتلبية الطوارئ.

يمكنك الضغط بالأسفل لبدء المحادثة الفورية مع خدمة العملاء.`,
        ['أريد طلب خدمة', 'ما هي خدماتكم؟']
      );
      return;
    }

    // 5. Cockroaches inquiry
    if (text.includes('صراصير') || text.includes('صرصار') || text.includes('صرصور')) {
      appendAssistantMessage(
        `نحن متخصصون في القضاء التام على الصراصير بكافة أنواعها (الصراصير الألمانية الصغيرة، والصراصير الأمريكية الكبيرة):
• نستخدم أحدث تقنيات الجل الآمن المعتمد عالمياً في المطابخ والأجهزة الحساسة.
• مبيدات ميكروية عديمة الرائحة دون الحاجة لمغادرة المنزل أو إفراغ الأواني.
• القضاء على بيوض الصراصير وضمان عدم عودتها مع متابعة دورية.

هل المكان المطلوب مكافحته شقة/منزل أم مطعم/شركة؟`,
        ['أريد طلب خدمة', 'منزل / شقة', 'مطعم / كافيه', 'شركة / مكتب']
      );
      return;
    }

    // 6. Rodents inquiry
    if (
      text.includes('فئران') || 
      text.includes('فار') || 
      text.includes('قوارض') || 
      text.includes('جرذان')
    ) {
      appendAssistantMessage(
        `خدمة مكافحة القوارض والفئران لدى كلاسيك تعتمد على أسلوب علمي متكامل (IPM):
• تركيب محطات طعوم محكمة ومغلقة وآمنة للأطفال والحيوانات الأليفة.
• طعوم جاذبة فعالة تجعل الفئران تخرج للمناطق المفتوحة ولا تموت في الأماكن المغلقة.
• فحص وتحديد ثغرات ومنافذ دخول القوارض لغلقها وتقديم توصيات وقائية.

تناسب الشقق، الفيلات، المصانع، المخازن والمطاعم. هل ترغب في حجز معاينة؟`,
        ['أريد طلب خدمة', 'ما هي خدماتكم؟', 'التواصل عبر WhatsApp']
      );
      return;
    }

    // 7. Bedbugs inquiry
    if (text.includes('بق') || text.includes('فراش')) {
      appendAssistantMessage(
        `مكافحة بق الفراش تتطلب خبرة فائقة ونحن نوفر برنامجاً شاملاً:
• استخدام مركبات إبادة متخصصة تخترق أنسجة المراتب وشقوق الأثاث.
• القضاء على حشرة البق وبيوضها لكسر دورة الحياة بالكامل.
• تقديم إرشادات دقيقة للتهوية والغسيل لضمان نظافة تامة.

ننصح بالتدخل السريع لعدم انتشارها بين الغرف. هل تريد طلب الخدمة الآن؟`,
        ['أريد طلب خدمة', 'التواصل عبر WhatsApp']
      );
      return;
    }

    // 8. Ants inquiry
    if (text.includes('نمل') || text.includes('ارضة') || text.includes('أرضة')) {
      appendAssistantMessage(
        `نوفر حلولاً جذرية لمكافحة النمل:
• *النمل الأسود والفرعوني:* باستخدام طعوم تنقل المادة الفعالة لمستعمرة الملكة للقضاء عليها من المنبع.
• *النمل الأبيض (الأرضة):* حقن خنادق التربة ومعاملة الأخشاب والخرسانات قبل وبعد البناء لحماية الأساسات.

هل النمل عادي في المنزل أم نمل أبيض يتلف الخشب؟`,
        ['أريد طلب خدمة', 'نمل أسود منزلي', 'نمل أبيض / أرضة']
      );
      return;
    }

    // 9. Services overview
    if (
      text.includes('خدمات') || 
      text.includes('بتعملوا ايه') || 
      text.includes('ايه الخدمات') || 
      text.includes('ما هي خدماتكم')
    ) {
      appendAssistantMessage(
        `تقدم شركة CLASSIC PEST CONTROL حلولاً متكاملة لمكافحة آفات الصحة العامة:
1. *مكافحة الصراصير:* بالجل والمبيدات المتخصصة عديمة الرائحة.
2. *مكافحة النمل:* النمل الأسود والأبيض وحقن الأرضة.
3. *مكافحة بق الفراش:* معالجة شاملة للمفروشات والأثاث.
4. *مكافحة القوارض والفئران:* بمحطات الطعوم الآمنة.
5. *مكافحة الحشرات الطائرة:* الذباب والبعوض بالرذاذ المتناهي الصغر (ULV).
6. *عقود دورية للمنشآت:* للمطاعم، الشركات، الفنادق، المصانع والمخازن مع تقارير جودة.

ما هي المشكلة التي تواجهها لنساعدك في اختيار الأنسب؟`,
        ['أريد طلب خدمة', 'صراصير', 'نمل', 'بق الفراش', 'قوارض وفئران']
      );
      return;
    }

    // 10. Unknown / Out of scope fallback (Strict user instruction compliance)
    appendAssistantMessage(
      UNKNOWN_INFO_DISCLAIMER,
      ['أريد طلب خدمة', 'ما هي خدماتكم؟', 'التواصل عبر WhatsApp']
    );
  };

  // Step-by-step Booking Flow
  const startOrderCollection = () => {
    setIsCollectingOrder(true);
    setOrderStep(1);
    appendAssistantMessage(
      `يسعدنا خدمتك وتسجيل طلبك بكل سهولة! 📋
تفضّل بإخباري بـ *اسمك الكريم*:`,
      []
    );
  };

  const handleStepCollection = (userInput: string) => {
    const text = userInput.trim();

    if (orderStep === 1) {
      // Step 1: Name
      const updated = { ...orderData, name: text };
      setOrderData(updated);
      setOrderStep(2);
      appendAssistantMessage(
        `أهلاً بك أ/ ${text} 🤝
يرجى تزويدنا بـ *رقم الهاتف* للتواصل معك:`,
        []
      );
    } else if (orderStep === 2) {
      // Step 2: Phone
      const updated = { ...orderData, phone: text };
      setOrderData(updated);
      setOrderStep(3);
      appendAssistantMessage(
        `ممتاز، ما هو *نوع المكان* المطلوب تقديم الخدمة به؟`,
        PLACE_TYPES
      );
    } else if (orderStep === 3) {
      // Step 3: Place Type
      const updated = { ...orderData, placeType: text };
      setOrderData(updated);
      setOrderStep(4);
      appendAssistantMessage(
        `في أي *مدينة أو منطقة* يقع المكان؟ (مثال: القاهرة الجديدة، المعادي، الشيخ زايد، الجيزة... إلخ)`,
        []
      );
    } else if (orderStep === 4) {
      // Step 4: Location
      const updated = { ...orderData, location: text };
      setOrderData(updated);
      setOrderStep(5);
      appendAssistantMessage(
        `ما هو *نوع المشكلة أو الحشرات* التي تعاني منها في المكان؟`,
        COMMON_PROBLEMS
      );
    } else if (orderStep === 5) {
      // Step 5: Problem Type
      const updated = { ...orderData, problemType: text, serviceRequested: `مكافحة ${text}` };
      setOrderData(updated);
      setOrderStep(6);
      appendAssistantMessage(
        `ما هو *أفضل وقت مناسب لتواصل* فريق العمل معك؟`,
        PREFERRED_TIMES
      );
    } else if (orderStep === 6) {
      // Step 6: Preferred Time -> Show Final Summary!
      const finalOrder: ServiceOrderData = { ...orderData, preferredTime: text };
      setOrderData(finalOrder);
      setIsCollectingOrder(false);
      setOrderStep(0);

      // Append summary message
      const summaryContent = `شكرًا لك أ/ ${finalOrder.name || ''}! تم جمع بيانات طلبك بنجاح. 
إليك *ملخص طلب الخدمة*:

• *الاسم:* ${finalOrder.name}
• *رقم الهاتف:* ${finalOrder.phone}
• *نوع المكان:* ${finalOrder.placeType}
• *المدينة / المنطقة:* ${finalOrder.location}
• *نوع المشكلة:* ${finalOrder.problemType}
• *الخدمة المطلوبة:* ${finalOrder.serviceRequested}
• *أفضل وقت للتواصل:* ${finalOrder.preferredTime}

يرجى مراجعة وتأكيد الطلب لإرساله فوراً لفريق كلاسيك لمكافحة الحشرات عبر WhatsApp على الرقم 01157970073 للبدء في تجهيز المعاينة.`;

      appendAssistantMessage(summaryContent, ['تأكيد الطلب عبر WhatsApp ✅', 'تعديل البيانات ✏️'], true, finalOrder);
    }
  };

  const appendAssistantMessage = (
    content: string, 
    quickReplies?: string[], 
    isOrderSummary?: boolean, 
    summaryData?: ServiceOrderData
  ) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          content,
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
          quickReplies,
          isOrderSummary,
          orderData: summaryData,
        },
      ]);
    }, 450);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputMessage).trim();
    if (!messageContent) return;

    // Add user message to state
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');

    // If currently collecting order, handle step locally
    if (isCollectingOrder) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        handleStepCollection(messageContent);
      }, 350);
      return;
    }

    // Special quick reply handlers
    if (messageContent === 'تأكيد الطلب عبر WhatsApp ✅') {
      const waUrl = getOrderWhatsAppUrl(orderData);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      appendAssistantMessage(
        `تم فتح WhatsApp لتأكيد طلبك مباشرة مع خدمة العملاء على 01157970073.
إذا كان لديك أي استفسار آخر، أنا دائماً في خدمتك!`,
        ['ما هي خدماتكم؟', 'أريد التواصل مع الشركة']
      );
      return;
    }

    if (messageContent === 'تعديل البيانات ✏️') {
      startOrderCollection();
      return;
    }

    if (messageContent === 'التواصل عبر WhatsApp') {
      const waUrl = getWhatsAppUrl();
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      appendAssistantMessage(
        `يمكنك التحدث مباشرة مع فريق كلاسيك عبر WhatsApp على الرقم 01157970073. يسعدنا الرد على استفساراتك فوراً.`,
        ['أريد طلب خدمة', 'ما هي خدماتكم؟']
      );
      return;
    }

    // Try calling server-side /api/chat with Gemini
    setIsTyping(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: messageContent,
          messages: newHistory.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply && !data.fallback) {
          setIsTyping(false);
          // Check if response contains request to order
          const lower = messageContent.toLowerCase();
          const replies = lower.includes('خدمة') || lower.includes('حجز')
            ? ['أريد طلب خدمة', 'التواصل عبر WhatsApp']
            : QUICK_SHORTCUTS.slice(0, 3);

          setMessages(prev => [
            ...prev,
            {
              id: `ai-${Date.now()}`,
              role: 'assistant',
              content: data.reply,
              timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
              quickReplies: replies,
            },
          ]);
          return;
        }
      }
    } catch (err) {
      // Fallback to local intelligent rule engine
      console.warn('API chat fallback triggered:', err);
    }

    // Use built-in expert knowledge engine
    setTimeout(() => {
      setIsTyping(false);
      handleIntelligentLocalResponse(messageContent, newHistory);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button Trigger */}
      <div 
        id="classic-assistant-trigger-container"
        className="fixed bottom-5 end-4 sm:end-6 z-50 flex items-center gap-2 select-none"
      >
        {/* Floating Pill / Tooltip when closed */}
        {!isOpen && (
          <button
            onClick={toggleChat}
            className="hidden sm:inline-flex items-center gap-2 py-2 px-3.5 rounded-full bg-white text-[#0A192F] shadow-xl border border-[#D4AF37] hover:border-[#D4AF37] hover:bg-slate-50 transition-all duration-300 cursor-pointer animate-fade-in text-xs font-black group"
            aria-label="Open Classic Assistant Chat"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[#0A192F] group-hover:text-[#D4AF37] transition-colors">مساعد كلاسيك</span>
            <span className="text-[10px] text-slate-500 font-normal">| متصل الآن</span>
          </button>
        )}

        {/* Circular Launch Icon */}
        <button
          id="classic-chat-button"
          onClick={toggleChat}
          className={`relative w-14 h-14 sm:w-15 sm:h-15 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
            isOpen 
              ? 'bg-[#0A192F] text-white rotate-90 scale-95 border-2 border-[#D4AF37]' 
              : 'bg-[#0A192F] text-white hover:scale-105 active:scale-95 border-2 border-[#D4AF37] ring-4 ring-[#D4AF37]/25'
          }`}
          aria-label={isOpen ? 'Close chat' : 'Open Classic Assistant Chat'}
          title="مساعد كلاسيك لخدمة العملاء"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#D4AF37]" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Bot className="w-7 h-7 text-[#D4AF37]" />
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] absolute -top-1.5 -end-1 animate-pulse" />
            </div>
          )}

          {/* Unread Ping Notification */}
          {!isOpen && hasUnread && (
            <span className="absolute -top-1 -end-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#D4AF37] text-[10px] font-black text-[#0A192F] items-center justify-center">
                1
              </span>
            </span>
          )}
        </button>
      </div>

      {/* Floating Chat Modal Window */}
      {isOpen && (
        <div
          id="classic-chat-window"
          className="fixed bottom-22 end-3 sm:end-6 z-50 w-[calc(100vw-24px)] sm:w-[410px] max-w-[430px] h-[580px] max-h-[calc(100vh-120px)] bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37]/40 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          dir="rtl"
        >
          {/* Header - Navy Blue + Gold Accents */}
          <div className="bg-[#0A192F] text-white p-4 flex items-center justify-between border-b border-[#D4AF37]/40 shrink-0">
            <div className="flex items-center gap-3">
              {/* Bot Avatar */}
              <div className="relative w-11 h-11 rounded-2xl bg-white/10 border border-[#D4AF37] p-1 flex items-center justify-center shrink-0">
                <Bot className="w-6 h-6 text-[#D4AF37]" />
                <span className="absolute bottom-0 end-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0A192F]"></span>
              </div>
              <div className="text-start">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-black text-white tracking-wide">
                    مساعد كلاسيك
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 font-bold">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>خدمة عملاء CLASSIC PEST CONTROL</span>
                </p>
              </div>
            </div>

            {/* Quick Header Actions */}
            <div className="flex items-center gap-1">
              <a
                href={getPhoneCallUrl()}
                className="p-1.5 rounded-lg text-slate-300 hover:text-[#D4AF37] hover:bg-white/10 transition-colors"
                title="اتصال سريع: 01157970073"
                aria-label="Call Now"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="إعادة بدء المحادثة"
                aria-label="Reset Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={toggleChat}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="إغلاق المحادثة"
                aria-label="Close Chat"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Shortcuts Bar */}
          <div className="bg-slate-100/90 border-b border-slate-200 px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] text-slate-500 font-bold shrink-0">
              اختصارات:
            </span>
            {QUICK_SHORTCUTS.map((shortcut, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(shortcut)}
                className="text-[11px] font-semibold whitespace-nowrap px-2.5 py-1 rounded-full bg-white text-[#0A192F] hover:bg-[#D4AF37]/15 hover:border-[#D4AF37] border border-slate-200 transition-all shrink-0 cursor-pointer active:scale-95 shadow-2xs"
              >
                {shortcut}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gradient-to-b from-slate-50 to-white">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                >
                  <div className={`flex gap-2 max-w-[88%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
                    {isAssistant && (
                      <div className="w-7 h-7 rounded-lg bg-[#0A192F] text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5 border border-[#D4AF37]/40 shadow-xs">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                        isAssistant
                          ? 'bg-white text-slate-800 border border-slate-200 rounded-tr-none'
                          : 'bg-[#0A192F] text-white rounded-tl-none font-medium'
                      }`}
                    >
                      {/* Structured Order Summary View */}
                      {msg.isOrderSummary && msg.orderData ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 border-b border-amber-200/60 pb-2 text-[#0A192F]">
                            <FileText className="w-4 h-4 text-[#D4AF37]" />
                            <span className="font-black text-sm">ملخص طلب الخدمة</span>
                          </div>

                          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-medium">الاسم:</span>
                              <span className="font-bold text-[#0A192F]">{msg.orderData.name || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-medium">رقم الهاتف:</span>
                              <span className="font-mono font-bold text-[#0A192F]" dir="ltr">{msg.orderData.phone || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-medium">نوع المكان:</span>
                              <span className="font-bold text-[#0A192F]">{msg.orderData.placeType || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-medium">المنطقة:</span>
                              <span className="font-bold text-[#0A192F]">{msg.orderData.location || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-medium">نوع المشكلة:</span>
                              <span className="font-bold text-red-600">{msg.orderData.problemType || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-medium">الخدمة:</span>
                              <span className="font-bold text-[#0A192F]">{msg.orderData.serviceRequested || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-medium">وقت التواصل:</span>
                              <span className="font-bold text-[#0A192F]">{msg.orderData.preferredTime || '-'}</span>
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-500 leading-normal">
                            يرجى الضغط على الزر أدناه لتأكيد الطلب وإرساله إلى فريقنا عبر WhatsApp مباشرة:
                          </p>

                          {/* Direct WhatsApp Confirmation Button */}
                          <a
                            href={getOrderWhatsAppUrl(msg.orderData)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                          >
                            <span>تأكيد الطلب وإرسال عبر WhatsApp</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ) : (
                        <div className="whitespace-pre-line">
                          {msg.content}
                        </div>
                      )}

                      <span
                        className={`block text-[9px] mt-1.5 text-start ${
                          isAssistant ? 'text-slate-400' : 'text-slate-300'
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Quick Replies under message */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 me-9 ms-9">
                      {msg.quickReplies.map((reply, rIdx) => (
                        <button
                          key={rIdx}
                          onClick={() => handleSendMessage(reply)}
                          className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-white text-[#0A192F] hover:bg-[#D4AF37] hover:text-[#0A192F] border border-[#D4AF37]/50 shadow-2xs transition-all cursor-pointer active:scale-95"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#0A192F] text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tr-none shadow-2xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0.3s]"></span>
                  <span className="text-[10px] text-slate-400 font-semibold ms-1">
                    مساعد كلاسيك يكتب...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Mandatory WhatsApp Direct Contact Strip */}
          <div className="bg-[#0A192F] px-4 py-2 flex items-center justify-between border-t border-[#D4AF37]/40 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-200">
              <span className="text-[11px]">مساعدة فورية؟</span>
            </div>

            <a
              id="chat-footer-whatsapp-btn"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 px-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <span>التواصل عبر WhatsApp</span>
              <span dir="ltr" className="font-mono text-[10px] opacity-90">(01157970073)</span>
            </a>
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اكتب رسالتك أو استفسارك هنا..."
                className="flex-1 bg-slate-50 text-slate-800 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />

              <button
                id="chat-send-btn"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim()}
                className={`p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  inputMessage.trim()
                    ? 'bg-[#0A192F] text-[#D4AF37] hover:bg-[#132a4a] shadow-xs'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </div>
            
            <p className="text-[9px] text-slate-400 text-center mt-1.5">
              مساعد ذكي لخدمات CLASSIC PEST CONTROL • لا يقدم أسعاراً نهائية دون معاينة وتنسيق مع الإدارة.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

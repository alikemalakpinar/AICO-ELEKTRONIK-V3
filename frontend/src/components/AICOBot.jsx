import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Mic,
  MicOff,
  Sparkles,
  Cpu,
  FileText,
  Calculator,
  Package,
  HelpCircle,
  ChevronDown,
  Loader,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Button } from './ui/button';

// Quick action buttons
const QUICK_ACTIONS = {
  tr: [
    { icon: Calculator, label: 'Teklif Al', action: 'quote', prompt: 'PCB teklifi almak istiyorum' },
    { icon: Package, label: 'Sipariş Takip', action: 'tracking', prompt: 'Siparişimi takip etmek istiyorum' },
    { icon: FileText, label: 'DFM Analizi', action: 'dfm', prompt: 'Tasarımımın DFM analizini yapmak istiyorum' },
    { icon: HelpCircle, label: 'Yardım', action: 'help', prompt: 'Nasıl yardımcı olabilirsiniz?' },
  ],
  en: [
    { icon: Calculator, label: 'Get Quote', action: 'quote', prompt: 'I want to get a PCB quote' },
    { icon: Package, label: 'Track Order', action: 'tracking', prompt: 'I want to track my order' },
    { icon: FileText, label: 'DFM Analysis', action: 'dfm', prompt: 'I want a DFM analysis for my design' },
    { icon: HelpCircle, label: 'Help', action: 'help', prompt: 'How can you help me?' },
  ],
};

// AI Response Templates
const AI_RESPONSES = {
  tr: {
    greeting: 'Merhaba! Ben AICO, yapay zeka destekli PCB asistanınız. Size nasıl yardımcı olabilirim?',
    quote: 'PCB teklifiniz için şu bilgilere ihtiyacım var:\n\n• Katman sayısı (2, 4, 6...)\n• Boyutlar (mm x mm)\n• Adet\n• Yüzey kaplaması\n\nBu bilgileri yazabilir veya doğrudan "Hızlı Teklif" sayfamıza yönlendirebilirim.',
    tracking: 'Sipariş takibi için sipariş numaranızı paylaşır mısınız? Örnek: PCB-2024-001234',
    dfm: 'DFM analizi için Gerber dosyalarınızı yükleyebilirsiniz. Sistem otomatik olarak:\n\n✓ Üretilebilirlik kontrolü\n✓ Hata tespiti\n✓ Optimizasyon önerileri\n\nsunar. Dosyanızı yüklemek ister misiniz?',
    help: 'Size şu konularda yardımcı olabilirim:\n\n🔹 PCB ve SMT montaj teklifleri\n🔹 Sipariş durumu takibi\n🔹 Teknik sorular (DFM, malzeme seçimi)\n🔹 Üretim süreleri hakkında bilgi\n🔹 Kablo/güç hesaplamaları\n\nNe hakkında bilgi almak istersiniz?',
    fallback: 'Anlıyorum. Bu konuda size daha iyi yardımcı olabilmem için müşteri temsilcimize yönlendirebilirim. İsterseniz 0212 XXX XX XX numarasından bize ulaşabilirsiniz.',
    layers: 'Harika! {layers} katmanlı PCB için boyutları ve adeti öğrenebilir miyim?',
    calculating: 'Hesaplıyorum... Fiyatınız yaklaşık olarak şöyle olacak:\n\n📦 {quantity} adet, {layers} katman, {size}\n💰 Tahmini: {price} TL\n⏱️ Süre: {leadTime}\n\nDetaylı teklif için "Hızlı Teklif" sayfamızı ziyaret edin.',
  },
  en: {
    greeting: "Hello! I'm AICO, your AI-powered PCB assistant. How can I help you today?",
    quote: 'For your PCB quote, I need the following information:\n\n• Number of layers (2, 4, 6...)\n• Dimensions (mm x mm)\n• Quantity\n• Surface finish\n\nYou can provide this info or I can redirect you to our "Instant Quote" page.',
    tracking: 'For order tracking, could you share your order number? Example: PCB-2024-001234',
    dfm: 'For DFM analysis, you can upload your Gerber files. The system automatically provides:\n\n✓ Manufacturability check\n✓ Error detection\n✓ Optimization suggestions\n\nWould you like to upload your files?',
    help: 'I can help you with:\n\n🔹 PCB and SMT assembly quotes\n🔹 Order status tracking\n🔹 Technical questions (DFM, material selection)\n🔹 Production time information\n🔹 Cable/power calculations\n\nWhat would you like to know about?',
    fallback: 'I understand. To better assist you with this, I can connect you to our customer representative. You can reach us at +90 212 XXX XX XX.',
    layers: 'Great! For a {layers}-layer PCB, could you tell me the dimensions and quantity?',
    calculating: "Calculating... Here's your estimated quote:\n\n📦 {quantity} pcs, {layers} layers, {size}\n💰 Estimate: ${price}\n⏱️ Lead time: {leadTime}\n\nVisit our 'Instant Quote' page for a detailed quote.",
  },
};

// Page-specific context-aware greetings
const PAGE_GREETINGS = {
  tr: {
    '/': 'Merhaba! AICO Elektronik\'e hoş geldiniz. Size PCB üretimi, dizgi veya prototip konusunda nasıl yardımcı olabilirim?',
    '/instant-quote': 'Teklif sayfamıza hoş geldiniz! PCB özelliklerinizi seçerken size yardımcı olabilirim. Hangi katman sayısı, boyut veya kaplama için önerime ihtiyacınız var?',
    '/pcb-manufacturing': 'PCB üretim sayfamızdasınız. Katman sayısı, malzeme seçimi veya üretim süreleri hakkında sorularınızı yanıtlayabilirim.',
    '/pcb-assembly': 'PCB dizgi sayfamıza hoş geldiniz! SMT veya THT montaj, BOM optimizasyonu veya stencil seçimi konusunda yardımcı olabilirim.',
    '/calculators': 'Hesaplama araçlarımızı kullanıyorsunuz. Kablo kesiti, güç hesaplama veya impedans hesaplamaları konusunda sorularınız varsa yanıtlayayım.',
    '/about': 'Hakkımızda sayfasındasınız. AICO\'nun 25+ yıllık tecrübesi, sertifikaları veya tesisleri hakkında bilgi verebilirim.',
    '/contact': 'İletişim sayfamızdasınız. Teklif, teknik destek veya iş ortaklığı konularında size nasıl yardımcı olabilirim?',
    '/services': 'Hizmetlerimizi inceliyorsunuz. PCB üretimi, dizgi, box build veya mühendislik hizmetleri hakkında detaylı bilgi verebilirim.',
    '/case-studies': 'Referanslarımızı görüntülüyorsunuz. Hangi sektör veya proje tipi hakkında bilgi almak istersiniz?',
    '/support': 'Destek sayfamızdasınız. Teknik dokümanlar, DFM kuralları veya sık sorulan sorular konusunda yardımcı olabilirim.',
    '/careers': 'Kariyer sayfamıza hoş geldiniz! Açık pozisyonlar veya çalışma ortamımız hakkında bilgi verebilirim.',
    '/blog': 'Blog sayfamızdasınız. PCB tasarım ipuçları, endüstri trendleri veya teknik makaleler hakkında sorularınızı yanıtlayabilirim.',
    default: 'Merhaba! Ben AICO, yapay zeka destekli PCB asistanınız. Size nasıl yardımcı olabilirim?'
  },
  en: {
    '/': 'Hello! Welcome to AICO Electronics. How can I help you with PCB manufacturing, assembly, or prototyping?',
    '/instant-quote': 'Welcome to our quote page! I can help you while selecting your PCB specifications. Need recommendations for layer count, dimensions, or finish?',
    '/pcb-manufacturing': 'You\'re on our PCB manufacturing page. I can answer your questions about layer counts, material selection, or lead times.',
    '/pcb-assembly': 'Welcome to our PCB assembly page! I can help with SMT or THT assembly, BOM optimization, or stencil selection.',
    '/calculators': 'You\'re using our calculation tools. Let me know if you have questions about cable sizing, power calculations, or impedance.',
    '/about': 'You\'re on our About page. I can share information about AICO\'s 25+ years of experience, certifications, or facilities.',
    '/contact': 'You\'re on our contact page. How can I help you with quotes, technical support, or partnership inquiries?',
    '/services': 'You\'re exploring our services. I can provide details about PCB manufacturing, assembly, box build, or engineering services.',
    '/case-studies': 'You\'re viewing our references. Which industry or project type would you like to learn about?',
    '/support': 'You\'re on our support page. I can help with technical documents, DFM guidelines, or frequently asked questions.',
    '/careers': 'Welcome to our careers page! I can share information about open positions or our work environment.',
    '/blog': 'You\'re on our blog. I can answer your questions about PCB design tips, industry trends, or technical articles.',
    default: "Hello! I'm AICO, your AI-powered PCB assistant. How can I help you today?"
  }
};

// Get page-specific greeting based on current path
const getPageGreeting = (pathname, lang) => {
  const greetings = PAGE_GREETINGS[lang] || PAGE_GREETINGS.tr;

  // Remove language prefix from path
  const cleanPath = pathname.replace(/^\/(tr|en)/, '') || '/';

  // Find matching greeting
  for (const [path, greeting] of Object.entries(greetings)) {
    if (path !== 'default' && cleanPath.startsWith(path)) {
      return greeting;
    }
  }

  return greetings.default;
};

// Message Component
const Message = ({ message, isBot }) => (
  <motion.div
    className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
  >
    <div
      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        isBot
          ? 'bg-gray-800 text-white rounded-bl-none'
          : 'bg-blue-500 text-white rounded-br-none'
      }`}
    >
      {isBot && (
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-700">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs text-gray-400">AICO AI</span>
        </div>
      )}
      <p className="text-sm whitespace-pre-line">{message.text}</p>
      <p className="text-xs opacity-50 mt-1 text-right">{message.time}</p>
    </div>
  </motion.div>
);

// Typing Indicator
const TypingIndicator = () => (
  <motion.div
    className="flex justify-start mb-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-gray-500 rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
  </motion.div>
);

// Main AICO Bot Component
const AICOBot = ({ lang = 'tr' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();

  const responses = AI_RESPONSES[lang] || AI_RESPONSES.tr;
  const quickActions = QUICK_ACTIONS[lang] || QUICK_ACTIONS.tr;

  // Get page-specific greeting
  const pageGreeting = getPageGreeting(location.pathname, lang);

  // Initialize with page-specific greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(pageGreeting);
      }, 500);
    }
  }, [isOpen]);

  // Reset messages when page changes (to show new page-specific greeting)
  useEffect(() => {
    if (messages.length > 0) {
      setMessages([]);
    }
  }, [location.pathname]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMessage = (text) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text,
          isBot: true,
          time: new Date().toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
      setIsTyping(false);

      // Text-to-speech if not muted
      if (!isMuted && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'tr' ? 'tr-TR' : 'en-US';
        utterance.rate = 1.1;
        speechSynthesis.speak(utterance);
      }
    }, 1000 + Math.random() * 500);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        isBot: false,
        time: new Date().toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
  };

  const processUserMessage = (text) => {
    const lowerText = text.toLowerCase();

    // Simple intent detection
    if (lowerText.includes('teklif') || lowerText.includes('quote') || lowerText.includes('fiyat') || lowerText.includes('price')) {
      return responses.quote;
    }
    if (lowerText.includes('takip') || lowerText.includes('track') || lowerText.includes('sipariş') || lowerText.includes('order')) {
      return responses.tracking;
    }
    if (lowerText.includes('dfm') || lowerText.includes('analiz') || lowerText.includes('analysis')) {
      return responses.dfm;
    }
    if (lowerText.includes('yardım') || lowerText.includes('help')) {
      return responses.help;
    }
    if (lowerText.includes('merhaba') || lowerText.includes('hello') || lowerText.includes('selam')) {
      return responses.greeting;
    }

    // Check for layer count
    const layerMatch = lowerText.match(/(\d+)\s*(katman|layer)/);
    if (layerMatch) {
      return responses.layers.replace('{layers}', layerMatch[1]);
    }

    // Default fallback
    return responses.fallback;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    const response = processUserMessage(inputValue);
    setInputValue('');

    addBotMessage(response);
  };

  const handleQuickAction = (action) => {
    addUserMessage(action.prompt);
    const response = responses[action.action] || responses.fallback;
    addBotMessage(response);
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert(lang === 'tr' ? 'Tarayıcınız ses tanımayı desteklemiyor.' : 'Your browser does not support speech recognition.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = lang === 'tr' ? 'tr-TR' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setTimeout(() => handleSend(), 500);
    };

    recognition.start();
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl ${
          isOpen
            ? 'bg-gray-800 text-gray-400'
            : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? {} : { boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0.4)', '0 0 0 20px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0)'] }}
        transition={isOpen ? {} : { duration: 2, repeat: Infinity }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AICO Bot</h3>
                    <p className="text-white/70 text-xs flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      {lang === 'tr' ? 'Çevrimiçi' : 'Online'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white/70" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[350px] overflow-y-auto p-4 bg-gray-900">
              {messages.map((msg) => (
                <Message key={msg.id} message={msg} isBot={msg.isBot} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-gray-500 text-xs mb-2">
                  {lang === 'tr' ? 'Hızlı işlemler:' : 'Quick actions:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(action)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-xs text-gray-300 transition-colors"
                    >
                      <action.icon className="w-3 h-3" />
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleListening}
                  className={`p-2 rounded-full transition-colors ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={lang === 'tr' ? 'Mesajınızı yazın...' : 'Type your message...'}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="p-2 rounded-full bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-center text-gray-600 text-xs mt-2">
                {lang === 'tr' ? 'AI destekli • 7/24 aktif' : 'AI-powered • 24/7 active'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AICOBot;

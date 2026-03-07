'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  MessageSquare,
  Plus,
  Menu,
  X,
  Send,
  Mic,
  LayoutDashboard,
  LogOut,
  Globe,
  Leaf,
  Camera
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState<string>('hi');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'hi', name: 'हिंदी', nameEn: 'Hindi', speechCode: 'hi-IN' },
    { code: 'en', name: 'English', nameEn: 'English', speechCode: 'en-IN' },
    { code: 'ta', name: 'தமிழ்', nameEn: 'Tamil', speechCode: 'ta-IN' },
    { code: 'te', name: 'తెలుగు', nameEn: 'Telugu', speechCode: 'te-IN' },
    { code: 'kn', name: 'ಕನ್ನಡ', nameEn: 'Kannada', speechCode: 'kn-IN' },
    { code: 'ml', name: 'മലയാളം', nameEn: 'Malayalam', speechCode: 'ml-IN' },
    { code: 'mr', name: 'मराठी', nameEn: 'Marathi', speechCode: 'mr-IN' },
    { code: 'gu', name: 'ગુજરાતી', nameEn: 'Gujarati', speechCode: 'gu-IN' },
    { code: 'bn', name: 'বাংলা', nameEn: 'Bengali', speechCode: 'bn-IN' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', nameEn: 'Punjabi', speechCode: 'pa-IN' },
    { code: 'or', name: 'ଓଡ଼ିଆ', nameEn: 'Odia', speechCode: 'or-IN' },
    { code: 'as', name: 'অসমীয়া', nameEn: 'Assamese', speechCode: 'as-IN' }
  ];

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === language) || languages[0];
  };

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedName = localStorage.getItem('userName');

    if (authStatus === 'true' && storedName) {
      setIsAuthenticated(true);
      setUserName(storedName);

      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        setLanguage(userData.language || 'hi');
      }

      const savedSessions = localStorage.getItem('chatSessions');
      if (savedSessions) {
        setChatSessions(JSON.parse(savedSessions));
      }

      const sessionId = `session_${Date.now()}`;
      setCurrentSessionId(sessionId);
    }

    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setInput(prev => prev + finalTranscript);
        } else if (interimTranscript) {
          setInput(prev => {
            const lastSpace = prev.lastIndexOf(' ');
            const base = lastSpace > 0 ? prev.substring(0, lastSpace + 1) : '';
            return base + interimTranscript;
          });
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = getCurrentLanguage().speechCode;
    }
  }, [language]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    router.push('/');
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      userData.language = langCode;
      localStorage.setItem('user', JSON.stringify(userData));
    }
    setShowLanguageModal(false);

    const langName = languages.find(l => l.code === langCode)?.name || langCode;
    const systemMessage: Message = {
      id: `msg_${Date.now()}_system`,
      role: 'assistant',
      content: langCode === 'hi'
        ? `भाषा बदल दी गई है। अब मैं ${langName} में जवाब दूंगी। 🌐`
        : langCode === 'en'
          ? `Language changed to ${langName}. I will now respond in English. 🌐`
          : `Language changed to ${langName}. I will now respond in this language. 🌐`,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = getCurrentLanguage().speechCode;
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        setIsListening(false);
      }
    }
  };

  const createNewChat = () => {
    setMessages([]);
    const sessionId = `session_${Date.now()}`;
    setCurrentSessionId(sessionId);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!isAuthenticated) {
      router.push('/auth?redirect=/chat');
      return;
    }

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          language: language,
          history: messages.slice(-5),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      const aiMessage: Message = {
        id: `msg_${Date.now()}_ai`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);

      const newSession: ChatSession = {
        id: currentSessionId,
        title: input.substring(0, 50) + (input.length > 50 ? '...' : ''),
        lastMessage: data.response.substring(0, 100),
        timestamp: new Date()
      };

      const updatedSessions = [newSession, ...chatSessions.filter(s => s.id !== currentSessionId)];
      setChatSessions(updatedSessions);
      localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));

    } catch (error: any) {
      const errorMessage: Message = {
        id: `msg_${Date.now()}_error`,
        role: 'assistant',
        content: language === 'hi'
          ? 'क्षमा करें, कुछ गलत हो गया।'
          : 'Sorry, something went wrong.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full relative z-10 flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl mx-auto w-full text-center mb-12">
          <div className="text-7xl mb-6 animate-bounce">🌾</div>
          <h1 className="text-display font-bold text-text-primary text-vibrancy mb-4">
            KrishiMitra AI Chat
          </h1>
          <p className="text-title text-text-secondary mb-12 max-w-2xl mx-auto">
            Your intelligent farming assistant. Get expert advice in your language, backed by Liquid Glass precision.
          </p>

          <div className="glass-tier-1 glass-specular rounded-4xl p-10 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Sign in to start chatting
            </h2>
            <p className="text-text-secondary mb-8 leading-relaxed">
              Create a free account to access AI-powered farming advice, weather updates, market prices, and more.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push('/auth?redirect=/chat')}
                className="px-8 py-4 glass-tier-3 rounded-2xl text-text-primary font-semibold interactive-glass glass-specular transition-all hover:scale-105 active:scale-95"
              >
                Sign In / Sign Up
              </button>
              <button
                onClick={() => router.push('/')}
                className="px-8 py-4 glass-tier-2 text-text-secondary rounded-2xl font-semibold interactive-glass transition-all hover:text-text-primary active:scale-95"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full mb-12">
          {[
            { icon: '🌤️', title: 'Weather', desc: 'Real-time forecasts' },
            { icon: '🌱', title: 'Crop Advice', desc: 'Expert guidance' },
            { icon: '💰', title: 'Market Prices', desc: 'Latest mandi rates' },
            { icon: '🏛️', title: 'Schemes', desc: 'Subsidy info' }
          ].map((feature, idx) => (
            <div key={idx} className="glass-tier-1 rounded-3xl p-6 glass-specular flex flex-col items-center text-center interactive-glass hover:-translate-y-1 transition-transform">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-lg text-text-primary mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full relative z-10 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${showSidebar ? 'w-72' : 'w-0'} glass-tier-1 border-r border-white/10 transition-all duration-500 overflow-hidden flex flex-col shrink-0 rounded-r-3xl m-3 mr-0`}>
        <div className="p-4 border-b border-white/5">
          <button
            onClick={createNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 glass-tier-3 hover:bg-white/10 rounded-2xl interactive-glass text-text-primary glass-specular transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          <div className="text-xs text-text-tertiary px-3 py-2 font-semibold uppercase tracking-wider">Recent</div>
          {chatSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setCurrentSessionId(session.id)}
              className={`w-full text-left px-4 py-3 rounded-2xl transition-all ${currentSessionId === session.id
                ? 'glass-tier-2 glass-specular'
                : 'interactive-glass hover:bg-white/5'
                }`}
            >
              <div className="flex items-start gap-3">
                <MessageSquare className={`w-4 h-4 mt-0.5 shrink-0 ${currentSessionId === session.id ? 'text-text-primary' : 'text-text-tertiary'}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${currentSessionId === session.id ? 'text-text-primary text-vibrancy' : 'text-text-secondary'}`}>
                    {session.title}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button
            onClick={() => router.push('/plant-health')}
            className="w-full flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg transition-all shadow-lg"
          >
            <Leaf className="w-5 h-5" />
            <span className="text-sm font-medium">Plant Health</span>
          </button>

          <button
            onClick={() => router.push('/dashboard/farmer')}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-2xl interactive-glass transition-colors text-text-secondary hover:text-text-primary"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => setShowLanguageModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-2xl interactive-glass transition-colors text-text-secondary hover:text-text-primary"
          >
            <Globe className="w-5 h-5" />
            <span className="text-sm font-medium">{getCurrentLanguage().nameEn}</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 rounded-2xl interactive-glass transition-colors text-red-400 hover:text-red-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden p-3 relative">
        <header className="glass-tier-2 glass-specular rounded-3xl mb-3 px-5 py-4 flex items-center justify-between z-20 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2.5 interactive-glass rounded-xl text-text-secondary hover:text-text-primary bg-white/5 hover:bg-white/10 transition-colors apple-focus"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-text-primary text-vibrancy">KrishiMitra AI</h1>
              <p className="text-xs text-text-tertiary">Your farming assistant</p>
            </div>
          </div>

          <button
            onClick={() => setShowLanguageModal(true)}
            className="px-5 py-2 glass-tier-3 rounded-full interactive-glass text-text-primary text-sm font-semibold glass-specular shadow-md transition-all active:scale-95 apple-focus"
          >
            {getCurrentLanguage().name}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto mb-3 px-2 lg:px-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-6 pb-4">
            {messages.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-8xl mb-8 animate-float">🌾</div>
                <h2 className="text-4xl font-bold text-text-primary text-vibrancy mb-4">
                  {language === 'hi' ? 'नमस्ते!' : 'Hello!'} {userName}
                </h2>
                <p className="text-xl text-text-secondary mb-12 max-w-xl mx-auto">
                  {language === 'hi'
                    ? 'मैं कृषिमित्र हूं, आपकी कृषि सहायक। मुझसे कुछ भी पूछें!'
                    : 'I\'m KrishiMitra, your Liquid Glass farming assistant. Ask me anything!'}
                </p>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {/* Plant Health Feature - Highlighted */}
                  <button
                    onClick={() => router.push('/plant-health')}
                    className="group col-span-2 flex items-center gap-4 p-6 glass-tier-2 border-2 border-green-500/50 rounded-[28px] hover:border-green-400/80 hover:shadow-[0_0_30px_rgba(74,222,128,0.2)] hover:scale-[1.02] transition-all text-left group interactive-glass apple-focus glass-specular"
                  >
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 group-hover:scale-110 transition-transform shadow-inner">
                      <Camera className="w-8 h-8 text-text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-xl text-text-primary text-vibrancy">
                          {language === 'hi' ? '🌿 पौधे स्वास्थ्य परीक्षण' : '🌿 Plant Health Testing'}
                        </span>
                        <span className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-500/30 text-xs font-bold rounded-full uppercase tracking-widest backdrop-blur-xl">
                          {language === 'hi' ? 'नया' : 'NEW'}
                        </span>
                      </div>
                      <p className="text-text-secondary text-sm">
                        {language === 'hi'
                          ? 'AI से पत्ती की फोटो लेकर रोग की पहचान करें और तुरंत उपचार पाएं'
                          : 'Scan leaf photos with AI to identify diseases and get instant treatment'}
                      </p>
                    </div>
                    <div className="text-text-primary group-hover:translate-x-1 transition-transform">
                      →
                    </div>
                  </button>

                  {(language === 'hi' ? [
                    'मेरी फसल की पत्तियां पीली हो रही हैं',
                    'टमाटर के लिए सबसे अच्छा उर्वरक',
                    'मौसम की सलाह चाहिए',
                    'गेहूं की बुवाई का समय'
                  ] : [
                    'My crop leaves are turning yellow',
                    'Best fertilizer for tomato',
                    'Weather forecast advice',
                    'When to sow wheat'
                  ]).map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(suggestion)}
                      className="px-6 py-4 glass-tier-1 interactive-glass rounded-2xl text-sm font-medium text-text-secondary hover:text-text-primary hover:glass-tier-2 transition-all border border-white/5 hover:border-white/20 hover:-translate-y-1 shadow-sm apple-focus"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-glass-reveal`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[28px] px-6 py-4 backdrop-blur-3xl shadow-lg border ${msg.role === 'user'
                        ? 'bg-white/20 border-white/30 text-white rounded-br-md ml-12'
                        : 'glass-tier-1 border-white/10 text-text-primary rounded-bl-md mr-12 glass-specular'
                        }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                      <p className={`text-[10px] mt-3 font-medium uppercase tracking-wider ${msg.role === 'user' ? 'text-white/60' : 'text-text-tertiary'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="glass-tier-1 border border-white/10 rounded-[28px] rounded-bl-md px-6 py-5 glass-specular flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-text-secondary rounded-full animate-bounce" />
                      <span className="w-2.5 h-2.5 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <span className="w-2.5 h-2.5 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>

        <div className="shrink-0 glass-tier-2 glass-specular rounded-3xl p-3 z-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <button
                onClick={toggleVoiceInput}
                className={`p-3.5 rounded-2xl transition-all interactive-glass flex-shrink-0 apple-focus ${isListening
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                  : 'glass-tier-3 text-text-secondary hover:text-text-primary'
                  }`}
              >
                <Mic className="w-6 h-6" />
              </button>

              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder={language === 'hi' ? 'सवाल पूछें...' : 'Ask your question...'}
                  className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:bg-white/10 focus:border-white/20 resize-none transition-all custom-scrollbar shadow-inner"
                  rows={Math.min(4, Math.max(1, input.split('\\n').length))}
                  disabled={isLoading}
                  style={{ minHeight: '56px', maxHeight: '160px' }}
                />
              </div>

              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="p-3.5 glass-tier-3 rounded-2xl text-text-primary interactive-glass glass-specular transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 apple-focus"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
            {isListening && <p className="text-xs text-red-400 text-center mt-3 animate-pulse font-medium tracking-wide">{language === 'hi' ? 'सुन रहा हूं...' : 'Listening...'}</p>}
          </div>
        </div>
      </div>

      {/* Floating Plant Health Button */}
      {messages.length > 0 && (
        <button
          onClick={() => router.push('/plant-health')}
          className="fixed bottom-24 right-6 glass-tier-3 text-text-primary p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50 group border border-white/20 glass-specular interactive-glass"
          title={language === 'hi' ? 'पौधे स्वास्थ्य परीक्षण' : 'Plant Health Testing'}
        >
          <Leaf className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-green-500/30 text-green-300 border border-green-500/40 text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full backdrop-blur-md">
            {language === 'hi' ? 'नया' : 'NEW'}
          </span>
        </button>
      )}

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xl flex items-center justify-center z-[100] p-4 animate-fade-in">
          <div className="glass-tier-2 glass-specular rounded-[40px] p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto custom-scrollbar border border-white/20 shadow-2xl animate-glass-reveal">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-text-primary text-vibrancy">Language</h2>
                <p className="text-text-secondary mt-2">Select your preferred dialect.</p>
              </div>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="p-3 interactive-glass hover:bg-white/10 rounded-full transition-colors apple-focus"
              >
                <X className="w-6 h-6 text-text-secondary" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`p-5 rounded-3xl text-center transition-all apple-focus ${language === lang.code
                    ? 'glass-tier-3 glass-specular text-text-primary shadow-lg transform scale-[1.02] border border-white/30'
                    : 'glass-tier-1 text-text-secondary hover:text-text-primary hover:glass-tier-2 interactive-glass border border-white/5 hover:border-white/10'
                    }`}
                >
                  <div className={`font-semibold text-xl mb-1 ${language === lang.code ? 'text-vibrancy' : ''}`}>{lang.name}</div>
                  <div className={`text-sm ${language === lang.code ? 'text-text-secondary' : 'text-text-tertiary'}`}>{lang.nameEn}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

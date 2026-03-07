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
      
      // Load chat sessions from localStorage
      const savedSessions = localStorage.getItem('chatSessions');
      if (savedSessions) {
        setChatSessions(JSON.parse(savedSessions));
      }
      
      // Create or load current session
      const sessionId = `session_${Date.now()}`;
      setCurrentSessionId(sessionId);
    }

    // Initialize Web Speech API
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false; // Don't keep listening continuously
      recognitionRef.current.interimResults = true; // Show results as you speak

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

        // Update input with final + interim text
        if (finalTranscript) {
          setInput(prev => prev + finalTranscript);
        } else if (interimTranscript) {
          // Show interim results in real-time
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
        
        if (event.error === 'no-speech') {
          // Stop on no-speech
          console.log('No speech detected, stopping...');
        } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          alert(language === 'hi'
            ? 'माइक्रोफ़ोन एक्सेस अस्वीकृत। कृपया ब्राउज़र सेटिंग्स में अनुमति दें।'
            : 'Microphone access denied. Please allow access in browser settings.');
        } else if (event.error === 'network') {
          alert(language === 'hi'
            ? 'नेटवर्क त्रुटि। कृपया अपना इंटरनेट कनेक्शन जांचें।'
            : 'Network error. Please check your internet connection.');
        }
      };

      recognitionRef.current.onend = () => {
        // Always stop when recognition ends
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = getCurrentLanguage().speechCode;
    }
  }, [language]);

  // Cleanup: Stop microphone when component unmounts
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
    
    // Add a system message to indicate language change
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
    if (!recognitionRef.current) {
      alert(language === 'hi' 
        ? 'आपका ब्राउज़र वॉइस इनपुट का समर्थन नहीं करता। कृपया Chrome या Edge का उपयोग करें।'
        : 'Voice input is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      // Stop listening
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // Start listening
      try {
        recognitionRef.current.lang = getCurrentLanguage().speechCode;
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Speech recognition error:', error);
        alert(language === 'hi'
          ? 'माइक्रोफ़ोन शुरू करने में त्रुटि। कृपया फिर से प्रयास करें।'
          : 'Error starting microphone. Please try again.');
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

    // Check if user is authenticated before sending
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          language: language,
          history: messages.slice(-5),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const aiMessage: Message = {
        id: `msg_${Date.now()}_ai`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Save to chat history
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
          ? 'क्षमा करें, कुछ गलत हो गया। कृपया पुनः प्रयास करें।'
          : 'Sorry, something went wrong. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Guest View - Preview Only */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="text-7xl mb-6 animate-bounce">🌾</div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              KrishiMitra AI Chat
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your intelligent farming assistant - Get expert advice in your language
            </p>
            
            {/* Login Prompt */}
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border-2 border-green-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Sign in to start chatting
              </h2>
              <p className="text-gray-600 mb-6">
                Create a free account to access AI-powered farming advice, weather updates, market prices, and more!
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => router.push('/auth?redirect=/chat')}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
                >
                  Sign In / Sign Up
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>

          {/* Feature Preview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '🌤️', title: 'Weather Info', desc: 'Real-time weather forecasts' },
              { icon: '🌱', title: 'Crop Advice', desc: 'Expert cultivation guidance' },
              { icon: '💰', title: 'Market Prices', desc: 'Latest mandi rates' },
              { icon: '🏛️', title: 'Govt Schemes', desc: 'Subsidy information' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Language Support */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">12+ Indian Languages Supported</h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {['हिंदी', 'English', 'தமிழ்', 'తెలుగు', 'ಕನ್ನಡ', 'മലയാളം', 'मराठी', 'ગુજરાતી'].map((lang, idx) => (
                <span key={idx} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {lang}
                </span>
              ))}
            </div>
            <p className="text-green-100">Chat in your preferred language with voice input support</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className={`${showSidebar ? 'w-64' : 'w-0'} bg-gray-950 text-white transition-all duration-300 overflow-hidden flex flex-col border-r border-gray-800`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-800">
          <button
            onClick={createNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-white"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="text-xs text-gray-400 px-3 py-2 font-semibold">Recent Chats</div>
          {chatSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setCurrentSessionId(session.id)}
              className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors ${
                currentSessionId === session.id ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 mt-1 flex-shrink-0 text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-white">{session.title}</p>
                  <p className="text-xs text-gray-400 truncate">{session.lastMessage}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-gray-800 space-y-2">
          <button
            onClick={() => router.push('/plant-health')}
            className="w-full flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg transition-all shadow-lg"
          >
            <Leaf className="w-5 h-5" />
            <span className="text-sm font-medium">Plant Health</span>
          </button>

          <button
            onClick={() => router.push('/dashboard/farmer')}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm">Dashboard</span>
          </button>
          
          <button
            onClick={() => setShowLanguageModal(true)}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Globe className="w-5 h-5" />
            <span className="text-sm">{getCurrentLanguage().nameEn}</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-red-400"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>

          <div className="px-3 py-2 text-xs text-gray-400">
            <p className="font-medium text-white">{userName}</p>
            <p>KrishiMitra AI Assistant</p>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white"
            >
              {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-lg font-semibold text-white">KrishiMitra AI</h1>
              <p className="text-xs text-gray-400">Your farming assistant</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowLanguageModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            {getCurrentLanguage().name}
          </button>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-7xl mb-6 animate-bounce">🌾</div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  {language === 'hi' ? 'नमस्ते!' : 'Hello!'} {userName}
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  {language === 'hi' 
                    ? 'मैं कृषिमित्र हूं, आपकी कृषि सहायक। मुझसे कुछ भी पूछें!'
                    : 'I\'m KrishiMitra, your farming assistant. Ask me anything!'}
                </p>
                
                {/* Suggestion Chips */}
                <div className="mb-8">
                  <p className="text-sm text-gray-400 mb-4">
                    {language === 'hi' ? 'लोकप्रिय प्रश्न:' : 'Popular Questions:'}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
                    {(language === 'hi' ? [
                      'मेरी फसल की पत्तियां पीली हो रही हैं',
                      'टमाटर के लिए सबसे अच्छा उर्वरक',
                      'मौसम की सलाह चाहिए',
                      'गेहूं की बुवाई का समय',
                      'कीट नियंत्रण के उपाय',
                      'सरकारी योजनाएं'
                    ] : [
                      'My crop leaves are turning yellow',
                      'Best fertilizer for tomato',
                      'Weather forecast advice',
                      'When to sow wheat',
                      'Pest control measures',
                      'Government schemes'
                    ]).map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInput(suggestion)}
                        className="px-4 py-2 bg-gray-800 text-gray-200 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all border border-gray-700"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {/* Plant Health Feature - Highlighted */}
                  <button
                    onClick={() => router.push('/plant-health')}
                    className="group col-span-2 flex items-center gap-4 p-6 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl hover:from-green-700 hover:to-green-800 hover:shadow-2xl hover:scale-105 transition-all text-left border-2 border-green-400"
                  >
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl group-hover:scale-110 transition-transform">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-xl text-white">
                          {language === 'hi' ? '🌿 पौधे स्वास्थ्य परीक्षण' : '🌿 Plant Health Testing'}
                        </span>
                        <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                          {language === 'hi' ? 'नया' : 'NEW'}
                        </span>
                      </div>
                      <p className="text-green-50 text-sm">
                        {language === 'hi' 
                          ? 'AI से पत्ती की फोटो लेकर रोग की पहचान करें और तुरंत उपचार पाएं'
                          : 'Scan leaf photos with AI to identify diseases and get instant treatment'}
                      </p>
                    </div>
                    <div className="text-white group-hover:translate-x-1 transition-transform">
                      →
                    </div>
                  </button>

                  {[
                    { icon: '🌤️', text: language === 'hi' ? 'मौसम की जानकारी' : 'Weather Info', color: 'blue' },
                    { icon: '🌱', text: language === 'hi' ? 'फसल सलाह' : 'Crop Advice', color: 'green' },
                    { icon: '💰', text: language === 'hi' ? 'बाजार भाव' : 'Market Prices', color: 'yellow' },
                    { icon: '🏛️', text: language === 'hi' ? 'सरकारी योजनाएं' : 'Govt Schemes', color: 'purple' }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(item.text)}
                      className="group flex items-center gap-4 p-5 bg-gray-800 border-2 border-gray-700 rounded-2xl hover:border-green-500 hover:shadow-lg hover:scale-105 transition-all text-left"
                    >
                      <div className="text-4xl group-hover:scale-110 transition-transform">{item.icon}</div>
                      <span className="font-semibold text-gray-200 group-hover:text-green-400 transition-colors">{item.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-md ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-green-600 to-green-700 text-white'
                          : 'bg-gray-800 border border-gray-700 text-gray-100'
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                      <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-gray-800 border-t border-gray-700 p-4">
          <div className="max-w-3xl mx-auto">
            {isListening && (
              <div className="mb-3 flex items-center justify-center gap-2 text-red-400 animate-pulse">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-sm font-medium">
                  {language === 'hi' ? 'सुन रहा हूं... बोलें' : 'Listening... Speak now'}
                </span>
              </div>
            )}
            <div className="flex gap-3 items-end">
              <button
                onClick={toggleVoiceInput}
                className={`p-3 rounded-xl transition-all flex-shrink-0 ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse shadow-lg' 
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
                title={language === 'hi' ? (isListening ? 'रोकें' : 'आवाज से बोलें') : (isListening ? 'Stop' : 'Voice Input')}
              >
                <Mic className="w-5 h-5" />
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
                  placeholder={language === 'hi' ? 'अपना सवाल पूछें...' : 'Ask your question...'}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-700 border-2 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 resize-none"
                  rows={1}
                  disabled={isLoading}
                />
              </div>
              
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              {language === 'hi'
                ? 'कृषिमित्र AI गलतियाँ कर सकती है। महत्वपूर्ण जानकारी की पुष्टि करें।'
                : 'KrishiMitra AI can make mistakes. Verify important information.'}
            </p>
          </div>
        </div>
      </div>

      {/* Floating Plant Health Button */}
      {messages.length > 0 && (
        <button
          onClick={() => router.push('/plant-health')}
          className="fixed bottom-24 right-6 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-full shadow-2xl hover:from-green-700 hover:to-green-800 hover:scale-110 transition-all z-50 group"
          title={language === 'hi' ? 'पौधे स्वास्थ्य परीक्षण' : 'Plant Health Testing'}
        >
          <Leaf className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
            {language === 'hi' ? 'नया' : 'NEW'}
          </span>
        </button>
      )}

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Select Language</h2>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`p-4 rounded-xl text-center transition-all ${
                    language === lang.code
                      ? 'bg-green-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                  }`}
                >
                  <div className="font-semibold text-lg">{lang.name}</div>
                  <div className="text-sm opacity-75">{lang.nameEn}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

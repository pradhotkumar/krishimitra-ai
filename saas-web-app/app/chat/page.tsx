'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Check authentication on mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/auth');
    } else {
      setIsAuthenticated(true);
      const userData = JSON.parse(user);
      setUserName(userData.name);
      setLanguage(userData.language || 'hi');
    }

    // Initialize Web Speech API
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [router, language]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in your browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

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
          history: messages.slice(-5), // Send last 5 messages for context
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

  const quickActions = [
    { hi: '🌤️ मौसम की जानकारी', en: '🌤️ Weather Info' },
    { hi: '💰 बाजार भाव', en: '💰 Market Prices' },
    { hi: '🌱 फसल सलाह', en: '🌱 Crop Advice' },
    { hi: '🏛️ सरकारी योजनाएं', en: '🏛️ Govt Schemes' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text/70">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">AI Chat Dashboard</h1>
              <p className="text-text/70">
                Welcome, {userName}! Ask questions about crops, weather, schemes, and more
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-full transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Language Selector */}
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setLanguage('hi')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                language === 'hi'
                  ? 'bg-primary text-white'
                  : 'bg-white text-primary border border-primary/20'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                language === 'en'
                  ? 'bg-primary text-white'
                  : 'bg-white text-primary border border-primary/20'
              }`}
            >
              English
            </button>
          </div>

          {/* Quick Actions */}
          {messages.length === 0 && (
            <div className="mb-6 glass p-6 rounded-lg shadow-soft">
              <p className="text-sm text-text/70 mb-3">
                {language === 'hi' ? 'त्वरित प्रश्न:' : 'Quick Actions:'}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(language === 'hi' ? action.hi : action.en)}
                    className="px-4 py-2 bg-white text-left text-sm rounded-lg hover:bg-primary/5 transition-colors border border-primary/10"
                  >
                    {language === 'hi' ? action.hi : action.en}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="glass rounded-lg shadow-soft p-6 mb-6 min-h-[400px] max-h-[500px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center text-text/50 py-20">
                <p className="text-lg mb-2">
                  {language === 'hi' ? 'अपना पहला सवाल पूछें' : 'Ask your first question'}
                </p>
                <p className="text-sm">
                  {language === 'hi' 
                    ? 'फसल, मौसम, योजनाओं या बाजार के बारे में पूछें'
                    : 'Ask about crops, weather, schemes, or markets'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md px-4 py-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-accent/30'
                          : 'bg-white shadow-soft'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      <p className="text-xs text-text/50 mt-1">
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white shadow-soft px-4 py-3 rounded-lg">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="flex gap-2">
            <button
              onClick={toggleVoiceInput}
              className={`px-4 py-3 rounded-full transition-all ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-white text-primary border border-primary/20 hover:bg-primary/5'
              }`}
              title={language === 'hi' ? 'आवाज से बोलें' : 'Voice Input'}
            >
              {isListening ? '🎤' : '🎙️'}
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={language === 'hi' ? 'अपना सवाल पूछें...' : 'Ask your question...'}
              className="flex-1 px-4 py-3 rounded-full border border-primary/20 focus:outline-none focus:border-primary"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-primary text-white rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {language === 'hi' ? 'भेजें' : 'Send'}
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-text/50">
            <p>
              {language === 'hi'
                ? '💡 टिप: आप माइक बटन दबाकर बोल सकते हैं या टाइप कर सकते हैं'
                : '💡 Tip: You can speak using the mic button or type your question'}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

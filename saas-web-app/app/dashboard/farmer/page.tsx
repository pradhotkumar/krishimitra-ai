'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sprout,
  Cloud,
  MessageSquare,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  X,
  Send,
  Phone,
  Newspaper,
  ExternalLink,
  FileText,
  Globe
} from 'lucide-react';

interface DashboardData {
  crops: Array<{
    id: string;
    name: string;
    area: string;
    status: string;
    plantedDate: string;
    expectedHarvest: string;
  }>;
  weatherAlerts: Array<{
    id: string;
    type: string;
    message: string;
    severity: string;
    date: string;
  }>;
  aiAdviceHistory: Array<{
    id: string;
    query: string;
    summary: string;
    date: string;
  }>;
  recommendedProducts: Array<{
    id: string;
    name: string;
    price: number;
    reason: string;
  }>;
}

export default function FarmerDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [userName, setUserName] = useState('Farmer');
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: string, message: string }>>([]);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const storedName = localStorage.getItem('userName');
    const storedLanguage = localStorage.getItem('language') as 'en' | 'hi';

    if (!isAuthenticated) {
      router.push('/auth?redirect=/dashboard/farmer');
      return;
    }

    if (storedName) {
      setUserName(storedName);
    }

    if (storedLanguage) {
      setLanguage(storedLanguage);
    }

    fetchDashboardData();
  }, [router]);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = {
    en: {
      dashboard: 'Farmer Dashboard',
      welcome: 'Welcome back',
      logout: 'Logout',
      overview: 'Overview',
      myCrops: 'My Crops',
      weatherAlerts: 'Weather Alerts',
      govtSchemes: 'Govt Schemes',
      agriNews: 'Agri News',
      aiAdviceHistory: 'AI Advice History',
      recommendedProducts: 'Recommended Products',
      activeCrops: 'Active Crops',
      newAlerts: 'New',
      aiConsultations: 'AI Consultations',
      quickActions: 'Quick Actions',
      askAIExpert: 'Ask AI Expert',
      getFarmingAdvice: 'Get farming advice',
      plantCare: 'Plant Care',
      scanLeafDiseases: 'Scan leaf diseases',
      marketplace: 'Marketplace',
      buySupplies: 'Buy supplies',
      viewBenefits: 'View benefits',
      latestNews: 'Latest Agriculture News',
      viewAll: 'View All',
      addCrop: '+ Add Crop',
      noCropsYet: 'No crops added yet',
      startTracking: 'Start tracking your crops to get AI-powered insights',
      currentWeather: 'Current Weather',
      temperature: 'Temperature',
      humidity: 'Humidity',
      wind: 'Wind',
      noWeatherAlerts: 'No weather alerts',
      allClear: 'All clear! Check back later for updates',
      noAdviceYet: 'No advice history yet',
      noRecommendations: 'No recommendations yet'
    },
    hi: {
      dashboard: 'किसान डैशबोर्ड',
      welcome: 'वापसी पर स्वागत है',
      logout: 'लॉगआउट',
      overview: 'अवलोकन',
      myCrops: 'मेरी फसलें',
      weatherAlerts: 'मौसम चेतावनी',
      govtSchemes: 'सरकारी योजनाएं',
      agriNews: 'कृषि समाचार',
      aiAdviceHistory: 'AI सलाह इतिहास',
      recommendedProducts: 'अनुशंसित उत्पाद',
      activeCrops: 'सक्रिय फसलें',
      newAlerts: 'नया',
      aiConsultations: 'AI परामर्श',
      quickActions: 'त्वरित कार्य',
      askAIExpert: 'AI विशेषज्ञ से पूछें',
      getFarmingAdvice: 'खेती की सलाह लें',
      plantCare: 'पौधे की देखभाल',
      scanLeafDiseases: 'पत्ती रोग स्कैन करें',
      marketplace: 'बाज़ार',
      buySupplies: 'सामान खरीदें',
      viewBenefits: 'लाभ देखें',
      latestNews: 'नवीनतम कृषि समाचार',
      viewAll: 'सभी देखें',
      addCrop: '+ फसल जोड़ें',
      noCropsYet: 'अभी तक कोई फसल नहीं जोड़ी गई',
      startTracking: 'AI-संचालित जानकारी प्राप्त करने के लिए अपनी फसलों को ट्रैक करना शुरू करें',
      currentWeather: 'वर्तमान मौसम',
      temperature: 'तापमान',
      humidity: 'आर्द्रता',
      wind: 'हवा',
      noWeatherAlerts: 'कोई मौसम चेतावनी नहीं',
      allClear: 'सब ठीक है! अपडेट के लिए बाद में जांचें',
      noAdviceYet: 'अभी तक कोई सलाह इतिहास नहीं',
      noRecommendations: 'अभी तक कोई सिफारिश नहीं'
    }
  };

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard/farmer');
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setChatHistory(prev => [...prev, { role: 'user', message: chatMessage }]);

    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        message: 'Hello! I\'m Bhoomi, your AI farming assistant. For detailed conversations, please visit the AI Chat page. How can I help you quickly?'
      }]);
    }, 500);

    setChatMessage('');
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full relative z-10 flex items-center justify-center">
        <div className="text-center glass-tier-1 p-12 rounded-[40px] glass-specular">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-[3px] border-white/10" />
            <div className="absolute inset-0 rounded-full border-[3px] border-text-primary border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-xl animate-pulse">🌾</div>
          </div>
          <p className="text-text-primary text-vibrancy font-semibold tracking-wide">Initializing Space</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative z-10">
      {/* Heavy Blur Header */}
      <div className="glass-tier-3 sticky top-0 z-50 glass-specular border-b border-white/10 shadow-2xl backdrop-blur-3xl pt-safe">
        <div className="max-w-7xl mx-auto px-4 py-5 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary text-vibrancy tracking-tight">
                {t[language].dashboard}
              </h1>
              <p className="text-sm text-text-secondary mt-1 tracking-wide font-medium">
                {t[language].welcome}, <span className="text-text-primary font-bold">{userName}</span> 🌾
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 glass-tier-3 rounded-xl interactive-glass text-text-primary border border-white/20 glass-specular shadow-md transition-all apple-focus"
                title={language === 'en' ? 'Switch to Hindi' : 'अंग्रेजी में बदलें'}
              >
                <Globe className="w-5 h-5 opacity-70" />
                <span className="font-semibold tracking-wide">
                  {language === 'en' ? 'English' : 'हिंदी'}
                </span>
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  localStorage.removeItem('user');
                  localStorage.removeItem('userName');
                  localStorage.removeItem('language');
                  router.push('/');
                }}
                className="px-6 py-2.5 glass-tier-2 hover:bg-red-500/20 text-red-400 rounded-xl interactive-glass transition-all font-semibold uppercase tracking-wider text-xs border border-transparent hover:border-red-500/30 shadow-md apple-focus"
              >
                {t[language].logout}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 pb-32">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1 h-full">
            <nav className="glass-tier-2 rounded-[32px] p-4 flex flex-col gap-2 glass-specular border border-white/10 sticky top-32 shadow-2xl h-fit">
              {[
                { id: 'overview', label: t[language].overview || 'Overview', icon: BarChart3 },
                { id: 'crops', label: t[language].myCrops || 'My Crops', icon: Sprout },
                { id: 'weather', label: t[language].weatherAlerts || 'Weather Alerts', icon: Cloud },
                { id: 'schemes', label: t[language].govtSchemes || 'Govt Schemes', icon: TrendingUp },
                { id: 'news', label: t[language].agriNews || 'Agri News', icon: Newspaper },
                { id: 'advice', label: t[language].aiAdviceHistory || 'AI Advice History', icon: MessageSquare },
                { id: 'products', label: t[language].recommendedProducts || 'Store Recommendations', icon: ShoppingBag }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3.5 px-5 py-3.5 rounded-2xl transition-all font-medium apple-focus outline-none ${activeTab === item.id
                    ? 'glass-tier-3 text-text-primary glass-specular shadow-lg transform scale-[1.02] border border-white/20'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5 interactive-glass'
                    }`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${activeTab === item.id ? 'opacity-100' : 'opacity-60'}`} />
                  <span className="tracking-wide text-[15px]">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-1 min-w-0">
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-glass-reveal">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className="glass-tier-1 rounded-[32px] p-6 glass-specular overflow-hidden relative group interactive-glass border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
                          <Sprout className="w-6 h-6 text-white" />
                        </div>
                        <TrendingUp className="w-5 h-5 text-white/50" />
                      </div>
                      <p className="text-text-tertiary text-xs font-bold uppercase tracking-widest">{t[language].activeCrops}</p>
                      <p className="text-4xl font-bold mt-2 text-text-primary text-vibrancy">
                        {data?.crops?.length || 3}
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="glass-tier-1 rounded-[32px] p-6 glass-specular overflow-hidden relative group interactive-glass border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
                          <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-1 rounded-full font-bold shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                          {t[language].newAlerts}
                        </span>
                      </div>
                      <p className="text-text-tertiary text-xs font-bold uppercase tracking-widest">{t[language].weatherAlerts}</p>
                      <p className="text-4xl font-bold mt-2 text-text-primary text-vibrancy">
                        {data?.weatherAlerts?.length || 3}
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="glass-tier-1 rounded-[32px] p-6 glass-specular overflow-hidden relative group interactive-glass border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
                          <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <p className="text-text-tertiary text-xs font-bold uppercase tracking-widest">{t[language].aiConsultations}</p>
                      <p className="text-4xl font-bold mt-2 text-text-primary text-vibrancy">
                        {data?.aiAdviceHistory?.length || 3}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-tier-2 rounded-[36px] p-8 glass-specular border border-white/10 shadow-2xl">
                  <h2 className="font-bold text-2xl mb-6 text-text-primary tracking-tight">{t[language].quickActions}</h2>
                  <div className="grid md:grid-cols-4 gap-5">
                    <button
                      onClick={() => router.push('/chat')}
                      className="group flex flex-col items-center gap-4 p-6 glass-tier-1 border border-white/5 rounded-[28px] hover:border-white/20 interactive-glass transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] text-center apple-focus"
                    >
                      <div className="w-14 h-14 bg-white/5 group-hover:bg-white/10 rounded-[20px] flex items-center justify-center transition-colors border border-white/10">
                        <MessageSquare className="w-6 h-6 text-text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary tracking-wide text-sm">{t[language].askAIExpert}</p>
                        <p className="text-xs text-text-tertiary mt-1">{t[language].getFarmingAdvice}</p>
                      </div>
                    </button>

                    <button
                      onClick={() => router.push('/plant-health')}
                      className="group flex flex-col items-center gap-4 p-6 glass-tier-2 border border-green-500/30 rounded-[28px] hover:border-green-400/60 interactive-glass transition-all hover:shadow-[0_0_30px_rgba(74,222,128,0.1)] text-center apple-focus glass-specular"
                    >
                      <div className="w-14 h-14 bg-green-500/20 group-hover:bg-green-500/30 rounded-[20px] flex items-center justify-center transition-colors border border-green-500/40">
                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary tracking-wide text-sm">{t[language].plantCare}</p>
                        <p className="text-xs text-text-tertiary mt-1">{t[language].scanLeafDiseases}</p>
                      </div>
                    </button>

                    <button
                      onClick={() => router.push('/marketplace')}
                      className="group flex flex-col items-center gap-4 p-6 glass-tier-1 border border-white/5 rounded-[28px] hover:border-white/20 interactive-glass transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] text-center apple-focus"
                    >
                      <div className="w-14 h-14 bg-white/5 group-hover:bg-white/10 rounded-[20px] flex items-center justify-center transition-colors border border-white/10">
                        <ShoppingBag className="w-6 h-6 text-text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary tracking-wide text-sm">{t[language].marketplace}</p>
                        <p className="text-xs text-text-tertiary mt-1">{t[language].buySupplies}</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab('schemes')}
                      className="group flex flex-col items-center gap-4 p-6 glass-tier-1 border border-white/5 rounded-[28px] hover:border-white/20 interactive-glass transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] text-center apple-focus"
                    >
                      <div className="w-14 h-14 bg-white/5 group-hover:bg-white/10 rounded-[20px] flex items-center justify-center transition-colors border border-white/10">
                        <FileText className="w-6 h-6 text-text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary tracking-wide text-sm">{t[language].govtSchemes}</p>
                        <p className="text-xs text-text-tertiary mt-1">{t[language].viewBenefits}</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Latest News */}
                <div className="glass-tier-2 rounded-[36px] p-8 glass-specular border border-white/10 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-2xl text-text-primary tracking-tight">{t[language].latestNews}</h2>
                    <button
                      onClick={() => setActiveTab('news')}
                      className="text-text-secondary text-sm font-semibold hover:text-text-primary transition-colors hover:underline underline-offset-4"
                    >
                      {t[language].viewAll}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        title: 'New PM-KISAN Payment Released',
                        summary: 'Government releases ₹2000 installment for eligible farmers',
                        time: '2 hours ago',
                        category: 'Schemes'
                      },
                      {
                        title: 'Monsoon Forecast Update',
                        summary: 'IMD predicts normal rainfall for upcoming season',
                        time: '5 hours ago',
                        category: 'Weather'
                      },
                      {
                        title: 'Wheat MSP Increased',
                        summary: 'Minimum Support Price raised by ₹150 per quintal',
                        time: '1 day ago',
                        category: 'Market'
                      }
                    ].map((news, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 glass-tier-1 border border-white/5 interactive-glass rounded-3xl hover:border-white/20 transition-all cursor-pointer group">
                        <div className="w-12 h-12 rounded-[18px] bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white/10 transition-colors">
                          <Newspaper className="w-5 h-5 text-text-secondary group-hover:text-text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-base text-text-primary mb-1 truncate tracking-wide">{news.title}</p>
                          <p className="text-sm text-text-secondary mb-2 line-clamp-1">{news.summary}</p>
                          <div className="flex items-center gap-3 text-[11px] font-semibold tracking-wider text-text-tertiary uppercase">
                            <span className="glass-tier-3 px-3 py-1 rounded-full border border-white/20 text-text-primary">{news.category}</span>
                            <span>{news.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'crops' && (
              <div className="space-y-8 animate-glass-reveal">
                <div className="glass-tier-2 rounded-[40px] shadow-2xl border border-white/10 p-8 glass-specular">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <h2 className="font-bold text-3xl text-text-primary text-vibrancy">{t[language].myCrops}</h2>
                      <p className="text-sm text-text-secondary mt-1">Track and manage your cultivation zones</p>
                    </div>
                    <button className="glass-tier-3 text-text-primary px-6 py-3 rounded-2xl interactive-glass glass-specular font-semibold tracking-wide border border-white/20 shadow-lg hover:scale-105 active:scale-95 transition-all">
                      {t[language].addCrop}
                    </button>
                  </div>

                  {data?.crops && data.crops.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {data.crops.map((crop) => (
                        <div key={crop.id} className="glass-tier-1 rounded-[32px] overflow-hidden interactive-glass border border-white/10 hover:border-white/20 transition-all hover:shadow-2xl group">
                          {/* Card Header (Image replacement via gradient/emoji due to lack of actual image) */}
                          <div className="h-40 bg-white/5 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                            <span className="text-7xl group-hover:scale-110 transition-transform duration-700">🌾</span>
                            <div className="absolute top-4 right-4 z-20">
                              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xl border ${crop.status === 'Healthy' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                                crop.status === 'Needs Attention' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                                  'bg-white/20 text-white border-white/30'
                                }`}>
                                {crop.status}
                              </span>
                            </div>
                          </div>

                          <div className="p-6">
                            <h3 className="font-bold text-2xl text-text-primary mb-6 tracking-tight text-vibrancy">{crop.name}</h3>

                            <div className="space-y-4 mb-6">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-text-tertiary uppercase tracking-wider font-semibold text-xs">Area</span>
                                <span className="font-bold text-text-primary">{crop.area}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-text-tertiary uppercase tracking-wider font-semibold text-xs">Planted</span>
                                <span className="font-bold text-text-primary">{crop.plantedDate}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-text-tertiary uppercase tracking-wider font-semibold text-xs">Expected Harvest</span>
                                <span className="font-bold text-text-primary">{crop.expectedHarvest}</span>
                              </div>
                            </div>

                            <div className="mb-6 bg-white/5 rounded-2xl p-4 border border-white/5">
                              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-text-secondary mb-3">
                                <span>Yield Progress</span>
                                <span>75%</span>
                              </div>
                              <div className="w-full bg-black/40 rounded-full h-2.5 shadow-inner overflow-hidden">
                                <div className="bg-white h-full rounded-full w-[75%] shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                              <button className="glass-tier-2 text-text-primary py-3 rounded-[18px] text-xs font-bold uppercase tracking-wider interactive-glass hover:bg-white/10 border border-white/10">
                                💧 Water
                              </button>
                              <button className="glass-tier-2 text-text-primary py-3 rounded-[18px] text-xs font-bold uppercase tracking-wider interactive-glass hover:bg-white/10 border border-white/10">
                                🌱 Feed
                              </button>
                              <button className="glass-tier-2 text-text-primary py-3 rounded-[18px] text-xs font-bold uppercase tracking-wider interactive-glass hover:bg-white/10 border border-white/10">
                                🔍 Scan
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 glass-tier-1 rounded-3xl border border-white/5">
                      <div className="text-7xl mb-6 animate-float opacity-80 select-none">🌾</div>
                      <p className="text-text-primary text-2xl font-bold mb-3">{t[language].noCropsYet}</p>
                      <p className="text-text-secondary text-sm max-w-sm mx-auto">{t[language].startTracking}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'weather' && (
              <div className="space-y-8 animate-glass-reveal">
                {/* Hero Weather Card */}
                <div className="glass-tier-2 glass-specular rounded-[40px] shadow-2xl p-8 relative overflow-hidden border border-white/20 border-t-white/40 border-l-white/40">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 relative z-10 gap-4">
                    <div>
                      <p className="text-text-tertiary text-xs font-bold uppercase tracking-widest mb-2">Live Conditions</p>
                      <h3 className="text-5xl font-bold text-text-primary text-vibrancy tracking-tight">Bangalore</h3>
                    </div>
                    <div className="text-8xl drop-shadow-2xl">☀️</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 md:gap-6 relative z-10">
                    <div className="glass-tier-3 backdrop-blur-3xl rounded-[24px] p-5 text-center border border-white/10 shadow-lg">
                      <p className="text-text-secondary text-[11px] font-bold uppercase tracking-widest mb-2">Temperature</p>
                      <p className="text-3xl font-bold text-text-primary text-vibrancy">28°</p>
                    </div>
                    <div className="glass-tier-3 backdrop-blur-3xl rounded-[24px] p-5 text-center border border-white/10 shadow-lg">
                      <p className="text-text-secondary text-[11px] font-bold uppercase tracking-widest mb-2">Humidity</p>
                      <p className="text-3xl font-bold text-text-primary text-vibrancy">65%</p>
                    </div>
                    <div className="glass-tier-3 backdrop-blur-3xl rounded-[24px] p-5 text-center border border-white/10 shadow-lg">
                      <p className="text-text-secondary text-[11px] font-bold uppercase tracking-widest mb-2">Wind</p>
                      <p className="text-3xl font-bold text-text-primary text-vibrancy">12<span className="text-lg opacity-60 ml-1">km/h</span></p>
                    </div>
                  </div>
                </div>

                {/* Alerts List */}
                <div className="glass-tier-1 rounded-[40px] shadow-2xl border border-white/10">
                  <div className="p-8 border-b border-white/5">
                    <h2 className="font-bold text-2xl text-text-primary tracking-tight">Regional Alerts</h2>
                  </div>
                  <div className="p-8">
                    {data?.weatherAlerts && data.weatherAlerts.length > 0 ? (
                      <div className="space-y-5">
                        {data.weatherAlerts.map((alert) => (
                          <div key={alert.id} className="glass-tier-2 rounded-3xl p-6 interactive-glass border border-white/10 hover:border-white/20 transition-all flex items-start gap-5">
                            <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center flex-shrink-0 shadow-inner border ${alert.severity === 'high' ? 'bg-red-500/20 border-red-500/40 text-red-400' :
                              alert.severity === 'medium' ? 'bg-orange-500/20 border-orange-500/40 text-orange-400' :
                                'bg-blue-500/20 border-blue-500/40 text-blue-400'
                              }`}>
                              <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <p className="font-bold text-lg text-text-primary">{alert.type}</p>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-sm w-fit ${alert.severity === 'high' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                                  alert.severity === 'medium' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                                    'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                  }`}>
                                  {alert.severity}
                                </span>
                              </div>
                              <p className="text-sm text-text-secondary leading-relaxed mb-3">{alert.message}</p>
                              <p className="text-xs text-text-tertiary font-semibold uppercase tracking-wider">{alert.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="text-6xl mb-6 opacity-80">☀️</div>
                        <p className="text-text-primary text-xl font-bold mb-2">Atmosphere Stable</p>
                        <p className="text-text-secondary text-sm">No critical weather anomalies detected in your region.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schemes' && (
              <div className="space-y-8 animate-glass-reveal">
                <div className="glass-tier-2 rounded-[40px] shadow-2xl border border-white/10 p-8 glass-specular">
                  <div className="mb-10">
                    <h2 className="font-bold text-3xl text-text-primary text-vibrancy">Civil Subsidies</h2>
                    <p className="text-text-secondary text-sm mt-2">Active government welfare programs configured for your profile.</p>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        name: 'PM-KISAN',
                        description: 'Direct income support of ₹6000 per year in three installments',
                        eligibility: 'All landholding farmers',
                        benefit: '₹6,000/year',
                        status: 'Active',
                        link: 'https://pmkisan.gov.in',
                        icon: '💰'
                      },
                      {
                        name: 'Kisan Credit Card (KCC)',
                        description: 'Credit facility for farmers to meet agricultural expenses',
                        eligibility: 'Farmers with land ownership',
                        benefit: 'Up to ₹3 lakh credit',
                        status: 'Active',
                        link: 'https://www.india.gov.in',
                        icon: '💳'
                      },
                      {
                        name: 'Fasal Bima Yojana',
                        description: 'Crop insurance scheme for natural calamities',
                        eligibility: 'All farmers growing notified crops',
                        benefit: 'Crop loss coverage',
                        status: 'Active',
                        link: 'https://pmfby.gov.in',
                        icon: '🛡️'
                      }
                    ].map((scheme, idx) => (
                      <div key={idx} className="glass-tier-1 rounded-[32px] p-6 sm:p-8 interactive-glass border border-white/5 hover:border-white/20 transition-all hover:shadow-2xl">
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                          <div className="text-6xl drop-shadow-xl select-none">{scheme.icon}</div>
                          <div className="flex-1 w-full">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                              <h3 className="font-bold text-2xl text-text-primary tracking-tight">{scheme.name}</h3>
                              <span className="glass-tier-3 border border-white/20 text-text-primary px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-md w-fit">
                                {scheme.status}
                              </span>
                            </div>
                            <p className="text-text-secondary text-[15px] mb-6 leading-relaxed">{scheme.description}</p>

                            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                              <div className="glass-tier-2 p-4 rounded-2xl border border-white/5">
                                <p className="text-[11px] text-text-tertiary font-bold uppercase tracking-widest mb-1.5">Authorization</p>
                                <p className="text-sm font-semibold text-text-primary">{scheme.eligibility}</p>
                              </div>
                              <div className="bg-white/10 p-4 rounded-2xl border border-white/20 shadow-inner">
                                <p className="text-[11px] text-text-primary/70 font-bold uppercase tracking-widest mb-1.5">Yield</p>
                                <p className="text-lg font-bold text-text-primary">{scheme.benefit}</p>
                              </div>
                            </div>

                            <a
                              href={scheme.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 glass-tier-3 interactive-glass text-text-primary hover:text-white px-6 py-3 rounded-2xl font-semibold text-sm transition-all border border-white/10 hover:border-white/30 apple-focus"
                            >
                              Initialize Application
                              <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="space-y-8 animate-glass-reveal">
                <div className="glass-tier-2 rounded-[40px] shadow-2xl border border-white/10 p-8 glass-specular">
                  <div className="mb-10">
                    <h2 className="font-bold text-3xl text-text-primary text-vibrancy">Global Feed</h2>
                    <p className="text-text-secondary text-sm mt-2">Aggregated news from verified agricultural networks.</p>
                  </div>

                  <div className="space-y-5">
                    {[
                      {
                        title: 'New PM-KISAN Payment Released',
                        summary: 'Government releases ₹2000 installment for eligible farmers across the nation.',
                        category: 'Government Schemes',
                        date: '2 hours ago',
                        source: 'PIB India'
                      },
                      {
                        title: 'Record Tomato Prices in Major Markets',
                        summary: 'Tomato prices surge to ₹80-100 per kg in central cities due to supply chain disruption.',
                        category: 'Market Alert',
                        date: '4 hours ago',
                        source: 'Market Watch'
                      }
                    ].map((news, idx) => (
                      <div key={idx} className="glass-tier-1 border border-white/5 rounded-[28px] p-6 interactive-glass hover:border-white/20 transition-all flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-4">
                          <span className="glass-tier-3 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-text-primary border border-white/10">
                            {news.category}
                          </span>
                          <span className="text-xs text-text-tertiary font-semibold uppercase tracking-wider">{news.date}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-text-primary mb-2 tracking-tight">{news.title}</h3>
                          <p className="text-text-secondary text-sm leading-relaxed">{news.summary}</p>
                        </div>
                        <div className="h-px bg-white/5 w-full my-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-text-tertiary">Relay: {news.source}</span>
                          <button className="text-text-primary hover:text-white font-semibold text-sm inline-flex items-center gap-2 apple-focus p-2 -mr-2 rounded-lg hover:bg-white/5 transition-colors">
                            Establish Connection
                            <ExternalLink className="w-3 h-3 opacity-60" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'advice' && (
              <div className="glass-tier-2 rounded-[40px] shadow-2xl border border-white/10 flex flex-col h-[calc(100vh-200px)] lg:h-[800px] overflow-hidden glass-specular animate-glass-reveal">
                <div className="p-8 border-b border-white/10 shrink-0">
                  <h2 className="font-bold text-3xl text-text-primary text-vibrancy">Memory Core</h2>
                  <p className="text-text-secondary text-sm mt-2">Archived consultations with KrishiMitra AI.</p>
                </div>
                <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                  {data?.aiAdviceHistory && data.aiAdviceHistory.length > 0 ? (
                    <div className="space-y-4">
                      {data.aiAdviceHistory.map((advice) => (
                        <div key={advice.id} className="glass-tier-1 border border-white/5 rounded-3xl p-6 interactive-glass hover:border-white/20 transition-all">
                          <p className="font-bold mb-3 text-lg text-text-primary">&ldquo;{advice.query}&rdquo;</p>
                          <p className="text-sm text-text-secondary leading-relaxed mb-4">{advice.summary}</p>
                          <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-text-tertiary">
                            <MessageSquare className="w-3 h-3 opacity-50" />
                            {advice.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full flex-col text-center">
                      <MessageSquare className="w-16 h-16 text-white/10 mb-6" />
                      <p className="text-text-primary text-xl font-bold mb-2">No Archives Found</p>
                      <p className="text-text-secondary text-sm max-w-sm mx-auto">Engage the AI through the chat interface to begin logging records.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="glass-tier-2 rounded-[40px] shadow-2xl border border-white/10 p-8 glass-specular animate-glass-reveal">
                <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-bold text-3xl text-text-primary text-vibrancy">Intelligence Recommendations</h2>
                    <p className="text-text-secondary text-sm mt-2">Tools and provisions suggested based on your telemetry.</p>
                  </div>
                  <button onClick={() => router.push('/marketplace')} className="glass-tier-3 text-text-primary px-6 py-3 rounded-2xl interactive-glass glass-specular font-semibold tracking-wide border border-white/20 shadow-lg hover:scale-105 active:scale-95 transition-all outline-none">
                    Browse Full Store
                  </button>
                </div>
                <div>
                  {data?.recommendedProducts && data.recommendedProducts.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-5">
                      {data.recommendedProducts.map((product) => (
                        <div key={product.id} className="glass-tier-1 border border-white/5 rounded-[32px] p-6 flex flex-col interactive-glass hover:border-white/20 transition-all justify-between min-h-[220px]">
                          <div>
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <h3 className="font-bold text-xl text-text-primary">{product.name}</h3>
                              <span className="glass-tier-3 px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase font-bold tracking-widest text-text-primary shrink-0">
                                Match
                              </span>
                            </div>
                            <p className="text-sm text-text-secondary line-clamp-2">{product.reason}</p>
                          </div>
                          <div className="flex items-center justify-between mt-6">
                            <p className="text-2xl font-bold text-text-primary">₹{product.price}</p>
                            <button
                              onClick={() => router.push(`/marketplace/${product.id}`)}
                              className="bg-white text-black px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg apple-focus"
                            >
                              Detail
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 glass-tier-1 rounded-3xl border border-white/5">
                      <ShoppingBag className="w-16 h-16 text-white/10 mx-auto mb-6" />
                      <p className="text-text-primary text-xl font-bold mb-2">Insufficient Data</p>
                      <p className="text-text-secondary text-sm max-w-xs mx-auto">Register more crops or engage the AI for personalized provisions.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
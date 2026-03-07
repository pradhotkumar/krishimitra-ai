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
  FileText
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
  const [chatHistory, setChatHistory] = useState<Array<{role: string, message: string}>>([]);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  useEffect(() => {
    // Check authentication and get user name
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

    // Add user message
    setChatHistory(prev => [...prev, { role: 'user', message: chatMessage }]);
    
    // Simulate AI response (replace with actual API call)
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                {t[language].dashboard}
              </h1>
              <p className="text-gray-600 mt-1">
                {t[language].welcome}, <span className="font-semibold text-green-700">{userName}</span>! 🌾
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg hover:border-blue-400 transition-all hover:shadow-md"
                title={language === 'en' ? 'Switch to Hindi' : 'अंग्रेजी में बदलें'}
              >
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="font-semibold text-blue-700">
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
                className="px-6 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
              >
                {t[language].logout}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="bg-white rounded-xl shadow-lg p-4 space-y-2 border border-green-100">
              {[
                { id: 'overview', label: t[language].overview, icon: BarChart3 },
                { id: 'crops', label: t[language].myCrops, icon: Sprout },
                { id: 'weather', label: t[language].weatherAlerts, icon: Cloud },
                { id: 'schemes', label: t[language].govtSchemes, icon: TrendingUp },
                { id: 'news', label: t[language].agriNews, icon: MessageSquare },
                { id: 'advice', label: t[language].aiAdviceHistory, icon: MessageSquare },
                { id: 'products', label: t[language].recommendedProducts, icon: ShoppingBag }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md transform scale-105'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Sprout className="w-10 h-10" />
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <p className="text-green-100 text-sm">{t[language].activeCrops}</p>
                    <p className="text-4xl font-bold mt-1">
                      {data?.crops?.length || 3}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <AlertTriangle className="w-10 h-10" />
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {t[language].newAlerts}
                      </span>
                    </div>
                    <p className="text-orange-100 text-sm">{t[language].weatherAlerts}</p>
                    <p className="text-4xl font-bold mt-1">
                      {data?.weatherAlerts?.length || 3}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <MessageSquare className="w-10 h-10" />
                    </div>
                    <p className="text-blue-100 text-sm">{t[language].aiConsultations}</p>
                    <p className="text-4xl font-bold mt-1">
                      {data?.aiAdviceHistory?.length || 3}
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
                  <h2 className="font-semibold text-xl mb-4 text-gray-800">{t[language].quickActions}</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                      onClick={() => router.push('/chat')}
                      className="flex flex-col items-center gap-3 p-5 border-2 border-green-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all hover:shadow-md"
                    >
                      <div className="bg-green-100 p-3 rounded-lg">
                        <MessageSquare className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-800 text-sm">{t[language].askAIExpert}</p>
                        <p className="text-xs text-gray-600">{t[language].getFarmingAdvice}</p>
                      </div>
                    </button>

                    <button
                      onClick={() => router.push('/plant-health')}
                      className="flex flex-col items-center gap-3 p-5 border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all hover:shadow-md"
                    >
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-800 text-sm">{t[language].plantCare}</p>
                        <p className="text-xs text-gray-600">{t[language].scanLeafDiseases}</p>
                      </div>
                    </button>

                    <button
                      onClick={() => router.push('/marketplace')}
                      className="flex flex-col items-center gap-3 p-5 border-2 border-orange-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all hover:shadow-md"
                    >
                      <div className="bg-orange-100 p-3 rounded-lg">
                        <ShoppingBag className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-800 text-sm">{t[language].marketplace}</p>
                        <p className="text-xs text-gray-600">{t[language].buySupplies}</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab('schemes')}
                      className="flex flex-col items-center gap-3 p-5 border-2 border-purple-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all hover:shadow-md"
                    >
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-800 text-sm">{t[language].govtSchemes}</p>
                        <p className="text-xs text-gray-600">{t[language].viewBenefits}</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Latest News */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-xl text-gray-800">{t[language].latestNews}</h2>
                    <button
                      onClick={() => setActiveTab('news')}
                      className="text-green-600 text-sm font-medium hover:underline"
                    >
                      {t[language].viewAll}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        title: 'New PM-KISAN Payment Released',
                        summary: 'Government releases â‚¹2000 installment for eligible farmers',
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
                        summary: 'Minimum Support Price raised by â‚¹150 per quintal',
                        time: '1 day ago',
                        category: 'Market'
                      }
                    ].map((news, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                          <Newspaper className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-800 mb-1">{news.title}</p>
                          <p className="text-xs text-gray-600 mb-1">{news.summary}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{news.category}</span>
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
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold text-xl text-gray-800">{t[language].myCrops}</h2>
                    <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm font-medium">
                      {t[language].addCrop}
                    </button>
                  </div>
                  {data?.crops && data.crops.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {data.crops.map((crop) => (
                        <div key={crop.id} className="border-2 border-green-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                          {/* Crop Image Header */}
                          <div className="h-32 bg-gradient-to-br from-green-400 to-green-600 relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-6xl">🌾</span>
                            </div>
                            <div className="absolute top-3 right-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                                crop.status === 'Healthy' ? 'bg-green-500/90 text-white' :
                                crop.status === 'Needs Attention' ? 'bg-yellow-500/90 text-white' :
                                'bg-gray-500/90 text-white'
                              }`}>
                                {crop.status}
                              </span>
                            </div>
                          </div>
                          
                          {/* Crop Details */}
                          <div className="p-5">
                            <h3 className="font-bold text-xl text-gray-800 mb-4">{crop.name}</h3>
                            
                            <div className="space-y-3 mb-4">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Area</span>
                                <span className="font-semibold text-gray-800">{crop.area}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Planted</span>
                                <span className="font-semibold text-gray-800">{crop.plantedDate}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Expected Harvest</span>
                                <span className="font-semibold text-gray-800">{crop.expectedHarvest}</span>
                              </div>
                            </div>

                            {/* Growth Progress */}
                            <div className="mb-4">
                              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                <span>Growth Progress</span>
                                <span>75%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '75%' }} />
                              </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-3 gap-2">
                              <button className="bg-blue-50 text-blue-600 py-2 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
                                ðŸ’§ Water
                              </button>
                              <button className="bg-green-50 text-green-600 py-2 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors">
                                ðŸŒ± Fertilize
                              </button>
                              <button className="bg-orange-50 text-orange-600 py-2 rounded-lg text-xs font-medium hover:bg-orange-100 transition-colors">
                                ðŸ” Check
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🌾</div>
                      <p className="text-gray-500 text-lg font-medium mb-2">{t[language].noCropsYet}</p>
                      <p className="text-gray-400 text-sm">{t[language].startTracking}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'weather' && (
              <div className="space-y-6">
                {/* Current Weather Widget */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-blue-100 text-sm mb-1">Current Weather</p>
                      <h3 className="text-3xl font-bold">Bangalore</h3>
                    </div>
                    <div className="text-6xl">â˜€ï¸</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                      <p className="text-blue-100 text-xs mb-1">Temperature</p>
                      <p className="text-2xl font-bold">28Â°C</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                      <p className="text-blue-100 text-xs mb-1">Humidity</p>
                      <p className="text-2xl font-bold">65%</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                      <p className="text-blue-100 text-xs mb-1">Wind</p>
                      <p className="text-2xl font-bold">12 km/h</p>
                    </div>
                  </div>
                </div>

                {/* Weather Alerts */}
                <div className="bg-white rounded-xl shadow-lg border border-green-100">
                  <div className="p-6 border-b">
                    <h2 className="font-semibold text-xl text-gray-800">Weather Alerts</h2>
                  </div>
                  <div className="p-6">
                    {data?.weatherAlerts && data.weatherAlerts.length > 0 ? (
                      <div className="space-y-4">
                        {data.weatherAlerts.map((alert) => (
                          <div key={alert.id} className={`border-l-4 rounded-xl p-5 transition-all hover:shadow-md ${
                            alert.severity === 'high' ? 'border-red-500 bg-red-50' :
                            alert.severity === 'medium' ? 'border-orange-500 bg-orange-50' :
                            'border-blue-500 bg-blue-50'
                          }`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                alert.severity === 'high' ? 'bg-red-100' :
                                alert.severity === 'medium' ? 'bg-orange-100' :
                                'bg-blue-100'
                              }`}>
                                <AlertTriangle className={`w-5 h-5 ${
                                  alert.severity === 'high' ? 'text-red-600' :
                                  alert.severity === 'medium' ? 'text-orange-600' :
                                  'text-blue-600'
                                }`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="font-semibold text-gray-800">{alert.type}</p>
                                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                    alert.severity === 'high' ? 'bg-red-200 text-red-700' :
                                    alert.severity === 'medium' ? 'bg-orange-200 text-orange-700' :
                                    'bg-blue-200 text-blue-700'
                                  }`}>
                                    {alert.severity.toUpperCase()}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                                <p className="text-xs text-gray-500">{alert.date}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">â˜€ï¸</div>
                        <p className="text-gray-500 text-lg font-medium mb-2">No weather alerts</p>
                        <p className="text-gray-400 text-sm">All clear! Check back later for updates</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schemes' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6">
                  <h2 className="font-semibold text-xl text-gray-800 mb-6">Government Schemes for Farmers</h2>
                  
                  <div className="space-y-4">
                    {[
                      {
                        name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
                        description: 'Direct income support of â‚¹6000 per year in three installments',
                        eligibility: 'All landholding farmers',
                        benefit: 'â‚¹6,000/year',
                        status: 'Active',
                        link: 'https://pmkisan.gov.in',
                        icon: 'ðŸ’°'
                      },
                      {
                        name: 'Kisan Credit Card (KCC)',
                        description: 'Credit facility for farmers to meet agricultural expenses',
                        eligibility: 'Farmers with land ownership',
                        benefit: 'Up to â‚¹3 lakh credit',
                        status: 'Active',
                        link: 'https://www.india.gov.in/spotlight/kisan-credit-card-kcc',
                        icon: 'ðŸ’³'
                      },
                      {
                        name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
                        description: 'Crop insurance scheme for natural calamities',
                        eligibility: 'All farmers growing notified crops',
                        benefit: 'Crop loss coverage',
                        status: 'Active',
                        link: 'https://pmfby.gov.in',
                        icon: 'ðŸ›¡ï¸'
                      },
                      {
                        name: 'Soil Health Card Scheme',
                        description: 'Free soil testing and nutrient recommendations',
                        eligibility: 'All farmers',
                        benefit: 'Free soil analysis',
                        status: 'Active',
                        link: 'https://soilhealth.dac.gov.in',
                        icon: 'ðŸŒ±'
                      },
                      {
                        name: 'PM Kusum Yojana',
                        description: 'Solar pump and grid-connected solar power plants',
                        eligibility: 'Farmers with agricultural land',
                        benefit: '90% subsidy',
                        status: 'Active',
                        link: 'https://pmkusum.mnre.gov.in',
                        icon: 'â˜€ï¸'
                      },
                      {
                        name: 'National Agriculture Market (e-NAM)',
                        description: 'Online trading platform for agricultural commodities',
                        eligibility: 'All farmers',
                        benefit: 'Better price discovery',
                        status: 'Active',
                        link: 'https://www.enam.gov.in',
                        icon: 'ðŸ“Š'
                      }
                    ].map((scheme, idx) => (
                      <div key={idx} className="border-2 border-green-100 rounded-2xl p-5 hover:shadow-lg transition-all hover:border-green-300">
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{scheme.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-bold text-lg text-gray-800">{scheme.name}</h3>
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                {scheme.status}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{scheme.description}</p>
                            <div className="grid md:grid-cols-2 gap-3 mb-3">
                              <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-xs text-blue-600 font-medium mb-1">Eligibility</p>
                                <p className="text-sm text-gray-800">{scheme.eligibility}</p>
                              </div>
                              <div className="bg-green-50 p-3 rounded-lg">
                                <p className="text-xs text-green-600 font-medium mb-1">Benefit</p>
                                <p className="text-sm text-gray-800 font-semibold">{scheme.benefit}</p>
                              </div>
                            </div>
                            <a
                              href={scheme.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm"
                            >
                              Learn More & Apply
                              <ExternalLink className="w-4 h-4" />
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
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6">
                  <h2 className="font-semibold text-xl text-gray-800 mb-6">Agriculture News & Updates</h2>
                  
                  <div className="space-y-4">
                    {[
                      {
                        title: 'New PM-KISAN Payment Released',
                        summary: 'Government releases ₹2000 installment for eligible farmers',
                        category: 'Government Schemes',
                        date: '2 hours ago',
                        source: 'PIB India'
                      },
                      {
                        title: 'IMD Predicts Normal Monsoon for 2026',
                        summary: 'India Meteorological Department forecasts normal rainfall during the upcoming monsoon season, bringing relief to farmers across the country.',
                        category: 'Weather',
                        date: '5 hours ago',
                        source: 'IMD'
                      },
                      {
                        title: 'Wheat MSP Increased by ₹150 per Quintal',
                        summary: 'Government raises Minimum Support Price for wheat to ₹2275 per quintal for the 2026-27 season, benefiting millions of wheat farmers.',
                        category: 'Market Prices',
                        date: '1 day ago',
                        source: 'Ministry of Agriculture'
                      },
                      {
                        title: 'New Organic Farming Subsidy Announced',
                        summary: 'State government launches 50% subsidy scheme for farmers transitioning to organic farming methods. Applications open from next month.',
                        category: 'Subsidies',
                        date: '2 days ago',
                        source: 'State Agriculture Dept'
                      },
                      {
                        title: 'Drone Technology for Pesticide Spraying',
                        summary: 'Agricultural drones now available on rent at subsidized rates. Technology helps reduce pesticide usage by 30% while improving coverage.',
                        category: 'Technology',
                        date: '3 days ago',
                        source: 'AgriTech News'
                      },
                      {
                        title: 'Record Tomato Prices in Major Markets',
                        summary: 'Tomato prices surge to ₹80-100 per kg in major cities due to supply shortage. Farmers advised to increase cultivation.',
                        category: 'Market Alert',
                        date: '4 days ago',
                        source: 'Market Watch'
                      }
                    ].map((news, idx) => (
                      <div key={idx} className="border-2 border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all hover:border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                            {news.category}
                          </span>
                          <span className="text-xs text-gray-500">{news.date}</span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">{news.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{news.summary}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Source: {news.source}</span>
                          <button className="text-green-600 hover:text-green-700 font-medium text-sm inline-flex items-center gap-1">
                            Read More
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'advice' && (
              <div className="bg-white rounded-xl shadow-lg border border-green-100">
                <div className="p-6 border-b">
                  <h2 className="font-semibold text-xl text-gray-800">AI Advice History</h2>
                </div>
                <div className="p-6">
                  {data?.aiAdviceHistory && data.aiAdviceHistory.length > 0 ? (
                    <div className="space-y-4">
                      {data.aiAdviceHistory.map((advice) => (
                        <div key={advice.id} className="border-2 border-green-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                          <p className="font-semibold mb-2 text-gray-800">{advice.query}</p>
                          <p className="text-sm text-gray-600 mb-2">{advice.summary}</p>
                          <p className="text-xs text-gray-500">{advice.date}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-12">No advice history yet</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="bg-white rounded-xl shadow-lg border border-green-100">
                <div className="p-6 border-b">
                  <h2 className="font-semibold text-xl text-gray-800">AI Recommended Products</h2>
                </div>
                <div className="p-6">
                  {data?.recommendedProducts && data.recommendedProducts.length > 0 ? (
                    <div className="space-y-4">
                      {data.recommendedProducts.map((product) => (
                        <div key={product.id} className="border-2 border-green-100 rounded-xl p-5 flex items-center justify-between hover:shadow-md transition-shadow">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1 text-gray-800">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{product.reason}</p>
                            <p className="text-xl font-bold text-green-600">₹{product.price}</p>
                          </div>
                          <button
                            onClick={() => router.push(`/marketplace/${product.id}`)}
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all font-medium"
                          >
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-12">No recommendations yet</p>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Floating AI Chatbot Widget */}
      {showChatbot ? (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border-2 border-green-200 flex flex-col z-50">
          {/* Chatbot Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                🌾
              </div>
              <div>
                <p className="font-semibold">KrishiMitra AI</p>
                <p className="text-xs text-green-100">Your farming assistant</p>
              </div>
            </div>
            <button
              onClick={() => setShowChatbot(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {chatHistory.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p className="text-sm">ðŸ‘‹ Hi {userName}!</p>
                <p className="text-sm mt-2">Ask me anything about farming!</p>
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => setChatMessage('What is the weather forecast?')}
                    className="w-full text-left px-3 py-2 bg-white rounded-lg text-xs hover:bg-green-50 transition-colors"
                  >
                    ðŸŒ¤ï¸ What is the weather forecast?
                  </button>
                  <button
                    onClick={() => setChatMessage('Tell me about PM-KISAN scheme')}
                    className="w-full text-left px-3 py-2 bg-white rounded-lg text-xs hover:bg-green-50 transition-colors"
                  >
                    ðŸ’° Tell me about PM-KISAN scheme
                  </button>
                  <button
                    onClick={() => setChatMessage('Best fertilizer for wheat?')}
                    className="w-full text-left px-3 py-2 bg-white rounded-lg text-xs hover:bg-green-50 transition-colors"
                  >
                    ðŸŒ¾ Best fertilizer for wheat?
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-green-500 text-white'
                          : 'bg-white border border-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSubmit} className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-sm"
              />
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowChatbot(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 group z-50"
          title="AI Chat"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Quick AI Chat
          </span>
        </button>
      )}
    </div>
  );
}
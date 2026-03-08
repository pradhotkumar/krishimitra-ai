'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MessageSquare, Leaf, Camera, History, TrendingUp } from 'lucide-react';
import LeafScanner from '@/components/LeafScanner';

interface HealthRecord {
  id: string;
  date: Date;
  disease: string;
  severity: string;
  imageUrl: string;
  status: 'treated' | 'monitoring' | 'new';
}

export default function PlantHealthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'scan' | 'history' | 'insights'>('scan');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);

      // Get language preference from localStorage
      const storedLanguage = localStorage.getItem('language');
      if (storedLanguage) {
        setLanguage(storedLanguage);
      } else {
        // Fallback to user data if available
        const user = localStorage.getItem('user');
        if (user) {
          const userData = JSON.parse(user);
          setLanguage(userData.language || 'en');
        }
      }

      // Load health records from localStorage
      const savedRecords = localStorage.getItem('plantHealthRecords');
      if (savedRecords) {
        setHealthRecords(JSON.parse(savedRecords));
      }
    } else {
      router.push('/auth?redirect=/plant-health');
    }
  }, [router]);

  const content = {
    hi: {
      title: 'पौधे स्वास्थ्य परीक्षण',
      subtitle: 'AI-संचालित रोग निदान और उपचार',
      scanTab: 'स्कैन करें',
      historyTab: 'इतिहास',
      insightsTab: 'जानकारी',
      backToChat: 'चैट पर वापस जाएं',
      noRecords: 'अभी तक कोई स्कैन नहीं',
      scanFirst: 'अपनी पहली पत्ती स्कैन करें',
      healthTrends: 'स्वास्थ्य रुझान',
      commonIssues: 'सामान्य समस्याएं',
      recommendations: 'सिफारिशें'
    },
    en: {
      title: 'Plant Health Testing',
      subtitle: 'AI-Powered Disease Diagnosis & Treatment',
      scanTab: 'Scan',
      historyTab: 'History',
      insightsTab: 'Insights',
      backToChat: 'Back to Chat',
      noRecords: 'No scans yet',
      scanFirst: 'Scan your first leaf',
      healthTrends: 'Health Trends',
      commonIssues: 'Common Issues',
      recommendations: 'Recommendations'
    }
  };

  const t = content[language as keyof typeof content] || content.en;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative z-10">
      {/* Header */}
      <header className="glass-tier-2 border-b border-white/5 sticky top-0 z-20 shadow-sm glass-specular">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard/farmer')}
                className="p-2 interactive-glass hover:bg-white/10 rounded-xl transition-colors apple-focus"
              >
                <ArrowLeft className="w-5 h-5 text-text-secondary hover:text-text-primary" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                  <div className="bg-green-500/20 p-2 rounded-xl backdrop-blur-md">
                    <Leaf className="w-6 h-6 text-green-400" />
                  </div>
                  {t.title}
                </h1>
                <p className="text-sm text-text-secondary mt-1">{t.subtitle}</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/chat')}
              className="flex items-center gap-2 px-5 py-2.5 glass-tier-3 text-text-primary rounded-xl interactive-glass glass-specular transition-all active:scale-95 apple-focus"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">{t.backToChat}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="glass-tier-1 border-b border-white/5 glass-specular">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex gap-2 p-1 glass-tier-2 rounded-2xl w-fit">
            {[
              { id: 'scan', label: t.scanTab, icon: Camera },
              { id: 'history', label: t.historyTab, icon: History },
              { id: 'insights', label: t.insightsTab, icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all apple-focus ${activeTab === tab.id
                    ? 'glass-tier-3 text-text-primary glass-specular shadow-md transform scale-[1.02]'
                    : 'text-text-secondary hover:text-text-primary interactive-glass hover:bg-white/5'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'scan' && (
          <div className="max-w-2xl mx-auto">
            <div className="glass-tier-1 rounded-[32px] p-6 glass-specular shadow-xl animate-glass-reveal border border-white/10">
              <LeafScanner />
            </div>

            {/* Quick Tips */}
            <div className="mt-6 glass-tier-2 rounded-[28px] p-6 border border-white/10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2 text-vibrancy">
                <span className="bg-blue-500/20 p-2 rounded-lg"><TrendingUp className="w-4 h-4 text-blue-300" /></span>
                {language === 'hi' ? 'बेहतर परिणामों के लिए टिप्स' : 'Tips for Better Results'}
              </h3>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li className="flex items-start gap-3 p-3 glass-tier-1 rounded-xl">
                  <span className="text-green-400 font-bold bg-green-500/10 p-1 rounded-md">✓</span>
                  {language === 'hi'
                    ? 'अच्छी रोशनी में फोटो लें (प्राकृतिक प्रकाश सबसे अच्छा है)'
                    : 'Take photos in good lighting (natural light is best)'}
                </li>
                <li className="flex items-start gap-3 p-3 glass-tier-1 rounded-xl">
                  <span className="text-green-400 font-bold bg-green-500/10 p-1 rounded-md">✓</span>
                  {language === 'hi'
                    ? 'पत्ती को करीब से और स्पष्ट रूप से कैप्चर करें'
                    : 'Capture the leaf closely and clearly'}
                </li>
                <li className="flex items-start gap-3 p-3 glass-tier-1 rounded-xl">
                  <span className="text-green-400 font-bold bg-green-500/10 p-1 rounded-md">✓</span>
                  {language === 'hi'
                    ? 'प्रभावित क्षेत्र को फ्रेम के केंद्र में रखें'
                    : 'Keep the affected area in the center of the frame'}
                </li>
                <li className="flex items-start gap-3 p-3 glass-tier-1 rounded-xl">
                  <span className="text-green-400 font-bold bg-green-500/10 p-1 rounded-md">✓</span>
                  {language === 'hi'
                    ? 'धुंधली या अंधेरी तस्वीरों से बचें'
                    : 'Avoid blurry or dark photos'}
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="animate-glass-reveal">
            {healthRecords.length === 0 ? (
              <div className="text-center py-20 px-4 glass-tier-1 rounded-[32px] glass-specular border border-white/5">
                <div className="bg-green-500/10 w-24 h-24 mx-auto rounded-[32px] flex items-center justify-center mb-6">
                  <div className="text-5xl animate-bounce">🌿</div>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-3 text-vibrancy">{t.noRecords}</h3>
                <p className="text-text-secondary mb-8">{t.scanFirst}</p>
                <button
                  onClick={() => setActiveTab('scan')}
                  className="px-8 py-4 glass-tier-3 rounded-2xl text-text-primary interactive-glass glass-specular transition-all active:scale-95 font-semibold apple-focus shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  {t.scanTab}
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {healthRecords.map((record, index) => (
                  <div key={record.id} className="glass-tier-1 rounded-3xl overflow-hidden glass-specular border border-white/10 interactive-glass group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="relative">
                      <img
                        src={record.imageUrl}
                        alt="Plant scan"
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] to-transparent opacity-60"></div>
                    </div>
                    <div className="p-5 relative">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md ${record.severity === 'High' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                            record.severity === 'Moderate' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                              'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          }`}>
                          {record.severity}
                        </span>
                        <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md ${record.status === 'treated' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                            record.status === 'monitoring' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                              'bg-white/10 text-text-secondary border border-white/20'
                          }`}>
                          {record.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-lg text-text-primary mb-2 text-vibrancy">{record.disease}</h4>
                      <p className="text-xs text-text-tertiary font-medium">
                        {new Date(record.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6 animate-glass-reveal">
            {/* Health Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-tier-1 rounded-[28px] p-6 glass-specular border border-white/10 hover:glass-tier-2 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-text-primary h-[24px] flex items-center">{language === 'hi' ? 'कुल स्कैन' : 'Total Scans'}</h3>
                  <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-500/30">
                    <Camera className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-text-primary text-vibrancy">{healthRecords.length}</p>
                <p className="text-sm text-text-secondary mt-2">
                  {language === 'hi' ? 'इस महीने' : 'This month'}
                </p>
              </div>

              <div className="glass-tier-1 rounded-[28px] p-6 glass-specular border border-white/10 hover:glass-tier-2 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-text-primary h-[24px] flex items-center">{language === 'hi' ? 'स्वस्थ पौधे' : 'Healthy Plants'}</h3>
                  <div className="bg-green-500/20 p-3 rounded-xl border border-green-500/30">
                    <Leaf className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">85%</p>
                <p className="text-sm text-text-secondary mt-2">
                  {language === 'hi' ? '+5% पिछले सप्ताह से' : '+5% from last week'}
                </p>
              </div>

              <div className="glass-tier-1 rounded-[28px] p-6 glass-specular border border-white/10 hover:glass-tier-2 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-text-primary h-[24px] flex items-center">{language === 'hi' ? 'उपचार दर' : 'Treatment Rate'}</h3>
                  <div className="bg-purple-500/20 p-3 rounded-xl border border-purple-500/30">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]">92%</p>
                <p className="text-sm text-text-secondary mt-2">
                  {language === 'hi' ? 'सफलता दर' : 'Success rate'}
                </p>
              </div>
            </div>

            {/* Common Issues */}
            <div className="glass-tier-2 rounded-[32px] p-8 glass-specular border border-white/10">
              <h3 className="text-xl font-bold text-text-primary mb-6 text-vibrancy">{t.commonIssues}</h3>
              <div className="space-y-4">
                {[
                  { name: language === 'hi' ? 'पत्ती झुलसा' : 'Leaf Blight', count: 12, trend: 'down' },
                  { name: language === 'hi' ? 'पाउडरी मिल्ड्यू' : 'Powdery Mildew', count: 8, trend: 'up' },
                  { name: language === 'hi' ? 'जड़ सड़न' : 'Root Rot', count: 5, trend: 'stable' }
                ].map((issue, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 glass-tier-1 rounded-2xl border border-white/5 interactive-glass">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🦠</span>
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary text-vibrancy">{issue.name}</p>
                        <p className="text-sm text-text-secondary">{issue.count} {language === 'hi' ? 'मामले' : 'cases'}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider backdrop-blur-md ${issue.trend === 'down' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                        issue.trend === 'up' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                          'bg-white/10 text-white/80 border border-white/20'
                      }`}>
                      {issue.trend === 'down' ? '↓ DECREASING' : issue.trend === 'up' ? '↑ INCREASING' : '→ STABLE'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="glass-tier-1 rounded-[32px] p-8 glass-specular border-2 border-green-500/20 shadow-[0_0_30px_rgba(74,222,128,0.05)]">
              <h3 className="text-xl font-bold text-text-primary mb-6 text-vibrancy">{t.recommendations}</h3>
              <div className="space-y-4">
                {(language === 'hi' ? [
                  'नियमित रूप से पौधों का निरीक्षण करें (सप्ताह में 2-3 बार)',
                  'उचित जल निकासी सुनिश्चित करें',
                  'रोग प्रतिरोधी किस्मों का उपयोग करें',
                  'जैविक कीटनाशकों को प्राथमिकता दें'
                ] : [
                  'Inspect plants regularly (2-3 times per week)',
                  'Ensure proper drainage',
                  'Use disease-resistant varieties',
                  'Prefer organic pesticides'
                ]).map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 glass-tier-3 rounded-2xl border border-white/5">
                    <span className="bg-green-500/20 text-green-300 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 border border-green-500/30">
                      {idx + 1}
                    </span>
                    <p className="text-text-primary pt-1">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

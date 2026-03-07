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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard/farmer')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Leaf className="w-7 h-7 text-green-600" />
                  {t.title}
                </h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            
            <button
              onClick={() => router.push('/dashboard/farmer')}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">{t.backToChat}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'scan', label: t.scanTab, icon: Camera },
              { id: 'history', label: t.historyTab, icon: History },
              { id: 'insights', label: t.insightsTab, icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900'
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
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <LeafScanner />
            </div>

            {/* Quick Tips */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                💡 {language === 'hi' ? 'बेहतर परिणामों के लिए टिप्स' : 'Tips for Better Results'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  {language === 'hi' 
                    ? 'अच्छी रोशनी में फोटो लें (प्राकृतिक प्रकाश सबसे अच्छा है)'
                    : 'Take photos in good lighting (natural light is best)'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  {language === 'hi'
                    ? 'पत्ती को करीब से और स्पष्ट रूप से कैप्चर करें'
                    : 'Capture the leaf closely and clearly'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  {language === 'hi'
                    ? 'प्रभावित क्षेत्र को फ्रेम के केंद्र में रखें'
                    : 'Keep the affected area in the center of the frame'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  {language === 'hi'
                    ? 'धुंधली या अंधेरी तस्वीरों से बचें'
                    : 'Avoid blurry or dark photos'}
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            {healthRecords.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-7xl mb-6">🌿</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.noRecords}</h3>
                <p className="text-gray-600 mb-6">{t.scanFirst}</p>
                <button
                  onClick={() => setActiveTab('scan')}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  {t.scanTab}
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {healthRecords.map((record) => (
                  <div key={record.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                    <img
                      src={record.imageUrl}
                      alt="Plant scan"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          record.severity === 'High' ? 'bg-red-100 text-red-700' :
                          record.severity === 'Moderate' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {record.severity}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          record.status === 'treated' ? 'bg-green-100 text-green-700' :
                          record.status === 'monitoring' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {record.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{record.disease}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(record.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            {/* Health Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">{language === 'hi' ? 'कुल स्कैन' : 'Total Scans'}</h3>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Camera className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{healthRecords.length}</p>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'hi' ? 'इस महीने' : 'This month'}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">{language === 'hi' ? 'स्वस्थ पौधे' : 'Healthy Plants'}</h3>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-green-600">85%</p>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'hi' ? '+5% पिछले सप्ताह से' : '+5% from last week'}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">{language === 'hi' ? 'उपचार दर' : 'Treatment Rate'}</h3>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-purple-600">92%</p>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'hi' ? 'सफलता दर' : 'Success rate'}
                </p>
              </div>
            </div>

            {/* Common Issues */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.commonIssues}</h3>
              <div className="space-y-4">
                {[
                  { name: language === 'hi' ? 'पत्ती झुलसा' : 'Leaf Blight', count: 12, trend: 'down' },
                  { name: language === 'hi' ? 'पाउडरी मिल्ड्यू' : 'Powdery Mildew', count: 8, trend: 'up' },
                  { name: language === 'hi' ? 'जड़ सड़न' : 'Root Rot', count: 5, trend: 'stable' }
                ].map((issue, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🦠</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{issue.name}</p>
                        <p className="text-sm text-gray-600">{issue.count} {language === 'hi' ? 'मामले' : 'cases'}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      issue.trend === 'down' ? 'bg-green-100 text-green-700' :
                      issue.trend === 'up' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {issue.trend === 'down' ? '↓' : issue.trend === 'up' ? '↑' : '→'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.recommendations}</h3>
              <div className="space-y-3">
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
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                    <span className="text-green-600 font-bold">{idx + 1}.</span>
                    <p className="text-gray-700">{rec}</p>
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

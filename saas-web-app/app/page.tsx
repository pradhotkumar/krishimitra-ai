'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WeatherDashboard from '@/components/WeatherDashboard';
import MandiDashboard from '@/components/MandiDashboard';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 -z-10" />
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
              🌾 KrishiMitra AI
            </h1>
            <p className="text-2xl md:text-3xl text-text/80 mb-4">
              AI-Powered Agricultural Assistant
            </p>
            <p className="text-lg text-text/60 mb-8 max-w-2xl mx-auto">
              Get instant crop guidance, weather intelligence, government schemes information,
              and market insights powered by advanced AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth"
                className="px-8 py-4 bg-primary text-white rounded-full text-lg font-semibold hover:scale-105 transition-transform shadow-soft"
              >
                Start Chatting →
              </Link>
              <button className="px-8 py-4 bg-white text-primary rounded-full text-lg font-semibold hover:scale-105 transition-transform shadow-soft">
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl mb-2">🤖</div>
                <h3 className="font-semibold text-primary mb-1">24x7 AI Support</h3>
                <p className="text-sm text-text/60">Always available</p>
              </div>
              <div>
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold text-primary mb-1">Real-time Insights</h3>
                <p className="text-sm text-text/60">Instant responses</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="font-semibold text-primary mb-1">Secure AWS Infrastructure</h3>
                <p className="text-sm text-text/60">Enterprise-grade</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📈</div>
                <h3 className="font-semibold text-primary mb-1">Serverless & Scalable</h3>
                <p className="text-sm text-text/60">Handles any load</p>
              </div>
            </div>
          </div>
        </section>

        {/* Real-Time Weather Intelligence */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-primary mb-12">
              Real-Time Weather Intelligence
            </h2>
            <WeatherDashboard />
          </div>
        </section>

        {/* Real-Time Mandi Prices */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-primary mb-12">
              Live Mandi Prices
            </h2>
            <MandiDashboard />
          </div>
        </section>

        {/* Voice Helpline Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-primary mb-6">
                  Voice Helpline Integration
                </h2>
                <p className="text-lg text-text/70 mb-6">
                  Can't use the web? No problem! Call our voice helpline and speak in Hindi
                  to get the same AI-powered assistance over the phone.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Works on basic mobile phones</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>No internet required</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Hindi language support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Available 24/7</span>
                  </li>
                </ul>
                <button className="px-8 py-4 bg-primary text-white rounded-full text-lg font-semibold hover:scale-105 transition-transform shadow-soft">
                  📞 Call Now
                </button>
              </div>
              <div className="glass p-8 rounded-lg shadow-soft">
                <div className="text-6xl text-center mb-4">📱</div>
                <p className="text-center text-text/70">
                  Voice helpline powered by Amazon Connect, Transcribe, Lex, and Polly
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chat Preview Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-primary mb-12">
              Try Our AI Chat Assistant
            </h2>
            <div className="max-w-3xl mx-auto glass p-8 rounded-lg shadow-soft">
              <div className="mb-6">
                <div className="flex gap-2 mb-4">
                  <button className="px-4 py-2 bg-primary text-white rounded-full text-sm">
                    हिंदी
                  </button>
                  <button className="px-4 py-2 bg-white text-primary rounded-full text-sm border border-primary/20">
                    English
                  </button>
                </div>
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  <div className="flex justify-end">
                    <div className="bg-accent/30 px-4 py-2 rounded-lg max-w-xs">
                      <p className="text-sm">गेहूं की खेती के बारे में बताएं</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white px-4 py-2 rounded-lg max-w-xs shadow-soft">
                      <p className="text-sm">
                        गेहूं की खेती के लिए अक्टूबर-नवंबर सबसे अच्छा समय है...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="अपना सवाल पूछें..."
                  className="flex-1 px-4 py-3 rounded-full border border-primary/20 focus:outline-none focus:border-primary"
                  disabled
                />
                <button className="px-6 py-3 bg-primary text-white rounded-full hover:scale-105 transition-transform">
                  भेजें
                </button>
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/auth"
                  className="text-primary hover:underline font-semibold"
                >
                  Sign In to Start Chatting →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* AWS Architecture Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-primary mb-12">
              Built on AWS Cloud
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                <div className="text-3xl mb-2">🧠</div>
                <h3 className="font-semibold text-primary mb-1">Amazon Bedrock</h3>
                <p className="text-xs text-text/60">AI Foundation Models</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold text-primary mb-1">AWS Lambda</h3>
                <p className="text-xs text-text/60">Serverless Compute</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                <div className="text-3xl mb-2">🔌</div>
                <h3 className="font-semibold text-primary mb-1">API Gateway</h3>
                <p className="text-xs text-text/60">RESTful APIs</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                <div className="text-3xl mb-2">💾</div>
                <h3 className="font-semibold text-primary mb-1">DynamoDB</h3>
                <p className="text-xs text-text/60">NoSQL Database</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                <div className="text-3xl mb-2">📦</div>
                <h3 className="font-semibold text-primary mb-1">Amazon S3</h3>
                <p className="text-xs text-text/60">Object Storage</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                <div className="text-3xl mb-2">📞</div>
                <h3 className="font-semibold text-primary mb-1">Amazon Connect</h3>
                <p className="text-xs text-text/60">Cloud Contact Center</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                <div className="text-3xl mb-2">🗣️</div>
                <h3 className="font-semibold text-primary mb-1">Amazon Lex</h3>
                <p className="text-xs text-text/60">Conversational AI</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="font-semibold text-primary mb-1">AWS Amplify</h3>
                <p className="text-xs text-text/60">Web Hosting</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

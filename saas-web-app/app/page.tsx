'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Phone, 
  MessageSquare, 
  Cloud, 
  TrendingUp,
  Shield,
  Zap,
  Users,
  CheckCircle
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WeatherDashboard from '@/components/WeatherDashboard';
import MandiDashboard from '@/components/MandiDashboard';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      router.push('/dashboard/farmer');
    }
  }, [router]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Background Image */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80"
              alt="Indian farmer in field"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/85 to-green-900/90" />
          </div>

          {/* Floating Orb Animation */}
          <motion.div
            className="absolute top-20 right-20 w-64 h-64 bg-green-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-green-300" />
                <span className="text-white text-sm font-medium">AI-Powered Agriculture Platform</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="block">KrishiMitra AI</span>
                <span className="block text-green-300 mt-2">Your Smart Farming Partner</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Get instant crop guidance, weather intelligence, market insights, and government schemes 
                information powered by advanced AI technology
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/auth"
                  className="group px-8 py-4 bg-white text-green-700 rounded-full text-lg font-semibold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Start Chatting
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link
                  href="/voice-helpline"
                  className="px-8 py-4 bg-green-600/20 backdrop-blur-sm text-white rounded-full text-lg font-semibold hover:bg-green-600/30 transition-all border-2 border-white/30 hover:border-white/50 hover:scale-105 inline-flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Voice Helpline
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="mt-12 flex flex-wrap justify-center gap-8 text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>24/7 Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>12 Indian Languages</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Google Gemini AI</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* Features Grid with Images */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Everything You Need for Smart Farming
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive AI-powered tools to help you make better farming decisions
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Feature Card 1 */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80"
                    alt="AI Chat Assistant"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Chat Assistant</h3>
                  <p className="text-gray-600 mb-4">
                    Get instant answers to your farming questions in 12 Indian languages. 
                    Available 24/7 with expert AI guidance.
                  </p>
                  <Link
                    href="/chat"
                    className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center gap-1 group"
                  >
                    Start Chatting
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.div>

              {/* Feature Card 2 */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80"
                    alt="Weather Intelligence"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Cloud className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Weather Intelligence</h3>
                  <p className="text-gray-600 mb-4">
                    Real-time weather forecasts, alerts, and AI-powered recommendations 
                    for optimal farming decisions.
                  </p>
                  <a
                    href="#weather"
                    className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center gap-1 group"
                  >
                    View Weather
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </motion.div>

              {/* Feature Card 3 */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&q=80"
                    alt="Market Prices"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Live Market Prices</h3>
                  <p className="text-gray-600 mb-4">
                    Get real-time mandi prices, market trends, and sell your produce 
                    at the best rates.
                  </p>
                  <Link
                    href="/marketplace"
                    className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center gap-1 group"
                  >
                    View Marketplace
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.div>

              {/* Feature Card 4 */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80"
                    alt="Voice Helpline"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Voice Helpline</h3>
                  <p className="text-gray-600 mb-4">
                    Call our toll-free number and speak in Hindi. No internet or 
                    smartphone needed.
                  </p>
                  <Link
                    href="/voice-helpline"
                    className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center gap-1 group"
                  >
                    Learn More
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.div>

              {/* Feature Card 5 */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80"
                    alt="Crop Guidance"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Crop Guidance</h3>
                  <p className="text-gray-600 mb-4">
                    Expert advice on crop selection, sowing, irrigation, and pest 
                    management powered by AI.
                  </p>
                  <Link
                    href="/auth"
                    className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center gap-1 group"
                  >
                    Get Started
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.div>

              {/* Feature Card 6 */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80"
                    alt="Government Schemes"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Government Schemes</h3>
                  <p className="text-gray-600 mb-4">
                    Find and apply for government schemes, subsidies, and benefits 
                    available for farmers.
                  </p>
                  <Link
                    href="/auth"
                    className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center gap-1 group"
                  >
                    Explore Schemes
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Real-Time Weather Intelligence */}
        <section id="weather" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Real-Time Weather Intelligence
              </h2>
              <p className="text-xl text-gray-600">
                Accurate weather forecasts to plan your farming activities
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <WeatherDashboard />
            </motion.div>
          </div>
        </section>

        {/* Real-Time Mandi Prices */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Live Mandi Prices
              </h2>
              <p className="text-xl text-gray-600">
                Get the latest market prices from mandis across India
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <MandiDashboard />
            </motion.div>
          </div>
        </section>

        {/* Trust Section with Stats */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-700 text-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Trusted by Farmers Across India
              </h2>
              <p className="text-xl text-green-100">
                Join thousands of farmers using AI to improve their yields
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <div className="text-5xl font-bold mb-2">24/7</div>
                <div className="text-green-100">AI Support</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center">
                <div className="text-5xl font-bold mb-2">12</div>
                <div className="text-green-100">Languages</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center">
                <div className="text-5xl font-bold mb-2">100%</div>
                <div className="text-green-100">Free to Use</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center">
                <div className="text-5xl font-bold mb-2">
                  <Zap className="w-12 h-12 mx-auto" />
                </div>
                <div className="text-green-100">Instant Answers</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Powered by Advanced AI & Cloud Technology
              </h2>
              <p className="text-xl text-gray-600">
                Secure, scalable, and intelligent infrastructure
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { icon: '🤖', name: 'Google Gemini', desc: 'AI Intelligence' },
                { icon: '☁️', name: 'AWS EC2', desc: 'Cloud Compute' },
                { icon: '🗄️', name: 'PostgreSQL', desc: 'Database' },
                { icon: '🚀', name: 'AWS Amplify', desc: 'Frontend Hosting' },
                { icon: '📞', name: 'Amazon Connect', desc: 'Voice Calls' },
                { icon: '🗣️', name: 'Amazon Lex', desc: 'Voice Bot' },
                { icon: '🌐', name: 'Nginx', desc: 'Web Server' },
                { icon: '⚡', name: 'Node.js', desc: 'Backend API' },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center"
                >
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* AI Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Powered by Google Gemini Pro AI</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 to-green-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Farming?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Join thousands of farmers using AI to make smarter decisions
              </p>
              <Link
                href="/auth"
                className="inline-block px-10 py-5 bg-white text-green-700 rounded-full text-xl font-bold hover:bg-green-50 transition-all shadow-2xl hover:scale-105"
              >
                Get Started Free →
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

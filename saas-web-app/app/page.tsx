"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Sparkles,
  Phone,
  MessageSquare,
  Cloud,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WeatherDashboard from '@/components/WeatherDashboard';
import MandiDashboard from '@/components/MandiDashboard';
import { useTheme } from '@/components/ThemeProvider';

const getThemeGradient = (theme: string) => {
  switch (theme) {
    case 'spatial-default': return 'from-[#0A84FF] to-[#32D74B] drop-shadow-[0_0_12px_rgba(10,132,255,0.4)]';
    case 'product-red': return 'from-[#FF3B30] to-[#FF9500] drop-shadow-[0_0_12px_rgba(255,59,48,0.4)]';
    case 'starlight': return 'from-[#FFD60A] to-[#FFF5D0] drop-shadow-[0_0_12px_rgba(255,214,10,0.4)]';
    case 'midnight': return 'from-[#5856D6] to-[#0A84FF] drop-shadow-[0_0_12px_rgba(88,86,214,0.4)]';
    case 'aurora': return 'from-[#30D158] to-[#64D2FF] drop-shadow-[0_0_12px_rgba(48,209,88,0.4)]';
    case 'deep-space': return 'from-[#5E5CE6] to-[#BF5AF2] drop-shadow-[0_0_12px_rgba(94,92,230,0.4)]';
    case 'sunset': return 'from-[#FF9500] to-[#FF2D55] drop-shadow-[0_0_12px_rgba(255,149,0,0.4)]';
    case 'ocean': return 'from-[#64D2FF] to-[#0A84FF] drop-shadow-[0_0_12px_rgba(100,210,255,0.4)]';
    case 'forest': return 'from-[#32D74B] to-[#FFD60A] drop-shadow-[0_0_12px_rgba(50,215,75,0.4)]';
    case 'cyber': return 'from-[#FF2D55] to-[#64D2FF] drop-shadow-[0_0_12px_rgba(255,45,85,0.4)]';
    default: return 'from-[#0A84FF] to-[#32D74B] drop-shadow-[0_0_12px_rgba(10,132,255,0.4)]';
  }
};

export default function HomePage() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const { theme } = useTheme();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      router.push('/dashboard/farmer');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col pt-[52px]">
      <Header />

      <main className="flex-1 relative z-10 w-full overflow-hidden">

        {/* PARALLAX HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32">
          {/* Subtle Hero Depth Image */}
          <motion.div
            style={{ y: heroY }}
            className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] to-transparent z-10" />
            <Image
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80"
              alt="Background Texture"
              fill
              className="object-cover grayscale saturate-50"
              priority
            />
<<<<<<< HEAD
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
=======
>>>>>>> dee5727 (feat(ui): apply liquid glass spatial design and theme engine)
          </motion.div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center delay-1 animate-glass-reveal opacity-0">
            <div className="inline-flex items-center gap-2 px-5 py-2 glass-tier-2 rounded-pill interactive-glass glass-specular mb-8 border border-white/20 hover:border-glassTint-mint/50">
              <Sparkles className="w-5 h-5 text-glassTint-mint" />
              <span className="text-text-primary text-sm font-semibold tracking-wide">Next-Gen Agricultural AI</span>
            </div>

            <h1 className="text-display text-text-primary mb-6 max-w-5xl mx-auto text-vibrancy">
              The Living Interface for<br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${getThemeGradient(theme)} transition-all duration-1000`}>Smart Farming.</span>
            </h1>

            <p className="text-body text-text-secondary text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light">
              Experience the power of precise crop guidance, weather intelligence, and live market insights—all processed with blazing fast AI.
            </p>

<<<<<<< HEAD
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
=======
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
>>>>>>> dee5727 (feat(ui): apply liquid glass spatial design and theme engine)
              <Link
                href="/auth"
                className="group px-8 py-4 glass-tier-2 text-text-primary rounded-pill text-title text-lg hover:scale-105 transition-all interactive-glass glass-specular inline-flex items-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
              >
                <MessageSquare className="w-5 h-5" />
                Start Chatting
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/voice-helpline"
                className="group px-8 py-4 glass-tier-1 text-text-primary rounded-pill text-title text-lg hover:glass-tier-2 transition-all interactive-glass glass-specular inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Voice Helpline
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-8 text-text-tertiary font-medium">
              {[
                { label: '24/7 Available', icon: CheckCircle },
                { label: '12 Regional Languages', icon: CheckCircle },
                { label: 'Powered by Apple Silicon Physics', icon: CheckCircle },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm tracking-wide">
                  <item.icon className="w-5 h-5 text-glassTint-mint/80" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SPATIAL FEATURES SYSTEM */}
        <section className="py-32 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24 delay-2 animate-glass-reveal opacity-0">
              <h2 className="text-display text-text-primary mb-6 text-4xl md:text-6xl text-vibrancy">
                Tools as powerful as nature.
              </h2>
              <p className="text-body text-text-secondary text-xl max-w-2xl mx-auto">
                Discover a suite of utilities engineered with Tier 1 and Tier 2 spatial materials, offering unmatched clarity and depth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Ask AI Anything',
                  desc: 'Get instant answers to complex farming questions guided by our intelligent language models.',
                  icon: MessageSquare,
                  link: '/chat',
                  linkText: 'Ask the bot'
                },
                {
                  title: 'Weather Intelligence',
                  desc: 'Hyper-local forecasts with predictive alerts for optimal sowing and harvesting conditions.',
                  icon: Cloud,
                  link: '#weather',
                  linkText: 'Check conditions'
                },
                {
                  title: 'Market Exchange',
                  desc: 'Real-time commodity pricing data synced directly from nationwide Mandis.',
                  icon: TrendingUp,
                  link: '/marketplace',
                  linkText: 'See markets'
                },
                {
                  title: 'Toll-Free Voice',
                  desc: 'Access our experts directly completely offline. Real support without boundaries.',
                  icon: Phone,
                  link: '/voice-helpline',
                  linkText: 'Call now'
                },
                {
                  title: 'Crop Diagnostics',
                  desc: 'Scan leaves to instantly identify diseases and receive actionable treatment plans.',
                  icon: Sparkles,
                  link: '/auth',
                  linkText: 'Scan crops'
                },
                {
                  title: 'Relief & Schemes',
                  desc: 'Navigate and apply for government backing automatically matched to your profile.',
                  icon: Shield,
                  link: '/auth',
                  linkText: 'Find schemes'
                }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="glass-tier-1 rounded-[28px] p-2 glass-specular card-hover group delay-[var(--delay)] animate-glass-reveal opacity-0"
                  style={{ '--delay': `${(idx % 3) * 100}ms` } as React.CSSProperties}
                >
                  <div className="h-full glass-tier-2 rounded-[22px] p-8 flex flex-col justify-between interactive-glass shadow-inner">
                    <div>
                      <div className="w-14 h-14 rounded-[18px] glass-tier-1 flex items-center justify-center mb-6 glass-specular group-hover:scale-110 transition-transform">
                        <feature.icon className="w-7 h-7 text-text-primary drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                      </div>
                      <h3 className="text-title text-2xl text-text-primary mb-3 text-vibrancy">{feature.title}</h3>
                      <p className="text-body text-text-secondary leading-relaxed mb-8">
                        {feature.desc}
                      </p>
                    </div>
                    <Link
                      href={feature.link}
                      className="inline-flex items-center gap-2 text-glassTint-blue font-semibold hover:text-white transition-colors apple-focus outline-none w-max rounded-sm py-1"
                    >
                      {feature.linkText}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WEATHER MODULE */}
        <section id="weather" className="py-32 relative z-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-20 delay-1 animate-glass-reveal opacity-0">
              <h2 className="text-display text-text-primary mb-4 text-4xl md:text-5xl text-vibrancy">
                Atmospheric Control.
              </h2>
              <p className="text-body text-text-secondary text-xl">
                Precision forecasts inside high-fidelity glass surfaces.
              </p>
            </div>
            <div className="max-w-4xl mx-auto relative delay-3 animate-glass-reveal opacity-0">
              {/* Blurred under-glow for spatial effect */}
              <div className="absolute inset-x-20 inset-y-10 bg-glassTint-mint opacity-20 blur-[100px] -z-10 rounded-full mix-blend-screen pointer-events-none" />
              <WeatherDashboard />
            </div>
          </div>
        </section>

        {/* MANDI MODULE */}
        <section className="py-32 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 delay-1 animate-glass-reveal opacity-0">
              <h2 className="text-display text-text-primary mb-4 text-4xl md:text-5xl text-vibrancy">
                Markets at a Glance.
              </h2>
              <p className="text-body text-text-secondary text-xl">
                Scroll through Tier 1 commodity databases without friction.
              </p>
            </div>
            <div className="max-w-5xl mx-auto relative delay-2 animate-glass-reveal opacity-0">
              <MandiDashboard />
            </div>
          </div>
        </section>

        {/* THE ENGINE */}
        <section className="py-32 relative z-20 border-t border-white/5 bg-[#05050A]/40 backdrop-blur-3xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24 delay-1 animate-glass-reveal opacity-0">
              <h2 className="text-display text-text-primary mb-6 text-4xl md:text-6xl text-vibrancy">
                Industrial Power.
              </h2>
              <p className="text-body text-text-secondary text-xl max-w-2xl mx-auto font-light">
                Our infrastructure dynamically allocates resources across advanced AI models and serverless cores.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 delay-2 animate-glass-reveal opacity-0">
              {[
                { icon: '🧠', name: 'Bedrock API', desc: 'Cognitive' },
                { icon: '⚡', name: 'Lambda', desc: 'Compute' },
                { icon: '🔌', name: 'API Gateway', desc: 'Routing' },
                { icon: '💾', name: 'DynamoDB', desc: 'Storage' },
              ].map((service, index) => (
                <div
                  key={index}
                  className="glass-tier-1 p-6 rounded-[24px] glass-specular interactive-glass text-center hover:-translate-y-2 card-hover"
                >
                  <div className="text-5xl mb-4 drop-shadow-md">{service.icon}</div>
                  <h3 className="text-title text-text-primary mb-1 text-lg text-vibrancy">{service.name}</h3>
                  <p className="text-label text-text-tertiary">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METRO CTA */}
        <section className="py-40 relative z-20">
          <div className="max-w-4xl mx-auto text-center px-4 delay-1 animate-glass-reveal opacity-0">
            <div className="glass-tier-2 p-1 relative rounded-[36px] glass-specular mx-auto max-w-3xl card-hover">
              <div className="glass-tier-3 rounded-[30px] p-16 md:p-24 overflow-hidden relative interactive-glass shadow-inner">
                {/* Internal Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-glassTint-blue/30 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-glassTint-mint/20 blur-[80px] rounded-full pointer-events-none" />

                <h2 className="text-display text-text-primary mb-6 text-5xl md:text-7xl text-vibrancy relative z-10 tracking-tight">
                  Start Building.
                </h2>
                <p className="text-body text-text-secondary mb-12 text-xl max-w-lg mx-auto relative z-10">
                  Join thousands of modern farmers making data-driven decisions today.
                </p>
                <Link
                  href="/auth"
                  className="inline-flex px-12 py-5 glass-tier-1 bg-white/95 text-black rounded-pill text-title text-xl glass-specular interactive-glass hover:scale-110 shadow-[0_0_40px_rgba(255,255,255,0.25)] relative z-10 apple-focus outline-none"
                >
                  Join the Network
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer handles its own layout, but we ensure it stays below z-index wise */}
      <div className="relative z-30">
        <Footer />
      </div>
    </div >
  );
}

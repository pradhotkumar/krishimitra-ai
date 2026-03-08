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

import { getThemeGradient } from '@/lib/theme';

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
            <div className="absolute inset-0 bg-background-primary opacity-40 mix-blend-multiply" />
          </motion.div>

          {/* Liquid Glass Hero Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center delay-1 animate-glass-reveal opacity-0">
            <div className="inline-flex items-center gap-2 px-5 py-2 glass-tier-2 rounded-full interactive-glass glass-specular mb-8 border border-white/20 hover:border-glassTint-mint/50">
              <Sparkles className="w-5 h-5 text-glassTint-mint" />
              <span className="text-text-primary text-sm font-semibold tracking-wide">Next-Gen Agricultural AI</span>
            </div>

            <h1 className="text-display text-text-primary mb-6 max-w-5xl mx-auto text-vibrancy">
              The Living Interface for<br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${getThemeGradient(theme)} transition-all duration-1000`}>Smart Farming.</span>
            </h1>

            <p className="text-body text-text-secondary text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the power of precise crop guidance, weather intelligence, and live market insights—all processed with blazing fast AI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
              <Link
                href="/auth"
                className="group flex items-center justify-center gap-3 px-8 py-4 glass-tier-3 rounded-full border border-white/20 font-bold text-lg text-text-primary interactive-glass glass-specular hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] apple-focus"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Begin Session</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-6 group-hover:ml-0 group-hover:block hidden">→</span>
              </Link>

              <Link
                href="/voice-helpline"
                className="group flex items-center justify-center gap-3 px-8 py-4 glass-tier-1 rounded-full border border-white/10 font-bold text-lg text-text-secondary interactive-glass hover:text-text-primary hover:border-white/30 transition-all apple-focus"
              >
                <Phone className="w-5 h-5 opacity-70" />
                <span>Voice Helpline</span>
              </Link>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute -bottom-24 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-md">
                <motion.div
                  className="w-1.5 h-1.5 bg-white/70 rounded-full mt-2 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Real-Time Weather Intelligence */}
        <section id="weather" className="py-32 relative z-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20 delay-1 animate-glass-reveal opacity-0"
            >
              <h2 className="text-display text-text-primary mb-4 text-4xl md:text-5xl text-vibrancy">
                Real-Time Weather Intelligence
              </h2>
              <p className="text-body text-text-secondary text-xl">
                Accurate weather forecasts to plan your farming activities
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto relative delay-3 animate-glass-reveal opacity-0"
            >
              <div className="absolute inset-x-20 inset-y-10 bg-glassTint-mint opacity-20 blur-[100px] -z-10 rounded-full mix-blend-screen pointer-events-none" />
              <WeatherDashboard />
            </motion.div>
          </div>
        </section>

        {/* Real-Time Mandi Prices */}
        <section className="py-32 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20 delay-1 animate-glass-reveal opacity-0"
            >
              <h2 className="text-display text-text-primary mb-4 text-4xl md:text-5xl text-vibrancy">
                Live Mandi Prices
              </h2>
              <p className="text-body text-text-secondary text-xl">
                Get the latest market prices from mandis across India
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-5xl mx-auto relative delay-2 animate-glass-reveal opacity-0"
            >
              <MandiDashboard />
            </motion.div>
          </div>
        </section>

        {/* Trust Section with Stats */}
        <section className="py-32 relative z-20 border-y border-white/5 bg-[#05050A]/40 backdrop-blur-3xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 delay-1 animate-glass-reveal opacity-0"
            >
              <h2 className="text-display text-text-primary mb-4 text-4xl md:text-5xl text-vibrancy">
                Trusted by Farmers Across India
              </h2>
              <p className="text-body text-text-secondary text-xl">
                Join thousands of farmers using AI to improve their yields
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 delay-2 animate-glass-reveal opacity-0"
            >
              <motion.div variants={fadeInUp} className="glass-tier-1 p-6 rounded-[24px] glass-specular interactive-glass text-center hover:-translate-y-2 card-hover transition-all">
                <div className="text-5xl font-bold mb-2 text-text-primary">24/7</div>
                <div className="text-label text-text-secondary">AI Support</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="glass-tier-1 p-6 rounded-[24px] glass-specular interactive-glass text-center hover:-translate-y-2 card-hover transition-all">
                <div className="text-5xl font-bold mb-2 text-text-primary">12</div>
                <div className="text-label text-text-secondary">Languages</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="glass-tier-1 p-6 rounded-[24px] glass-specular interactive-glass text-center hover:-translate-y-2 card-hover transition-all">
                <div className="text-5xl font-bold mb-2 text-text-primary">100%</div>
                <div className="text-label text-text-secondary">Free to Use</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="glass-tier-1 p-6 rounded-[24px] glass-specular interactive-glass text-center hover:-translate-y-2 card-hover transition-all">
                <div className="text-5xl font-bold mb-2 text-text-primary flex justify-center">
                  <Zap className="w-12 h-12 text-text-primary" />
                </div>
                <div className="text-label text-text-secondary">Instant Answers</div>
              </motion.div>
            </motion.div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="py-32 relative z-20">
          <div className="max-w-4xl mx-auto px-4 text-center delay-1 animate-glass-reveal opacity-0">
            <h2 className="text-display text-text-primary mb-6 text-4xl md:text-6xl text-vibrancy">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-body text-text-secondary text-xl max-w-2xl mx-auto mb-12">
              Join thousands of farmers using AI-driven spatial tools to make smarter decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
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

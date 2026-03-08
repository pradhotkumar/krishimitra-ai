'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    language: 'en' as 'hi' | 'en',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        language: 'en',
      });
    }, 1000);
  };

  const isFormValid = formData.name && formData.email && formData.message.length >= 10;

  return (
    <div className="min-h-screen flex flex-col pt-[52px]">
      <Header />

      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto delay-1 animate-glass-reveal opacity-0">
          <h1 className="text-display text-text-primary mb-12 text-4xl md:text-5xl text-vibrancy tracking-tight">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="glass-tier-1 p-8 rounded-[24px] glass-specular interactive-glass">
              <h2 className="text-title text-2xl text-text-primary mb-6 text-vibrancy">Send us a message</h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 glass-tier-3 border border-glassTint-mint/30 rounded-xl">
                  <p className="text-glassTint-mint font-medium">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0A0A14]/50 text-white focus:outline-none focus:border-glassTint-blue focus:ring-2 focus:ring-glassTint-blue/20 transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0A0A14]/50 text-white focus:outline-none focus:border-glassTint-blue focus:ring-2 focus:ring-glassTint-blue/20 transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0A0A14]/50 text-white focus:outline-none focus:border-glassTint-blue focus:ring-2 focus:ring-glassTint-blue/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">
                    Message * (min 10 characters)
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0A0A14]/50 text-white focus:outline-none focus:border-glassTint-blue focus:ring-2 focus:ring-glassTint-blue/20 transition-all resize-none"
                    required
                    minLength={10}
                  />
                  <p className="text-xs text-text-tertiary mt-2">
                    {formData.message.length} / 10 characters minimum
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Preferred Language
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, language: 'hi' })}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${formData.language === 'hi'
                          ? 'glass-tier-3 text-text-primary border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                          : 'glass-tier-1 text-text-secondary border border-white/5 hover:text-text-primary hover:border-white/10'
                        }`}
                    >
                      हिंदी
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, language: 'en' })}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${formData.language === 'en'
                          ? 'glass-tier-3 text-text-primary border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                          : 'glass-tier-1 text-text-secondary border border-white/5 hover:text-text-primary hover:border-white/10'
                        }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full mt-6 px-6 py-4 glass-tier-2 text-text-primary hover:text-white rounded-xl text-lg font-semibold interactive-glass glass-specular hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="glass-tier-1 p-8 rounded-[24px] glass-specular interactive-glass">
                <h2 className="text-title text-2xl text-text-primary mb-6 text-vibrancy">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="glass-tier-2 p-5 rounded-xl border border-white/5">
                    <h3 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                      <span className="text-glassTint-blue border border-glassTint-blue/30 rounded-full w-8 h-8 flex items-center justify-center p-1 bg-glassTint-blue/10">📧</span>
                      Email
                    </h3>
                    <p className="text-text-secondary pl-10">support@krishimitra.ai</p>
                  </div>
                  <div className="glass-tier-2 p-5 rounded-xl border border-white/5">
                    <h3 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                      <span className="text-glassTint-mint border border-glassTint-mint/30 rounded-full w-8 h-8 flex items-center justify-center p-1 bg-glassTint-mint/10">📞</span>
                      Voice Helpline
                    </h3>
                    <div className="pl-10">
                      <p className="text-text-secondary mb-1">1800-XXX-XXXX (Toll-free)</p>
                      <p className="text-xs text-text-tertiary">Available 24/7</p>
                    </div>
                  </div>
                  <div className="glass-tier-2 p-5 rounded-xl border border-white/5">
                    <h3 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                      <span className="text-glassTint-purple border border-glassTint-purple/30 rounded-full w-8 h-8 flex items-center justify-center p-1 bg-glassTint-purple/10">🌐</span>
                      Web Chat
                    </h3>
                    <p className="text-text-secondary pl-10">Available on our chat dashboard</p>
                  </div>
                </div>
              </div>

              <div className="glass-tier-1 p-8 rounded-[24px] glass-specular interactive-glass">
                <h3 className="text-title text-xl text-text-primary mb-5 text-vibrancy">Office Hours</h3>
                <div className="space-y-3">
                  <p className="text-text-secondary flex justify-between border-b border-white/5 pb-2">
                    <span>Mon - Fri</span>
                    <span className="text-text-primary font-medium">9:00 AM - 6:00 PM IST</span>
                  </p>
                  <p className="text-text-secondary flex justify-between border-b border-white/5 pb-2">
                    <span>Sat - Sun</span>
                    <span className="text-text-primary font-medium">10:00 AM - 4:00 PM IST</span>
                  </p>
                </div>
                <div className="mt-6 flex items-start gap-3 glass-tier-2 p-4 rounded-xl border border-glassTint-mint/20">
                  <span className="text-glassTint-mint text-xl mt-1">✨</span>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    <strong className="text-text-primary font-medium">Always Online:</strong> AI chat and voice helpline are available 24/7.
                  </p>
                </div>
              </div>

              <div className="glass-tier-1 p-8 rounded-[24px] glass-specular interactive-glass">
                <h3 className="text-title text-xl text-text-primary mb-5 text-vibrancy">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 glass-tier-2 flex items-center justify-center rounded-xl text-text-secondary hover:text-text-primary hover:-translate-y-1 transition-all border border-white/5 hover:border-white/20">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 glass-tier-2 flex items-center justify-center rounded-xl text-text-secondary hover:text-text-primary hover:-translate-y-1 transition-all border border-white/5 hover:border-white/20">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

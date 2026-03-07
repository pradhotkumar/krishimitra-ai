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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-primary/10">
              <h2 className="text-2xl font-semibold text-primary mb-6">Send us a message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-primary/30 bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-primary/30 bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-primary/30 bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message * (min 10 characters)
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-primary/30 bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                    minLength={10}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.message.length} / 10 characters minimum
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Language
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, language: 'hi' })}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        formData.language === 'hi'
                          ? 'bg-primary text-white'
                          : 'bg-white text-primary border border-primary/20'
                      }`}
                    >
                      हिंदी
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, language: 'en' })}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        formData.language === 'en'
                          ? 'bg-primary text-white'
                          : 'bg-white text-primary border border-primary/20'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full px-6 py-3 bg-primary text-white rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-primary/10">
                <h2 className="text-2xl font-semibold text-primary mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border border-blue-100">
                    <h3 className="font-semibold text-primary mb-2">📧 Email</h3>
                    <p className="text-gray-700">support@krishimitra.ai</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-lg border border-green-100">
                    <h3 className="font-semibold text-primary mb-2">📞 Voice Helpline</h3>
                    <p className="text-gray-700">1800-XXX-XXXX (Toll-free)</p>
                    <p className="text-sm text-gray-600">Available 24/7</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-lg border border-purple-100">
                    <h3 className="font-semibold text-primary mb-2">🌐 Web Chat</h3>
                    <p className="text-gray-700">Available on our chat dashboard</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-primary/10">
                <h3 className="font-semibold text-primary mb-4">Office Hours</h3>
                <p className="text-gray-700 mb-2">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                <p className="text-gray-700 mb-4">Saturday - Sunday: 10:00 AM - 4:00 PM IST</p>
                <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  Note: AI chat and voice helpline are available 24/7
                </p>
              </div>

              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-primary/10">
                <h3 className="font-semibold text-primary mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-primary hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-primary hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
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

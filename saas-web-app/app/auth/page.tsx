'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import { Leaf, Apple, ChevronRight, Lock, Mail, User } from 'lucide-react';

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

export default function AuthPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    language: 'hi' as string,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate authentication
    setTimeout(() => {
      const userData = {
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        language: formData.language
      };

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userLanguage', formData.language);

      setIsSubmitting(false);
      router.push('/dashboard/farmer');
    }, 1000);
  };

  const isFormValid = isLogin
    ? formData.email && formData.password
    : formData.name && formData.email && formData.password;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10 w-full overflow-hidden">

      {/* Dynamic Background Flare */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <main className="w-full max-w-[480px] relative z-20 animate-glass-reveal">
        {/* Header Section */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="w-16 h-16 glass-tier-2 border border-white/20 rounded-2xl flex items-center justify-center mb-6 glass-specular shadow-2xl">
            <span className="text-3xl animate-float opacity-90 select-none">🌾</span>
          </div>
          <h1 className="text-display text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${getThemeGradient(theme)} transition-colors duration-1000`}>
              {isLogin ? 'Welcome Back.' : 'Create Account.'}
            </span>
          </h1>
          <p className="text-text-secondary font-medium tracking-wide">
            {isLogin
              ? 'Enter your credentials to access KrishiMitra AI'
              : 'Join the next-generation farming interface'}
          </p>
        </div>

        {/* Main Auth Form Container */}
        <div className="glass-tier-2 rounded-[40px] p-8 glass-specular border border-white/10 shadow-2xl">

          {/* Toggle Login/Signup segments */}
          <div className="flex gap-2 mb-8 glass-tier-1 p-1.5 rounded-[20px] shadow-inner border border-white/5">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 px-4 py-3 rounded-[16px] text-sm font-semibold transition-all apple-focus outline-none ${isLogin
                  ? 'glass-tier-3 text-text-primary glass-specular shadow-md transform scale-[1.02]'
                  : 'text-text-secondary hover:text-text-primary interactive-glass hover:bg-white/5'
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 px-4 py-3 rounded-[16px] text-sm font-semibold transition-all apple-focus outline-none ${!isLogin
                  ? 'glass-tier-3 text-text-primary glass-specular shadow-md transform scale-[1.02]'
                  : 'text-text-secondary hover:text-text-primary interactive-glass hover:bg-white/5'
                }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-1.5 group">
                <label htmlFor="name" className="block text-xs font-bold text-text-tertiary uppercase tracking-widest pl-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none" />
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-[20px] bg-white/5 border border-white/10 text-text-primary text-sm font-medium placeholder:text-text-tertiary focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all shadow-inner"
                    placeholder="E.g., Raj Kumar"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5 group">
              <label htmlFor="email" className="block text-xs font-bold text-text-tertiary uppercase tracking-widest pl-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-[20px] bg-white/5 border border-white/10 text-text-primary text-sm font-medium placeholder:text-text-tertiary focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all shadow-inner"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 group">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-bold text-text-tertiary uppercase tracking-widest pl-1">
                  Password
                </label>
                {isLogin && (
                  <button type="button" className="text-xs text-text-secondary hover:text-text-primary font-medium transition-colors">
                    Reset?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none" />
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-[20px] bg-white/5 border border-white/10 text-text-primary text-sm font-medium placeholder:text-text-tertiary focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all shadow-inner"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-1.5 group">
                <label className="block text-xs font-bold text-text-tertiary uppercase tracking-widest pl-1">
                  System Language / भाषा चुनें
                </label>
                <div className="relative">
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-4 py-4 rounded-[20px] bg-white/5 border border-white/10 text-text-primary text-sm font-medium focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all shadow-inner appearance-none cursor-pointer"
                  >
                    <option value="hi" className="text-black">हिंदी (Hindi)</option>
                    <option value="en" className="text-black">English</option>
                    <option value="ta" className="text-black">தமிழ் (Tamil)</option>
                    <option value="te" className="text-black">తెలుగు (Telugu)</option>
                    <option value="kn" className="text-black">ಕನ್ನಡ (Kannada)</option>
                    <option value="ml" className="text-black">മലയാളം (Malayalam)</option>
                    <option value="mr" className="text-black">मराठी (Marathi)</option>
                    <option value="gu" className="text-black">ગુજરાતી (Gujarati)</option>
                    <option value="bn" className="text-black">বাংলা (Bengali)</option>
                    <option value="pa" className="text-black">ਪੰਜਾਬੀ (Punjabi)</option>
                    <option value="or" className="text-black">ଓଡ଼ିଆ (Odia)</option>
                    <option value="as" className="text-black">অসমীয়া (Assamese)</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full mt-4 flex items-center justify-center gap-2 group px-6 py-4 glass-tier-3 rounded-[20px] text-text-primary text-sm font-bold tracking-wide interactive-glass glass-specular shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed apple-focus outline-none"
            >
              {isSubmitting
                ? 'Authenticating...'
                : isLogin
                  ? 'Sign In to Portal'
                  : 'Initialize Account'}
              {!isSubmitting && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* Social SSO Connectors */}
          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative px-4 glass-tier-2 rounded-full border border-white/5 text-[10px] uppercase font-bold tracking-widest text-text-tertiary bg-white/5">
                Or Continue Using
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 px-4 py-3.5 glass-tier-1 border border-white/10 rounded-[16px] interactive-glass hover:border-white/20 transition-all group outline-none apple-focus">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm font-semibold text-text-primary">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 px-4 py-3.5 glass-tier-1 border border-white/10 rounded-[16px] interactive-glass hover:border-white/20 transition-all group outline-none apple-focus">
                <Apple className="w-5 h-5 group-hover:scale-110 transition-transform text-white" />
                <span className="text-sm font-semibold text-text-primary">Apple ID</span>
              </button>
            </div>
          </div>
        </div>

        {/* Guest Access Alternative */}
        <div className="mt-8 text-center glass-tier-1 max-w-[320px] mx-auto p-4 rounded-3xl border border-white/5 glass-specular">
          <p className="text-xs text-text-secondary mb-2 font-medium">
            Just exploring the software?
          </p>
          <button
            onClick={() => {
              localStorage.setItem('user', JSON.stringify({
                email: 'guest@krishimitra.ai',
                name: 'Guest User',
                language: 'hi',
              }));
              router.push('/chat');
            }}
            className="text-text-primary hover:text-white font-bold text-sm underline underline-offset-4 hover:decoration-white/50 transition-colors py-2 px-4 interactive-glass rounded-xl"
          >
            Continue as Guest
          </button>
        </div>
      </main>
    </div>
  );
}

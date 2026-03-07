"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { User, LogOut } from 'lucide-react';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedName = localStorage.getItem('userName') || 'Farmer';
    setIsAuthenticated(authStatus === 'true');
    setUserName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    router.push('/');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/chat', label: 'AI Chat' },
    { href: '/voice-helpline', label: 'Voice Helpline' },
    { href: '/marketplace', label: 'Marketplace' },
    ...(isAuthenticated ? [{ href: '/dashboard/farmer', label: 'Dashboard' }] : []),
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-tier-3 border-b border-white/10 h-[52px] w-full flex items-center delay-1 animate-glass-reveal opacity-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center h-full">
        <Link href="/" className="flex items-center space-x-2 group interactive-glass rounded-xl p-1 -ml-1 apple-focus outline-none">
          <span className="text-xl drop-shadow-md">🌾</span>
          <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40 drop-shadow-sm">KrishiMitra</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-body text-sm px-4 py-1.5 rounded-pill interactive-glass transition-colors apple-focus outline-none ${isActive ? 'glass-tier-2 text-text-primary text-vibrancy glass-specular' : 'text-text-secondary hover:text-text-primary'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          <ThemeSwitcher />

          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <User className="w-4 h-4" />
                <span>{userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm glass-tier-2 rounded-pill interactive-glass text-text-secondary hover:text-glassTint-pink glass-specular apple-focus outline-none"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="hidden md:block px-5 py-1.5 glass-tier-2 bg-glassTint-blue/30 text-white rounded-pill text-sm font-semibold interactive-glass glass-specular text-vibrancy apple-focus outline-none"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full interactive-glass text-text-secondary hover:text-text-primary focus:outline-none apple-focus"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Tier 3 Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[52px] left-0 right-0 glass-tier-3 border-b border-white/10 p-4 space-y-2 animate-glass-reveal shadow-2xl flex flex-col z-[60]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-xl interactive-glass text-body ${isActive ? 'glass-tier-2 text-text-primary text-vibrancy glass-specular' : 'text-text-secondary hover:text-text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-2 mt-2 border-t border-white/10">
            {isAuthenticated ? (
              <button
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="w-full text-left px-4 py-3 text-glassTint-pink font-medium rounded-xl interactive-glass hover:glass-tier-2"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth"
                className="block w-full text-center px-4 py-3 glass-tier-2 bg-glassTint-blue/30 text-white rounded-pill font-semibold interactive-glass glass-specular mt-2 text-vibrancy"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

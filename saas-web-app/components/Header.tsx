'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();

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

  return (
    <header className="sticky top-0 z-50 glass border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌾</span>
            <span className="text-xl font-bold text-primary">KrishiMitra AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-text hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/chat" className="text-text hover:text-primary transition-colors">
              AI Chat
            </Link>
            <Link href="/voice-helpline" className="text-text hover:text-primary transition-colors">
              Voice Helpline
            </Link>
            <Link href="/marketplace" className="text-text hover:text-primary transition-colors">
              Marketplace
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard/farmer" className="text-text hover:text-primary transition-colors">
                Dashboard
              </Link>
            )}
            <Link href="/about" className="text-text hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-text hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4" />
                <span>{userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="hidden md:block px-6 py-2 bg-primary text-white rounded-full hover:scale-105 transition-transform"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/"
              className="block text-text hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/chat"
              className="block text-text hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Chat
            </Link>
            <Link
              href="/voice-helpline"
              className="block text-text hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Voice Helpline
            </Link>
            <Link
              href="/marketplace"
              className="block text-text hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            {isAuthenticated && (
              <Link
                href="/dashboard/farmer"
                className="block text-text hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/about"
              className="block text-text hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-text hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth"
                className="block w-full text-center px-6 py-2 bg-primary text-white rounded-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

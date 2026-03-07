"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, MessageSquare, Phone, ShoppingBag, LayoutDashboard } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: MessageSquare, label: 'Chat', href: '/chat' },
    { icon: Phone, label: 'Voice', href: '/voice-helpline' },
    { icon: ShoppingBag, label: 'Market', href: '/marketplace' },
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/farmer' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] glass-tier-3 border-t border-white/10 z-50 flex items-center delay-2 animate-glass-reveal opacity-0 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around w-full px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center p-2 rounded-xl interactive-glass transition-all apple-focus outline-none ${isActive
                  ? 'text-text-primary text-vibrancy'
                  : 'text-text-tertiary hover:text-text-secondary'
                }`}
            >
              <div className={`flex items-center justify-center w-12 h-8 rounded-pill transition-all ${isActive ? 'glass-tier-2 glass-specular' : ''}`}>
                <item.icon className={`w-5 h-5 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-medium tracking-wide mt-1">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

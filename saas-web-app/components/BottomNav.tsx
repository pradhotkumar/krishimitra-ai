'use client';

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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
                          (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-3 px-4 min-w-[64px] transition-all ${
                isActive
                  ? 'text-green-600'
                  : 'text-gray-600 hover:text-green-500'
              }`}
            >
              <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-green-600 rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

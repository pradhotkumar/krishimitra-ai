'use client';

import { Sparkles } from 'lucide-react';

interface AIBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact';
}

export default function AIBadge({ size = 'md', variant = 'default' }: AIBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4'
  };

  if (variant === 'compact') {
    return (
      <div className={`${sizeClasses[size]} bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-medium flex items-center gap-1 shadow-lg animate-pulse-glow`}>
        <Sparkles className={iconSizes[size]} />
        <span>AI</span>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-medium flex items-center gap-1 shadow-lg animate-pulse-glow`}>
      <Sparkles className={iconSizes[size]} />
      <span>AI Recommended</span>
    </div>
  );
}

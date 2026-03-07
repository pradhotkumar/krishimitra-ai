"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Palette, Check } from 'lucide-react';

const THEMES = [
    { id: 'spatial-default', name: 'Spatial Default', colors: ['bg-[#0A84FF]', 'bg-[#BF5AF2]', 'bg-[#32D74B]'] },
    { id: 'product-red', name: 'Product Red', colors: ['bg-[#FF3B30]', 'bg-[#FF9500]', 'bg-[#FF2D55]'] },
    { id: 'starlight', name: 'Starlight', colors: ['bg-[#FFD60A]', 'bg-[#E5E5EA]', 'bg-[#FFF5D0]'] },
    { id: 'midnight', name: 'Midnight', colors: ['bg-[#1C1C1E]', 'bg-[#5856D6]', 'bg-[#0A84FF]'] },
    { id: 'aurora', name: 'Aurora', colors: ['bg-[#30D158]', 'bg-[#64D2FF]', 'bg-[#0A84FF]'] },
    { id: 'deep-space', name: 'Deep Space', colors: ['bg-[#5E5CE6]', 'bg-[#0A84FF]', 'bg-[#BF5AF2]'] },
    { id: 'sunset', name: 'Sunset', colors: ['bg-[#FF9500]', 'bg-[#FF2D55]', 'bg-[#FFD60A]'] },
    { id: 'ocean', name: 'Ocean', colors: ['bg-[#64D2FF]', 'bg-[#0A84FF]', 'bg-[#30D158]'] },
    { id: 'forest', name: 'Forest', colors: ['bg-[#32D74B]', 'bg-[#30D158]', 'bg-[#FFD60A]'] },
    { id: 'cyber', name: 'Cyber', colors: ['bg-[#FF2D55]', 'bg-[#64D2FF]', 'bg-[#BF5AF2]'] },
] as const;

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-full interactive-glass transition-colors apple-focus flex items-center justify-center ${isOpen ? 'glass-tier-2 text-text-primary glass-specular shadow-lg' : 'text-text-secondary hover:text-text-primary'
                    }`}
                aria-label="Toggle Theme"
                title="Change Liquid Glass Theme"
            >
                <Palette className="w-5 h-5" />
            </button>

            {isOpen && (
                <div className="absolute top-[calc(100%+16px)] right-0 w-[420px] bg-[#121214]/70 backdrop-blur-[60px] rounded-[32px] border border-white/20 shadow-[-10px_20px_40px_rgba(0,0,0,0.4)] p-6 z-[100] animate-glass-reveal origin-top-right">
                    <div className="border-b border-white/10 pb-4 mb-5 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-semibold text-text-primary text-vibrancy">Appearance</h3>
                            <p className="text-xs text-text-tertiary mt-1">Select an ambient spatial theme.</p>
                        </div>
                        <div className="flex -space-x-2">
                            {THEMES.find(t => t.id === theme)?.colors.map((c, i) => (
                                <div key={i} className={`w-6 h-6 rounded-full ${c} border-2 border-[#101014] shadow-md`} />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                        {THEMES.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => {
                                    setTheme(t.id as any);
                                }}
                                className={`flex flex-col gap-3 p-4 rounded-[22px] interactive-glass text-left transition-all border ${theme === t.id
                                    ? 'glass-tier-2 border-white/40 shadow-[0_0_24px_rgba(255,255,255,0.1)] glass-specular transform scale-[1.02]'
                                    : 'glass-tier-1 border-white/10 hover:border-white/20 hover:bg-white/5'
                                    }`}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <span className={`text-sm tracking-wide ${theme === t.id ? 'text-text-primary font-semibold text-vibrancy' : 'text-text-secondary font-medium'}`}>
                                        {t.name}
                                    </span>
                                    {theme === t.id && <Check className="w-4 h-4 text-white" />}
                                </div>

                                <div className="flex gap-2">
                                    {t.colors.map((colorClass, idx) => (
                                        <div key={idx} className={`flex-1 h-3 rounded-pill ${colorClass} shadow-inner opacity-90`} />
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

const THEME_CONFIGS: Record<string, { bg: string; orb1: string; orb2: string; orb3: string; }> = {
    'spatial-default': {
        bg: '#0a0a14',
        orb1: 'radial-gradient(circle, #0A84FF 0%, transparent 60%)',
        orb2: 'radial-gradient(circle, #BF5AF2 0%, transparent 60%)',
        orb3: 'radial-gradient(circle, #32D74B 0%, transparent 60%)',
    },
    'product-red': {
        bg: '#140505',
        orb1: 'radial-gradient(circle, #FF3B30 0%, transparent 60%)',
        orb2: 'radial-gradient(circle, #FF9500 0%, transparent 60%)',
        orb3: 'radial-gradient(circle, #FF2D55 0%, transparent 60%)',
    },
    'starlight': {
        bg: '#12110c',
        orb1: 'radial-gradient(circle, #FFD60A 0%, transparent 60%)',
        orb2: 'radial-gradient(circle, #E5E5EA 0%, transparent 60%)',
        orb3: 'radial-gradient(circle, #FFF5D0 0%, transparent 60%)',
    },
    'midnight': {
        bg: '#050510',
        orb1: 'radial-gradient(circle, #1C1C1E 0%, transparent 60%)',
        orb2: 'radial-gradient(circle, #5856D6 0%, transparent 60%)',
        orb3: 'radial-gradient(circle, #0A84FF 0%, transparent 60%)',
    },
    'aurora': {
        bg: '#05100a',
        orb1: 'radial-gradient(circle, #30D158 0%, transparent 60%)',
        orb2: 'radial-gradient(circle, #64D2FF 0%, transparent 60%)',
        orb3: 'radial-gradient(circle, #0A84FF 0%, transparent 60%)',
    },
    'deep-space': {
        bg: '#080514',
        orb1: 'radial-gradient(circle, #5E5CE6 0%, transparent 60%)',
        orb2: 'radial-gradient(circle, #0A84FF 0%, transparent 60%)',
        orb3: 'radial-gradient(circle, #BF5AF2 0%, transparent 60%)',
    },
    'sunset': {
        bg: '#140a05',
        orb1: 'radial-gradient(circle, #FF9500 0%, transparent 60%)',
        orb2: 'radial-gradient(circle, #FF2D55 0%, transparent 60%)',
        orb3: 'radial-gradient(circle, #FFD60A 0%, transparent 60%)',
    },
    'ocean': {
        bg: '#051014',
        orb1: 'radial-gradient(circle, #64D2FF 0%, transparent 60%)',
        orb2: 'radial-gradient(circle, #0A84FF 0%, transparent 60%)',
        orb3: 'radial-gradient(circle, #30D158 0%, transparent 60%)',
    },
    'forest': {
        bg: '#0a140a',
        orb1: 'radial-gradient(circle, #32D74B 0%, transparent 60%)',
        orb2: 'radial-gradient(circle, #30D158 0%, transparent 60%)',
        orb3: 'radial-gradient(circle, #FFD60A 0%, transparent 60%)',
    },
    'cyber': {
        bg: '#120514',
        orb1: 'radial-gradient(circle, #FF2D55 0%, transparent 60%)',
        orb2: 'radial-gradient(circle, #64D2FF 0%, transparent 60%)',
        orb3: 'radial-gradient(circle, #BF5AF2 0%, transparent 60%)',
    }
};

export default function AmbientBackground() {
    const { theme } = useTheme();
    const active = THEME_CONFIGS[theme] || THEME_CONFIGS['spatial-default'];

    return (
        <div
            className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-1000 selection:bg-none"
            style={{ backgroundColor: active.bg }}
        >
            {/* Orb 1: Primary Spatial */}
            <div
                className="absolute w-[800px] h-[800px] rounded-full animate-float blur-[120px] opacity-40 mix-blend-screen transition-all duration-[1500ms]"
                style={{
                    background: active.orb1,
                    top: '-20%',
                    left: '-10%',
                }}
            />
            {/* Orb 2: Secondary Bleed */}
            <div
                className="absolute w-[700px] h-[700px] rounded-full animate-float-slow blur-[140px] opacity-35 mix-blend-screen transition-all duration-[1500ms]"
                style={{
                    background: active.orb2,
                    bottom: '-20%',
                    right: '-10%',
                }}
            />
            {/* Orb 3: Tertiary Fill */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full animate-float-fast blur-[100px] opacity-30 mix-blend-screen transition-all duration-[1500ms]"
                style={{
                    background: active.orb3,
                    top: '20%',
                    left: '30%',
                }}
            />

            {/* Subtle Grain Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}

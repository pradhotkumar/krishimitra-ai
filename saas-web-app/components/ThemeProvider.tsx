"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme =
    | 'spatial-default'
    | 'product-red'
    | 'starlight'
    | 'midnight'
    | 'aurora'
    | 'deep-space'
    | 'sunset'
    | 'ocean'
    | 'forest'
    | 'cyber';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('spatial-default');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('liquid-glass-theme') as Theme;
        const validThemes = [
            'spatial-default', 'product-red', 'starlight', 'midnight', 'aurora',
            'deep-space', 'sunset', 'ocean', 'forest', 'cyber'
        ];
        if (savedTheme && validThemes.includes(savedTheme)) {
            setThemeState(savedTheme);
        }
    }, []);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('liquid-glass-theme', newTheme);
    };

    if (!mounted) {
        return (
            <ThemeContext.Provider value={{ theme: 'spatial-default', setTheme }}>
                {children}
            </ThemeContext.Provider>
        );
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

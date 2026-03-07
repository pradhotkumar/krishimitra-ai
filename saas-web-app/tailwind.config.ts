import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        glassTint: {
          blue: "rgba(10, 132, 255, 0.75)",
          purple: "rgba(191, 90, 242, 0.75)",
          mint: "rgba(99, 230, 226, 0.70)",
          pink: "rgba(255, 55, 95, 0.75)",
          gold: "rgba(255, 214, 10, 0.80)",
        },
        text: {
          primary: "rgba(255, 255, 255, 0.95)",
          secondary: "rgba(255, 255, 255, 0.60)",
          tertiary: "rgba(255, 255, 255, 0.35)",
          label: "rgba(255, 255, 255, 0.80)",
        },
        primary: "rgba(10, 132, 255, 0.75)",
        accent: "rgba(99, 230, 226, 0.70)",
        background: "#0a0a14",
      },
      fontFamily: {
        sans: ["-apple-system", "SF Pro Display", "SF Pro Text", "Helvetica Neue", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "16px",
        'xs': "8px",
        'sm': "12px",
        'md': "16px",
        'lg': "20px",
        'xl': "28px",
        '2xl': "36px",
        'pill': "999px",
      },
      transitionTimingFunction: {
        'spring': "cubic-bezier(0.34, 1.56, 0.64, 1)",
        'smooth': "cubic-bezier(0.4, 0.0, 0.2, 1)",
        'decel': "cubic-bezier(0.0, 0.0, 0.2, 1)",
        'accel': "cubic-bezier(0.4, 0.0, 1.0, 1)",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(40px, -40px) scale(1.1)' },
        },
        glassReveal: {
          from: { opacity: "0", transform: 'translateY(16px) scale(0.98)', filter: 'blur(8px)' },
          to: { opacity: "1", transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
        }
      },
      animation: {
        'float-slow': 'float 40s infinite alternate ease-in-out',
        'float-medium': 'float 30s infinite alternate ease-in-out',
        'float-fast': 'float 20s infinite alternate ease-in-out',
        'glass-reveal': 'glassReveal 0.6s cubic-bezier(0.0, 0.0, 0.2, 1) forwards',
      }
    },
  },
  plugins: [],
};

export default config;

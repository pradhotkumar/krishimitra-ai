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
        primary: "#2E7D32",
        accent: "#A5D6A7",
        background: "#F4F9F4",
        text: "#1B1B1B",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "16px",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.05)",
      },
      backdropBlur: {
        glass: "10px",
      },
    },
  },
  plugins: [],
};

export default config;

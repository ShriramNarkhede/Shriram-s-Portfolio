// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kali: {
          bg: "var(--kali-bg)",
          panel: "var(--kali-panel)",
          accent: "var(--kali-accent)",
          hover: "var(--kali-hover)",
          border: "var(--kali-border)",
          text: "var(--kali-text)",
          textSecondary: "var(--kali-text-secondary)",
          success: "var(--kali-success)",
          warning: "var(--kali-warning)",
          error: "var(--kali-error)",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
      backdropBlur: {
        glass: "20px",
        strong: "30px",
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px var(--kali-accent)' },
          '100%': { boxShadow: '0 0 40px var(--kali-accent)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
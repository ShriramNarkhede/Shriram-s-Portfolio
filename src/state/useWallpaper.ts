// src/state/useWallpaper.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Theme {
  id: string;
  name: string;
  colors: {
    bg: string;
    panel: string;
    accent: string;
    hover: string;
    border: string;
    text: string;
    textSecondary: string;
    success: string;
    warning: string;
    error: string;
  };
}

export const themes: Record<string, Theme> = {
  dark: {
    id: "dark",
    name: "Dark Mode",
    colors: {
      bg: "#0a0c14",
      panel: "#0f121e",
      accent: "#00bcd4",
      hover: "#0097a7",
      border: "#1a1f35",
      text: "#e8e8e8",
      textSecondary: "#9ca3af",
      success: "#4ade80",
      warning: "#fbbf24",
      error: "#ef4444",
    },
  },
  hacker: {
    id: "hacker",
    name: "Hacker Green",
    colors: {
      bg: "#0d1117",
      panel: "#010409",
      accent: "#00ff00",
      hover: "#00cc00",
      border: "#1f2937",
      text: "#00ff00",
      textSecondary: "#00cc00",
      success: "#00ff00",
      warning: "#ffff00",
      error: "#ff0000",
    },
  },
  light: {
    id: "light",
    name: "Light Mode",
    colors: {
      bg: "#f0f0f0",
      panel: "#ffffff",
      accent: "#0088cc",
      hover: "#006699",
      border: "#e5e7eb",
      text: "#1f2937",
      textSecondary: "#6b7280",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#dc2626",
    },
  },
  purple: {
    id: "purple",
    name: "Purple Dream",
    colors: {
      bg: "#0f0a1a",
      panel: "#1a0f2e",
      accent: "#a855f7",
      hover: "#9333ea",
      border: "#2d1b4e",
      text: "#e8e8e8",
      textSecondary: "#c4b5fd",
      success: "#a78bfa",
      warning: "#fbbf24",
      error: "#f87171",
    },
  },
  ocean: {
    id: "ocean",
    name: "Ocean Blue",
    colors: {
      bg: "#0a1628",
      panel: "#0f1e36",
      accent: "#3b82f6",
      hover: "#2563eb",
      border: "#1e3a5f",
      text: "#e8e8e8",
      textSecondary: "#93c5fd",
      success: "#60a5fa",
      warning: "#fbbf24",
      error: "#ef4444",
    },
  },
  sunset: {
    id: "sunset",
    name: "Sunset Orange",
    colors: {
      bg: "#1a0f0a",
      panel: "#2d1810",
      accent: "#f97316",
      hover: "#ea580c",
      border: "#4a2817",
      text: "#e8e8e8",
      textSecondary: "#fdba74",
      success: "#fb923c",
      warning: "#fbbf24",
      error: "#dc2626",
    },
  },
};

interface WallpaperState {
  wallpaper: string;
  theme: string;
  setWallpaper: (wallpaper: string) => void;
  setTheme: (theme: string) => void;
  getCurrentTheme: () => Theme;
}

export const useWallpaper = create<WallpaperState>()(
  persist(
    (set, get) => ({
      wallpaper: "/wallpapers/kali-bg.png",
      theme: "dark",

      setWallpaper: (wallpaper) => set({ wallpaper }),
      
      setTheme: (themeId) => {
        set({ theme: themeId });
        // Apply theme to document
        const theme = themes[themeId] || themes.dark;
        applyTheme(theme);
      },

      getCurrentTheme: () => {
        const { theme } = get();
        return themes[theme] || themes.dark;
      },
    }),
    {
      name: "wallpaper-storage",
      onRehydrateStorage: () => (state) => {
        // Apply theme on load
        if (state) {
          const theme = themes[state.theme] || themes.dark;
          applyTheme(theme);
        }
      },
    }
  )
);

// Apply theme to CSS variables
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });

  // Update Tailwind config colors
  root.style.setProperty('--kali-bg', theme.colors.bg);
  root.style.setProperty('--kali-panel', theme.colors.panel);
  root.style.setProperty('--kali-accent', theme.colors.accent);
  root.style.setProperty('--kali-hover', theme.colors.hover);
  root.style.setProperty('--kali-border', theme.colors.border);
  root.style.setProperty('--kali-text', theme.colors.text);
}
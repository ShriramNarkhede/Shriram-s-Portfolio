// src/components/ThemeProvider.tsx
"use client";

import { useEffect, useState } from "react";
import { useWallpaper } from "@/state/useWallpaper";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { getCurrentTheme } = useWallpaper();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const theme = getCurrentTheme();
      applyTheme(theme);
    }
  }, [mounted, getCurrentTheme]);

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <div className="w-screen h-screen bg-[#0a0c14] flex items-center justify-center">
        <div className="text-[#00bcd4] font-mono">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}

function applyTheme(theme: any) {
  const root = document.documentElement;
  
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value as string);
  });

  root.style.setProperty('--kali-bg', theme.colors.bg);
  root.style.setProperty('--kali-panel', theme.colors.panel);
  root.style.setProperty('--kali-accent', theme.colors.accent);
  root.style.setProperty('--kali-hover', theme.colors.hover);
  root.style.setProperty('--kali-border', theme.colors.border);
  root.style.setProperty('--kali-text', theme.colors.text);
}
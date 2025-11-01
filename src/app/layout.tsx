import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shriram's Portfolio",
  description: "Portfolio showcasing a Kali Linux desktop environment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = JSON.parse(localStorage.getItem('wallpaper-storage') || '{"theme":"dark"}').theme || 'dark';
                  const themes = {
                    dark: { bg: "#0a0c14", panel: "#0f121e", accent: "#00bcd4", hover: "#0097a7", border: "#1a1f35", text: "#e8e8e8", textSecondary: "#9ca3af", success: "#4ade80", warning: "#fbbf24", error: "#ef4444" },
                    hacker: { bg: "#0d1117", panel: "#010409", accent: "#00ff00", hover: "#00cc00", border: "#1f2937", text: "#00ff00", textSecondary: "#00cc00", success: "#00ff00", warning: "#ffff00", error: "#ff0000" },
                    light: { bg: "#f0f0f0", panel: "#ffffff", accent: "#0088cc", hover: "#006699", border: "#e5e7eb", text: "#1f2937", textSecondary: "#6b7280", success: "#22c55e", warning: "#f59e0b", error: "#dc2626" },
                    purple: { bg: "#0f0a1a", panel: "#1a0f2e", accent: "#a855f7", hover: "#9333ea", border: "#2d1b4e", text: "#e8e8e8", textSecondary: "#c4b5fd", success: "#a78bfa", warning: "#fbbf24", error: "#f87171" },
                    ocean: { bg: "#0a1628", panel: "#0f1e36", accent: "#3b82f6", hover: "#2563eb", border: "#1e3a5f", text: "#e8e8e8", textSecondary: "#93c5fd", success: "#60a5fa", warning: "#fbbf24", error: "#ef4444" },
                    sunset: { bg: "#1a0f0a", panel: "#2d1810", accent: "#f97316", hover: "#ea580c", border: "#4a2817", text: "#e8e8e8", textSecondary: "#fdba74", success: "#fb923c", warning: "#fbbf24", error: "#dc2626" }
                  };
                  const colors = themes[theme] || themes.dark;
                  Object.entries(colors).forEach(([key, value]) => {
                    document.documentElement.style.setProperty('--color-' + key, value);
                  });
                  document.documentElement.style.setProperty('--kali-bg', colors.bg);
                  document.documentElement.style.setProperty('--kali-panel', colors.panel);
                  document.documentElement.style.setProperty('--kali-accent', colors.accent);
                  document.documentElement.style.setProperty('--kali-hover', colors.hover);
                  document.documentElement.style.setProperty('--kali-border', colors.border);
                  document.documentElement.style.setProperty('--kali-text', colors.text);
                } catch (e) {}
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}

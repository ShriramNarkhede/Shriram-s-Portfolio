// src/components/Dock.tsx
"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Trash2,
  Settings,
  Terminal,
  FolderOpen,
  Globe,
} from "lucide-react";
import { useWindowManager } from "@/state/useWindowManager";
import { useState } from "react";

interface DockApp {
  id: string;
  icon: React.ReactNode;
  label: string;
  type: "internal" | "external";
  link?: string;
  component?: string;
  color?: string;
}

export default function Dock() {
  const { openWindow } = useWindowManager();
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  const apps: DockApp[] = [
    {
      id: "terminal",
      icon: <Terminal className="w-7 h-7" />,
      label: "Terminal",
      type: "internal",
      component: "terminal",
      color: "#00ff00",
    },
    {
      id: "projects",
      icon: <FolderOpen className="w-7 h-7" />,
      label: "Projects",
      type: "internal",
      component: "projects",
      color: "#ffa500",
    },
    {
      id: "github",
      icon: <Github className="w-7 h-7" />,
      label: "GitHub",
      type: "external",
      link: "https://github.com/ShriramNarkhede",
      color: "#ffffff",
    },
    {
      id: "linkedin",
      icon: <Linkedin className="w-7 h-7" />,
      label: "LinkedIn",
      type: "external",
      link: "https://linkedin.com/in/shriramnarkhede",
      color: "#0077b5",
    },
    {
      id: "peerlist",
      icon: <Globe className="w-7 h-7" />,
      label: "Peerlist",
      type: "external",
      link: "https://peerlist.io/shreeram",
      color: "#00d4aa",
    },
    {
      id: "trash",
      icon: <Trash2 className="w-7 h-7" />,
      label: "Trash",
      type: "internal",
      component: "trash",
      color: "#ff4444",
    },
    {
      id: "settings",
      icon: <Settings className="w-7 h-7" />,
      label: "",
      type: "internal",
      component: "settings",
      color: "#888888",
    },
  ];

  const handleAppClick = (app: DockApp) => {
    if (app.type === "external" && app.link) {
      window.open(app.link, "_blank");
    } else if (app.type === "internal" && app.component) {
      openWindow({
        id: app.component,
        title: app.label,
        component: app.component,
        isMinimized: false,
        isMaximized: false,
        position: { x: 100, y: 100 },
        size: { width: 900, height: 600 },
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center pb-3 md:pb-6 pointer-events-none z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative pointer-events-auto flex justify-center"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 blur-2xl bg-kali-accent/20 rounded-3xl" />

        {/* Main dock container */}
        <div className="relative glass-strong px-2 md:px-3 py-2 md:py-3 rounded-2xl md:rounded-3xl flex items-center justify-center gap-1 md:gap-2 border border-white/10 noise-overlay overflow-visible no-scrollbar max-w-[95vw] md:max-w-none mx-auto">
          {/* Top highlight line */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              className="relative flex items-center justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: index * 0.05,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.button
                className="relative group flex items-center justify-center"
                whileHover={{ scale: 1.15, y: -12 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.3,
                }}
                onHoverStart={() => setHoveredApp(app.id)}
                onHoverEnd={() => setHoveredApp(null)}
                onClick={() => handleAppClick(app)}
              >
                {/* Icon glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: app.color || "#00bcd4" }}
                />

                {/* Icon container */}
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl glass-panel group-hover:glass-accent flex items-center justify-center transition-all duration-300 ease-out border border-white/10 group-hover:border-white/30">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 rounded-xl md:rounded-2xl shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <motion.div
                    className="relative flex items-center justify-center text-kali-accent"
                    style={{ color: app.color || "#00bcd4" }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="flex items-center justify-center w-5 h-5 md:w-7 md:h-7">
                      {app.icon}
                    </div>
                  </motion.div>
                </div>

                {/* Active indicator dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-0.5 md:-bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-kali-accent"
                />
              </motion.button>

              {/* Tooltip */}
              {hoveredApp === app.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none"
                >
                  <div className="glass-strong px-4 py-2 rounded-xl border border-white/10 noise-overlay">
                    {/* Top arrow */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 glass-strong border-r border-b border-white/10" />

                    <span className="text-xs text-kali-text font-medium whitespace-nowrap relative z-10">
                      {app.label}
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

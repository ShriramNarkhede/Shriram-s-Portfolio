// src/components/SettingsApp.tsx
"use client";

import { useState, useEffect } from "react";
import { Image, Palette, Info, Check, Sparkles, Menu, X } from "lucide-react";
import { useWallpaper, themes } from "@/state/useWallpaper";
import { motion, AnimatePresence } from "framer-motion";

const wallpapers = [
  { 
    id: "kali-1", 
    url: "/wallpapers/kali-bg.png", 
    name: "Kali Dragon",
    gradient: "from-blue-500 to-cyan-500" 
  },
  { 
    id: "kali-2", 
    url: "/wallpapers/kali-ascii.png", 
    name: "Dark Matrix",
    gradient: "from-gray-800 to-gray-900" 
  },
  { 
    id: "kali-3", 
    url: "/wallpapers/kali-small.png", 
    name: "Cyber Grid",
    gradient: "from-purple-600 to-pink-600" 
  },
  { 
    id: "kali-4", 
    url: "/wallpapers/kali-purple.png", 
    name: "Purple Haze",
    gradient: "from-purple-500 to-indigo-600" 
  },
  { 
    id: "kali-5", 
    url: "/wallpapers/kali-neon.png", 
    name: "Neon",
    gradient: "from-purple-600 to-pink-600" 
  },
  { 
    id: "kali-6", 
    url: "/wallpapers/kali-prompt.jpg", 
    name: "Kali Prompt",
    gradient: "from-purple-500 to-indigo-600" 
  },
  { 
    id: "kali-7", 
    url: "/wallpapers/kali-fer.jpg", 
    name: "Kali Fer",
    gradient: "from-blue-500 to-cyan-500" 
  }
];

export default function SettingsApp() {
  const [activeTab, setActiveTab] = useState("wallpaper");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { wallpaper, theme, setWallpaper, setTheme } = useWallpaper();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    { id: "wallpaper", label: "Wallpaper", icon: <Image className="w-5 h-5" /> },
    { id: "appearance", label: "Appearance", icon: <Palette className="w-5 h-5" /> },
    { id: "about", label: "About", icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col md:flex-row h-full relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${themes[theme]?.colors.accent}40`  }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          
        />
      </div>
  
      {/* Dark overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundColor: `${themes[theme]?.colors.bg}30`
      }} />

      {/* Mobile Menu Button - Always visible on mobile */}
      {isMobile && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden fixed top-1.5 left-3 z-50 w-9 h-9 rounded-lg glass-panel flex items-center justify-center border border-white/10 shadow-lg"
          style={{ color: themes[theme]?.colors.accent }}
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
        />
      )}
  
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {!isMobile && (
          <div className="w-64 border-r p-6 relative z-10" style={{
            background: 'rgba(10, 12, 20, 0.6)',
            backdropFilter: 'blur(20px)',
            borderColor: `${themes[theme]?.colors.border}`,
          }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl glass-accent flex items-center justify-center">
                <Sparkles className="w-6 h-6" style={{ color: themes[theme]?.colors.accent }} />
              </div>
              <div>
                <h2 className="text-kali-text font-bold text-lg drop-shadow">Settings</h2>
                <p className="text-xs" style={{ color: themes[theme]?.colors.textSecondary }}>
                  Customize your OS
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border"
                  style={{
                    backgroundColor: activeTab === tab.id 
                      ? `${themes[theme]?.colors.accent}20`
                      : 'transparent',
                    color: activeTab === tab.id
                      ? themes[theme]?.colors.accent
                      : themes[theme]?.colors.textSecondary,
                    borderColor: activeTab === tab.id
                      ? `${themes[theme]?.colors.accent}50`
                      : 'transparent',
                  }}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="ml-auto w-2 h-2 rounded-full"
                      style={{ backgroundColor: themes[theme]?.colors.accent }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        )}
        
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed w-64 border-r p-4 relative z-40 h-full"
            style={{
              background: 'rgba(10, 12, 20, 0.95)',
              backdropFilter: 'blur(20px)',
              borderColor: `${themes[theme]?.colors.border}`,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl glass-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5" style={{ color: themes[theme]?.colors.accent }} />
              </div>
              <div>
                <h2 className="text-kali-text font-bold text-base drop-shadow">Settings</h2>
                <p className="text-xs" style={{ color: themes[theme]?.colors.textSecondary }}>
                  Customize your OS
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all border"
                  style={{
                    backgroundColor: activeTab === tab.id 
                      ? `${themes[theme]?.colors.accent}20`
                      : 'transparent',
                    color: activeTab === tab.id
                      ? themes[theme]?.colors.accent
                      : themes[theme]?.colors.textSecondary,
                    borderColor: activeTab === tab.id
                      ? `${themes[theme]?.colors.accent}50`
                      : 'transparent',
                  }}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabMobile"
                      className="ml-auto w-2 h-2 rounded-full"
                      style={{ backgroundColor: themes[theme]?.colors.accent }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative z-10">
        <div className="p-4 md:p-8">
          <AnimatePresence mode="wait">
            {activeTab === "wallpaper" && (
              <motion.div
                key="wallpaper"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl md:text-3xl font-bold text-kali-text mb-2 md:mb-3 drop-shadow-lg">
                  Choose Wallpaper
                </h3>
                <p className="text-sm md:text-base mb-4 md:mb-8 drop-shadow" style={{ color: themes[theme]?.colors.textSecondary }}>
                  Select a wallpaper to personalize your desktop
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-4 md:pb-8">
                  {wallpapers.map((wp, index) => (
                    <motion.button
                      key={wp.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setWallpaper(wp.url)}
                      className="relative rounded-xl md:rounded-2xl overflow-hidden group border"
                      style={{
                        borderWidth: wallpaper === wp.url ? '2px' : '1px',
                        borderColor: wallpaper === wp.url 
                          ? themes[theme]?.colors.accent
                          : `${themes[theme]?.colors.border}`,
                        boxShadow: wallpaper === wp.url
                          ? `0 0 20px ${themes[theme]?.colors.accent}40`
                          : 'none',
                      }}
                    >
                      <img
                        src={wp.url}
                        alt={wp.name}
                        className="w-full h-32 md:h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        {wallpaper === wp.url ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-16 h-16 rounded-full glass-accent flex items-center justify-center border-2"
                            style={{ borderColor: themes[theme]?.colors.accent }}
                          >
                            <Check className="w-8 h-8" style={{ color: themes[theme]?.colors.accent }} />
                          </motion.div>
                        ) : (
                          <div className="glass-panel px-4 py-2 rounded-lg">
                            <span className="text-white font-medium">Select</span>
                          </div>
                        )}
                      </div>

                      <div className={`absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-r ${wp.gradient}`}>
                        <p className="text-white font-semibold text-sm md:text-base flex items-center justify-between drop-shadow">
                          {wp.name}
                          {wallpaper === wp.url && <Check className="w-4 h-4 md:w-5 md:h-5" />}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "appearance" && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl md:text-3xl font-bold text-kali-text mb-2 md:mb-3 drop-shadow-lg">
                  Theme Settings
                </h3>
                <p className="text-sm md:text-base mb-4 md:mb-8 drop-shadow" style={{ color: themes[theme]?.colors.textSecondary }}>
                  Customize the look and feel of your OS
                </p>

                <div className="space-y-3 md:space-y-4 pb-4 md:pb-8">
                  {Object.values(themes).map((t, index) => (
                    <motion.button
                      key={t.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setTheme(t.id)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-4 md:p-6 rounded-xl md:rounded-2xl border transition-all group"
                      style={{
                        backgroundColor: theme === t.id
                          ? `${t.colors.accent}20`
                          : 'rgba(255, 255, 255, 0.05)',
                        borderColor: theme === t.id
                          ? `${t.colors.accent}80`
                          : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: theme === t.id
                          ? `0 0 20px ${t.colors.accent}30`
                          : 'none',
                      }}
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="relative">
                          <div
                            className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl border-2 shadow-lg transition-transform group-hover:scale-110"
                            style={{ 
                              backgroundColor: t.colors.panel,
                              borderColor: `${t.colors.border}`,
                            }}
                          />
                          <div
                            className="absolute bottom-1 right-1 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white"
                            style={{ backgroundColor: t.colors.accent }}
                          />
                        </div>
                        <div className="text-left">
                          <div className="text-kali-text font-bold text-base md:text-lg drop-shadow">
                            {t.name}
                          </div>
                          <div className="text-xs md:text-sm" style={{ color: themes[theme]?.colors.textSecondary }}>
                            {t.id === 'dark' && 'Classic dark theme with cyan accents'}
                            {t.id === 'hacker' && 'Matrix-style green terminal theme'}
                            {t.id === 'light' && 'Clean light theme for daytime use'}
                            {t.id === 'purple' && 'Mysterious purple dream theme'}
                            {t.id === 'ocean' && 'Deep ocean blue theme'}
                            {t.id === 'sunset' && 'Warm sunset orange theme'}
                          </div>
                        </div>
                      </div>
                      
                      {theme === t.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full glass-accent flex items-center justify-center flex-shrink-0"
                        >
                          <Check className="w-5 h-5 md:w-6 md:h-6" style={{ color: t.colors.accent }} />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "about" && (
              <motion.div
                key="about"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl md:text-3xl font-bold text-kali-text mb-2 md:mb-3 drop-shadow-lg">
                  System Information
                </h3>
                <p className="text-sm md:text-base mb-4 md:mb-8 drop-shadow" style={{ color: themes[theme]?.colors.textSecondary }}>
                  About Kali Portfolio OS
                </p>

                <div className="space-y-3 md:space-y-4 pb-4 md:pb-8">
                  <InfoRow label="OS Name" value="Kali Portfolio OS" />
                  <InfoRow label="Version" value="1.0.0 (2025 Edition)" />
                  <InfoRow label="Build" value="Next.js 15.0" />
                  <InfoRow label="Desktop Environment" value="KDE Plasma (Replica)" />
                  <InfoRow label="Kernel" value="React 18.x" />
                  <InfoRow label="State Management" value="Zustand" />
                  <InfoRow label="Animation Engine" value="Framer Motion" />
                  <InfoRow label="Styling" value="TailwindCSS + Glassmorphism" />
                  <InfoRow label="Developer" value="Shriram Narkhede" />
                  <InfoRow label="Active Theme" value={themes[theme]?.name} />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 md:mt-8 p-4 md:p-6 rounded-xl md:rounded-2xl border relative overflow-hidden"
                    style={{
                      backgroundColor: `${themes[theme]?.colors.accent}20`,
                      borderColor: `${themes[theme]?.colors.accent}50`,
                    }}
                  >
                    <div className="absolute inset-0 shimmer opacity-20" />
                    <div className="relative z-10">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div 
                          className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${themes[theme]?.colors.accent}, ${themes[theme]?.colors.hover})`,
                          }}
                        >
                          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-base md:text-lg font-bold text-kali-text mb-2 drop-shadow">
                            About This Project
                          </h4>
                          <p className="text-xs md:text-sm leading-relaxed" style={{ color: themes[theme]?.colors.textSecondary }}>
                            This is a portfolio project replicating the Kali Linux 2022.2
                            desktop environment using modern web technologies. It features
                            a fully functional window manager, terminal, file system, and
                            stunning glassmorphic design with multiple theme options.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  const { theme } = useWallpaper();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl border transition-all group"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <span style={{ color: themes[theme]?.colors.textSecondary }} className="font-medium text-xs sm:text-sm">
        {label}
      </span>
      <span 
        className="font-semibold text-xs sm:text-sm transition-colors drop-shadow text-right sm:text-left"
        style={{ color: themes[theme]?.colors.text }}
      >
        {value}
      </span>
    </motion.div>
  );
}
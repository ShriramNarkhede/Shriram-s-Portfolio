// src/components/Taskbar.tsx
"use client";

import { useState, useEffect } from "react";
import { Power, Wifi, Volume2, Battery, Search, Shield } from "lucide-react";
import { useWindowManager } from "@/state/useWindowManager";
import { motion, AnimatePresence } from "framer-motion";
import VolumeControl from "./VolumeControl";
import WifiPanel from "./WifiPanel";
import BatteryPanel from "./BatteryPanel";
import CalendarPanel from "./CalendarPanel";
import AppLauncher from "./AppLauncher";
import AttackLauncher from "./AttackLauncher";

export default function Taskbar() {
  const { windows, focusWindow } = useWindowManager();
  const [time, setTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const [showPowerMenu, setShowPowerMenu] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [showWifiPanel, setShowWifiPanel] = useState(false);
  const [showBatteryPanel, setShowBatteryPanel] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAppLauncher, setShowAppLauncher] = useState(false);
  const [showAttackLauncher, setShowAttackLauncher] = useState(false);

  // Check if mobile and if windows are open
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if there are any open windows (not minimized)
  const hasOpenWindows = windows.filter(w => !w.isMinimized).length > 0;
  // Hide taskbar on mobile when windows are open
  const shouldHideTaskbar = isMobile && hasOpenWindows;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleShutdown = () => {
    window.location.href = "https://github.com/ShriramNarkhede";
  };

  // Close all panels when clicking outside
  const closeAllPanels = () => {
    setShowPowerMenu(false);
    setShowVolumeControl(false);
    setShowWifiPanel(false);
    setShowBatteryPanel(false);
    setShowCalendar(false);
    setShowAppLauncher(false);
    setShowAttackLauncher(false);
  };

  return (
    <>
      <AnimatePresence>
        {!shouldHideTaskbar && (
          <motion.div
            initial={{ y: -56, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -56, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 h-14 z-40 pointer-events-none"
          >
            <div className="absolute inset-0 glass-strong border-b border-white/5 pointer-events-auto noise-overlay">
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kali-accent/30 to-transparent" />
          
          <div className="h-full flex items-center justify-between px-2 md:px-4">
            {/* Left - App Menu & Search */}
            <div className="flex items-center gap-2 md:gap-4">
              <motion.div 
                className="flex items-center gap-1.5 md:gap-3 px-2 md:px-4 py-1.5 md:py-2 rounded-xl glass-light hover:glass-accent cursor-pointer transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-bold text-sm md:text-lg text-white/90">
                  KALI
                </span>
                <span className="font-bold text-sm md:text-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow hidden sm:inline">
                Linux
                </span>
              </motion.div>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  closeAllPanels();
                  setShowAppLauncher(!showAppLauncher);
                }}
                className="p-1.5 md:p-2.5 rounded-xl glass-light hover:glass-accent transition-all duration-300 relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                {showAppLauncher && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-kali-accent" />
                )}
              </motion.button>
            </div>

            {/* Center - Open Windows - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar max-w-[40vw] lg:max-w-none">
              {windows.filter(w => !w.isMinimized).map((window) => (
                <motion.button
                  key={window.id}
                  onClick={() => focusWindow(window.id)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 md:px-5 py-1.5 md:py-2 glass-accent rounded-xl text-kali-text text-xs md:text-sm font-medium transition-all duration-300 border border-kali-accent/30 relative overflow-hidden group whitespace-nowrap"
                >
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                  <span className="relative truncate max-w-[120px] lg:max-w-none">{window.title}</span>
                </motion.button>
              ))}
            </div>

            {/* Right - System Tray */}
            <div className="flex items-center gap-1.5 md:gap-3">
              {/* Attacks */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  closeAllPanels();
                  setShowAttackLauncher(!showAttackLauncher);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-2 md:px-3 py-1.5 md:py-2 rounded-xl glass-light hover:glass-accent transition-all border border-white/10 flex items-center gap-1.5 md:gap-2 group relative ${
                  showAttackLauncher ? 'glass-accent border-red-400/30' : ''
                }`}
              >
                <Shield className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${
                  showAttackLauncher ? 'text-red-400' : 'text-gray-400 group-hover:text-red-400'
                }`} />
                <span className={`text-[10px] md:text-xs font-medium transition-colors hidden sm:inline ${
                  showAttackLauncher ? 'text-red-400' : 'text-gray-400 group-hover:text-red-400'
                }`}>
                  Attacks
                </span>
                {showAttackLauncher && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-400" />
                )}
              </motion.button>

              {/* System icons */}
              <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-xl glass-light border border-white/10">
                <SystemIcon 
                  icon={<Wifi className="w-4 h-4" />} 
                  onClick={(e) => {
                    e.stopPropagation();
                    closeAllPanels();
                    setShowWifiPanel(!showWifiPanel);
                  }}
                  isActive={showWifiPanel}
                />
                <SystemIcon 
                  icon={<Volume2 className="w-4 h-4" />} 
                  onClick={(e) => {
                    e.stopPropagation();
                    closeAllPanels();
                    setShowVolumeControl(!showVolumeControl);
                  }}
                  isActive={showVolumeControl}
                />
                <SystemIcon 
                  icon={<Battery className="w-4 h-4" />} 
                  onClick={(e) => {
                    e.stopPropagation();
                    closeAllPanels();
                    setShowBatteryPanel(!showBatteryPanel);
                  }}
                  isActive={showBatteryPanel}
                />
              </div>

              {/* Clock */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  closeAllPanels();
                  setShowCalendar(!showCalendar);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-2 md:px-4 py-1.5 md:py-2 rounded-xl glass-light hover:glass-accent transition-all border border-white/10 relative"
              >
                <div className="text-kali-text text-xs md:text-sm font-semibold tabular-nums">
                  {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="text-[10px] md:text-xs text-gray-400 hidden sm:block">
                  {time.toLocaleDateString([], { month: "short", day: "numeric" })}
                </div>
                {showCalendar && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-kali-accent" />
                )}
              </motion.button>

              {/* Power Menu */}
              <div className="relative">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeAllPanels();
                    setShowPowerMenu(!showPowerMenu);
                  }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-xl glass-light hover:glass-accent flex items-center justify-center transition-all duration-300 border border-white/10 group"
                >
                  <Power className="w-4 h-4 md:w-5 md:h-5 text-kali-accent group-hover:text-red-400 transition-colors" />
                </motion.button>

                <AnimatePresence>
                  {showPowerMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute top-14 right-0 glass-strong rounded-2xl overflow-hidden w-56 kali-shadow-lg border border-white/10 noise-overlay"
                    >
                      <div className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                      
                      <button
                        onClick={handleShutdown}
                        className="w-full px-5 py-4 hover:bg-red-500/10 text-left text-kali-text text-sm flex items-center gap-3 transition-all duration-300 border-b border-white/5 group"
                      >
                        <div className="w-10 h-10 rounded-xl glass-light group-hover:bg-red-500/20 flex items-center justify-center transition-all duration-300">
                          <Power className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <div className="font-medium">Shutdown</div>
                          <div className="text-xs text-gray-500">Visit GitHub Profile</div>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
        )}
      </AnimatePresence>

      {/* Control Panels */}
      <AnimatePresence>
        {showVolumeControl && (
          <VolumeControl onClose={closeAllPanels} />
        )}
        {showWifiPanel && (
          <WifiPanel onClose={closeAllPanels} />
        )}
        {showBatteryPanel && (
          <BatteryPanel onClose={closeAllPanels} />
        )}
        {showCalendar && (
          <CalendarPanel onClose={closeAllPanels} currentTime={time} />
        )}
        {showAppLauncher && (
          <AppLauncher onClose={closeAllPanels} />
        )}
        {showAttackLauncher && (
          <AttackLauncher onClose={closeAllPanels} />
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {(showVolumeControl || showWifiPanel || showBatteryPanel || showCalendar || showAppLauncher || showAttackLauncher || showPowerMenu) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAllPanels}
            className="fixed inset-0 z-30"
          />
        )}
      </AnimatePresence>
    </>
  );
}

function SystemIcon({ icon, onClick, isActive }: { 
  icon: React.ReactNode; 
  onClick: (e: React.MouseEvent) => void;
  isActive?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.2, y: -2 }}
      whileTap={{ scale: 0.9 }}
      className={`relative transition-colors cursor-pointer ${
        isActive ? 'text-kali-accent' : 'text-gray-400 hover:text-kali-accent'
      }`}
    >
      {icon}
      {isActive && (
        <motion.div
          layoutId="activeIcon"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-kali-accent"
        />
      )}
    </motion.button>
  );
}
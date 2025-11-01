// src/components/AppLauncher.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  FolderOpen, 
  Mail, 
  Settings, 
  Trash2, 
  User,
  Code,
  Search,
  X
} from "lucide-react";
import { useWindowManager } from "@/state/useWindowManager";

interface AppLauncherProps {
  onClose: () => void;
}

const apps = [
  {
    id: "terminal",
    name: "Terminal",
    icon: <Terminal className="w-8 h-8" />,
    color: "#00ff00",
    category: "System",
  },
  {
    id: "about",
    name: "About Me",
    icon: <User className="w-8 h-8" />,
    color: "#00bcd4",
    category: "Personal",
  },
  {
    id: "projects",
    name: "Projects",
    icon: <Code className="w-8 h-8" />,
    color: "#4ade80",
    category: "Development",
  },
  {
    id: "contact",
    name: "Contact",
    icon: <Mail className="w-8 h-8" />,
    color: "#a855f7",
    category: "Communication",
  },
  {
    id: "settings",
    name: "Settings",
    icon: <Settings className="w-8 h-8" />,
    color: "#888888",
    category: "System",
  },
  {
    id: "trash",
    name: "Trash",
    icon: <Trash2 className="w-8 h-8" />,
    color: "#ff4444",
    category: "System",
  },
];

export default function AppLauncher({ onClose }: AppLauncherProps) {
  const { openWindow } = useWindowManager();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppClick = (app: typeof apps[0]) => {
    openWindow({
      id: app.id,
      title: app.name,
      component: app.id,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100, y: 100 },
      size: { width: 900, height: 600 },
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      className="fixed top-20 left-1/2 -translate-x-1/2 rounded-2xl md:rounded-3xl overflow-hidden w-[calc(100vw-2rem)] max-w-[600px] kali-shadow-lg z-50"
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'rgba(12, 14, 24, 0.95)',
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-kali-accent/50 to-transparent" />
      
      <div className="p-4 md:p-8">
        {/* Search Bar */}
        <div className="relative mb-4 md:mb-8">
          <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applications..."
            className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-2 md:py-3 rounded-xl outline-none text-kali-text placeholder-gray-500 transition-all border text-sm md:text-base"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'rgba(255, 255, 255, 0.15)',
            }}
            autoFocus
          />
          {searchQuery && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <X className="w-4 h-4 text-gray-400" />
            </motion.button>
          )}
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 max-h-[50vh] md:max-h-[400px] overflow-auto">
          <AnimatePresence>
            {filteredApps.map((app, index) => (
              <motion.button
                key={app.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAppClick(app)}
                className="flex flex-col items-center gap-2 md:gap-3 p-2.5 md:p-4 rounded-xl md:rounded-2xl transition-all border group"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <div
                  className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center transition-all"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    boxShadow: `0 0 20px ${app.color}30`,
                  }}
                >
                  <span style={{ color: app.color }} className="scale-75 md:scale-100">
                    {app.icon}
                  </span>
                </div>
                
                <div className="text-center">
                  <div className="text-xs md:text-sm font-medium text-kali-text group-hover:text-kali-accent transition-colors drop-shadow">
                    {app.name}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">
                    {app.category}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {filteredApps.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">No applications found</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
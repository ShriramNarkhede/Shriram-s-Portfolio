// src/components/ContextMenu.tsx
"use client";

import { motion } from "framer-motion";
import { FolderPlus, Image, RefreshCw, Settings, RotateCcw } from "lucide-react";
import { useFileSystem } from "@/state/useFileSystem";
import { useWindowManager } from "@/state/useWindowManager";
import { useIconPositions } from "@/state/useIconPositions"; // ADD THIS

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export default function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  const { createFolder } = useFileSystem();
  const { openWindow } = useWindowManager();
  const { resetPositions } = useIconPositions(); // ADD THIS

  const menuItems = [
    {
      icon: <FolderPlus className="w-4 h-4" />,
      label: "New Folder",
      color: "#ffa500",
      action: () => {
        createFolder("New Folder", { x: x - 50, y: y - 50 });
        onClose();
      },
    },
    {
      icon: <Image className="w-4 h-4" />,
      label: "Change Wallpaper",
      color: "#00bcd4",
      action: () => {
        openWindow({
          id: "settings",
          title: "",
          component: "settings",
          isMinimized: false,
          isMaximized: false,
          position: { x: 200, y: 100 },
          size: { width: 800, height: 600 },
        });
        onClose();
      },
    },
    {
      icon: <Settings className="w-4 h-4" />,
      label: "Display Settings",
      color: "#888888",
      action: () => {
        openWindow({
          id: "settings",
          title: "Settings",
          component: "settings",
          isMinimized: false,
          isMaximized: false,
          position: { x: 200, y: 100 },
          size: { width: 800, height: 600 },
        });
        onClose();
      },
    },
    // ADD THIS NEW OPTION
    {
      icon: <RotateCcw className="w-4 h-4" />,
      label: "Reset Icon Positions",
      color: "#a855f7",
      action: () => {
        resetPositions();
        onClose();
      },
    },
    {
      icon: <RefreshCw className="w-4 h-4" />,
      label: "Refresh",
      color: "#4ade80",
      action: () => {
        window.location.reload();
        onClose();
      },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ type: "spring", duration: 0.3 }}
      className="fixed z-[9999] min-w-[240px]"
      style={{ top: y, left: x }}
    >
      <div className="glass-strong rounded-2xl overflow-hidden kali-shadow-lg border border-white/10 noise-overlay">
        {/* Top gradient line */}
        <div className="h-px bg-gradient-to-r from-transparent via-kali-accent/50 to-transparent" />

        <div className="p-1.5">
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={item.action}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="w-full px-4 py-3 flex items-center gap-3 hover:glass-accent text-kali-text transition-all text-sm rounded-xl group border border-transparent hover:border-white/10"
            >
              <div
                className="w-8 h-8 rounded-lg glass-light group-hover:glass-accent flex items-center justify-center transition-all duration-300"
                style={{
                  boxShadow: `0 0 20px ${item.color}20`,
                }}
              >
                <span style={{ color: item.color }}>{item.icon}</span>
              </div>

              <span className="flex-1 text-left font-medium">{item.label}</span>

              {/* Hover indicator */}
              <motion.div className="w-1 h-1 rounded-full bg-kali-accent opacity-0 group-hover:opacity-100" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
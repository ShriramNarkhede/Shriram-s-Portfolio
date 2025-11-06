// src/components/AttackLauncher.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Shield, Network, Target, Key, Radio, X } from "lucide-react";
import { useWindowManager } from "@/state/useWindowManager";

interface AttackLauncherProps {
  onClose: () => void;
}

interface Attack {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const attacks: Attack[] = [
  {
    id: "phishing",
    name: "Phishing Attack",
    icon: <Shield className="w-8 h-8" />,
    color: "#ef4444",
    description: "start phishing attack",
  },
  {
    id: "nmap",
    name: "Nmap Scanner",
    icon: <Network className="w-8 h-8" />,
    color: "#3b82f6",
    description: "Network discovery tool",
  },
  {
    id: "metasploit",
    name: "Metasploit",
    icon: <Target className="w-8 h-8" />,
    color: "#a855f7",
    description: "Exploitation framework",
  },
  {
    id: "john",
    name: "John the Ripper",
    icon: <Key className="w-8 h-8" />,
    color: "#f97316",
    description: "Password cracker",
  },
  {
    id: "wireshark",
    name: "Wireshark",
    icon: <Radio className="w-8 h-8" />,
    color: "#22c55e",
    description: "Packet analyzer",
  },
];

export default function AttackLauncher({ onClose }: AttackLauncherProps) {
  const { openWindow } = useWindowManager();

  const handleAttackClick = (attack: Attack) => {
    openWindow({
      id: attack.id,
      title: attack.name,
      component: attack.id,
      isMinimized: false,
      isMaximized: false,
      position: { x: 200, y: 150 },
      size: { width: 900, height: 600 },
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      className="fixed top-14 right-2 md:right-4 rounded-2xl md:rounded-3xl overflow-hidden w-[calc(100vw-1rem)] max-w-80 kali-shadow-lg z-50"
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'rgba(12, 14, 24, 0.75)',
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-4 md:mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-base md:text-lg font-bold text-kali-text flex items-center gap-1.5 md:gap-2">
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
              Security Tools
            </h3>
            <p className="text-[10px] md:text-xs text-gray-400 mt-0.5 md:mt-1">Kali Linux Attacks</p>
          </div>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <X className="w-4 h-4 text-gray-400" />
          </motion.button>
        </div>

        {/* Attack Tools Grid */}
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <AnimatePresence>
            {attacks.map((attack, index) => (
              <motion.button
                key={attack.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAttackClick(attack)}
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
                    boxShadow: `0 0 20px ${attack.color}30`,
                  }}
                >
                  <span style={{ color: attack.color }} className="scale-75 md:scale-100">
                    {attack.icon}
                  </span>
                </div>
                
                <div className="text-center">
                  <div className="text-xs md:text-sm font-medium text-kali-text group-hover:text-kali-accent transition-colors drop-shadow">
                    {attack.name.split(' ')[0]}
                  </div>
                  {attack.name.split(' ').length > 1 && (
                    <div className="text-[10px] md:text-xs text-gray-500 mt-0.5">
                      {attack.name.split(' ').slice(1).join(' ')}
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-xs text-gray-500 text-center">
            simulations only
          </p>
        </div>
      </div>
    </motion.div>
  );
}


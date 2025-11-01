// src/components/BatteryPanel.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Battery, BatteryCharging, Zap, Clock } from "lucide-react";

interface BatteryPanelProps {
  onClose: () => void;
}

export default function BatteryPanel({ onClose }: BatteryPanelProps) {
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [isCharging, setIsCharging] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("4h 32m");

  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100));
        setIsCharging(battery.charging);
        
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
        
        battery.addEventListener('chargingchange', () => {
          setIsCharging(battery.charging);
        });
      });
    }
  }, []);

  const getBatteryColor = () => {
    if (isCharging) return '#4ade80';
    if (batteryLevel > 50) return '#00bcd4';
    if (batteryLevel > 20) return '#ffa500';
    return '#ff4444';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className="fixed top-14 right-2 md:right-64 rounded-2xl md:rounded-2xl overflow-hidden w-[calc(100vw-1rem)] max-w-80 kali-shadow-lg z-50 max-h-[calc(100vh-5rem)] md:max-h-[500px]"
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'rgba(12, 14, 24, 0.95)',
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-kali-accent/50 to-transparent" />
      
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-semibold text-kali-text drop-shadow-lg">Battery</h3>
          <div className="flex items-center gap-2">
            {isCharging ? (
              <BatteryCharging className="w-5 h-5 text-green-400" />
            ) : (
              <Battery className="w-5 h-5 text-kali-accent" />
            )}
          </div>
        </div>

        {/* Battery Percentage */}
        <div className="text-center mb-6">
          <motion.div
            className="text-6xl font-bold mb-2 drop-shadow-lg"
            style={{ color: getBatteryColor() }}
            animate={{
              scale: isCharging ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: isCharging ? Infinity : 0,
            }}
          >
            {batteryLevel}%
          </motion.div>
          <p className="text-sm text-gray-400">
            {isCharging ? 'Charging' : 'On Battery'}
          </p>
        </div>

        {/* Battery Visual */}
        <div 
          className="relative h-24 rounded-xl p-2 mb-6 border"
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="h-full w-full relative overflow-hidden rounded-lg">
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-lg"
              style={{
                background: `linear-gradient(to top, ${getBatteryColor()}, ${getBatteryColor()}AA)`,
              }}
              initial={{ height: 0 }}
              animate={{ height: `${batteryLevel}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            
            {isCharging && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Zap className="w-8 h-8 text-white drop-shadow-lg" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Battery Info */}
        <div className="space-y-3">
          <div 
            className="flex items-center justify-between p-3 rounded-xl border"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Time Remaining</span>
            </div>
            <span className="text-sm font-semibold text-kali-text drop-shadow">
              {isCharging ? 'Calculating...' : timeRemaining}
            </span>
          </div>

          <div 
            className="flex items-center justify-between p-3 rounded-xl border"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="flex items-center gap-2 text-gray-400">
              <Zap className="w-4 h-4" />
              <span className="text-sm">Power Mode</span>
            </div>
            <span className="text-sm font-semibold text-kali-text drop-shadow">
              Balanced
            </span>
          </div>
        </div>

        {/* Power Modes */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          {['Power Saver', 'Balanced', 'Performance'].map((mode) => (
            <motion.button
              key={mode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-2 rounded-lg text-xs font-medium transition-all border ${
                mode === 'Balanced'
                  ? 'text-kali-accent border-kali-accent/50'
                  : 'text-gray-400 border-white/10'
              }`}
              style={{
                background: mode === 'Balanced'
                  ? 'rgba(0, 188, 212, 0.15)'
                  : 'rgba(255, 255, 255, 0.05)',
              }}
            >
              {mode}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
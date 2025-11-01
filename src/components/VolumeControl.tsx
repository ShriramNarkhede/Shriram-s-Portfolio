// src/components/VolumeControl.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Volume1 } from "lucide-react";

interface VolumeControlProps {
  onClose: () => void;
}

export default function VolumeControl({ onClose }: VolumeControlProps) {
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="w-5 h-5" />;
    if (volume < 50) return <Volume1 className="w-5 h-5" />;
    return <Volume2 className="w-5 h-5" />;
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
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-semibold text-kali-text drop-shadow-lg">Volume</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all text-kali-accent"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {getVolumeIcon()}
          </motion.button>
        </div>

        {/* Volume Slider */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseInt(e.target.value));
                  if (parseInt(e.target.value) > 0) setIsMuted(false);
                }}
                className="volume-slider w-full"
                style={{
                  background: `linear-gradient(to right, #00bcd4 0%, #00bcd4 ${volume}%, rgba(255,255,255,0.15) ${volume}%, rgba(255,255,255,0.15) 100%)`,
                }}
              />
            </div>
            <span className="text-kali-accent font-bold text-lg w-12 text-right drop-shadow-lg">
              {isMuted ? 0 : volume}%
            </span>
          </div>

          {/* Visual Volume Bars */}
          <div 
            className="flex items-end gap-1 h-16 p-3 rounded-xl"
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-lg transition-all"
                style={{
                  height: `${((i + 1) / 20) * 100}%`,
                  backgroundColor: i < (volume / 5) && !isMuted
                    ? i < 14 ? '#00bcd4' : i < 18 ? '#ffa500' : '#ff4444'
                    : 'rgba(255,255,255,0.15)',
                  opacity: i < (volume / 5) && !isMuted ? 1 : 0.4,
                }}
                animate={{
                  opacity: i < (volume / 5) && !isMuted ? [0.6, 1, 0.6] : 0.4,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>
        </div>

        {/* Quick Volume Presets */}
        <div className="mt-6 grid grid-cols-4 gap-2">
          {[0, 33, 66, 100].map((preset) => (
            <motion.button
              key={preset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setVolume(preset);
                setIsMuted(preset === 0);
              }}
              className={`py-2 rounded-lg text-sm font-medium transition-all ${
                volume === preset && !isMuted
                  ? 'text-kali-accent border-kali-accent/50'
                  : 'text-gray-400 border-white/10'
              }`}
              style={{
                background: volume === preset && !isMuted
                  ? 'rgba(0, 188, 212, 0.2)'
                  : 'rgba(255, 255, 255, 0.08)',
                border: '1px solid',
              }}
            >
              {preset}%
            </motion.button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .volume-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 3px;
          outline: none;
        }

        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00bcd4;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 188, 212, 0.5);
          transition: all 0.2s;
        }

        .volume-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 15px rgba(0, 188, 212, 0.8);
        }

        .volume-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00bcd4;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(0, 188, 212, 0.5);
        }
      `}</style>
    </motion.div>
  );
}
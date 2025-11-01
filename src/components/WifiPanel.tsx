// src/components/WifiPanel.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wifi, WifiOff, Lock } from "lucide-react";

interface WifiPanelProps {
  onClose: () => void;
}

const networks = [
  { name: "Home Network 5G", signal: 100, secured: true, connected: true },
  { name: "Office WiFi", signal: 85, secured: true, connected: false },
  { name: "Guest Network", signal: 60, secured: false, connected: false },
  { name: "Neighbor WiFi", signal: 40, secured: true, connected: false },
  { name: "Mobile Hotspot", signal: 25, secured: true, connected: false },
];

export default function WifiPanel({ onClose }: WifiPanelProps) {
  const [isEnabled, setIsEnabled] = useState(true);
  const connectedNetwork = networks.find(n => n.connected);

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
          <h3 className="text-base md:text-lg font-semibold text-kali-text drop-shadow-lg">WiFi Networks</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEnabled(!isEnabled)}
            className="w-12 h-6 rounded-full transition-all relative"
            style={{
              background: isEnabled 
                ? 'linear-gradient(135deg, #00bcd4, #0097a7)'
                : 'rgba(107, 114, 128, 0.8)',
            }}
          >
            <motion.div
              className="w-5 h-5 bg-white rounded-full shadow-lg absolute top-0.5"
              animate={{ x: isEnabled ? 26 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.button>
        </div>

        {isEnabled ? (
          <>
            {/* Connected Network */}
            {connectedNetwork && (
              <div 
                className="mb-4 p-4 rounded-xl border"
                style={{
                  background: 'rgba(0, 188, 212, 0.15)',
                  borderColor: 'rgba(0, 188, 212, 0.3)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wifi className="w-5 h-5 text-kali-accent" />
                    <div>
                      <div className="text-sm font-semibold text-kali-text drop-shadow">
                        {connectedNetwork.name}
                      </div>
                      <div className="text-xs text-green-400">Connected</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {connectedNetwork.secured && (
                      <Lock className="w-4 h-4 text-green-400" />
                    )}
                    <SignalStrength strength={connectedNetwork.signal} />
                  </div>
                </div>
              </div>
            )}

            {/* Available Networks */}
            <div className="space-y-2 max-h-80 overflow-auto">
              <div className="text-xs text-gray-400 mb-2 font-medium">
                Available Networks
              </div>
              {networks
                .filter(n => !n.connected)
                .map((network, index) => (
                  <motion.button
                    key={network.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="w-full p-3 rounded-xl transition-all text-left border"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Wifi className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-kali-text drop-shadow">
                          {network.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {network.secured && (
                          <Lock className="w-3 h-3 text-gray-500" />
                        )}
                        <SignalStrength strength={network.signal} size="sm" />
                      </div>
                    </div>
                  </motion.button>
                ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <WifiOff className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">WiFi is disabled</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SignalStrength({ strength, size = "md" }: { strength: number; size?: "sm" | "md" }) {
  const bars = Math.ceil((strength / 100) * 4);
  const heights = size === "sm" ? [6, 9, 12, 15] : [8, 12, 16, 20];

  return (
    <div className="flex items-end gap-0.5">
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className="w-1 rounded-full transition-all"
          style={{ 
            height: heights[bar - 1],
            backgroundColor: bar <= bars ? '#00bcd4' : 'rgba(255, 255, 255, 0.2)',
          }}
        />
      ))}
    </div>
  );
}
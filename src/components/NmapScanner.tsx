// src/components/NmapScanner.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Terminal, Play, Loader2, Shield } from "lucide-react";

export default function NmapScanner() {
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const simulateScan = () => {
    setIsRunning(true);
    setIsComplete(false);
    setOutput([]);

    const steps = [
      "Starting Nmap 7.94 ( https://nmap.org )",
      "Nmap scan report for target.local (192.168.1.100)",
      "Host is up (0.023s latency).",
      "",
      "PORT     STATE  SERVICE",
      "22/tcp   open   ssh",
      "80/tcp   open   http",
      "443/tcp  open   https",
      "3306/tcp open   mysql",
      "8080/tcp open   http-proxy",
      "",
      "[*] Scanning for vulnerabilities...",
      "[+] Detected: OpenSSH 8.2p1",
      "[+] Detected: Apache httpd 2.4.41",
      "[*] Checking service versions...",
      "[!] Warning: MySQL exposed without authentication",
      "[+] HTTP server running: Apache/2.4.41",
      "[*] OS detection in progress...",
      "Aggressive OS guesses: Linux 5.4 (99%)",
      "",
      "═════════════════════",
      "      NMAP SCAN COMPLETE",
      "═════════════════════",
      "",
      "Total scan time: 12.45 seconds",
      "Services found: 5",
      "",
      "[*] Network reconnaissance successful!",
      "",
      "Pro tip: Always secure your ports bhai, warna next scan me tumhara data leak ho jayega! 😎",
      "",
      "═════════════════════",
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setOutput((prev) => [...prev, step]);
        if (index === steps.length - 1) {
          setIsRunning(false);
          setIsComplete(true);
        }
      }, index * 250);
    });
  };

  return (
    <div className="h-full relative flex flex-col overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{ top: "20%", left: "10%" }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 relative z-10 overflow-y-auto no-scrollbar">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="relative w-32 h-32 mx-auto mb-6"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-2xl" />
                <div className="relative w-full h-full rounded-full glass-accent flex items-center justify-center border-2 border-blue-500/50">
                  <Network className="w-16 h-16 text-blue-400" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold mb-3 drop-shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #3b82f6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Nmap Network Scanner
              </motion.h1>
              <p className="text-gray-400 text-sm drop-shadow">
                Network Discovery & Security Scanning
              </p>
            </motion.div>

            {/* Start Button */}
            {!isRunning && !isComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-center mb-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={simulateScan}
                  className="px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                    boxShadow: "0 8px 30px rgba(59, 130, 246, 0.4)",
                  }}
                >
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                  <Play className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Start Network Scan</span>
                </motion.button>
              </motion.div>
            )}

            {/* Terminal Output */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-panel p-6 rounded-2xl border border-white/10 noise-overlay font-mono text-sm"
            >
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                <Terminal className="w-5 h-5 text-blue-400" />
                <span className="text-kali-text font-semibold">Scan Output</span>
                {isRunning && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="ml-auto"
                  >
                    <Loader2 className="w-4 h-4 text-blue-400" />
                  </motion.div>
                )}
              </div>

              <div className="space-y-1 min-h-[300px]">
                <AnimatePresence>
                  {output.length === 0 && !isRunning && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-gray-500 italic"
                    >
                      Click "Start Network Scan" to begin scanning...
                    </motion.div>
                  )}
                  {output.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={
                        line.includes("open") || line.includes("SUCCESS")
                          ? "text-green-400"
                          : line.includes("Warning") || line.includes("!")
                          ? "text-yellow-400"
                          : line.includes("Pro tip") || line.includes("bhai")
                          ? "text-yellow-400 font-bold text-base"
                          : line.includes("═══")
                          ? "text-blue-400"
                          : line.includes("PORT") || line.includes("STATE")
                          ? "text-cyan-400 font-semibold"
                          : "text-gray-300"
                      }
                    >
                      {line || "\u00A0"}
                    </motion.div>
                  ))}
                  {isRunning && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-blue-400"
                    >
                      ▊
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}


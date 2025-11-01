// src/components/PhishingAttack.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, Terminal, Play, Loader2 } from "lucide-react";

export default function PhishingAttack() {
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const simulateAttack = () => {
    setIsRunning(true);
    setIsComplete(false);
    setOutput([]);

    const steps = [
      "[*] Initializing phishing attack simulation...",
      "[+] Scanning target network...",
      "[*] Establishing connection...",
      "[+] Injecting payload...",
      "[*] Attempting credential harvesting...",
      "[!] Warning: Security protocols detected...",
      "[*] Bypassing firewall...",
      "[+] Exploiting vulnerability...",
      "[*] Extracting sensitive data...",
      "[+] Installing backdoor...",
      "[*] Attack in progress...",
      "[!] ERROR: Anti-phishing system activated!",
      "[*] Attack blocked by security measures...",
      "",
      "═════════════════════",
      "      PHISHING ATTACK SIMULATION",
      "═════════════════════",
      "",
      "Attack Status: FAILED ❌",
      "Reason: Security awareness activated",
      "",
      "═════════════════════",
      "",
      "Bhai phishing chor vo DSA ka kya hua ??",
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
      }, index * 300);
    });
  };

  return (
    <div className="h-full relative flex flex-col overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-red-500/20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{ top: "20%", left: "10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-orange-500/20 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ bottom: "20%", right: "10%" }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 to-orange-900/10 pointer-events-none" />

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
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/30 to-orange-500/30 blur-2xl" />
                <div className="relative w-full h-full rounded-full glass-accent flex items-center justify-center border-2 border-red-500/50">
                  <Shield className="w-16 h-16 text-red-400" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold mb-3 drop-shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #ef4444 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Phishing Attack
              </motion.h1>
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
                  onClick={simulateAttack}
                  className="px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, #ef4444, #f97316)",
                    boxShadow: "0 8px 30px rgba(239, 68, 68, 0.4)",
                  }}
                >
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                  <Play className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Start Attack Now</span>
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
                <Terminal className="w-5 h-5 text-red-400" />
                <span className="text-kali-text font-semibold">Attack Terminal</span>
                {isRunning && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="ml-auto"
                  >
                    <Loader2 className="w-4 h-4 text-red-400" />
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
                      Click "Start Attack Simulation" to begin...
                    </motion.div>
                  )}
                  {output.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={
                        line.includes("ERROR") || line.includes("Warning")
                          ? "text-red-400"
                          : line.includes("SUCCESS") || line.includes("[+]")
                          ? "text-green-400"
                          : line.includes("Bhai") || line.includes("DSA")
                          ? "text-yellow-400 font-bold text-lg"
                          : line.includes("═══")
                          ? "text-kali-accent"
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
                      className="text-kali-accent"
                    >
                      ▊
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Warning Message */}
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 glass-panel p-6 rounded-2xl border border-yellow-500/30 relative overflow-hidden"
                style={{
                  background: "rgba(234, 179, 8, 0.1)",
                }}
              >
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-yellow-400 font-bold mb-2">Security Reminder</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      This is a simulated phishing attack for educational purposes only. 
                      Always be cautious of suspicious emails, links, and requests for personal information.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


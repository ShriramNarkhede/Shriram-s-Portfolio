// src/components/Metasploit.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Terminal, Play, Loader2, Zap } from "lucide-react";

export default function Metasploit() {
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const simulateExploit = () => {
    setIsRunning(true);
    setIsComplete(false);
    setOutput([]);

    const steps = [
      "[*] Starting Metasploit Framework...",
      "[*] Initializing modules...",
      "",
      "       =[ metasploit v6.3.0-dev ]",
      "+ -- --=[ 2191 exploits - 1172 auxiliary - 408 post ]",
      "+ -- --=[ 968 payloads - 45 encoders - 11 nops ]",
      "",
      "[*] Searching for exploit modules...",
      "[+] Found: exploit/multi/handler",
      "[*] Setting payload: windows/meterpreter/reverse_tcp",
      "[*] Configuring exploit parameters...",
      "",
      "RHOSTS => 192.168.1.100",
      "LHOST => 192.168.1.50",
      "LPORT => 4444",
      "",
      "[*] Exploit module loaded",
      "[*] Starting reverse TCP handler...",
      "[*] Exploit target set to: Windows 10",
      "[*] Sending payload...",
      "[*] Attempting to establish connection...",
      "",
      "[+] Session established!",
      "[*] Meterpreter session opened: 192.168.1.100:4444",
      "",
      "meterpreter > sysinfo",
      "Computer        : TARGET-PC",
      "OS              : Windows 10 (Build 19042)",
      "Architecture    : x64",
      "System Language : en_US",
      "",
      "[*] Exploitation successful!",
      "",
      "═════════════════════",
      "      EXPLOIT EXECUTION COMPLETE",
      "═════════════════════",
      "",
      "[!] This is a simulation for educational purposes.",
      "",
      "Beta Tumse na Hopayega!!",
      "Always update your systems and use strong passwords!",
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
      }, index * 280);
    });
  };

  return (
    <div className="h-full relative flex flex-col overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ top: "30%", left: "20%" }}
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
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-2xl" />
                <div className="relative w-full h-full rounded-full glass-accent flex items-center justify-center border-2 border-purple-500/50">
                  <Target className="w-16 h-16 text-purple-400" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold mb-3 drop-shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Metasploit Framework
              </motion.h1>
              <p className="text-gray-400 text-sm drop-shadow">
                Penetration Testing & Exploitation Framework
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
                  onClick={simulateExploit}
                  className="px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, #a855f7, #ec4899)",
                    boxShadow: "0 8px 30px rgba(168, 85, 247, 0.4)",
                  }}
                >
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                  <Play className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Launch Exploit</span>
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
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-kali-text font-semibold">Metasploit Console</span>
                {isRunning && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="ml-auto"
                  >
                    <Loader2 className="w-4 h-4 text-purple-400" />
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
                      Click "Launch Exploit" to begin simulation...
                    </motion.div>
                  )}
                  {output.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={
                        line.includes("[+]") || line.includes("successful")
                          ? "text-green-400"
                          : line.includes("[!]") || line.includes("Warning")
                          ? "text-yellow-400"
                          : line.includes("bhai") || line.includes("Bhai")
                          ? "text-yellow-400 font-bold text-base"
                          : line.includes("═══")
                          ? "text-purple-400"
                          : line.includes("[*]") || line.includes("meterpreter")
                          ? "text-cyan-400"
                          : line.includes("=")
                          ? "text-purple-300"
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
                      className="text-purple-400"
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


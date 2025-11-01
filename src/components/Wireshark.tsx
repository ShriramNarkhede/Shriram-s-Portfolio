// src/components/Wireshark.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Terminal, Play, Loader2, Activity } from "lucide-react";

export default function Wireshark() {
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const simulateCapture = () => {
    setIsRunning(true);
    setIsComplete(false);
    setOutput([]);

    const steps = [
      "[*] Starting Wireshark packet capture...",
      "[*] Interface: eth0 (wired)",
      "[*] Filter: tcp",
      "",
      "[+] Capture started successfully",
      "",
      "No.  Time      Source            Destination       Protocol Length Info",
      "─────────────────────",
      "1    0.000000  192.168.1.50      192.168.1.1       TCP      64    443 → 80",
      "2    0.023450  192.168.1.1       192.168.1.50      TCP      60    80 → 443",
      "3    0.045621  192.168.1.50      8.8.8.8          DNS      74    Standard query",
      "4    0.067832  8.8.8.8          192.168.1.50      DNS      90    Standard query response",
      "5    0.089012  192.168.1.50      93.184.216.34    HTTP     234   GET /index.html",
      "6    0.112345  93.184.216.34    192.168.1.50     HTTP     512   HTTP/1.1 200 OK",
      "7    0.134567  192.168.1.100    192.168.1.50     TCP      54    22 → 443",
      "",
      "[*] Analyzing captured packets...",
      "[+] HTTP traffic detected",
      "[+] DNS queries intercepted",
      "[+] TCP handshake observed",
      "",
      "[*] Extracting payload data...",
      "[+] HTTP headers captured",
      "[!] Warning: Unencrypted HTTP detected",
      "",
      "═════════════════════",
      "      PACKET CAPTURE SUMMARY",
      "═════════════════════",
      "",
      "Total packets: 7",
      "Protocols: TCP, HTTP, DNS",
      "Capture duration: 0.13 seconds",
      "",
      "[!] Always use HTTPS for sensitive data!",
      "",
      "Your network is not secure, use VPN and HTTPS to protect your data!🔍",
      "Use VPN aur HTTPS to protect your data!",
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
      }, index * 220);
    });
  };

  return (
    <div className="h-full relative flex flex-col overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-green-500/20 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
          style={{ bottom: "20%", left: "20%" }}
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
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-500/30 blur-2xl" />
                <div className="relative w-full h-full rounded-full glass-accent flex items-center justify-center border-2 border-green-500/50">
                  <Radio className="w-16 h-16 text-green-400" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold mb-3 drop-shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #22c55e 0%, #10b981 50%, #22c55e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Wireshark Packet Analyzer
              </motion.h1>
              <p className="text-gray-400 text-sm drop-shadow">
                Network Protocol Analyzer
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
                  onClick={simulateCapture}
                  className="px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, #22c55e, #10b981)",
                    boxShadow: "0 8px 30px rgba(34, 197, 94, 0.4)",
                  }}
                >
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                  <Play className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Start Packet Capture</span>
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
                <Activity className="w-5 h-5 text-green-400" />
                <span className="text-kali-text font-semibold">Packet Capture</span>
                {isRunning && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="ml-auto"
                  >
                    <Loader2 className="w-4 h-4 text-green-400" />
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
                      Click "Start Packet Capture" to begin...
                    </motion.div>
                  )}
                  {output.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={
                        line.includes("[+]") || line.includes("HTTP")
                          ? "text-green-400"
                          : line.includes("[!]") || line.includes("Warning")
                          ? "text-yellow-400"
                          : line.includes("bhai") || line.includes("Bhai")
                          ? "text-yellow-400 font-bold text-base"
                          : line.includes("═══") || line.includes("──")
                          ? "text-green-400"
                          : line.includes("[*]") || line.includes("TCP") || line.includes("DNS")
                          ? "text-cyan-400"
                          : line.match(/^\d+\s+/) 
                          ? "text-blue-300"
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
                      className="text-green-400"
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


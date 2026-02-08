// src/components/JohnTheRipper.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Terminal, Play, Loader2, Lock } from "lucide-react";

export default function JohnTheRipper() {
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const simulateCrack = () => {
    setIsRunning(true);
    setIsComplete(false);
    setOutput([]);

    const steps = [
      "Using default input encoding: UTF-8",
      "Loaded 1 password hash (bcrypt [Blowfish 32/64 X3])",
      "Cost 1 (iteration count) is 10 for all loaded hashes",
      "",
      "[*] Starting password cracking session...",
      "[*] Wordlist: /usr/share/wordlists/rockyou.txt",
      "[*] Target hash: $2b$10$KIXx...",
      "",
      "Will run 8 OpenMP threads",
      "Press 'q' or Ctrl-C to abort, almost any other key for status",
      "",
      "[*] Attempt 1: 'password'",
      "[*] Attempt 2: '123456'",
      "[*] Attempt 3: 'admin'",
      "[*] Attempt 4: 'welcome'",
      "[*] Attempt 5: 'letmein'",
      "[*] Attempt 6: 'qwerty'",
      "[*] Attempt 7: 'password123'",
      "[*] Attempt 8: '12345678'",
      "",
      "[!] Progress: 15%",
      "[!] Progress: 32%",
      "[!] Progress: 51%",
      "[!] Progress: 68%",
      "",
      "[+] Password found!",
      "",
      "Session completed: 00:02:34",
      "",
      "═════════════════════",
      "      PASSWORD CRACKED",
      "═════════════════════",
      "",
      "Password: ********",
      "Time taken: 2 minutes 34 seconds",
      "Attempts: 1,234,567",
      "",
      "[!] WARNING: Weak password detected!",
      "",
      "Bhai, agar tumhara password 'Uska Birth date' hai, toh yeh tool 2 minute me crack kar lega! 😂",
      "Use strong passwords with special characters, numbers, and uppercase letters!",
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
      }, index * 200);
    });
  };

  return (
    <div className="h-full relative flex flex-col overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-orange-500/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ top: "10%", right: "10%" }}
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
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/30 blur-2xl" />
                <div className="relative w-full h-full rounded-full glass-accent flex items-center justify-center border-2 border-orange-500/50">
                  <Key className="w-16 h-16 text-orange-400" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold mb-3 drop-shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #f97316 0%, #ef4444 50%, #f97316 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                John the Ripper
              </motion.h1>
              <p className="text-gray-400 text-sm drop-shadow">
                Fast Password Cracker
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
                  onClick={simulateCrack}
                  className="px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, #f97316, #ef4444)",
                    boxShadow: "0 8px 30px rgba(249, 115, 22, 0.4)",
                  }}
                >
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                  <Play className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Start Password Cracking</span>
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
                <Lock className="w-5 h-5 text-orange-400" />
                <span className="text-kali-text font-semibold">Cracking Session</span>
                {isRunning && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="ml-auto"
                  >
                    <Loader2 className="w-4 h-4 text-orange-400" />
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
                      Click "Start Password Cracking" to begin...
                    </motion.div>
                  )}
                  {output.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={
                        line.includes("[+]") || line.includes("found")
                          ? "text-green-400"
                          : line.includes("[!]") || line.includes("WARNING")
                          ? "text-yellow-400"
                          : line.includes("bhai") || line.includes("Bhai")
                          ? "text-yellow-400 font-bold text-base"
                          : line.includes("═══")
                          ? "text-orange-400"
                          : line.includes("[*]") || line.includes("Attempt")
                          ? "text-cyan-400"
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
                      className="text-orange-400"
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


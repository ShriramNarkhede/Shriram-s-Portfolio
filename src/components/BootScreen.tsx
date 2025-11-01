// src/components/BootScreen.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2, Shield, Zap, Lock } from "lucide-react";

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const [bootStage, setBootStage] = useState<"loading" | "logo">("loading");

  const messages = [
    "[  OK  ] Started System Logging Service",
    "[  OK  ] Started Network Manager",
    "[  OK  ] Reached target Network",
    "[  OK  ] Started Glassmorphic Rendering Engine",
    "[  OK  ] Mounted Virtual File System",
    "[  OK  ] Started Docker Application Container Engine",
    "[  OK  ] Loaded Window Manager",
    "[  OK  ] Started Portfolio Display Manager",
    "[  OK  ] Loading Kali Portfolio OS...",
  ];

  useEffect(() => {
    // Boot messages phase
    messages.forEach((msg, index) => {
      setTimeout(() => {
        setBootMessages((prev) => [...prev, msg]);
        setProgress(((index + 1) / messages.length) * 70);
      }, index * 300);
    });

    // Logo phase
    setTimeout(() => {
      setBootStage("logo");
      setProgress(85);
    }, messages.length * 300 + 500);

    // Complete phase
    setTimeout(() => {
      setProgress(100);
    }, messages.length * 300 + 2000);

    // Finish
    setTimeout(() => {
      onComplete();
    }, messages.length * 300 + 2800);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen z-50 bg-black overflow-hidden">
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(circle at center, #0a0c14, #000000)',
        }}
      >
        {/* Animated grid background */}
        <div className="absolute inset-0 w-full h-full opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 188, 212, 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(0, 188, 212, 0.3) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Static particles */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-kali-accent"
              style={{
                left: `${(i * 7) % 100}%`,
                top: `${(i * 11) % 100}%`,
              }}
              animate={{
                y: [0, 800],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Main Content Container - Properly Centered */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="w-full max-w-3xl px-8">
            <AnimatePresence mode="wait">
              {bootStage === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  {/* Boot Messages */}
                  <div className="mb-12 h-64 overflow-hidden">
                    {bootMessages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-green-400 text-sm font-mono mb-1 flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                        {msg}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {bootStage === "logo" && (
                <motion.div
                  key="logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  className="flex flex-col items-center w-full"
                >
                  {/* Logo */}
                  <div className="relative mb-8">
                    <div className="w-32 h-32 rounded-3xl glass-strong flex items-center justify-center relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-kali-accent/20 to-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                      <Image
                        src="/kalilinux.svg"
                        alt="Kali Linux"
                        width={104}
                        height={104}
                        className="w-64 h-64 relative z-10"
                        priority
                      />
                    </div>
                  </div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl md:text-6xl font-bold mb-3 text-center"
                  >
                    <span className="bg-gradient-to-r from-kali-accent via-blue-400 to-kali-accent bg-clip-text text-transparent">
                      Kali
                    </span>
                    <span className="text-white ml-3">Linux</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 text-lg text-center"
                  >
                  2022-2 Customized Version
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="mt-12 w-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-5 h-5 text-kali-accent" />
                  </motion.div>
                  <span className="text-gray-400 text-sm font-medium">
                    Booting ...
                  </span>
                </div>
                <span className="text-kali-accent text-sm font-bold">
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="relative h-2 rounded-full overflow-hidden glass-panel border border-white/10">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    background: 'linear-gradient(90deg, #00bcd4, #0097a7)',
                    boxShadow: '0 0 10px rgba(0,188,212,0.5)',
                  }}
                />
              </div>
            </div>

            {/* System info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-gray-600 text-xs"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Next.js</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>v1.0.0</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Secure Boot</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
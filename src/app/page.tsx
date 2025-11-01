// src/app/page.tsx
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootScreen from "@/components/BootScreen";
import Desktop from "@/components/Desktop";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <main className="w-screen h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {!booted ? (
          <BootScreen key="boot" onComplete={() => setBooted(true)} />
        ) : (
          <Desktop key="desktop" />
        )}
      </AnimatePresence>
    </main>
  );
}
// src/components/Desktop.tsx
"use client";

import { useState, useEffect } from "react";
import { useWallpaper } from "@/state/useWallpaper";
import { useWindowManager } from "@/state/useWindowManager";
import { AnimatePresence } from "framer-motion";
import Window from "./Window";
import Taskbar from "./Taskbar";
import Dock from "./Dock";
import DesktopIcons from "./DesktopIcons";
import ContextMenu from "./ContextMenu";
import Terminal from "./Terminal";
import About from "./About";
import Projects from "./Projects";
import SettingsApp from "./SettingsApp";
import TrashBin from "./TrashBin";
import Folder from "./Folder";
import Contact from "./Contact";
import Certifications from "./Certifications";
import PhishingAttack from "./PhishingAttack";
import NmapScanner from "./NmapScanner";
import Metasploit from "./Metasploit";
import JohnTheRipper from "./JohnTheRipper";
import Wireshark from "./Wireshark";

export default function Desktop() {
  const { wallpaper } = useWallpaper();
  const { windows } = useWindowManager();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // Disable right click menu on mobile
    if (window.innerWidth < 768) return;
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => setContextMenu(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderWindowContent = (component: string, id: string) => {
    switch (component) {
      case "terminal":
        return <Terminal />;
      case "about":
        return <About />;
      case "projects":
        return <Projects />;
      case "contact":
        return <Contact />;
      case "certifications":
        return <Certifications />;
      case "phishing":
        return <PhishingAttack />;
      case "nmap":
        return <NmapScanner />;
      case "metasploit":
        return <Metasploit />;
      case "john":
        return <JohnTheRipper />;
      case "wireshark":
        return <Wireshark />;
      case "settings":
        return <SettingsApp />;
      case "trash":
        return <TrashBin />;
      case "folder":
        return <Folder folderId={id.replace("folder-", "")} />;
      default:
        return (
          <div className="p-8 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">🚧</div>
              <p className="text-gray-400">Component: {component}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
    >
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${wallpaper})`,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 200px rgba(0,0,0,0.5)',
        }}
      />

      {/* Animated cursor follower */}
      <div
        className="fixed w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20 transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(0,188,212,0.4), transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <Taskbar />

      {/* Desktop Icons */}
      <div className="absolute inset-0 top-14 bottom-24">
        <DesktopIcons />
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map((window) => (
          <Window key={window.id} {...window}>
            {renderWindowContent(window.component, window.id)}
          </Window>
        ))}
      </AnimatePresence>

      <Dock />

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={closeContextMenu}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
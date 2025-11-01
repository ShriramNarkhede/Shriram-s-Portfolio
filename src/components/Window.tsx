// src/components/Window.tsx
"use client";

import { motion } from "framer-motion";
import { X, Minus, Maximize2, Minimize2, GripHorizontal } from "lucide-react";
import { useWindowManager } from "@/state/useWindowManager";
import { useRef, useState, useEffect } from "react";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | null;

export default function Window({
  id,
  title,
  children,
  isMinimized,
  isMaximized,
  zIndex,
  position,
  size,
}: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowManager();

  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Min and max window sizes - responsive
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const MIN_WIDTH = isMobile ? window.innerWidth : 400;
  const MIN_HEIGHT = isMobile ? window.innerHeight - 112 : 300;
  const MAX_WIDTH = window.innerWidth;
  const MAX_HEIGHT = window.innerHeight - (isMobile ? 112 : 120);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    focusWindow(id);
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleResizeStart = (e: React.MouseEvent, direction: ResizeDirection) => {
    e.stopPropagation();
    if (isMaximized) return;
    
    focusWindow(id);
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 100));
        const newY = Math.max(56, Math.min(e.clientY - dragOffset.y, window.innerHeight - 150));
        
        updateWindowPosition(id, { x: newX, y: newY });
      }

      if (isResizing && resizeDirection && !isMaximized) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;

        let newWidth = size.width;
        let newHeight = size.height;
        let newX = position.x;
        let newY = position.y;

        // Handle horizontal resizing
        if (resizeDirection.includes('e')) {
          newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, resizeStart.width + deltaX));
        } else if (resizeDirection.includes('w')) {
          const potentialWidth = resizeStart.width - deltaX;
          if (potentialWidth >= MIN_WIDTH) {
            newWidth = potentialWidth;
            newX = position.x + deltaX;
          }
        }

        // Handle vertical resizing
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, resizeStart.height + deltaY));
        } else if (resizeDirection.includes('n')) {
          const potentialHeight = resizeStart.height - deltaY;
          if (potentialHeight >= MIN_HEIGHT) {
            newHeight = potentialHeight;
            newY = position.y + deltaY;
          }
        }

        updateWindowSize(id, { width: newWidth, height: newHeight });
        if (newX !== position.x || newY !== position.y) {
          updateWindowPosition(id, { x: newX, y: newY });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeDirection, resizeStart, id, isMaximized, position, size]);

  if (isMinimized) return null;

  // Auto-size windows on mobile - fullscreen since taskbar is hidden
  const windowStyle = isMaximized || isMobile
    ? { top: 0, left: 0, width: "100vw", height: "100vh" }
    : { top: position.y, left: position.x, width: size.width, height: size.height };

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className={`fixed overflow-hidden flex flex-col ${
        isHovered ? 'kali-shadow-lg' : 'kali-shadow'
      } ${isMaximized || isMobile ? 'rounded-none' : 'rounded-xl'}`}
      style={{ ...windowStyle, zIndex: isMaximized ? zIndex + 1000 : zIndex }}
      onClick={() => focusWindow(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glass border effect */}
      <div className={`absolute inset-0 ${isMaximized || isMobile ? 'rounded-none' : 'rounded-xl'} border border-white/20 pointer-events-none`} 
           style={{
             boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
           }}
      />
      
      {/* Main BALANCED glass background */}
      <div className={`absolute inset-0 ${isMaximized || isMobile ? 'rounded-none' : 'rounded-xl'} noise-overlay`} style={{
        background: 'rgba(12, 14, 24, 0.88)',
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
      }} />

      {/* Resize Handles - Hide on mobile */}
      {!isMaximized && !isMobile && (
        <>
          {/* Top */}
          <div
            className="absolute top-0 left-2 right-2 h-1 cursor-n-resize z-50 hover:bg-kali-accent/50 transition-colors"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          {/* Bottom */}
          <div
            className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize z-50 hover:bg-kali-accent/50 transition-colors"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          {/* Left */}
          <div
            className="absolute left-0 top-2 bottom-2 w-1 cursor-w-resize z-50 hover:bg-kali-accent/50 transition-colors"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          {/* Right */}
          <div
            className="absolute right-0 top-2 bottom-2 w-1 cursor-e-resize z-50 hover:bg-kali-accent/50 transition-colors"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          {/* Top-Left Corner */}
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize z-50 hover:bg-kali-accent transition-colors rounded-tl-xl"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          {/* Top-Right Corner */}
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize z-50 hover:bg-kali-accent transition-colors rounded-tr-xl"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          {/* Bottom-Left Corner */}
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize z-50 hover:bg-kali-accent transition-colors rounded-bl-xl"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          {/* Bottom-Right Corner */}
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-50 hover:bg-kali-accent transition-colors rounded-br-xl"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
        </>
      )}

      {/* Title Bar */}
      <div
        className="relative h-12 flex items-center justify-between px-4 cursor-move group z-10"
        style={{
          background: 'rgba(8, 10, 18, 0.85)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kali-accent/60 to-transparent" />
        
        <div className="flex items-center gap-2 md:gap-3">
          {!isMobile && (
            <GripHorizontal className="w-4 h-4 text-kali-accent/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
          <span className={`text-kali-text font-semibold ${isMobile ? 'text-xs' : 'text-sm'} tracking-wide drop-shadow-lg truncate max-w-[200px] md:max-w-none`}>
            {title}
          </span>
        </div>
        
        <div className="flex items-center gap-0.5 md:gap-1">
          {!isMobile && (
            <WindowButton
              onClick={() => minimizeWindow(id)}
              icon={<Minus className="w-4 h-4" />}
              color="yellow"
            />
          )}
          
          <WindowButton
            onClick={() => maximizeWindow(id)}
            icon={isMaximized ? 
              <Minimize2 className={isMobile ? "w-3 h-3" : "w-3.5 h-3.5"} /> : 
              <Maximize2 className={isMobile ? "w-3 h-3" : "w-3.5 h-3.5"} />
            }
            color="green"
          />
          
          <WindowButton
            onClick={() => closeWindow(id)}
            icon={<X className={isMobile ? "w-3.5 h-3.5" : "w-4 h-4"} />}
            color="red"
          />
        </div>
      </div>

      {/* Window Content - BALANCED glass */}
      <div className="relative flex-1 overflow-hidden z-10">
        {/* Content background - readable but still glass */}
        <div className="absolute inset-0" style={{
          background: 'rgba(14, 16, 26, 0.75)',
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        }} />
        
        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0 glass-overlay-dark pointer-events-none" />
        
        {/* Actual content - NO SCROLLBARS */}
        <div className="absolute inset-0 overflow-auto no-scrollbar">
          {children}
        </div>
      </div>

      {/* Bottom edge highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </motion.div>
  );
}

interface WindowButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  color: "red" | "yellow" | "green";
}

function WindowButton({ onClick, icon, color }: WindowButtonProps) {
  const colorClasses = {
    red: "hover:bg-red-500/25 hover:text-red-400 hover:border-red-400/50 hover:shadow-red-500/30",
    yellow: "hover:bg-yellow-500/25 hover:text-yellow-400 hover:border-yellow-400/50 hover:shadow-yellow-500/30",
    green: "hover:bg-green-500/25 hover:text-green-400 hover:border-green-400/50 hover:shadow-green-500/30",
  };

  return (
    <button
      onClick={onClick}
      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 
        text-gray-400 border border-transparent hover:shadow-lg
        ${colorClasses[color]}`}
      style={{
        background: 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {icon}
    </button>
  );
}
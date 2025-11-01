// src/components/DesktopIcons.tsx
"use client";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { FolderOpen, User, Code, Mail, Award } from "lucide-react";
import { useFileSystem } from "@/state/useFileSystem";
import { useWindowManager } from "@/state/useWindowManager";
import { useIconPositions } from "@/state/useIconPositions";
import { useState, useEffect } from "react";

export default function DesktopIcons() {
  const { folders } = useFileSystem();
  const { openWindow } = useWindowManager();
  const [showGrid, setShowGrid] = useState(false);

  const defaultIcons = [
    {
      id: "about",
      icon: <User className="w-8 h-8 md:w-10 md:h-10" />,
      label: "About Me",
      defaultGridPosition: { gridX: 0, gridY: 0 }, // First row
      defaultGridPositionMobile: { gridX: 0, gridY: 0 }, // Mobile: First row, first column
      color: "#00bcd4",
      component: "about",
    },
    {
      id: "projects",
      icon: <Code className="w-8 h-8 md:w-10 md:h-10" />,
      label: "Projects",
      defaultGridPosition: { gridX: 1, gridY: 0 }, // First row
      defaultGridPositionMobile: { gridX: 1, gridY: 0 }, // Mobile: First row, second column
      color: "#4ade80",
      component: "projects",
    },
    {
      id: "certifications",
      icon: <Award className="w-8 h-8 md:w-10 md:h-10" />,
      label: "Certifi..",
      defaultGridPosition: { gridX: 3, gridY: 0 }, // First row
      defaultGridPositionMobile: { gridX: 2, gridY: 0 }, // Mobile: First row, third column
      color: "#a855f7",
      component: "certifications",
    },
    {
      id: "contact",
      icon: <Mail className="w-8 h-8 md:w-10 md:h-10" />,
      label: "Contact",
      defaultGridPosition: { gridX: 2, gridY: 0 }, // First row
      defaultGridPositionMobile: { gridX: 0, gridY: 1 }, // Mobile: Second row, first column
      color: "#F7A5A5",
      component: "contact",
    },
  ];

  // Show grid on Alt key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) setShowGrid(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.altKey) setShowGrid(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="relative w-full h-full pointer-events-none">
      {/* Grid Overlay (visible when Alt is pressed) */}
      {showGrid && <GridOverlay />}

      {/* Default Icons */}
      {defaultIcons.map((icon, index) => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        return (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            icon={icon.icon}
            label={icon.label}
            defaultGridPosition={isMobile ? (icon.defaultGridPositionMobile || icon.defaultGridPosition) : icon.defaultGridPosition}
            color={icon.color}
            delay={index * 0.1}
            onDoubleClick={() =>
              openWindow({
                id: icon.component,
                title: icon.label,
                component: icon.component,
                isMinimized: false,
                isMaximized: false,
                position: { x: 200, y: 150 },
                size: { width: 900, height: 600 },
              })
            }
          />
        );
      })}

      {/* Folder Icons - Continue in the same horizontal line after default icons */}
      {folders.map((folder, index) => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        // On mobile, first folder goes to row 2, second column (next to Contact)
        // Subsequent folders continue on row 2 wrapping, then row 3, etc.
        const folderGridPosition = isMobile 
          ? { gridX: index === 0 ? 1 : (index - 1) % 3, gridY: index === 0 ? 1 : 2 + Math.floor((index - 1) / 3) }
          : { gridX: defaultIcons.length + index, gridY: 0 };
        return (
          <DesktopIcon
            key={folder.id}
            id={folder.id}
            icon={<FolderOpen className="w-8 h-8 md:w-10 md:h-10" />}
            label={folder.name}
            defaultGridPosition={folderGridPosition}
            color="#ffa500"
            delay={(defaultIcons.length + index) * 0.1}
            onDoubleClick={() =>
              openWindow({
                id: `folder-${folder.id}`,
                title: folder.name,
                component: "folder",
                isMinimized: false,
                isMaximized: false,
                position: { x: 150, y: 150 },
                size: { width: 800, height: 600 },
              })
            }
          />
        );
      })}
    </div>
  );
}

// Grid Overlay Component
function GridOverlay() {
  const { gridSize } = useIconPositions();

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg width="100%" height="100%" className="opacity-20">
        <defs>
          <pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <rect
              width={gridSize}
              height={gridSize}
              fill="none"
              stroke="#00bcd4"
              strokeWidth="1"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

interface DesktopIconProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  defaultGridPosition: { gridX: number; gridY: number };
  color: string;
  delay: number;
  onDoubleClick: () => void;
}

function DesktopIcon({
  id,
  icon,
  label,
  defaultGridPosition,
  color,
  delay,
  onDoubleClick,
}: DesktopIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  const { 
    positions, 
    gridSize, 
    updatePosition, 
    getGridPosition,
    findNearestEmptyGrid,
  } = useIconPositions();

  // Get saved position or use default
  const savedPosition = positions[id];
  const currentGridPos = savedPosition 
    ? { gridX: savedPosition.gridX, gridY: savedPosition.gridY }
    : defaultGridPosition;

  // Convert grid position to pixel position - responsive
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  // On mobile, use smaller grid size to fit 3 icons per row comfortably
  const effectiveGridSize = isMobile && typeof window !== 'undefined' 
    ? Math.min(110, (window.innerWidth - 60) / 3) 
    : gridSize;
  const pixelPosition = {
    x: currentGridPos.gridX * effectiveGridSize + (isMobile ? 20 : 30), // Responsive left padding
    y: currentGridPos.gridY * effectiveGridSize + (isMobile ? 70 : 80), // Responsive top padding
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  const handleClick = () => {
    if (isDragging) return;

    // On mobile, open on single click; on desktop, require double click
    if (isMobile) {
      onDoubleClick();
      return;
    }

    setClickCount((prev) => prev + 1);

    setTimeout(() => setClickCount(0), 300);

    if (clickCount === 1) {
      onDoubleClick();
      setClickCount(0);
    }
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    
    // Calculate new pixel position
    const newPixelX = pixelPosition.x + info.offset.x;
    const newPixelY = pixelPosition.y + info.offset.y;
    
    // Convert to grid position - responsive
    const paddingX = isMobile ? 20 : 30;
    const paddingY = isMobile ? 70 : 80;
    const effectiveGridSize = isMobile && typeof window !== 'undefined' 
      ? Math.min(110, (window.innerWidth - 60) / 3) 
      : gridSize;
    // Calculate grid position using effective grid size for mobile
    const targetGrid = isMobile 
      ? { gridX: Math.round((newPixelX - paddingX) / effectiveGridSize), gridY: Math.round((newPixelY - paddingY) / effectiveGridSize) }
      : getGridPosition(newPixelX - paddingX, newPixelY - paddingY);
    
    // Find nearest empty grid (or use target if free)
    const finalGrid = findNearestEmptyGrid(targetGrid.gridX, targetGrid.gridY, id);
    
    // Convert back to pixel position
    const finalEffectiveGridSize = isMobile && typeof window !== 'undefined' 
      ? Math.min(110, (window.innerWidth - 60) / 3) 
      : gridSize;
    const finalPixelX = finalGrid.gridX * finalEffectiveGridSize + paddingX;
    const finalPixelY = finalGrid.gridY * finalEffectiveGridSize + paddingY;
    
    // Update position
    updatePosition(id, {
      x: finalPixelX,
      y: finalPixelY,
      gridX: finalGrid.gridX,
      gridY: finalGrid.gridY,
    });
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: pixelPosition.x,
        y: pixelPosition.y,
      }}
      transition={{
        delay,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      whileHover={!isDragging ? { scale: 1.05 } : {}}
      whileTap={{ scale: 0.95 }}
      className="fixed cursor-pointer group pointer-events-auto select-none z-10"
      style={{
        perspective: 1000,
        left: 0,
        top: 0,
      }}
      onClick={handleClick}
      onMouseEnter={() => !isDragging && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={(e) => {
        if (isDragging) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
      }}
    >
      <motion.div
        className="flex flex-col items-center gap-2 p-2 rounded-2xl relative"
        style={{
          rotateX: isDragging ? 0 : rotateX,
          rotateY: isDragging ? 0 : rotateY,
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: color }}
        />

        {/* Grid snap indicator */}
        {isDragging && (
          <motion.div
            className="absolute -inset-4 border-2 border-dashed border-kali-accent rounded-2xl opacity-50 pointer-events-none"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}

        {/* Icon container */}
        <motion.div
          className={`relative w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden ${
            isDragging ? 'bg-black/50 ring-2 ring-kali-accent shadow-lg shadow-kali-accent/50' : 'bg-black/30'
          }`}
          animate={
            isHovered && !isDragging
              ? {
                  boxShadow: [
                    `0 0 20px ${color}40`,
                    `0 0 30px ${color}60`,
                    `0 0 20px ${color}40`,
                  ],
                }
              : {}
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {/* Shimmer on hover */}
          <motion.div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />

          <motion.div
            className="relative z-10"
            style={{ color }}
            animate={isHovered && !isDragging ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
        </motion.div>

        {/* Label */}
        <span className="mt-1 text-[13px] font-medium text-white/90 text-center block max-w-[96px] truncate drop-shadow-lg">
          {label}
        </span>

        {/* Selection indicator */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100"
          style={{ backgroundColor: color }}
          animate={
            isHovered && !isDragging
              ? {
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    `0 0 10px ${color}`,
                    `0 0 20px ${color}`,
                    `0 0 10px ${color}`,
                  ],
                }
              : {}
          }
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}
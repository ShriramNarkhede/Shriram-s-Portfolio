// src/state/useIconPositions.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IconPosition {
  x: number;
  y: number;
  gridX: number;
  gridY: number;
}

interface IconPositionsState {
  positions: Record<string, IconPosition>;
  gridSize: number;
  updatePosition: (id: string, position: IconPosition) => void;
  resetPositions: () => void;
  getGridPosition: (x: number, y: number) => { gridX: number; gridY: number };
  isPositionOccupied: (gridX: number, gridY: number, excludeId?: string) => boolean;
  findNearestEmptyGrid: (gridX: number, gridY: number, excludeId?: string) => { gridX: number; gridY: number };
}

export const useIconPositions = create<IconPositionsState>()(
  persist(
    (set, get) => ({
      positions: {},
      gridSize: 120, // Grid size in pixels

      updatePosition: (id, position) =>
        set((state) => ({
          positions: {
            ...state.positions,
            [id]: position,
          },
        })),

      resetPositions: () => set({ positions: {} }),

      getGridPosition: (x, y) => {
        const { gridSize } = get();
        return {
          gridX: Math.round(x / gridSize),
          gridY: Math.round(y / gridSize),
        };
      },

      isPositionOccupied: (gridX, gridY, excludeId) => {
        const { positions } = get();
        return Object.entries(positions).some(
          ([id, pos]) => 
            id !== excludeId && 
            pos.gridX === gridX && 
            pos.gridY === gridY
        );
      },

      findNearestEmptyGrid: (targetGridX, targetGridY, excludeId) => {
        const { isPositionOccupied } = get();
        
        // Check if target position is free
        if (!isPositionOccupied(targetGridX, targetGridY, excludeId)) {
          return { gridX: targetGridX, gridY: targetGridY };
        }

        // Spiral outward to find nearest empty spot
        for (let radius = 1; radius <= 10; radius++) {
          for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
              if (Math.abs(dx) === radius || Math.abs(dy) === radius) {
                const gridX = targetGridX + dx;
                const gridY = targetGridY + dy;
                
                if (gridX >= 0 && gridY >= 0 && !isPositionOccupied(gridX, gridY, excludeId)) {
                  return { gridX, gridY };
                }
              }
            }
          }
        }

        // Fallback
        return { gridX: targetGridX, gridY: targetGridY };
      },
    }),
    {
      name: "desktop-icon-positions",
    }
  )
);
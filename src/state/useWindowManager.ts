// src/state/useWindowManager.ts
import { create } from "zustand";

export interface Window {
  id: string;
  title: string;
  component: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface WindowManagerState {
  windows: Window[];
  maxZIndex: number;
  openWindow: (window: Omit<Window, "zIndex">) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void; // ADD THIS
}

export const useWindowManager = create<WindowManagerState>((set) => ({
  windows: [],
  maxZIndex: 100,

  openWindow: (newWindow) =>
    set((state) => {
      const exists = state.windows.find((w) => w.id === newWindow.id);
      if (exists) {
        return {
          windows: state.windows.map((w) =>
            w.id === newWindow.id
              ? { ...w, isMinimized: false, zIndex: state.maxZIndex + 1 }
              : w
          ),
          maxZIndex: state.maxZIndex + 1,
        };
      }

      return {
        windows: [
          ...state.windows,
          { ...newWindow, zIndex: state.maxZIndex + 1 },
        ],
        maxZIndex: state.maxZIndex + 1,
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
    })),

  maximizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    })),

  focusWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: state.maxZIndex + 1 } : w
      ),
      maxZIndex: state.maxZIndex + 1,
    })),

  updateWindowPosition: (id, position) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    })),

  // ADD THIS FUNCTION
  updateWindowSize: (id, size) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, size } : w)),
    })),
}));
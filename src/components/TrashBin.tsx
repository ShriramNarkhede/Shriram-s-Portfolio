// src/components/TrashBin.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, RotateCcw, X, AlertTriangle, FileText, Sparkles } from "lucide-react";
import { useFileSystem } from "@/state/useFileSystem";
import { useState } from "react";

export default function TrashBin() {
  const { trashItems, emptyTrash, restoreFromTrash } = useFileSystem();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deletingItems, setDeletingItems] = useState<Set<string>>(new Set());

  const handleEmptyTrash = () => {
    setDeletingItems(new Set(trashItems.map(item => item.id)));
    setTimeout(() => {
      emptyTrash();
      setShowConfirm(false);
      setDeletingItems(new Set());
    }, 800);
  };

  const handleRestore = (id: string) => {
    setDeletingItems(new Set([id]));
    setTimeout(() => {
      restoreFromTrash(id);
      setDeletingItems(new Set());
    }, 400);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Animated background - subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-red-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ top: "20%", right: "10%" }}
        />
      </div>
  
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-kali-bg/30 pointer-events-none" />
  
      <div className="relative z-10 p-8 flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: trashItems.length > 0 ? [0, -10, 10, -10, 0] : 0 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-2xl glass-accent flex items-center justify-center border border-white/10"
              style={{
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)',
              }}
            >
              <Trash2 className="w-8 h-8 text-red-400" />
            </motion.div>
            
            <div>
              <h2 className="text-3xl font-bold text-kali-text bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                Trash Bin
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {trashItems.length} item{trashItems.length !== 1 ? "s" : ""} • 
                {trashItems.length > 0 ? " Ready to restore or delete" : " Trash is empty"}
              </p>
            </div>
          </div>

          {trashItems.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowConfirm(true)}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
              <Trash2 className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Empty Trash</span>
            </motion.button>
          )}
        </motion.div>

        {/* Trash Items */}
        <div className="flex-1 overflow-auto">
          {trashItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-32 h-32 rounded-3xl glass-panel flex items-center justify-center mb-6 border border-white/10"
              >
                <Trash2 className="w-16 h-16 text-gray-600" />
              </motion.div>
              <p className="text-xl text-gray-500 font-semibold mb-2">Trash is Empty</p>
              <p className="text-sm text-gray-600">Deleted items will appear here</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {trashItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ 
                      opacity: deletingItems.has(item.id) ? 0 : 1, 
                      scale: deletingItems.has(item.id) ? 0.8 : 1,
                      y: 0 
                    }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-panel p-5 rounded-2xl group hover:border-red-400/30 transition-all border border-white/10 noise-overlay relative overflow-hidden"
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-pink-500/0 group-hover:from-red-500/10 group-hover:to-pink-500/10 transition-all duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3 flex-1">
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="w-12 h-12 rounded-xl glass-accent flex items-center justify-center flex-shrink-0 border border-white/10"
                            style={{
                              boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)',
                            }}
                          >
                            <FileText className="w-6 h-6 text-red-400" />
                          </motion.div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-kali-text font-semibold text-sm truncate mb-1 group-hover:text-kali-accent transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              Deleted: {new Date(item.dateModified).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1, rotate: -180 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRestore(item.id)}
                          className="w-10 h-10 rounded-xl glass-light hover:glass-accent transition-all flex items-center justify-center border border-white/10 group/btn"
                          title="Restore"
                        >
                          <RotateCcw className="w-4 h-4 text-green-400 group-hover/btn:text-green-300" />
                        </motion.button>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-white/5">
                        <span className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          Created: {new Date(item.dateCreated).toLocaleDateString()}
                        </span>
                        <span className="capitalize flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Dialog */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-strong p-8 rounded-3xl max-w-md w-full border border-white/10 noise-overlay relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated warning glow */}
              <motion.div
                className="absolute inset-0 bg-red-500/10 blur-3xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, -10, 0],
                    }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 border border-red-500/30"
                  >
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-kali-text mb-2">
                      Empty Trash?
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      This will permanently delete all <span className="text-red-400 font-semibold">{trashItems.length}</span> item
                      {trashItems.length !== 1 ? "s" : ""}. This action cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 px-6 py-3 glass-panel hover:glass-light text-kali-text font-semibold rounded-xl transition-all border border-white/10"
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEmptyTrash}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                    <span className="relative z-10">Empty Trash</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
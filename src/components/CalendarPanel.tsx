// src/components/CalendarPanel.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarPanelProps {
  onClose: () => void;
  currentTime: Date;
}

export default function CalendarPanel({ onClose, currentTime }: CalendarPanelProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const previousMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(viewDate);
  const firstDay = getFirstDayOfMonth(viewDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className="fixed top-16 right-4 rounded-2xl overflow-hidden w-80 kali-shadow-lg z-50"
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'rgba(12, 14, 24, 0.95)',
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-kali-accent/50 to-transparent" />
      
      <div className="p-6">
        {/* Current Time Display */}
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-kali-accent mb-1 drop-shadow-lg">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-sm text-gray-400">
            {currentTime.toLocaleDateString([], { 
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={previousMonth}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <ChevronLeft className="w-4 h-4 text-kali-text" />
          </motion.button>

          <div className="text-center">
            <div className="font-semibold text-kali-text drop-shadow">
              {monthNames[viewDate.getMonth()]}
            </div>
            <div className="text-xs text-gray-400">
              {viewDate.getFullYear()}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextMonth}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <ChevronRight className="w-4 h-4 text-kali-text" />
          </motion.button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-xs text-gray-500 font-medium py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = 
              day === currentTime.getDate() &&
              viewDate.getMonth() === currentTime.getMonth() &&
              viewDate.getFullYear() === currentTime.getFullYear();
            
            const isSelected =
              day === selectedDate.getDate() &&
              viewDate.getMonth() === selectedDate.getMonth() &&
              viewDate.getFullYear() === selectedDate.getFullYear();

            return (
              <motion.button
                key={day}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))}
                className="aspect-square rounded-lg text-sm font-medium transition-all border"
                style={{
                  background: isToday
                    ? 'linear-gradient(135deg, #00bcd4, #0097a7)'
                    : isSelected
                    ? 'rgba(0, 188, 212, 0.2)'
                    : 'rgba(255, 255, 255, 0.05)',
                  color: isToday ? '#ffffff' : '#e8e8e8',
                  borderColor: isSelected && !isToday 
                    ? 'rgba(0, 188, 212, 0.5)' 
                    : 'transparent',
                  boxShadow: isToday ? '0 0 15px rgba(0, 188, 212, 0.5)' : 'none',
                }}
              >
                {day}
              </motion.button>
            );
          })}
        </div>

        {/* Today Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setViewDate(new Date());
            setSelectedDate(new Date());
          }}
          className="w-full mt-4 py-2 rounded-xl text-sm font-medium text-kali-accent border transition-all"
          style={{
            background: 'rgba(0, 188, 212, 0.15)',
            borderColor: 'rgba(0, 188, 212, 0.3)',
          }}
        >
          Today
        </motion.button>
      </div>
    </motion.div>
  );
}
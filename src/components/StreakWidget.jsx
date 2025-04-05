
import React, { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { GripHorizontal } from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";

function StreakWidget({ id, name }) {
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem(`streak-${id}`);
    return saved ? JSON.parse(saved) : { current: 0, days: [] };
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    localStorage.setItem(`streak-${id}`, JSON.stringify(streak));
  }, [streak, id]);

  const squares = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const dateStr = format(date, "yyyy-MM-dd");
    const isActive = streak.days.includes(dateStr);
    const isToday = isSameDay(date, new Date());

    return { date: dateStr, isActive, isToday };
  });

  const toggleDay = (dateStr) => {
    const newDays = streak.days.includes(dateStr)
      ? streak.days.filter(d => d !== dateStr)
      : [...streak.days, dateStr].sort();

    // Calculate current streak
    let currentStreak = 0;
    let date = new Date();
    let consecutiveDays = 0;

    while (true) {
      const dateStr = format(date, "yyyy-MM-dd");
      if (newDays.includes(dateStr)) {
        consecutiveDays++;
      } else {
        break;
      }
      date = addDays(date, -1);
    }

    currentStreak = consecutiveDays;

    setStreak({
      current: currentStreak,
      days: newDays,
    });
  };

  // Extract the name from the streak ID
  const displayName = id.split("-")[1] || "Streak";

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="bg-[#09080d]/80 rounded-xl p-6 shadow-lg backdrop-blur-sm border border-[#cb04a5]/20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#FDFFFC]">
          {displayName}
        </h2>
        <div {...attributes} {...listeners}>
          <GripHorizontal className="cursor-move text-[#FDFFFC]/50 hover:text-[#FDFFFC]" />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <motion.div
          className="text-6xl font-bold bg-gradient-to-r from-[#fe6807] to-[#cb04a5] text-transparent bg-clip-text"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {streak.current}
        </motion.div>

        <div className="grid grid-cols-6 gap-2">
          {squares.map((square) => (
            <motion.button
              key={square.date}
              onClick={() => toggleDay(square.date)}
              className={`w-8 h-8 rounded-md transition-all transform hover:scale-110 ${
                square.isActive
                  ? "bg-[#53ff45]"
                  : "bg-[#09080d] border border-[#cb04a5]/20"
              } ${square.isToday ? "ring-2 ring-[#fe6807]" : ""}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default StreakWidget;

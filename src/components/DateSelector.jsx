
import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, eachDayOfInterval, startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns";

function DateSelector({ currentMonth, setCurrentMonth, selectedDays, onDayToggle }) {
  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const nextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  return (
    <motion.div
      className="bg-[#09080d]/80 rounded-xl p-6 shadow-lg backdrop-blur-sm border border-[#fe6807]/20 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-[#fe6807]/10 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#FDFFFC]" />
        </button>
        <h3 className="text-lg font-medium text-[#FDFFFC]">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-[#fe6807]/10 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-[#FDFFFC]" />
        </button>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {monthDays.map((date, index) => {
            const dateStr = format(date, "yyyy-MM-dd");
            const isActive = selectedDays.includes(dateStr);
            const isToday = dateStr === format(new Date(), "yyyy-MM-dd");

            return (
              <motion.button
                key={dateStr}
                onClick={() => onDayToggle(date)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-colors relative ${
                  isActive
                    ? "bg-[#53ff45] text-[#09080d]"
                    : "bg-[#09080d] border border-[#cb04a5]/20 text-[#FDFFFC]"
                } ${isToday ? "ring-2 ring-[#fe6807]" : ""}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
              >
                {format(date, "d")}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default DateSelector;

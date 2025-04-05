
import React from "react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function Header({ isDark, onThemeToggle, onAddStreak }) {
  return (
    <div className="flex justify-between items-center mb-8 sticky top-0 z-50 bg-[#09080d]/80 backdrop-blur-sm p-4 rounded-xl border border-[#fe6807]/20">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold bg-gradient-to-r from-[#fe6807] to-[#cb04a5] text-transparent bg-clip-text"
      >
        Habit Tracker
      </motion.h1>
      <div className="flex items-center space-x-4">
        <Button
          onClick={onAddStreak}
          className="bg-[#fe6807] hover:bg-[#fe6807]/80"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Streak
        </Button>
        <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
      </div>
    </div>
  );
}

export default Header;

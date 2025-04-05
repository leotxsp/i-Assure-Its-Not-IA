
import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

function ThemeToggle({ isDark, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={onToggle}
        className={`rounded-full ${
          isDark 
            ? "bg-[#09080d] border-[#fe6807]/20 text-[#FDFFFC]" 
            : "bg-[#FDFFFC] border-[#fe6807]/20 text-[#09080d]"
        }`}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
}

export default ThemeToggle;

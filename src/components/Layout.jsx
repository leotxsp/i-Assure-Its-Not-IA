
import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram } from "lucide-react";

function Layout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {children}
      <motion.footer 
        className="mt-auto pt-12 pb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col items-center space-y-4">
          <motion.p 
            className="text-lg font-medium bg-gradient-to-r from-[#fe6807] to-[#cb04a5] text-transparent bg-clip-text"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Leonardo Teixeira
          </motion.p>
          <div className="flex space-x-4">
            <motion.a
              href="https://github.com/leotxsp"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-[#FDFFFC] hover:text-[#fe6807] transition-colors"
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/leonardosimplicio/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-[#FDFFFC] hover:text-[#fe6807] transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/leotxsp/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-[#FDFFFC] hover:text-[#fe6807] transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </motion.a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default Layout;

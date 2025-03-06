import React from "react";
import { motion } from "framer-motion";

interface TypingIndicatorProps {
  isTyping?: boolean;
}

const TypingIndicator = ({ isTyping = true }: TypingIndicatorProps) => {
  if (!isTyping) return null;

  return (
    <div className="flex items-center h-8 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full w-fit">
      <div className="flex space-x-1">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: dot * 0.2,
            }}
          />
        ))}
      </div>
      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
        AI is typing...
      </span>
    </div>
  );
};

export default TypingIndicator;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy, FiCheck } from 'react-icons/fi';

const CaptionDisplay = ({ caption, isLoading }) => {
  // Break caption into words for animation
  const words = caption ? caption.split(' ') : [];
  const [copied, setCopied] = useState(false);

  // Function to copy caption to clipboard
  const copyToClipboard = () => {
    if (!caption) return;
    
    navigator.clipboard.writeText(caption)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto p-8 glassmorphism-strong min-h-[200px] flex items-center justify-center hover:shadow-2xl transition-all duration-300">
      {/* Copy button */}
      {caption && !isLoading && (
        <motion.button
          className={`absolute top-3 right-3 p-2 rounded-full ${
            copied 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30'
          }`}
          onClick={copyToClipboard}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          title="Copy caption to clipboard"
        >
          {copied ? <FiCheck /> : <FiCopy />}
        </motion.button>
      )}
      
      {isLoading ? (
        // Loading shimmer animation
        <div className="w-full max-w-xl">
          <div className="h-6 bg-gray-200/50 dark:bg-gray-700/50 rounded animate-pulse mb-4 w-3/4 mx-auto"></div>
          <div className="h-6 bg-gray-200/50 dark:bg-gray-700/50 rounded animate-pulse mb-4 w-1/2 mx-auto"></div>
          <div className="h-6 bg-gray-200/50 dark:bg-gray-700/50 rounded animate-pulse w-2/3 mx-auto"></div>
        </div>
      ) : (
        <AnimatePresence>
          {caption ? (
            <motion.div
              className="caption-text text-center leading-relaxed w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {words.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  className="inline-block mr-2 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.05, // Staggered animation
                    ease: "easeOut" 
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary-100/30 dark:bg-primary-900/30 flex items-center justify-center mb-4 animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg italic text-center">
                Click the microphone and start speaking...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default CaptionDisplay; 
import React from 'react';
import { motion } from 'framer-motion';
import { FiMic, FiMicOff } from 'react-icons/fi';

const MicrophoneButton = ({ isRecording, toggleRecording }) => {
  return (
    <div className="relative">
      <motion.button
        onClick={toggleRecording}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg 
                  ${isRecording 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: isRecording ? [0, 5, -5, 0] : 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 260, 
          damping: 20,
          rotate: { repeat: isRecording ? Infinity : 0, duration: 0.5 }
        }}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
      >
        {isRecording ? (
          <FiMicOff className="text-white text-xl" />
        ) : (
          <FiMic className="text-white text-xl" />
        )}
        
        {/* Ripple animation when recording */}
        {isRecording && (
          <>
            <motion.span 
              className="absolute w-full h-full rounded-full bg-red-500 opacity-75"
              initial={{ scale: 1 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.span 
              className="absolute w-full h-full rounded-full bg-red-500 opacity-75"
              initial={{ scale: 1 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
          </>
        )}
      </motion.button>
      
      {/* Status text */}
      <motion.div 
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-center w-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {isRecording ? (
          <span className="text-red-500">Recording... Tap to stop</span>
        ) : (
          <span className="text-gray-600 dark:text-gray-400">Tap microphone to start</span>
        )}
      </motion.div>
    </div>
  );
};

export default MicrophoneButton; 
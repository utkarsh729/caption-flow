import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiGlobe } from 'react-icons/fi';

const LanguageSelector = ({ selectedLanguage, setSelectedLanguage }) => {
  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'zh-CN', name: 'Chinese (Simplified)' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ko-KR', name: 'Korean' },
    { code: 'ar-SA', name: 'Arabic' },
    { code: 'hi-IN', name: 'Hindi' },
    { code: 'ru-RU', name: 'Russian' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)' },
    { code: 'it-IT', name: 'Italian' },
  ];

  return (
    <div className="relative w-full max-w-xs">
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 flex items-center">
        <FiGlobe className="mr-1 text-primary-500" /> Caption Language
      </label>
      <motion.div
        className="relative"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full pl-4 pr-10 py-2 text-sm glassmorphism-strong
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <FiChevronDown className="h-4 w-4 text-primary-500" />
        </div>
      </motion.div>
    </div>
  );
};

export default LanguageSelector; 
import React from 'react';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com' },
    { icon: <FiTwitter />, url: 'https://twitter.com' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com' },
  ];

  return (
    <footer className="py-8 mt-20 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 md:mb-0"
          >
            <p className="text-gray-600 dark:text-gray-400">
              Built with ❤️ by CaptionFlow
            </p>
          </motion.div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
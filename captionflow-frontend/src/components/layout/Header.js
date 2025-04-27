import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiMic } from 'react-icons/fi';

const Header = () => {
  const { isDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle navigation in a real app with router
  // For demo, this would be replaced with real navigation
  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    // Close mobile menu after navigation
    setIsMenuOpen(false);
    
    // Scroll to section if on home page
    if (path === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path === 'features') {
      const featuresSection = document.getElementById('features-section');
      if (featuresSection) featuresSection.scrollIntoView({ behavior: 'smooth' });
    } else if (path === 'contact') {
      const contactSection = document.getElementById('contact-section');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // For demo: External navigate to home function
  const navigateToHome = () => {
    // This would be replaced with actual navigation in a real app
    window.location.href = '/';
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-10 glassmorphism py-4 px-6 md:px-12"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          className="flex items-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateToHome()}
        >
          <span className="text-primary-500 text-3xl font-bold mr-2">
            <FiMic />
          </span>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            CaptionFlow
          </h1>
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6 mr-4">
            <NavLink label="Home" onClick={() => handleNavigation('home')} />
            <NavLink label="Features" onClick={() => handleNavigation('features')} />
            <NavLink label="Contact" onClick={() => handleNavigation('contact')} />
          </nav>
          
          <div className="flex items-center space-x-4">
            <motion.button
              className="px-4 py-2 bg-primary-500 text-white rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation('login')}
            >
              Free Trial
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 dark:text-gray-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden absolute left-0 right-0 top-full bg-white dark:bg-gray-800 shadow-lg py-4 px-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col space-y-4">
            <MobileNavLink label="Home" onClick={() => handleNavigation('home')} />
            <MobileNavLink label="Features" onClick={() => handleNavigation('features')} />
            <MobileNavLink label="Contact" onClick={() => handleNavigation('contact')} />
            <motion.button
              className="w-full py-2 mt-2 bg-primary-500 text-white rounded-lg text-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavigation('login')}
            >
              Free Trial
            </motion.button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ label, onClick }) => (
  <motion.button
    onClick={onClick}
    className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {label}
  </motion.button>
);

// Mobile Navigation Link Component
const MobileNavLink = ({ label, onClick }) => (
  <motion.button
    onClick={onClick}
    className="text-gray-800 dark:text-gray-200 font-medium text-left py-2 border-b border-gray-100 dark:border-gray-700 w-full"
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.97 }}
  >
    {label}
  </motion.button>
);

export default Header; 
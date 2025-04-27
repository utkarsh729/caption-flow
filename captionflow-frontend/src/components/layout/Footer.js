import React from 'react';
import { FiGithub, FiTwitter, FiLinkedin, FiMapPin, FiMail, FiGlobe } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/deepakshandilya', label: 'GitHub' },
    { icon: <FiTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com/in/deepakshandilya', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { name: 'Home', url: '/' },
    { name: 'Features', url: '/#features-section' },
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms of Service', url: '/terms' },
  ];

  const supportLinks = [
    { name: 'FAQ', url: '/faq' },
    { name: 'Contact Us', url: '/#contact-section' },
    { name: 'Documentation', url: '/docs' },
    { name: 'Feedback', url: '/feedback' },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white">
      {/* Premium gradient accent */}
      <div className="h-1 w-full bg-gradient-to-r from-primary-500 via-blue-500 to-purple-600"></div>
      
      <div className="container mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center mb-5">
              <span className="text-primary-400 text-2xl font-bold mr-2">🎤</span>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                CaptionFlow
              </h3>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Breaking language barriers with real-time speech to text captions.
              A premium tool for professionals who need accurate, instant transcription
              for meetings, presentations, and multicultural communication.
            </p>
          </motion.div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-md font-bold text-white mb-5 border-b border-gray-800 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-md font-bold text-white mb-5 border-b border-gray-800 pb-2">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-md font-bold text-white mb-5 border-b border-gray-800 pb-2">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest updates about new features and improvements.
            </p>
            <div className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full text-sm"
              />
              <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 transition-colors text-white rounded-lg text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-14 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs mb-4 md:mb-0">
            © {currentYear} CaptionFlow. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-400 transition-colors flex items-center"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
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
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMic, FiGlobe, FiClock, FiCheck } from 'react-icons/fi';
import Layout from '../components/layout/Layout';
import LoginModal from '../components/ui/LoginModal';

const LandingPage = ({ navigateToApp }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Features section content
  const features = [
    {
      icon: <FiMic className="h-6 w-6 text-primary-500" />,
      title: 'Real-time Captions',
      description: 'Instantly convert your speech to text with high accuracy and minimal delay'
    },
    {
      icon: <FiGlobe className="h-6 w-6 text-primary-500" />,
      title: 'Multilingual Support',
      description: 'Translate captions to multiple languages on the fly'
    },
    {
      icon: <FiClock className="h-6 w-6 text-primary-500" />,
      title: 'Caption History',
      description: 'Save and review your recent transcriptions with ease'
    },
    {
      icon: <FiCheck className="h-6 w-6 text-primary-500" />,
      title: 'High Accuracy',
      description: 'Powered by advanced AI models for precise speech recognition'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  // Demo login section
  const handleDemoLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = () => {
    // Close modal and navigate to app
    setIsLoginModalOpen(false);
    setTimeout(() => {
      navigateToApp();
    }, 500);
  };

  return (
    <Layout>
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLoginSuccess}
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-primary-900 animate-gradient-x"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Break Language Barriers in Real Time
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                CaptionFlow turns your speech into beautiful multilingual captions instantly.
                Perfect for meetings, presentations, and inclusive communication.
              </p>
              <motion.button
                onClick={navigateToApp}
                className="btn-primary flex items-center"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Capturing Now
                <FiArrowRight className="ml-2" />
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 mt-12 md:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-full h-80 md:h-96 glassmorphism rounded-2xl shadow-xl p-6 flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center mb-6">
                      <FiMic className="text-white text-2xl" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full mx-auto"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the power of AI-powered captions with these incredible features
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                variants={itemVariants}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500 text-white">
        <motion.div 
          className="container mx-auto px-6 md:px-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start captioning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who use CaptionFlow for meetings, presentations, and more.
          </p>
          <motion.button
            onClick={navigateToApp}
            className="px-8 py-4 bg-white text-primary-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </section>
    </Layout>
  );
};

export default LandingPage; 
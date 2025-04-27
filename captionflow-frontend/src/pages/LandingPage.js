import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiMic, FiGlobe, FiClock, FiCheck, FiMail, FiMapPin, FiPhone, FiPlay, FiHeadphones, FiShield, FiStar, FiZap, FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';
import Layout from '../components/layout/Layout';
import LoginModal from '../components/ui/LoginModal';

const LandingPage = ({ navigateToApp }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const textOptions = [
    'interview transcriptions',
    'meeting minutes',
    'lecture notes',
    'podcast summaries',
    'speech accessibility'
  ];

  useEffect(() => {
    const text = textOptions[currentTextIndex];
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypedText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        
        // Pause before erasing
        setTimeout(() => {
          const erasingInterval = setInterval(() => {
            if (currentIndex > 0) {
              currentIndex--;
              setTypedText(text.substring(0, currentIndex));
            } else {
              clearInterval(erasingInterval);
              setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
            }
          }, 50);
        }, 2000);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, [currentTextIndex]);

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
      icon: <FiZap className="h-6 w-6 text-primary-500" />,
      title: 'High Performance',
      description: 'Engineered for speed and efficiency, even with complex speech patterns'
    }
  ];

  // Premium features
  const premiumFeatures = [
    {
      icon: <FiShield />,
      title: 'Enterprise Security',
      description: 'End-to-end encryption and secure storage for sensitive meetings'
    },
    {
      icon: <FiStar />,
      title: 'AI-Enhanced Accuracy',
      description: 'Advanced algorithms trained on industry-specific terminology'
    },
    {
      icon: <FiHeadphones />,
      title: '24/7 Priority Support',
      description: 'Dedicated customer success team for enterprise clients'
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
      <section className="relative py-20 md:py-32 overflow-hidden bg-gray-900 text-white">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
        <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
        <div className="absolute top-20 -left-24 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 -right-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Premium badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 text-xs font-medium">
              <span className="mr-1">✨</span> Professional Speech-to-Text Solution
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-primary-200"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Turn Speech Into Text <br />
              <span className="text-primary-400">Instantly</span>
            </motion.h1>
            
            <motion.h2 
              className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              The ultimate solution for <span className="text-primary-400 font-semibold">{typedText}</span><span className="animate-blink">|</span>
            </motion.h2>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button
                onClick={navigateToApp}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg shadow-lg shadow-primary-500/25 font-medium flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Capturing Now
                <FiArrowRight className="ml-2" />
              </motion.button>
              
              <motion.button
                onClick={handleDemoLogin}
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-lg font-medium flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiPlay className="mr-2" />
                Watch Demo
              </motion.button>
            </motion.div>
          </div>

          {/* Microphone illustration */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="relative w-80 h-80 bg-gray-800/50 border border-gray-700/50 rounded-2xl backdrop-blur-sm shadow-2xl overflow-hidden">
              {/* Animated glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 animate-pulse"></div>
              
              <div className="relative h-full flex flex-col items-center justify-center p-8">
                <motion.div
                  className="text-primary-400 text-8xl mb-6"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 2 
                  }}
                >
                  <FiMic />
                </motion.div>
                
                <div className="space-y-3 w-full">
                  <motion.div 
                    className="h-2 bg-gray-700 rounded-full overflow-hidden"
                    initial={{ width: "80%" }}
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary-500 to-purple-500"
                      animate={{ 
                        width: ["0%", "100%"],
                        x: ["0%", "0%"] 
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear" 
                      }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="h-2 bg-gray-700 rounded-full overflow-hidden"
                    initial={{ width: "65%" }}
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary-500 to-purple-500"
                      animate={{ 
                        width: ["0%", "100%"],
                        x: ["0%", "0%"] 
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                        delay: 0.5
                      }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="h-2 bg-gray-700 rounded-full overflow-hidden"
                    initial={{ width: "90%" }}
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary-500 to-purple-500"
                      animate={{ 
                        width: ["0%", "100%"],
                        x: ["0%", "0%"] 
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear",
                        delay: 0.2
                      }}
                    />
                  </motion.div>
                </div>
                
                <p className="text-center mt-6 text-sm text-gray-400 font-medium">
                  Speak naturally and watch your words transform into text instantly
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Trusted by section */}
          <div className="mt-24 text-center">
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-6">Trusted by innovative companies</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-70">
              <img src="https://via.placeholder.com/120x40/2D3748/FFFFFF?text=Company+1" alt="Company logo" className="h-8" />
              <img src="https://via.placeholder.com/120x40/2D3748/FFFFFF?text=Company+2" alt="Company logo" className="h-8" />
              <img src="https://via.placeholder.com/120x40/2D3748/FFFFFF?text=Company+3" alt="Company logo" className="h-8" />
              <img src="https://via.placeholder.com/120x40/2D3748/FFFFFF?text=Company+4" alt="Company logo" className="h-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-24 bg-gray-950">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-900/50 text-primary-400 text-xs font-medium mb-4">
              Premium Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Professional-Grade Captioning
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Experience the most advanced speech-to-text technology with features designed for professional use
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
                className="bg-gray-900 border border-gray-800 p-8 rounded-xl hover:shadow-lg hover:shadow-primary-500/5 transition-all group"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-900/30 text-primary-400 mb-5 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Premium features highlights */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-900/50 border border-gray-800 rounded-xl p-8">
            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-primary-400 mr-4 mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/50 text-blue-400 text-xs font-medium mb-4">
              Simple Workflow
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Three Steps to Perfect Captions
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Get started in seconds with our intuitive interface
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-0.5 h-[calc(100%-120px)] bg-gradient-to-b from-primary-500 to-primary-800 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
              <PremiumStepCard 
                number="1" 
                title="Click the Mic"
                description="Press the stylish microphone button to start recording your voice with a single tap"
                delay={0.1}
              />
              <PremiumStepCard 
                number="2" 
                title="Speak Naturally"
                description="Talk at your normal pace and watch as our AI converts your speech to text in real-time"
                delay={0.3}
              />
              <PremiumStepCard 
                number="3" 
                title="Export & Share"
                description="Save your transcriptions instantly in multiple formats or share them with your team"
                delay={0.5}
              />
            </div>
          </div>
          
          {/* Demo video placeholder */}
          <motion.div
            className="mt-24 rounded-xl overflow-hidden border border-gray-800 shadow-xl bg-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-900 relative flex items-center justify-center">
              <img src="https://via.placeholder.com/1920x1080/2D3748/FFFFFF?text=CaptionFlow+Demo" alt="Demo video thumbnail" className="w-full h-full object-cover opacity-80" />
              
              <motion.button
                className="absolute flex items-center justify-center w-20 h-20 rounded-full bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPlay className="text-2xl ml-1" />
              </motion.button>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-xl font-bold">Watch CaptionFlow in Action</h3>
                <p className="text-gray-300 text-sm">See how easy it is to generate perfect captions in seconds</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-24 bg-gray-950">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-900/50 text-purple-400 text-xs font-medium mb-4">
              Get in Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Contact Our Team
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Have questions about CaptionFlow? Our team is ready to help
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <motion.div
              className="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-white">Send Us a Message</h3>
              
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea 
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[120px] text-white"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
            
            <motion.div
              className="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-white">Contact Information</h3>
              
              <div className="space-y-8 mb-10">
                <PremiumContactInfo 
                  icon={<FiMail className="text-lg" />} 
                  title="Email" 
                  detail="support@captionflow.com" 
                  color="primary"
                />
                <PremiumContactInfo 
                  icon={<FiPhone className="text-lg" />} 
                  title="Phone" 
                  detail="+1 (555) 123-4567" 
                  color="blue"
                />
                <PremiumContactInfo 
                  icon={<FiMapPin className="text-lg" />} 
                  title="Address" 
                  detail="Chandigarh University, Mohali, India" 
                  color="purple"
                />
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <SocialIconButton icon={<FiTwitter />} color="twitter" />
                  <SocialIconButton icon={<FiLinkedin />} color="linkedin" />
                  <SocialIconButton icon={<FiGithub />} color="github" href="https://github.com/deepakshandilya" />
                </div>
              </div>
              
              {/* Developer info */}
              <div className="mt-10 pt-6 border-t border-gray-800">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-primary-400 mr-4">DS</div>
                  <div>
                    <h4 className="text-white font-medium">Deepak Shandilya</h4>
                    <p className="text-gray-400 text-sm">Lead Developer</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Accent effects */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl"></div>
        
        <motion.div 
          className="container mx-auto px-6 md:px-12 text-center relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Transform Your Speech into Text?</h2>
            <p className="text-xl mb-10 text-gray-300">
              Join the professionals who rely on CaptionFlow for their speech-to-text needs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={navigateToApp}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg shadow-lg shadow-primary-500/25 font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Free Trial
              </motion.button>
              
              <motion.button
                onClick={handleDemoLogin}
                className="px-8 py-4 bg-transparent border border-white/30 hover:bg-white/10 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Schedule Demo
              </motion.button>
            </div>
            
            <p className="text-gray-500 text-sm mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

// Premium Step Card Component
const PremiumStepCard = ({ number, title, description, delay = 0 }) => (
  <motion.div
    className="flex flex-col items-center text-center relative"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="relative">
      <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mb-6 relative z-10">
        <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center text-xl font-bold">
          {number}
        </div>
      </div>
      {/* Glow effect */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-primary-500/30 rounded-full filter blur-xl"></div>
    </div>
    
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg w-full">
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </motion.div>
);

// Premium Contact Info Component
const PremiumContactInfo = ({ icon, title, detail, color }) => {
  const getColorClass = () => {
    switch (color) {
      case 'primary': return 'text-primary-400 bg-primary-500/10';
      case 'blue': return 'text-blue-400 bg-blue-500/10';
      case 'purple': return 'text-purple-400 bg-purple-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };
  
  return (
    <div className="flex items-start">
      <div className={`p-3 rounded-lg ${getColorClass()} mr-4`}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-300">{title}</h4>
        <p className="text-gray-400 text-sm mt-1">{detail}</p>
      </div>
    </div>
  );
};

// Social Icon Button Component
const SocialIconButton = ({ icon, color, href }) => {
  const getColorClass = () => {
    switch (color) {
      case 'twitter': return 'hover:bg-blue-500/20 hover:text-blue-400';
      case 'linkedin': return 'hover:bg-blue-600/20 hover:text-blue-500';
      case 'github': return 'hover:bg-gray-700/30 hover:text-white';
      default: return 'hover:bg-gray-700/20 hover:text-white';
    }
  };
  
  return (
    <motion.a
      href={href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 ${getColorClass()} transition-colors`}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
};

export default LandingPage; 
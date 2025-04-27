import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '../components/layout/AppLayout';
import LanguageSelector from '../components/ui/LanguageSelector';
import MicrophoneButton from '../components/ui/MicrophoneButton';
import CaptionDisplay from '../components/ui/CaptionDisplay';
import CaptionHistory from '../components/ui/CaptionHistory';
import { FiArrowLeft, FiSave, FiDownload } from 'react-icons/fi';
import { transcribeAudio } from '../utils/speechRecognition';

const STORAGE_KEY = 'captionflow_history';

const AppPage = ({ navigateToLanding }) => {
  // State management
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [isRecording, setIsRecording] = useState(false);
  const [caption, setCaption] = useState('');
  const [captionHistory, setCaptionHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Load saved captions on initial render
  useEffect(() => {
    const savedCaptions = localStorage.getItem(STORAGE_KEY);
    if (savedCaptions) {
      try {
        const parsed = JSON.parse(savedCaptions);
        setCaptionHistory(parsed);
      } catch (error) {
        console.error('Error parsing saved captions:', error);
      }
    }
  }, []);
  
  // Function to handle starting and stopping recording
  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      setIsLoading(true);
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        
        mediaRecorder.onstop = async () => {
          try {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            
            // Transcribe the audio using Google's Speech-to-Text API
            const transcription = await transcribeAudio(audioBlob, selectedLanguage);
            
            // Update the caption
            setCaption(transcription || 'No speech detected');
            setIsLoading(false);
            
            // Only add to history if there's actual text
            if (transcription) {
              // Add to history
              const timestamp = new Date().toLocaleTimeString();
              const date = new Date().toLocaleDateString();
              const newHistory = [
                { 
                  id: Date.now(), 
                  text: transcription, 
                  timestamp, 
                  date,
                  language: selectedLanguage 
                },
                ...captionHistory.slice(0, 9) // Keep only 10 items
              ];
              
              setCaptionHistory(newHistory);
              // Save to localStorage
              localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
            }
            
            // Stop all tracks in the stream to release the microphone
            stream.getTracks().forEach(track => track.stop());
          } catch (error) {
            console.error('Error processing audio:', error);
            setCaption('Error transcribing audio');
            setIsLoading(false);
          }
        };
        
        mediaRecorder.start();
        setIsRecording(true);
        setCaption('');
      } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Unable to access your microphone. Please check your browser permissions.');
      }
    }
  };
  
  // Function to clear history
  const clearHistory = () => {
    setCaptionHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Function to export history as JSON
  const exportHistory = () => {
    if (captionHistory.length === 0) {
      alert('No captions to export');
      return;
    }
    
    const dataStr = JSON.stringify(captionHistory, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `captionflow_export_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Function to save the current caption to history explicitly
  const saveCurrentCaption = () => {
    if (!caption) {
      alert('No caption to save');
      return;
    }
    
    setIsSaving(true);
    
    // Add to history
    const timestamp = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();
    const newHistory = [
      { 
        id: Date.now(), 
        text: caption, 
        timestamp, 
        date,
        language: selectedLanguage,
        saved: true // Mark as explicitly saved
      },
      ...captionHistory
    ];
    
    setCaptionHistory(newHistory);
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    
    // Show animation
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-6 md:px-12 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.button
            onClick={navigateToLanding}
            className="flex items-center text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft className="mr-2" /> Back to Home
          </motion.button>
          
          <motion.h2
            className="text-3xl font-bold text-center text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Real-time Captions
          </motion.h2>
          
          <div className="w-[100px] flex justify-end">
            {caption && (
              <motion.button
                onClick={saveCurrentCaption}
                className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={isSaving ? { scale: 1 } : { scale: 1 }}
                animate={isSaving ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                title="Save this caption"
              >
                <FiSave />
              </motion.button>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main caption area */}
          <motion.div 
            className="w-full lg:w-2/3 flex flex-col items-center space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CaptionDisplay caption={caption} isLoading={isLoading} />
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 w-full max-w-lg">
              <LanguageSelector 
                selectedLanguage={selectedLanguage} 
                setSelectedLanguage={setSelectedLanguage} 
              />
              
              <div className="flex-shrink-0">
                <MicrophoneButton 
                  isRecording={isRecording} 
                  toggleRecording={toggleRecording} 
                />
              </div>
            </div>
          </motion.div>
          
          {/* Caption history sidebar */}
          <motion.div 
            className="w-full lg:w-1/3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Caption History
              </h3>
              
              {captionHistory.length > 0 && (
                <motion.button
                  onClick={exportHistory}
                  className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Export history"
                >
                  <FiDownload />
                </motion.button>
              )}
            </div>
            
            <CaptionHistory 
              captions={captionHistory} 
              clearHistory={clearHistory} 
            />
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AppPage; 
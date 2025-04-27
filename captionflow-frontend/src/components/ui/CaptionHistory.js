import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiTrash, FiStar, FiCopy, FiCheck, FiFilter } from 'react-icons/fi';

const CaptionHistory = ({ captions, clearHistory }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'saved', or specific language
  const [copied, setCopied] = useState(null);

  // Group captions by date
  const groupedCaptions = captions.reduce((groups, caption) => {
    const date = caption.date || new Date().toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(caption);
    return groups;
  }, {});

  // Get all unique languages
  const languages = [...new Set(captions.map(c => c.language))];

  // Filter captions
  const filteredCaptions = captions.filter(caption => {
    if (filter === 'all') return true;
    if (filter === 'saved') return caption.saved;
    return caption.language === filter;
  });

  // Copy caption text to clipboard
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center">
          <FiClock className="mr-2 text-primary-500" /> History
        </h3>
        
        {captions.length > 0 && (
          <div className="flex items-center gap-2">
            <motion.button
              onClick={clearHistory}
              className="text-sm text-gray-500 hover:text-red-500 flex items-center dark:text-gray-400 dark:hover:text-red-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiTrash className="mr-1" /> Clear
            </motion.button>
          </div>
        )}
      </div>
      
      {/* Filter selector */}
      {captions.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center mb-2">
            <FiFilter className="mr-1 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              active={filter === 'all'} 
              onClick={() => setFilter('all')}
              label="All"
            />
            <FilterButton 
              active={filter === 'saved'} 
              onClick={() => setFilter('saved')}
              label={<><FiStar className="mr-1 text-yellow-400" /> Saved</>}
            />
            {languages.map(lang => (
              <FilterButton 
                key={lang}
                active={filter === lang} 
                onClick={() => setFilter(lang)}
                label={lang.split('-')[0].toUpperCase()}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="glassmorphism-strong overflow-hidden rounded-xl">
        <AnimatePresence>
          {captions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 text-center text-gray-500 dark:text-gray-400"
            >
              <div className="flex flex-col items-center space-y-2">
                <FiStar className="text-primary-300 w-10 h-10 mb-2 opacity-50" />
                <p>No caption history yet</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Recorded captions will appear here</p>
              </div>
            </motion.div>
          ) : filteredCaptions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 text-center text-gray-500 dark:text-gray-400"
            >
              No captions match your filter
            </motion.div>
          ) : (
            <div className="max-h-[500px] overflow-y-auto">
              {Object.entries(groupedCaptions).map(([date, dateCaptions]) => {
                // Only include this date group if it has captions matching the filter
                const filteredDateCaptions = dateCaptions.filter(caption => {
                  if (filter === 'all') return true;
                  if (filter === 'saved') return caption.saved;
                  return caption.language === filter;
                });
                
                if (filteredDateCaptions.length === 0) return null;
                
                return (
                  <div key={date} className="border-b border-gray-200/50 dark:border-gray-700/50 last:border-0">
                    <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-800/50 sticky top-0 z-10">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{date}</p>
                    </div>
                    
                    <ul className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                      {filteredDateCaptions.map((item, index) => (
                        <motion.li
                          key={item.id || index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ 
                            duration: 0.3,
                            delay: index * 0.05,
                          }}
                          className="p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors relative group"
                        >
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-400 font-medium">{item.timestamp}</span>
                            <div className="flex items-center gap-1">
                              {item.saved && (
                                <span className="text-yellow-500">
                                  <FiStar size={14} />
                                </span>
                              )}
                              <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-2 py-0.5 rounded-full">
                                {item.language.split('-')[0].toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.text}</p>
                          
                          {/* Copy button - only visible on hover */}
                          <motion.button
                            className={`absolute bottom-2 right-2 p-1.5 rounded-full text-xs opacity-0 group-hover:opacity-100 ${
                              copied === (item.id || index)
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            }`}
                            onClick={() => copyToClipboard(item.text, item.id || index)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            title="Copy to clipboard"
                          >
                            {copied === (item.id || index) ? <FiCheck size={12} /> : <FiCopy size={12} />}
                          </motion.button>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Helper component for filter buttons
const FilterButton = ({ active, onClick, label }) => (
  <motion.button
    onClick={onClick}
    className={`text-xs px-2 py-1 rounded-full ${
      active 
        ? 'bg-primary-500 text-white' 
        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {typeof label === 'string' ? label : (
      <div className="flex items-center">{label}</div>
    )}
  </motion.button>
);

export default CaptionHistory; 
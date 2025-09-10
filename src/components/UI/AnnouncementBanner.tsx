import React, { useState } from 'react';
import { X, Megaphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-accent-400 text-primary-900"
      >
        <div className="container-max section-padding py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Megaphone className="w-5 h-5" />
              <span className="font-medium text-sm">
                🎉 Early Bird Registration: Save 25% until March 15th! 
                <a href="/registration" className="underline ml-2 hover:no-underline">
                  Register Now
                </a>
              </span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-primary-900 hover:text-primary-700 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
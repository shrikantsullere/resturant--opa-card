import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center">
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-24 h-24 border-4 border-white/5 border-t-landing-primary rounded-full"
        />
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute inset-2 border-4 border-white/5 border-b-landing-secondary rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 40" className="w-8 h-8 object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="12" stroke="#3FB6E0" strokeWidth="5" />
              <path d="M 40 32 L 40 8 A 10 10 0 0 1 60 8 A 10 10 0 0 1 40 20" stroke="#72C06A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 70 32 L 85 8 L 100 32" stroke="#3FB6E0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 78 22 L 92 22" stroke="#72C06A" strokeWidth="5" strokeLinecap="round" />
            </svg>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="mt-8 text-gray-500 font-bold uppercase tracking-[0.3em] text-xs"
      >
        Outdoor Play Arena Loading
      </motion.p>
    </div>
  );
};

export default Loader;




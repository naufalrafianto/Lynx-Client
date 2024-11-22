'use client';

import React from 'react';
import { motion } from 'framer-motion';

const BackgroundElements = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-purple-200/30 to-indigo-200/30 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute -bottom-32 -left-32 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-indigo-200/30 to-purple-200/30 blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-1/4 top-1/3 h-16 w-16 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl"
      />

      <motion.div
        animate={{
          y: [0, -30, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute right-1/4 top-2/3 h-20 w-20 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 blur-xl"
      />
    </div>
  );
};

export default BackgroundElements;

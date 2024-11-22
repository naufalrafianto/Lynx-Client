'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Feature } from '@/types';
import { features } from '@/constants';

const headerVariant = {
  initial: {
    opacity: 0,
    y: -30,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const containerVariant = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariant = {
  initial: (index: number) => ({
    opacity: 0,
    y: 40,
    x: index % 3 === 0 ? -20 : index % 3 === 2 ? 20 : 0,
    scale: 0.9,
  }),
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const FeatureCard: React.FC<Feature> = ({
  icon: Icon,
  title,
  description,
  id,
}) => {
  const index = parseInt(id) - 1;

  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 opacity-50 blur-2xl transition-all duration-300 group-hover:opacity-70"
      />
      <div className="relative space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          viewport={{ once: true }}
          className="inline-block rounded-lg bg-gradient-to-r from-indigo-100 to-purple-100 p-3"
        >
          <Icon className="h-6 w-6 text-indigo-600" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          viewport={{ once: true }}
          className="text-xl font-semibold text-gray-900"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          viewport={{ once: true }}
          className="text-gray-600"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section
      id="features"
      className="relative flex min-h-screen flex-col items-center justify-center gap-12 overflow-hidden py-12"
    >
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="absolute left-0 top-0 h-96 w-96 rounded-full bg-purple-200/50 blur-3xl"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-200/50 blur-3xl"
        />
      </div>

      <motion.div
        className="space-y-4 text-center"
        variants={headerVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-3xl font-medium text-transparent sm:text-4xl md:text-5xl">
          Endless possibilities with a simple link
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
          Our advanced link shortening service allows you to personalize your
          links and share them effortlessly.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
      >
        {features.map((feature) => (
          <FeatureCard key={feature.id} {...feature} />
        ))}
      </motion.div>
    </section>
  );
};

export default Features;

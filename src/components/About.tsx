'use client';

import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Users, Target, Globe, BarChart4, Shield, Zap } from 'lucide-react';

interface StatsItem {
  icon: React.ElementType;
  label: string;
  value: string;
}

interface BenefitItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const statsData: StatsItem[] = [
  { icon: Users, label: 'Active Users', value: '50K+' },
  { icon: Globe, label: 'Countries', value: '150+' },
  { icon: BarChart4, label: 'Links Created', value: '10M+' },
];

const benefitsData: BenefitItem[] = [
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description:
      'Enterprise-grade security with 99.9% uptime guarantee for your shortened URLs',
  },
  {
    icon: Target,
    title: 'Targeted Reach',
    description:
      'Customize your links for different audiences and track engagement metrics',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Optimized infrastructure ensures quick redirects and real-time analytics',
  },
];

const About = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const mainControl = useAnimation();
  const slideControl = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      mainControl.start('visible');
      slideControl.start('visible');
    }
  }, [isInView, mainControl, slideControl]);

  const headerVariant = {
    hidden: {
      opacity: 0,
      y: -30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const statsVariant = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -30 : 30,
      y: 20,
      scale: 0.9,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const benefitsVariant = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen overflow-hidden py-20"
    >
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 0.5 } : { scale: 0.8, opacity: 0 }
          }
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute left-0 top-0 h-96 w-96 rounded-full bg-purple-200/50 blur-3xl"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 0.5 } : { scale: 0.8, opacity: 0 }
          }
          transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-200/50 blur-3xl"
        />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          variants={headerVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="mb-4 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-3xl font-medium text-transparent sm:text-4xl md:text-5xl">
            Trusted by millions worldwide
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            We're revolutionizing link management with cutting-edge technology
            and analytics, helping businesses and individuals make every click
            count.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mb-20 grid grid-cols-1 gap-8 sm:grid-cols-3"
          variants={containerVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={statsVariant}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={
                  isInView
                    ? { scale: 1, opacity: 0.5 }
                    : { scale: 0.8, opacity: 0 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-50 blur-2xl transition-all duration-300 group-hover:opacity-70"
              />
              <div className="relative flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <stat.icon className="mb-4 h-12 w-12 text-indigo-600" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="mb-2 text-3xl font-bold text-gray-900"
                >
                  {stat.value}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-gray-600"
                >
                  {stat.label}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              variants={benefitsVariant}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={
                  isInView
                    ? { scale: 1, opacity: 0.5 }
                    : { scale: 0.8, opacity: 0 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-50 blur-2xl transition-all duration-300 group-hover:opacity-70"
              />
              <div className="relative flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <benefit.icon className="mb-4 h-12 w-12 text-indigo-600" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="mb-2 text-2xl font-semibold text-gray-900"
                >
                  {benefit.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-gray-600"
                >
                  {benefit.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;

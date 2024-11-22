'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ChevronDown } from 'lucide-react';
import { PricingTier } from '@/types';
import { pricingTiers } from '@/constants';
import ComparisonTable from './ComparisonTable';
import { usePricingState } from '@/hooks/usePricingState';

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

const cardVariant = {
  initial: (index: number) => ({
    opacity: 0,
    y: 40,
    x: index === 0 ? -20 : index === 2 ? 20 : 0,
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

const featureVariant = {
  initial: { opacity: 0, x: -10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface PricingCardProps extends PricingTier {
  index: number;
  onSelectPlan?: (plan: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  description,
  features,
  highlighted,
  index,
  onSelectPlan,
}) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      className={`group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${
        highlighted ? 'ring-2 ring-indigo-600 ring-offset-2' : ''
      }`}
    >
      {highlighted && (
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-indigo-600 to-purple-600 px-12 py-1 text-sm text-white"
        >
          Popular
        </motion.div>
      )}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 opacity-50 blur-2xl transition-all duration-300 group-hover:opacity-70"
      />

      <div className="relative space-y-6">
        {/* Tier Name & Price */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-gray-900">{name}</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-bold text-gray-900">{price}</span>
            {price !== 'Free' && price !== 'Custom' && (
              <span className="ml-1 text-gray-600">/month</span>
            )}
          </div>
          <p className="mt-2 text-gray-600">{description}</p>
        </motion.div>

        {/* Features List */}
        <motion.ul
          className="space-y-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{
            staggerChildren: 0.1,
            delayChildren: 0.3 + index * 0.1,
          }}
        >
          {features.map((feature) => (
            <motion.li
              key={feature}
              variants={featureVariant}
              className="flex items-center gap-3"
            >
              <Check className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-600">{feature}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA Button */}
        <motion.button
          onClick={() => onSelectPlan?.(name)}
          className={`group flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 ${
            highlighted
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
              : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get started
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const { showComparison, setShowComparison, selectedPlan, handleSelectPlan } =
    usePricingState();

  return (
    <section
      id="pricing"
      className="relative min-h-screen overflow-hidden py-20"
    >
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-200/50 blur-3xl"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-200/50 blur-3xl"
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          variants={headerVariant}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="mb-4 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-3xl font-medium text-transparent sm:text-4xl md:text-5xl">
            Choose your perfect plan
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Start free and scale as you grow. All plans come with a 14-day
            money-back guarantee.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          {pricingTiers.map((tier, index) => (
            <PricingCard
              key={tier.name}
              {...tier}
              index={index}
              onSelectPlan={handleSelectPlan}
            />
          ))}
        </motion.div>

        {/* FAQ Note */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-600">
            Have questions?{' '}
            <a
              href="#faq"
              className="text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Check our FAQ
            </a>{' '}
            or{' '}
            <a
              href="#contact"
              className="text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              contact support
            </a>
            .
          </p>
        </motion.div>

        {/* Compare Plans Button */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button
            onClick={() => setShowComparison((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Compare all features
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Feature Comparison Table */}
        {showComparison && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
          >
            <ComparisonTable />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Pricing;

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const AuthPage = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      {/* Background Gradient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-200/30 blur-3xl"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
          className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-200/30 blur-3xl"
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full max-w-md px-4"
      >
        <motion.div
          variants={fadeIn}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          {/* Header Tabs */}
          <div className="flex">
            <motion.button
              whileHover={{ backgroundColor: 'rgba(79, 70, 229, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLogin(true)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                isLogin
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600'
              }`}
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(79, 70, 229, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLogin(false)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                !isLogin
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600'
              }`}
            >
              Register
            </motion.button>
          </div>

          {/* Form */}
          <motion.form
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="space-y-6 p-8"
          >
            {/* Form Title */}
            <motion.div variants={fadeIn} className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {isLogin ? 'Welcome back!' : 'Create your account'}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {isLogin
                  ? 'Please enter your details to sign in.'
                  : 'Please fill in the information below.'}
              </p>
            </motion.div>

            {/* Form Fields */}
            {!isLogin && (
              <motion.div variants={fadeIn} className="relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1 flex items-center rounded-lg border border-gray-300 px-3 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <User className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    className="block w-full border-0 bg-transparent py-3 pl-3 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                    placeholder="John Doe"
                  />
                </div>
              </motion.div>
            )}

            <motion.div variants={fadeIn} className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1 flex items-center rounded-lg border border-gray-300 px-3 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                <Mail className="h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  className="block w-full border-0 bg-transparent py-3 pl-3 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                  placeholder="you@example.com"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 flex items-center rounded-lg border border-gray-300 px-3 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                <Lock className="h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  className="block w-full border-0 bg-transparent py-3 pl-3 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                  placeholder="••••••••"
                />
              </div>
            </motion.div>

            {isLogin && (
              <motion.div variants={fadeIn} className="text-right">
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div variants={fadeIn}>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isLoading}
                className="relative w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 text-center text-sm font-medium text-white hover:from-indigo-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="mx-auto h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                  />
                ) : isLogin ? (
                  'Sign in'
                ) : (
                  'Create account'
                )}
              </motion.button>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fadeIn} className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </motion.div>

            {/* Social Login Buttons */}
            <motion.div variants={fadeIn} className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <FaGoogle className="h-5 w-5" />
                Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <FaGithub className="h-5 w-5" />
                GitHub
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          variants={fadeIn}
          className="mt-6 text-center text-sm text-gray-600"
        >
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AuthPage;

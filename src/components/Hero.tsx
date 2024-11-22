'use client';
import React from 'react';
import { Link2 } from 'lucide-react';

const Hero = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 sm:pt-24">
      <div className="space-y-12">
        {/* Header Content */}
        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Shorten your links with
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {' '}
              LYNX
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Transform your links into powerful insights. Track and analyze your
            customer engagement with our advanced URL shortening solution.
          </p>
        </div>

        {/* URL Shortener Input */}
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
            <div className="flex flex-col gap-3 p-2 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Link2 className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  placeholder="Paste a link to shorten it"
                  className="w-full rounded-lg bg-gray-50 px-10 py-3 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 font-medium text-white transition hover:opacity-90">
                Shorten
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

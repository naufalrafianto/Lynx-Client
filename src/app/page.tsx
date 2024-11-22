'use client';

import About from '@/components/About';
import BackgroundElements from '@/components/BackgroundElements';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import React from 'react';
const Home = () => {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <BackgroundElements />

      <div className="container relative mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <Hero />
        <About />
        <Features />
        <Pricing />
      </div>
      <Footer />
    </main>
  );
};

export default Home;

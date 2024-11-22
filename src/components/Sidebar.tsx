'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { LucideIcon, LucideProps, Menu } from 'lucide-react';

interface SidebarProps {
  navigationItems: Array<{
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >;
    label: string;
    href: string;
    active?: boolean;
  }>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  navigationItems,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  return (
    <>
      {/* Overlay for mobile */}
      {!isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? 280 : 80,
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        }}
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-gray-200 bg-white`}
      >
        {/* Logo Section */}
        <div className="flex h-16 items-center justify-between px-4">
          <motion.div
            initial={false}
            animate={{
              width: isSidebarOpen ? 'auto' : '48px',
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
            className="flex items-center gap-3 overflow-hidden"
          >
            <Image
              src="/logo.png"
              alt="Lynx Logo"
              width={48}
              height={48}
              priority
              className="h-12 w-12 shrink-0 rounded-xl object-cover"
            />
            <motion.h3
              initial={false}
              animate={{
                opacity: isSidebarOpen ? 1 : 0,
                scale: isSidebarOpen ? 1 : 0.5,
              }}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent"
            >
              Lynx
            </motion.h3>
          </motion.div>

          <motion.button
            whileHover={{ backgroundColor: 'rgb(243 244 246)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:text-gray-900"
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigationItems.map((item) => (
            <Link key={item.label} href={item.href} className="block">
              <motion.div
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`h-5 w-5 shrink-0 ${
                    item.active ? 'text-indigo-600' : 'text-gray-500'
                  }`}
                />
                <motion.span
                  initial={false}
                  animate={{
                    opacity: isSidebarOpen ? 1 : 0,
                    width: isSidebarOpen ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="border-t border-gray-200 p-4">
          <motion.div
            initial={false}
            animate={{
              width: isSidebarOpen ? 'auto' : '40px',
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
            className="flex items-center gap-3 overflow-hidden"
          >
            <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
            <motion.div
              initial={false}
              animate={{
                opacity: isSidebarOpen ? 1 : 0,
                scale: isSidebarOpen ? 1 : 0.5,
              }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-hidden"
            >
              <p className="truncate font-medium text-gray-900">John Doe</p>
              <p className="truncate text-sm text-gray-600">john@example.com</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;

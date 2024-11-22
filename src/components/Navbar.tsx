'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVBAR_MENU } from '@/constants';

interface NavbarMenuItem {
  id: string;
  label: string;
  path: string;
}

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();

    if (pathname === '/') {
      const sectionId = path.replace('#', '');
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        window.history.pushState({}, '', path);
      }
    } else {
      window.location.href = `/${path}`;
    }
  };

  const isSectionInView = (sectionId: string): boolean => {
    if (typeof window === 'undefined') return false;

    const element = document.getElementById(sectionId);
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-5">
        {/* Logo Section */}
        <Link href="/" className="inline-flex items-center gap-2 text-lg">
          <Image
            src="/logo.png"
            alt="Lynx Logo"
            width={200}
            height={200}
            priority
            className="h-auto w-12 duration-500"
          />
          <h3 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text font-bold text-transparent">
            Lynx
          </h3>
        </Link>
        {/* Navigation Menu */}
        <ul className="inline-flex items-center gap-8">
          {NAVBAR_MENU.map((menu: NavbarMenuItem) => {
            const isActive =
              pathname === '/' && isSectionInView(menu.path.replace('#', ''));

            return (
              <li key={menu.id} className="group relative">
                <a
                  href={menu.path}
                  onClick={(e) => handleNavClick(e, menu.path)}
                  className={`relative inline-block py-2 transition-colors duration-300`}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent">
                    {menu.label}
                  </span>
                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                  {/* Hover background glow */}
                  <span className="absolute -inset-2 -z-10 scale-95 rounded-lg bg-gray-50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                </a>
              </li>
            );
          })}
        </ul>
        {/* Auth Buttons */}
        <div className="inline-flex items-center gap-6">
          {/* Login Button */}
          <Link href="/auth" className="group relative py-2">
            <span className="relative z-10 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent">
              Login
            </span>
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ease-out group-hover:w-full" />
          </Link>
          {/* Get Started Button */}
          <div className="group relative">
            <div className="absolute -inset-0.5 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 opacity-75 blur-sm transition duration-300 group-hover:opacity-100" />
            <button className="relative h-10 w-32 rounded-md bg-white">
              <Link
                href="/auth"
                className="flex h-full w-full items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text font-medium text-transparent transition duration-300 hover:opacity-90"
              >
                Get Started
              </Link>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
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
            <p className="text-gray-500">
              Transform your links into powerful insights with our advanced URL
              shortening solution.
            </p>
            <div className="flex space-x-4"></div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-500 transition-colors hover:text-purple-600"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 transition-colors hover:text-purple-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-500 transition-colors hover:text-purple-600"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-500 transition-colors hover:text-purple-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/url-shortener"
                  className="text-gray-500 transition-colors hover:text-purple-600"
                >
                  URL Shortener
                </Link>
              </li>
              <li>
                <Link
                  href="/qr-generator"
                  className="text-gray-500 transition-colors hover:text-purple-600"
                >
                  QR Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/analytics"
                  className="text-gray-500 transition-colors hover:text-purple-600"
                >
                  Link Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="text-gray-500 transition-colors hover:text-purple-600"
                >
                  API Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Stay Updated</h3>
            <p className="mb-4 text-gray-500">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 py-2 font-medium text-white transition-shadow hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-100 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-gray-500">© 2024 Lynxs. All rights reserved.</p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-gray-500 transition-colors hover:text-purple-600"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 transition-colors hover:text-purple-600"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-500 transition-colors hover:text-purple-600"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

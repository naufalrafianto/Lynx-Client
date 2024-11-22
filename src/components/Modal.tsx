'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import {
  X,
  Link2,
  Copy,
  Check,
  ChevronDown,
  Calendar,
  Globe2,
  Lock,
  QrCode,
  Download,
  Trash2,
} from 'lucide-react';

interface UrlData {
  id: string;
  originalUrl: string;
  shortUrl: string;
  customSlug: string;
  isPrivate: boolean;
  expiryDate: string;
  createdAt: Date;
}

interface CreateUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUrl: (url: UrlData) => void;
}

const generateRandomId = () => Math.random().toString(36).substring(7);

export const CreateUrlModal: React.FC<CreateUrlModalProps> = ({
  isOpen,
  onClose,
  onAddUrl,
}) => {
  const [step, setStep] = React.useState(1);
  const [advanced, setAdvanced] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [expiryDate, setExpiryDate] = React.useState('');
  const [originalUrl, setOriginalUrl] = React.useState('');
  const [customSlug, setCustomSlug] = React.useState('');
  const [showQR, setShowQR] = React.useState(false);
  const [currentShortUrl, setCurrentShortUrl] = React.useState('');
  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleCreateUrl = () => {
    const newShortUrl = `lynx.id/${customSlug || generateRandomId()}`;
    setCurrentShortUrl(newShortUrl);

    const newUrl: UrlData = {
      id: generateRandomId(),
      originalUrl,
      shortUrl: newShortUrl,
      customSlug,
      isPrivate,
      expiryDate,
      createdAt: new Date(),
    };

    onAddUrl(newUrl);
    setStep(2);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentShortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `qr-${customSlug || 'code'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetForm = () => {
    setStep(1);
    setAdvanced(false);
    setCopied(false);
    setIsPrivate(false);
    setExpiryDate('');
    setOriginalUrl('');
    setCustomSlug('');
    setShowQR(false);
    setCurrentShortUrl('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          onClick={handleClickOutside}
        >
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
          >
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Create Short URL
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              {/* Progress Steps */}
              <div className="mt-4 flex items-center gap-2">
                <div
                  className={`h-2 flex-1 rounded-full ${
                    step >= 1 ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                />
                <div
                  className={`h-2 flex-1 rounded-full ${
                    step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                />
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              {step === 1 ? (
                <div className="space-y-6">
                  {/* Original URL Input */}
                  <div>
                    <label
                      htmlFor="url"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Enter your URL
                    </label>
                    <div className="mt-1">
                      <input
                        type="url"
                        id="url"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        placeholder="https://example.com/your-long-url"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Custom URL Slug */}
                  <div>
                    <label
                      htmlFor="custom"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Custom back-half (optional)
                    </label>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-gray-500">lynx.id/</span>
                      <input
                        type="text"
                        id="custom"
                        value={customSlug}
                        onChange={(e) => setCustomSlug(e.target.value)}
                        placeholder="custom-url"
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Advanced Options Toggle */}
                  <motion.button
                    onClick={() => setAdvanced(!advanced)}
                    className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <span>Advanced Options</span>
                    <motion.div
                      animate={{ rotate: advanced ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </motion.button>

                  {/* Advanced Options */}
                  <AnimatePresence>
                    {advanced && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4 overflow-hidden"
                      >
                        {/* Privacy Toggle */}
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Lock className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Private Link
                              </p>
                              <p className="text-xs text-gray-500">
                                Only you can access statistics
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setIsPrivate(!isPrivate)}
                            className={`relative h-6 w-11 rounded-full transition-colors ${
                              isPrivate ? 'bg-indigo-600' : 'bg-gray-200'
                            }`}
                          >
                            <motion.div
                              animate={{ x: isPrivate ? 20 : 2 }}
                              className="absolute top-1 h-4 w-4 rounded-full bg-white"
                            />
                          </button>
                        </div>

                        {/* Expiry Date */}
                        <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <input
                            type="date"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="flex-1 border-0 bg-transparent p-0 text-sm text-gray-700 focus:outline-none focus:ring-0"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      URL Shortened Successfully!
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Your shortened URL is ready to share
                    </p>
                  </div>

                  {/* Shortened URL */}
                  <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-3">
                    <Globe2 className="h-5 w-5 text-gray-400" />
                    <span className="flex-1 text-sm font-medium text-gray-700">
                      {currentShortUrl}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopy}
                      className="rounded-lg bg-gray-50 p-2 text-gray-600 hover:bg-gray-100"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </motion.button>
                  </div>

                  {/* QR Code Section */}
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <QrCode className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          QR Code
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowQR(!showQR)}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                      >
                        {showQR ? 'Hide QR Code' : 'Show QR Code'}
                      </motion.button>
                    </div>

                    <AnimatePresence>
                      {showQR && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 flex flex-col items-center gap-4"
                        >
                          <QRCodeSVG
                            id="qr-code"
                            value={currentShortUrl}
                            size={200}
                            level="H"
                          />
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleDownloadQR}
                            className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                          >
                            <Download className="h-4 w-4" />
                            Download QR Code
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  {step === 2 ? 'Close' : 'Cancel'}
                </motion.button>
                {step === 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCreateUrl}
                    disabled={!originalUrl}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Create Short URL
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

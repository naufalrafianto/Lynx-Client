'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Bell,
  Search,
  User,
  ArrowUpRight,
  Link2,
  MousePointerClick,
  Globe2,
  BarChart2,
  Clock,
  Menu,
  Copy,
  ExternalLink,
  Check,
  Download,
  QrCode as QrCodeIcon,
  Trash2,
  X,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CreateUrlModal } from '@/components/Modal';
import { QRCodeSVG } from 'qrcode.react';

// TypeScript interfaces
interface UrlData {
  id: string;
  originalUrl: string;
  shortUrl: string;
  customSlug?: string;
  isPrivate: boolean;
  expiryDate?: string;
  createdAt: Date;
}

interface ChartData {
  name: string;
  value: number;
}

// Chart data
const clicksData: ChartData[] = [
  { name: 'Mon', value: 245 },
  { name: 'Tue', value: 388 },
  { name: 'Wed', value: 512 },
  { name: 'Thu', value: 325 },
  { name: 'Fri', value: 467 },
  { name: 'Sat', value: 189 },
  { name: 'Sun', value: 233 },
];

const deviceData: ChartData[] = [
  { name: 'Mobile', value: 55 },
  { name: 'Desktop', value: 35 },
  { name: 'Tablet', value: 10 },
];

const COLORS = ['#4F46E5', '#818CF8', '#C7D2FE'];

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [urls, setUrls] = React.useState<UrlData[]>([]);
  const [selectedUrl, setSelectedUrl] = React.useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = React.useState<string | null>(null);

  const handleAddUrl = (url: UrlData) => {
    setUrls((prev) => [url, ...prev]);
  };

  const handleDeleteUrl = (id: string) => {
    setUrls((prev) => prev.filter((url) => url.id !== id));
  };

  const handleCopyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDownloadQR = async (urlId: string) => {
    const url = urls.find((u) => u.id === urlId);
    if (!url) return;

    const svg = document.getElementById('qr-code');
    if (!svg) return;

    try {
      // Convert SVG to data URL
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], {
        type: 'image/svg+xml;charset=utf-8',
      });
      const svgUrl = URL.createObjectURL(svgBlob);

      // Create canvas and context
      const canvas = document.createElement('canvas');
      canvas.width = 200; // Match QR code size
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Create image for loading SVG
      const img: HTMLImageElement = document.createElement('img');
      const imageLoadPromise = new Promise<void>((resolve, reject) => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          resolve();
        };
        img.onerror = () => reject(new Error('Failed to load image'));
      });

      // Load the SVG into the image
      img.src = svgUrl;

      // Wait for image to load and then create download
      await imageLoadPromise;

      // Convert to PNG and download
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-${url.customSlug || url.id}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Cleanup
      URL.revokeObjectURL(svgUrl);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      // You might want to show an error notification here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm">
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

        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-full bg-gray-100 p-2"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </motion.button>

          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-[2px]">
            <div className="h-full w-full rounded-full bg-white p-[2px]">
              <User className="h-full w-full text-gray-600" />
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto max-w-7xl p-4 pt-20">
        {/* Quick URL Create Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-lg"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">Create Short URL</h2>
              <p className="mt-1 text-indigo-100">
                Generate shortened URLs and QR codes instantly
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Create New Link
            </motion.button>
          </div>
        </motion.div>

        {/* Links Table Section */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          {/* Table Header */}
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Links
            </h3>
            <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option>All Links</option>
              <option>Active Links</option>
              <option>Expired Links</option>
            </select>
          </div>

          {/* Empty State or Table */}
          {urls.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-indigo-100 p-3">
                <Link2 className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mt-4 text-sm font-medium text-gray-900">
                No links yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Create your first shortened URL to get started
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Create Short URL
              </motion.button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="whitespace-nowrap py-3 text-left text-sm font-medium text-gray-500">
                      Short URL
                    </th>
                    <th className="whitespace-nowrap py-3 text-left text-sm font-medium text-gray-500">
                      Original URL
                    </th>
                    <th className="whitespace-nowrap py-3 text-left text-sm font-medium text-gray-500">
                      Created
                    </th>
                    <th className="whitespace-nowrap py-3 text-left text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="whitespace-nowrap py-3 text-left text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <AnimatePresence>
                    {urls.map((url) => (
                      <motion.tr
                        key={url.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group hover:bg-gray-50"
                      >
                        <td className="whitespace-nowrap py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-indigo-600">
                              {url.shortUrl}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleCopyUrl(url.shortUrl)}
                              className="rounded p-1 hover:bg-gray-100"
                            >
                              {copiedUrl === url.shortUrl ? (
                                <Check className="h-4 w-4 text-green-600" />
                              ) : (
                                <Copy className="h-4 w-4 text-gray-400" />
                              )}
                            </motion.button>
                          </div>
                        </td>
                        <td className="max-w-xs truncate py-4 text-sm text-gray-500">
                          {url.originalUrl}
                        </td>
                        <td className="whitespace-nowrap py-4 text-sm text-gray-500">
                          {new Date(url.createdAt).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              url.isPrivate
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {url.isPrivate ? 'Private' : 'Public'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap py-4">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setSelectedUrl(url.id)}
                              className="rounded p-1 hover:bg-gray-100"
                            >
                              <QrCodeIcon className="h-4 w-4 text-gray-400" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteUrl(url.id)}
                              className="rounded p-1 hover:bg-gray-100"
                            >
                              <Trash2 className="h-4 w-4 text-red-400" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <CreateUrlModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUrl={handleAddUrl}
      />

      <AnimatePresence>
        {selectedUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">QR Code</h3>
                <button
                  onClick={() => setSelectedUrl(null)}
                  className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col items-center">
                <QRCodeSVG
                  id="qr-code"
                  value={
                    urls.find((url) => url.id === selectedUrl)?.shortUrl || ''
                  }
                  size={200}
                  level="H"
                  includeMargin
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDownloadQR(selectedUrl)}
                  className="mt-4 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  <Download className="h-4 w-4" />
                  Download QR Code
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analytics Section */}
      <div className="container mx-auto mt-8 max-w-7xl px-4">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Clicks Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Click Analytics
              </h3>
              <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clicksData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="name"
                    stroke="#6B7280"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis stroke="#6B7280" axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFF',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow:
                        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    dot={{
                      stroke: '#4F46E5',
                      strokeWidth: 2,
                      r: 4,
                      fill: '#FFF',
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Device Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <h3 className="mb-6 text-lg font-semibold text-gray-900">
              Device Distribution
            </h3>
            <div className="flex h-[300px] items-center justify-center">
              <div className="h-[200px] w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFF',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow:
                          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="ml-8 space-y-2">
                {deviceData.map((device, index) => (
                  <div key={device.name} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm text-gray-600">{device.name}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {device.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

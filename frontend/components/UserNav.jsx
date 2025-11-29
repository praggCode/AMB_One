'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const defaultTabs = [
  { label: 'Dashboard', href: '/CompPages/UserDashboard' },
  { label: 'Book Ambulance', href: '/CompPages/UserAmbulance' },
  { label: 'History', href: '/CompPages/UserHistory' },
];

export default function UserNav({ active = '', tabs = defaultTabs }) {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo Section */}
        <button
          className="flex items-center gap-3 focus:outline-none hover:opacity-80 transition-opacity"
          onClick={() => router.push('/')}
        >
          <div className="h-20 w-20">
            <img src="/logo.jpg" alt="MediRide Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">MediRide</span>
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1">
          {tabs.map((tab) => {
            const isActive = active.toLowerCase() === tab.label.toLowerCase();
            return (
              <button
                key={tab.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                  ? 'bg-[#D70040] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                onClick={() => router.push(tab.href)}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

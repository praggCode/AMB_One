'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const defaultTabs = [
  { label: 'Dashboard', href: '/CompPages/UserDashboard' },
  { label: 'Book Ambulance', href: '/CompPages/UserAmbulance' },
  { label: 'History', href: '/CompPages/UserHistory' },
];

export default function UserNav({ active = '', tabs = defaultTabs }) {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-[1000]">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <button
            className="flex items-center gap-3 focus:outline-none hover:opacity-80 transition-opacity"
            onClick={() => router.push('/')}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
            />
            <span className="text-xl font-bold text-gray-900">MediRide</span>
          </button>

          <nav className="flex items-center gap-3">
            {tabs.map((tab) => {
              const isActive = active.toLowerCase() === tab.label.toLowerCase();
              return (
                <button
                  key={tab.href}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${isActive
                    ? 'bg-[#D70040] text-white'
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
      </div>
    </header>
  );
}

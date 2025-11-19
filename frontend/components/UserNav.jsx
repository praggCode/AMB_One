'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const tabs = [
  { label: 'Dashboard', href: '/CompPages/UserDashboard' },
  { label: 'Book Ambulance', href: '/CompPages/UserAmbulance' },
  { label: 'History', href: '/CompPages/UserHistory' },
];

export default function UserNav({ active = '' }) {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <button
          className="flex items-center gap-3 focus:outline-none"
          onClick={() => router.push('/')}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D70040] text-white text-2xl font-bold">
            •
          </span>
          <span className="text-xl font-semibold text-gray-900">MediRide</span>
        </button>
        <nav className="flex items-center gap-8 text-sm font-medium text-gray-600">
          {tabs.map((tab) => {
            const isActive = active.toLowerCase() === tab.label.toLowerCase();
            return (
              <button
                key={tab.href}
                className={`transition ${
                  isActive ? 'text-[#D70040] font-semibold' : 'hover:text-gray-900'
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


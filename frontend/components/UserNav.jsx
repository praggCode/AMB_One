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
                className={`transition hover:underline underline-offset-4 ${
                  isActive ? 'text-[#D70040] font-semibold' : 'text-gray-600 hover:text-gray-900'
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


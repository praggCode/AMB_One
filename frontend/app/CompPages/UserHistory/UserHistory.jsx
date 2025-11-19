'use client';

import React from 'react';
import UserNav from '@/components/UserNav';

export default function UserHistory() {
  return (
    <div className="min-h-screen bg-gray-50">
      <UserNav active="History" />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Booking History</h1>
          <p className="mt-2 text-gray-500">
            Your past bookings will appear here once we wire up history data.
          </p>
        </div>
      </main>
    </div>
  );
}


'use client';

import React, { useEffect, useState } from 'react';
import UserNav from '@/components/UserNav';
import { Clock, MapPin } from 'lucide-react';

export default function UserHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem('userHistory');
    if (raw) setHistory(JSON.parse(raw));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNav active="History" />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Booking History</h1>
          <p className="mt-1 text-gray-600">Completed trips</p>
        </div>

        {history.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <p className="text-gray-600">No completed trips yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((trip) => (
              <div key={trip.id} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">Trip #{trip.id}</span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">Completed</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">₹{Number(trip?.distanceKm || 0) * 20}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {new Date(trip.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-[#D70040] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Pickup</p>
                      <p className="text-gray-900 font-medium">{trip.pickupLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Destination</p>
                      <p className="text-gray-900 font-medium">{trip.destination}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}


'use client';

import React, { useEffect, useState } from 'react';
import { Clock, MapPin, User, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import UserNav from '@/components/UserNav';

const formatDate = (timestamp) => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(timestamp));
  } catch {
    return timestamp;
  }
};

export default function UserDashboard() {
  const router = useRouter();
  const [currentBooking, setCurrentBooking] = useState(null);
  const assigned = currentBooking?.status === 'Accepted';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('currentBooking');
    if (stored) {
      setCurrentBooking(JSON.parse(stored));
    }
    const onStorage = (e) => {
      if (e.key === 'currentBooking') {
        setCurrentBooking(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleClearBooking = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentBooking');
    }
    setCurrentBooking(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNav active="Dashboard" />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h2>
            <p className="text-gray-600 text-lg">Welcome back!</p>
          </div>
          <button
            className="bg-[#D70040] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#B8003A] transition-colors flex items-center gap-2"
            onClick={() => router.push('/CompPages/UserAmbulance')}
          >
            <span className="text-xl">+</span>
            Book Ambulance
          </button>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeWidth="2" d="M12 8v4m0 4h.01" />
            </svg>
          </div>
          <div>
            <h3 className="text-red-700 font-semibold mb-1">Emergency?</h3>
            <p className="text-gray-700">
              For immediate emergency services, please call <span className="font-bold text-[#FF0000]">911</span> or your local emergency number.
            </p>
          </div>
        </div>

        {/* Current Booking */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Current Booking</h3>
            {currentBooking && (
              <button
                className="text-sm font-medium text-[#D70040] hover:underline"
                onClick={handleClearBooking}
              >
                Clear
              </button>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {currentBooking ? (
              <>
                {/* Booking Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      Booking #{currentBooking.id}
                    </h4>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(currentBooking.createdAt)}</span>
                    </div>
                  </div>
                  <span className="bg-[#D70040] text-white px-4 py-1.5 rounded-full text-sm font-medium">
                    {currentBooking.status || 'Pending'}
                  </span>
                </div>

                {/* Booking Details */}
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#D70040] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Pickup</p>
                      <p className="text-gray-900 font-medium">{currentBooking.pickupLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#D70040] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Destination</p>
                      <p className="text-gray-900 font-medium">{currentBooking.destination}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Patient</p>
                      <p className="text-gray-900 font-medium">{currentBooking.patientName}</p>
                      {currentBooking.patientPhone && (
                        <p className="text-sm text-gray-500">{currentBooking.patientPhone}</p>
                      )}
                    </div>
                  </div>
                  {currentBooking.notes && (
                    <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                      <p className="font-medium text-gray-900 mb-1">Notes</p>
                      {currentBooking.notes}
                    </div>
                  )}
                </div>

                {/* Driver Placeholder */}
                <div>
                  <h5 className="font-bold text-gray-900 mb-4">Driver Information</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Assignment:</span>
                      <span className="text-gray-900 font-medium">{assigned ? 'Assigned' : 'Pending'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{assigned ? 'A driver has accepted your booking.' : "We'll notify you once a driver is assigned."}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <MapPin className="h-8 w-8" />
                </div>
                <p className="text-lg font-semibold text-gray-900">No active bookings</p>
                <p className="mt-1 text-gray-600">Create a new booking to see it here.</p>
                <button
                  className="mt-4 inline-flex items-center rounded-full bg-[#D70040]/10 px-5 py-2 text-sm font-medium text-[#D70040]"
                  onClick={() => router.push('/CompPages/UserAmbulance')}
                >
                  Book an ambulance
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
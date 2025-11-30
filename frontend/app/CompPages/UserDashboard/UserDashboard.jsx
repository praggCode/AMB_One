'use client';

import React, { useEffect, useState } from 'react';
import { Clock, MapPin, User, Phone, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import UserNav from '@/components/UserNav';
import api from '../../../lib/api';
import { useUser } from '@/context/UserContext';

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
  const { user, loading } = useUser();
  const [currentBooking, setCurrentBooking] = useState(null);
  const assigned = currentBooking?.status === 'Accepted' || currentBooking?.status === 'accepted';

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchActiveBooking = async () => {
      if (!user) return;
      try {
        const { data } = await api.get('/users/history');
        const active = data.find(b => b.status === 'pending' || b.status === 'accepted' || b.status === 'Pending' || b.status === 'Accepted');
        setCurrentBooking(active || null);
      } catch (error) {
        if (error.response?.status === 401) {
          router.push('/login');
        } else {
          console.error("Failed to fetch active booking:", error);
        }
      }
    };
    if (user) {
      fetchActiveBooking();
    }
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  const handleClearBooking = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentBooking');
    }
    setCurrentBooking(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNav active="Dashboard" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-600 text-lg mt-1">Welcome back, {user?.name}!</p>
          </div>
          <button
            className="bg-[#D70040] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#B8003A] transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40"
            onClick={() => router.push('/CompPages/UserAmbulance')}
          >
            + Book Ambulance
          </button>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-50 border-l-4 border-[#D70040] rounded-xl p-5 mb-8 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-[#D70040] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-[#D70040] font-bold text-lg mb-1">Emergency?</h3>
            <p className="text-gray-700">
              For immediate emergency services, please call <span className="font-bold text-[#D70040]">102</span> or your local emergency number.
            </p>
          </div>
        </div>

        {/* Current Booking */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Current Booking</h3>
            {currentBooking && (
              <button
                className="text-sm font-semibold text-gray-500 hover:text-[#D70040] transition-colors"
                onClick={handleClearBooking}
              >
                Clear
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {currentBooking ? (
              <div className="p-8">
                {/* Booking Header */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      Booking #{currentBooking.bookingId || currentBooking._id?.slice(-6).toUpperCase()}
                    </h4>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{formatDate(currentBooking.createdAt)}</span>
                    </div>
                  </div>
                  <span className="bg-[#D70040] text-white px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                    {currentBooking.status || 'Pending'}
                  </span>
                </div>

                {/* Booking Details */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#D70040]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Pickup Location</p>
                      <p className="text-gray-900 font-medium text-lg">{currentBooking.pickup}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#D70040]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Destination</p>
                      <p className="text-gray-900 font-medium text-lg">{currentBooking.destination}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Patient</p>
                      <p className="text-gray-900 font-medium text-lg">{currentBooking.patientName}</p>
                      {currentBooking.patientPhone && (
                        <p className="text-gray-500 text-sm mt-1">{currentBooking.patientPhone}</p>
                      )}
                    </div>
                  </div>

                  {currentBooking.notes && (
                    <div className="rounded-xl bg-gray-50 p-5 border border-gray-100">
                      <p className="font-semibold text-gray-900 mb-2">Additional Notes</p>
                      <p className="text-gray-600">{currentBooking.notes}</p>
                    </div>
                  )}
                </div>

                {/* Driver Information */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h5 className="font-bold text-gray-900 mb-4 text-lg">Driver Information</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Assignment Status:</span>
                      <span className={`font-semibold ${assigned ? 'text-green-600' : 'text-amber-600'}`}>
                        {assigned ? 'Assigned' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">
                        {assigned ? 'A driver has accepted your booking.' : "We'll notify you once a driver is assigned."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <MapPin className="h-10 w-10 text-gray-400" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">No active bookings</h4>
                <p className="text-gray-600 mb-6">Create a new booking to see it here.</p>
                <button
                  className="inline-flex items-center rounded-xl bg-[#D70040] px-6 py-3 text-sm font-semibold text-white hover:bg-[#B8003A] transition-all"
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
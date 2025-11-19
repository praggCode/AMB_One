'use client';

import React, { useState } from 'react';
import { MapPin, Phone, User, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import UserNav from '@/components/UserNav';

const initialForm = {
  pickupLocation: '',
  destination: '',
  patientName: '',
  patientPhone: '',
  notes: '',
};

export default function UserAmbulance() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.pickupLocation || !formData.destination || !formData.patientName) {
      setFeedback({
        type: 'error',
        message: 'Pickup, destination, and patient name are required.',
      });
      return;
    }

    setSubmitting(true);
    const bookingId = `BK${Date.now().toString().slice(-6)}`;

    const bookingPayload = {
      id: bookingId,
      pickupLocation: formData.pickupLocation,
      destination: formData.destination,
      patientName: formData.patientName,
      patientPhone: formData.patientPhone,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('currentBooking', JSON.stringify(bookingPayload));
    }

    setFeedback({
      type: 'success',
      message: 'Booking saved! Redirecting to dashboard…',
    });
    setFormData(initialForm);

    setTimeout(() => {
      setSubmitting(false);
      router.push('/CompPages/UserDashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNav active="Book Ambulance" />
      <main className="mx-auto max-w-4xl px-4 py-10 space-y-8">
        {/* Map Placeholder */}
        <section>
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#D70040]/10">
              <MapPin className="h-8 w-8 text-[#D70040]" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Map Coming Soon</h2>
            <p className="mt-2 text-gray-500">Live tracking will be displayed here</p>
            <div className="mt-8 h-64 rounded-xl border border-dashed border-gray-200 bg-gray-50" />
          </div>
        </section>

        {/* Booking Details */}
        <section>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Booking Details</h3>
              <p className="mt-1 text-sm text-gray-500">Provide accurate information for quick service</p>

              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-gray-900">
                  Pickup Location *
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-gray-200 px-3">
                    <MapPin className="h-4 w-4 text-[#D70040]" />
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      placeholder="Enter pickup address"
                      className="w-full border-none py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </label>

                <label className="block text-sm font-medium text-gray-900">
                  Destination *
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-gray-200 px-3">
                    <MapPin className="h-4 w-4 text-[#D70040]" />
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="Enter hospital or destination"
                      className="w-full border-none py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </label>

                <label className="block text-sm font-medium text-gray-900">
                  Patient Name *
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-gray-200 px-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      placeholder="Enter patient name"
                      className="w-full border-none py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </label>

                <label className="block text-sm font-medium text-gray-900">
                  Patient Phone
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-gray-200 px-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      name="patientPhone"
                      value={formData.patientPhone}
                      onChange={handleChange}
                      placeholder="Enter patient phone number"
                      className="w-full border-none py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </label>

                <label className="block text-sm font-medium text-gray-900">
                  Additional Notes
                  <div className="mt-2 flex items-start gap-2 rounded-lg border border-gray-200 px-3">
                    <FileText className="mt-3 h-4 w-4 text-gray-400" />
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any special requirements or medical conditions..."
                      rows={4}
                      className="w-full resize-none border-none py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </label>

                {feedback && (
                  <div
                    className={`rounded-lg px-4 py-3 text-sm ${
                      feedback.type === 'success'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {feedback.message}
                  </div>
                )}

                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    className="flex-1 rounded-lg border border-gray-200 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                    onClick={() => router.push('/CompPages/UserDashboard')}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-[#0FADAD] px-4 py-3 font-semibold text-white transition hover:bg-[#0b8686]"
                    disabled={submitting}
                  >
                    {submitting ? 'Booking…' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </div>
        </section>
      </main>
    </div>
  );
}


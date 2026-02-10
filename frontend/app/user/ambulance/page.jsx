"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, User, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import UserNav from '@/app/user/components/UserNav';
import dynamic from 'next/dynamic';
import { useUser } from '@/app/user/context/UserContext';
import api from '@/common/lib/api';
import AddressAutocomplete from '@/common/components/AddressAutocomplete';

const MapComponent = dynamic(() => import('@/common/components/MapComponent'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl" />
});

const initialForm = {
    pickupLocation: '',
    destination: '',
    patientName: '',
    patientPhone: '',
    notes: '',
};

export default function UserAmbulance() {
    const router = useRouter();
    const { user, loading } = useUser();
    const [formData, setFormData] = useState(initialForm);
    const [pickupCoords, setPickupCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return null;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddressSelect = (type, data) => {
        if (type === 'pickup') {
            setPickupCoords({ lat: parseFloat(data.lat), lon: parseFloat(data.lon) });
            setFormData(prev => ({ ...prev, pickupLocation: data.address }));
        } else {
            setDestinationCoords({ lat: parseFloat(data.lat), lon: parseFloat(data.lon) });
            setFormData(prev => ({ ...prev, destination: data.address }));
        }
    };

    const handleAddressRemove = (type) => {
        if (type === 'pickup') {
            setPickupCoords(null);
            setFormData(prev => ({ ...prev, pickupLocation: '' }));
        } else {
            setDestinationCoords(null);
            setFormData(prev => ({ ...prev, destination: '' }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.pickupLocation || !formData.destination || !formData.patientName) {
            setFeedback({
                type: 'error',
                message: 'Pickup, destination, and patient name are required.',
            });
            return;
        }

        if (!pickupCoords || !destinationCoords) {
            setFeedback({
                type: 'error',
                message: 'Please select pickup and destination from the map or suggestions to get accurate location.',
            });
            return;
        }

        setSubmitting(true);

        const mockDistance = 5;
        const fare = mockDistance * 20;

        const bookingPayload = {
            pickup: formData.pickupLocation,
            destination: formData.destination,
            fare: fare,
            patientName: formData.patientName,
            patientPhone: formData.patientPhone,
            notes: formData.notes,
            pickupCoords,
            destinationCoords
        };

        try {
            const { data } = await api.post('/bookings/create', bookingPayload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('currentBooking', JSON.stringify(data));
            }

            setFeedback({
                type: 'success',
                message: 'Booking saved! Redirecting to dashboard…',
            });
            setFormData(initialForm);
            setPickupCoords(null);
            setDestinationCoords(null);

            setTimeout(() => {
                setSubmitting(false);
                router.push('/user/dashboard');
            }, 1200);
        } catch (error) {
            if (error.response?.status === 401) {
                setFeedback({
                    type: 'error',
                    message: 'Session expired. Please login again.',
                });
                setTimeout(() => router.push('/login'), 2000);
            } else {
                console.error("Booking failed", error);
                setFeedback({
                    type: 'error',
                    message: error.response?.data?.message || 'Failed to create booking. Please try again.',
                });
            }
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
            <UserNav active="Book Ambulance" />
            <main className="mx-auto max-w-5xl px-4 py-8 space-y-8 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Book an Ambulance</h1>
                    <p className="text-slate-500 mt-2">Fill in the details below to request immediate assistance.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">

                    {/* Left Column: Map (Takes up 2 cols on large screens if desired, or 1 col? Let's keep it balanced) 
               Actually, let's make the map prominent side-by-side or stacked. 
               The current layout was stacked. Let's try a side-by-side on large screens for a "dashboard" feel.
            */}
                    <section className="lg:col-span-1 order-2 lg:order-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Map Card */}
                            <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden h-[500px] lg:h-[600px] relative group">
                                <div className="absolute inset-0 pointer-events-none z-10 border-[6px] border-white/50 rounded-3xl"></div>
                                <MapComponent
                                    pickup={pickupCoords}
                                    destination={destinationCoords}
                                    onLocationSelect={handleAddressSelect}
                                    onLocationRemove={handleAddressRemove}
                                />
                                {/* Overlay Instruction */}
                                {!pickupCoords && !destinationCoords && (
                                    <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-slate-100 shadow-sm z-0 text-center">
                                        <p className="text-sm font-medium text-slate-600">Tip: You can tap on the map to select locations</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Right Column: Form (Takes up 2 cols) */}
                    <section className="lg:col-span-2 order-1 lg:order-2">
                        <div className="rounded-3xl border border-slate-100 bg-white p-6 lg:p-8 shadow-2xl shadow-slate-200/50">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">Ride Details</h3>
                                    <p className="mt-1 text-sm text-slate-500 font-medium">Distance & time calculated automatically</p>
                                </div>
                                <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                    <User className="h-5 w-5" />
                                </div>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                                    <AddressAutocomplete
                                        label="Pickup Location"
                                        value={formData.pickupLocation}
                                        onChange={(val) => setFormData(prev => ({ ...prev, pickupLocation: val }))}
                                        onSelect={(data) => handleAddressSelect('pickup', data)}
                                        placeholder="Where should we pick you up?"
                                        icon={MapPin}
                                        iconColor="text-red-500"
                                        className="bg-white"
                                    />

                                    <div className="relative">
                                        <div className="absolute left-3.5 -top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500/20 to-transparent -z-10"></div>
                                    </div>

                                    <AddressAutocomplete
                                        label="Hospital / Destination"
                                        value={formData.destination}
                                        onChange={(val) => setFormData(prev => ({ ...prev, destination: val }))}
                                        onSelect={(data) => handleAddressSelect('destination', data)}
                                        placeholder="Which hospital?"
                                        icon={MapPin}
                                        iconColor="text-red-500"
                                        className="bg-white"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2 group">
                                        <label className="text-sm font-semibold text-slate-700 ml-1">Patient Name <span className="text-red-500">*</span></label>
                                        <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.02]">
                                            <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                            <input
                                                type="text"
                                                name="patientName"
                                                value={formData.patientName}
                                                onChange={handleChange}
                                                placeholder="Patient's full name"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 group">
                                        <label className="text-sm font-semibold text-slate-700 ml-1">Contact Number</label>
                                        <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.02]">
                                            <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                            <input
                                                type="tel"
                                                name="patientPhone"
                                                value={formData.patientPhone}
                                                onChange={handleChange}
                                                placeholder="Emergency contact number"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Medical Condition / Notes</label>
                                    <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.01]">
                                        <FileText className="absolute left-4 top-4 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            placeholder="Describe the condition or any special requirements..."
                                            rows={4}
                                            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                                        />
                                    </div>
                                </div>

                                {feedback && (
                                    <div
                                        className={`rounded-xl px-4 py-4 text-sm font-medium flex items-center gap-3 ${feedback.type === 'success'
                                            ? 'bg-green-50 text-green-700 border border-green-100'
                                            : 'bg-red-50 text-red-700 border border-red-100'
                                            }`}
                                    >
                                        <span className={`flex h-2 w-2 rounded-full ${feedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        {feedback.message}
                                    </div>
                                )}

                                <div className="flex gap-4 pt-4 border-t border-slate-100">
                                    <button
                                        type="button"
                                        className="basis-1/3 rounded-xl border border-slate-200 bg-white px-6 py-4 font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 active:scale-95"
                                        onClick={() => router.push('/user/dashboard')}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="basis-2/3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 font-bold text-white shadow-xl shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                        disabled={submitting}
                                    >
                                        {submitting ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Processing...</span>
                                            </div>
                                        ) : (
                                            'Confirm & Request Ambulance'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

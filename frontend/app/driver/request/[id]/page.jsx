"use client";
import React, { useEffect, useState } from "react";
import UserNav from "@/app/user/components/UserNav";
import { useRouter } from "next/navigation";
import { MapPin, User, Clock, Phone, Navigation, CheckCircle2, XCircle } from "lucide-react";
import api from '@/common/lib/api';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/common/components/MapComponent'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl" />
});

export default function RequestDetails({ params }) {
    const router = useRouter();
    // In Next.js App Router (prior to 15), params is a prop. In 15, it's a promise. 
    // Assuming 14 or lower based on previous code usually accessing params directly.
    // If it breaks, I'll fix it to await params.
    const id = params.id;
    const [booking, setBooking] = useState(null);

    const driverTabs = [
        { label: "Dashboard", href: "/driver/dashboard" },
        { label: "History", href: "/driver/history" },
    ];

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const { data } = await api.get(`/bookings/${id}`);
                setBooking(data);
            } catch (error) {
                console.error("Failed to fetch booking:", error);
            }
        };
        if (id) fetchBooking();
    }, [id]);

    const handleAccept = async () => {
        try {
            await api.patch(`/bookings/${id}/status`, { status: "accepted" });
            router.push(`/driver/trip/${id}`);
        } catch (error) {
            console.error("Failed to accept booking:", error);
        }
    };

    const handleDecline = async () => {
        try {
            await api.patch(`/bookings/${id}/status`, { status: "declined" });
            router.push('/driver/dashboard');
        } catch (error) {
            console.error("Failed to decline booking:", error);
        }
    };

    if (!booking) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans">
            <UserNav active="Dashboard" tabs={driverTabs} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">New Booking Request</h2>
                            <span className="px-4 py-2 bg-amber-100 text-amber-700 text-sm font-bold rounded-full uppercase tracking-wide">
                                Pending Action
                            </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="h-96 rounded-2xl overflow-hidden border border-gray-100">
                                <MapComponent
                                    pickup={booking.pickupCoords?.coordinates ? { lat: booking.pickupCoords.coordinates[1], lon: booking.pickupCoords.coordinates[0] } : null}
                                    destination={booking.destinationCoords?.coordinates ? { lat: booking.destinationCoords.coordinates[1], lon: booking.destinationCoords.coordinates[0] } : null}
                                />
                            </div>

                            <div className="space-y-8 flex flex-col justify-between">
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Patient & Trip Info</h3>
                                        <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <User className="text-blue-600 h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Patient Name</p>
                                                    <p className="text-gray-900 font-bold text-lg">{booking.patientName}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <MapPin className="text-blue-600 h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Pickup From</p>
                                                    <p className="text-gray-900 font-medium">{booking.pickup}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                                                    <Navigation className="text-red-600 h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Going To</p>
                                                    <p className="text-gray-900 font-medium">{booking.destination}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {booking.notes && (
                                        <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                            <p className="text-xs text-[#2563EB] font-bold uppercase tracking-wider mb-1">Medical Notes</p>
                                            <p className="text-gray-700">{booking.notes}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-8">
                                    <button
                                        onClick={handleDecline}
                                        className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-100 py-4 px-6 rounded-2xl font-bold transition-all shadow-sm hover:shadow-md"
                                    >
                                        <XCircle size={20} />
                                        Decline
                                    </button>
                                    <button
                                        onClick={handleAccept}
                                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:bg-blue-700 text-white py-4 px-6 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-95"
                                    >
                                        <CheckCircle2 size={20} />
                                        Accept Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

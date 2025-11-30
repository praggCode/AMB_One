"use client";
import React, { useEffect, useState } from "react";
import UserNav from "@/components/UserNav";
import { useRouter } from "next/navigation";
import { MapPin, User, Clock, Phone, Navigation, CheckCircle2 } from "lucide-react";
import api from '../../../../lib/api';

export default function TripDetailsAccepted({ params }) {
    const router = useRouter();
    const [trip, setTrip] = useState(null);
    const resolvedParams = React.use(params);
    const id = resolvedParams?.id;
    const driverTabs = [
        { label: "Dashboard", href: "/DriverPages" },
        { label: "History", href: "/DriverPages/history" },
    ];

    useEffect(() => {
        const fetchTrip = async () => {
            if (!id) return;
            try {
                const { data } = await api.get(`/bookings/${id}`);
                setTrip(data);
            } catch (error) {
                console.error("Failed to fetch trip details:", error);
            }
        };
        fetchTrip();
    }, [id]);

    const handleComplete = async () => {
        if (typeof window === "undefined" || !trip) return;
        try {
            await api.put(`/bookings/${trip._id}/status`, { status: 'completed' });
            router.push(`/DriverPages/history`);
        } catch (error) {
            console.error("Failed to complete trip", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans">
            <UserNav active="Dashboard" tabs={driverTabs} />

            <main className="p-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Trip Details</h1>
                        <p className="text-sm text-gray-500">Trip #{trip?.bookingId}</p>
                    </div>
                    <span className="px-3 py-1 bg-[#D70040] text-white text-xs font-bold rounded-full uppercase tracking-wide">Accepted</span>
                </div>
                {/* Map Placeholder */}
                <div className="bg-gray-100 rounded-2xl h-64 mb-6 flex flex-col items-center justify-center text-gray-400 border border-gray-200">
                    <div className="w-16 h-16 bg-[#D70040]/10 rounded-full flex items-center justify-center mb-4">
                        <MapPin size={32} className="text-[#D70040]" />
                    </div>
                    <p className="font-bold text-gray-600">MAP COMING SOON</p>
                    <p className="text-sm">Live tracking will be displayed here</p>
                </div>

                {/* Trip Information Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50">
                        <h2 className="text-lg font-bold text-gray-900">Trip Information</h2>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                                    <MapPin size={14} className="text-[#D70040]" />
                                    Pickup Location
                                </div>
                                <p className="text-gray-900 font-medium text-lg">{trip?.pickup}</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                                    <User size={14} className="text-gray-400" />
                                    Patient Name
                                </div>
                                <p className="text-gray-900 font-medium text-lg">{trip?.patientName}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                                    <MapPin size={14} className="text-red-500" />
                                    Destination
                                </div>
                                <p className="text-gray-900 font-medium text-lg">{trip?.destination}</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                                    <Clock size={14} className="text-gray-400" />
                                    Booking Time
                                </div>
                                <p className="text-gray-900 font-medium text-lg">{new Date(trip?.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 pb-6">
                        <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Fare Price</p>
                                <p className="text-lg font-semibold text-gray-900 mt-1">₹20/km</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Distance: {Number(trip?.distanceKm || 0)} km</p>
                                <p className="text-xl font-bold text-gray-900">₹{Number(trip?.distanceKm || 0) * 20}</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-col gap-3">
                        <button className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                            <Phone size={18} />
                            Call Patient
                        </button>

                        <div className="grid grid-cols-2 gap-3">
                            <button className="w-full bg-[#D70040] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#B60035] transition-colors flex items-center justify-center gap-2 shadow-sm">
                                <Navigation size={18} />
                                Navigate
                            </button>
                            <button onClick={handleComplete} className="w-full text-white font-bold py-3 px-4 rounded-xl bg-gradient-to-r from-[#34D399] to-[#10B981] hover:from-[#10B981] hover:to-[#059669] transition-colors shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 flex items-center justify-center gap-2">
                                <CheckCircle2 size={18} />
                                Complete Trip
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

"use client";

import React, { useEffect, useState } from "react";
import UserNav from "@/components/UserNav";
import { useRouter } from "next/navigation";
import { MapPin, User, Clock, CheckCircle2, XCircle } from "lucide-react";
import dynamic from 'next/dynamic'
import api from '../../../../lib/api';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">Loading Map...</div>
});

export default function TripDetailsNewRequest({ params }) {
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

    const handleAccept = async () => {
        if (typeof window === "undefined" || !trip) return;
        try {
            await api.put(`/bookings/${trip._id}/status`, { status: 'accepted' });
            router.push(`/DriverPages/trip/${trip._id}`);
        } catch (error) {
            console.error("Failed to accept trip", error);
        }
    };

    const handleDecline = async () => {
        if (typeof window === "undefined" || !trip) return;
        try {
            await api.put(`/bookings/${trip._id}/status`, { status: 'cancelled' });
            router.push(`/DriverPages`);
        } catch (error) {
            console.error("Failed to decline trip", error);
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
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wide">
                        {trip?.status || "New Request"}
                    </span>
                </div>
                {/* Map Section */}
                <div className="bg-gray-100 rounded-2xl h-96 mb-6 overflow-hidden border border-gray-200 shadow-sm relative z-0">
                    <MapComponent
                        pickup={trip?.pickupCoords ? { lat: trip.pickupCoords.coordinates[1], lon: trip.pickupCoords.coordinates[0] } : null}
                        destination={trip?.destinationCoords ? { lat: trip.destinationCoords.coordinates[1], lon: trip.destinationCoords.coordinates[0] } : null}
                        readOnly={true}
                    />
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
                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 grid grid-cols-2 gap-4">
                        <button onClick={handleDecline} className="w-full bg-white border border-red-200 text-red-600 font-bold py-3 px-4 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                            <XCircle size={18} />
                            Decline
                        </button>

                        <button onClick={handleAccept} className="w-full bg-[#D70040] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#B60035] transition-colors flex items-center justify-center gap-2 shadow-sm">
                            <CheckCircle2 size={18} />
                            Accept Trip
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

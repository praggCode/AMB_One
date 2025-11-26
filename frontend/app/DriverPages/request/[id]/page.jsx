"use client";

import React, { useEffect, useState } from "react";
import UserNav from "@/components/UserNav";
import { useRouter } from "next/navigation";
import {MapPin,User,Clock,CheckCircle2,XCircle} from "lucide-react";

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
        if (typeof window === "undefined") return;
        const stored = localStorage.getItem("currentBooking");
        if (stored) {
            const data = JSON.parse(stored);
            if (data?.id === id) setTrip(data);
        }
    }, [id]);

    const handleAccept = () => {
        if (typeof window === "undefined" || !trip) return;
        const accepted = { ...trip, status: "Accepted" };
        localStorage.setItem("driverCurrentTrip", JSON.stringify(accepted));
        localStorage.setItem("currentBooking", JSON.stringify(accepted));
        router.push(`/DriverPages/trip/${trip.id}`);
    };

    const handleDecline = () => {
        if (typeof window === "undefined" || !trip) return;
        const historyRaw = localStorage.getItem("driverHistory");
        const history = historyRaw ? JSON.parse(historyRaw) : [];
        const record = { ...trip, status: "Declined" };
        localStorage.setItem("driverHistory", JSON.stringify([record, ...history]));
        localStorage.removeItem("currentBooking");
        router.push(`/DriverPages`);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans">
            <UserNav active="Dashboard" tabs={driverTabs} />

            <main className="p-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Trip Details</h1>
                        <p className="text-sm text-gray-500">Trip #{trip?.id}</p>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wide">
                        {trip?.status || "New Request"}
                    </span>
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
                                <p className="text-gray-900 font-medium text-lg">{trip?.pickupLocation}</p>
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

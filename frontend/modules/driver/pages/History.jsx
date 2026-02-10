"use client";

import React, { useEffect, useState } from "react";
import UserNav from '@/modules/user/components/UserNav';
import { Clock, CheckCircle2, Calendar, Trash2 } from "lucide-react";
import api from '@/modules/common/lib/api';

export default function DriverHistory() {
    const [historyTrips, setHistoryTrips] = useState([]);
    const driverTabs = [
        { label: "Dashboard", href: "/driver/dashboard" },
        { label: "History", href: "/driver/history" },
    ];

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data } = await api.get('/bookings/driver-history');
                const pastTrips = data.filter(t => t.status === 'completed' || t.status === 'cancelled' || t.status === 'Completed' || t.status === 'Cancelled' || t.status === 'Declined');
                setHistoryTrips(pastTrips);
            } catch (error) {
                if (error.response?.status !== 401) {
                    console.error("Failed to fetch driver history:", error);
                }
            }
        };
        fetchHistory()
    }, []);


    return (
        <div className="min-h-screen bg-gray-50/50 font-sans">
            <UserNav active="History" tabs={driverTabs} role="driver" />

            <main className="p-6 max-w-3xl mx-auto">
                <div className="mb-4">
                    <h1 className="text-xl font-bold text-gray-900">Trip History</h1>
                    <p className="text-sm text-gray-500">Past completed trips</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Trips</p>
                        <p className="text-2xl font-bold text-gray-900">{historyTrips.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Earnings</p>
                        <p className="text-2xl font-bold text-gray-900">—</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {historyTrips.map((trip, index) => (
                        <div key={trip._id || trip.id || index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-gray-900">Trip #{trip.bookingId || trip.id}</span>
                                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full flex items-center gap-1">
                                        <CheckCircle2 size={10} />
                                        {trip.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-semibold text-gray-900">₹{Number(trip?.distanceKm || 0) * 20}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {new Date(trip.createdAt).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {new Date(trip.createdAt).toLocaleTimeString()}
                                </div>
                            </div>

                            <div className="space-y-2 relative pl-4 border-l-2 border-gray-100 ml-1">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#2563EB] ring-4 ring-white" />
                                    <p className="text-sm text-gray-900 truncate">{trip.pickup}</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-4 ring-white" />
                                    <p className="text-sm text-gray-900 truncate">{trip.destination}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

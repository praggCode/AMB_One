"use client";

import React, { useEffect, useState } from 'react';
import UserNav from '@/app/user/components/UserNav';
import { Clock, MapPin } from 'lucide-react';
import api from '@/common/lib/api';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/user/context/UserContext';

export default function UserHistory() {
    const router = useRouter();
    const { user, loading } = useUser();
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;
            try {
                const { data } = await api.get('/users/history');
                setHistory(data);
            } catch (error) {
                if (error.response?.status === 401) {
                    router.push('/login');
                } else {
                    console.error("Failed to fetch history:", error);
                }
            } finally {
                setHistoryLoading(false);
            }
        };
        if (user) {
            fetchHistory();
        }
    }, [user, router]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <UserNav active="History" />
            <main className="mx-auto max-w-6xl px-4 py-10">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Booking History</h1>
                    <p className="mt-1 text-gray-600">Completed trips</p>
                </div>

                {historyLoading ? (
                    <div className="text-center py-10 text-gray-500">Loading history...</div>
                ) : history.length === 0 ? (
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                        <p className="text-gray-600">No completed trips yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {history.map((trip) => (
                            <div key={trip._id} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                                            #{trip.bookingId?.slice(-3) || trip._id?.slice(-3).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-sm">Trip #{trip.bookingId || trip._id?.slice(-6).toUpperCase()}</h3>
                                            <p className="text-xs text-slate-500">{new Date(trip.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${trip.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                                        {trip.status}
                                    </span>
                                </div>

                                <div className="space-y-4 mb-4 relative">
                                    {/* Vertical Line */}
                                    <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-slate-100 -z-10"></div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-7 h-7 rounded-full bg-white border-2 border-blue-100 flex items-center justify-center z-10">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-tight">Pickup</p>
                                            <p className="text-sm font-medium text-slate-900">{trip.pickupLocation}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-7 h-7 rounded-full bg-white border-2 border-red-100 flex items-center justify-center z-10">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-tight">Destination</p>
                                            <p className="text-sm font-medium text-slate-900">{trip.destination}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-slate-400">Total Fare</p>
                                        <p className="text-lg font-bold text-slate-900">₹{Number(trip?.distanceKm || 0) * 20}</p>
                                    </div>
                                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                                        View Receipt
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

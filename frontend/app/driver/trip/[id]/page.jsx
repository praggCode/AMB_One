"use client";
import React, { useEffect, useState } from "react";
import UserNav from "@/app/user/components/UserNav";
import { useRouter } from "next/navigation";
import { MapPin, User, Clock, Phone, Navigation, CheckCircle2 } from "lucide-react";
import api from '@/common/lib/api';
import { io } from 'socket.io-client';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/common/components/MapComponent'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl" />
});

export default function TripDetailsAccepted({ params }) {
    const router = useRouter();
    const id = params.id;
    const [booking, setBooking] = useState(null);
    const [vehicleLocation, setVehicleLocation] = useState(null);
    const [socket, setSocket] = useState(null);

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

    useEffect(() => {
        if (!booking) return;

        const newSocket = io('http://localhost:4000');
        setSocket(newSocket);

        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setVehicleLocation({ lat: latitude, lon: longitude });
                    newSocket.emit('update-location', {
                        bookingId: booking._id,
                        location: { lat: latitude, lon: longitude }
                    });
                },
                (error) => console.error(error),
                { enableHighAccuracy: true, distanceFilter: 10 }
            );

            return () => {
                navigator.geolocation.clearWatch(watchId);
                newSocket.disconnect();
            };
        }
    }, [booking]);

    const handleCompleteTrip = async () => {
        try {
            await api.patch(`/bookings/${id}/status`, { status: "completed" });
            router.push('/driver/dashboard');
        } catch (error) {
            console.error("Failed to complete trip:", error);
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
                            <h2 className="text-3xl font-bold text-gray-900">Trip In Progress</h2>
                            <span className="px-4 py-2 bg-emerald-500 text-white text-sm font-bold rounded-full uppercase tracking-wide flex items-center gap-2 shadow-lg shadow-emerald-500/30">
                                <Navigation size={16} className="animate-pulse" />
                                Live Tracking
                            </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-8">
                                <div className="h-96 rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
                                    <MapComponent
                                        pickup={booking.pickupCoords?.coordinates ? { lat: booking.pickupCoords.coordinates[1], lon: booking.pickupCoords.coordinates[0] } : null}
                                        destination={booking.destinationCoords?.coordinates ? { lat: booking.destinationCoords.coordinates[1], lon: booking.destinationCoords.coordinates[0] } : null}
                                        vehicleLocation={vehicleLocation}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col justify-between">
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Patient Details</h3>
                                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200 shadow-sm text-blue-600">
                                                <User />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-lg">{booking.patientName}</p>
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <Phone size={14} />
                                                    <span className="text-sm">{booking.patientPhone || "No contact info"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Trip Route</h3>
                                        <div className="space-y-6 relative pl-4 border-l-2 border-dashed border-gray-200 ml-2">
                                            <div className="relative">
                                                <div className="absolute -left-[25px] top-1.5 w-4 h-4 rounded-full bg-[#2563EB] ring-4 ring-white shadow-sm" />
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Pickup Location</p>
                                                <p className="text-gray-900 font-medium">{booking.pickup}</p>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute -left-[25px] top-1.5 w-4 h-4 rounded-full bg-red-500 ring-4 ring-white shadow-sm" />
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Destination</p>
                                                <p className="text-gray-900 font-medium">{booking.destination}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCompleteTrip}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:bg-blue-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-95 mt-8 flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 size={24} />
                                    Complete Trip
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

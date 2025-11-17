'use client';

import React from 'react';
import { Activity, Users, MapPin, Clock, Shield, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

const featureCards = [
  {
    title: 'Instant Response',
    description: 'Get ambulances to your location within 5 minutes of booking',
    icon: Clock,
    gradient: 'from-[#D70040] to-[#D70040]',
  },
  {
    title: 'Real-Time Tracking',
    description: 'Track your ambulance location live on the map until arrival',
    icon: MapPin,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Verified Drivers',
    description: 'All drivers are verified medical professionals with proper licenses',
    icon: Shield,
    gradient: 'from-[#D70040] to-[#D70040]',
  },
  {
    title: '24/7 Support',
    description: 'Emergency assistance available round the clock, every day',
    icon: Phone,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Multiple Ambulance Types',
    description: 'Choose from Basic, ICU, Neonatal, or Air Ambulance services',
    icon: Activity,
    gradient: 'from-[#D70040] to-[#D70040]',
  },
  {
    title: 'Smart Navigation',
    description: 'Optimized routes to reach hospitals faster during emergencies',
    icon: MapPin,
    gradient: 'from-blue-500 to-blue-600',
  },
];

const steps = [
  {
    number: '01',
    title: 'Share Location',
    description: 'Enable GPS and share your current location or enter pickup address',
    icon: MapPin,
  },
  {
    number: '02',
    title: 'Choose Ambulance',
    description: 'Select ambulance type based on emergency and view estimated fare',
    icon: Phone,
  },
  {
    number: '03',
    title: 'Track Live',
    description: 'Watch ambulance arrival in real-time with live map tracking',
    icon: Activity,
  },
  {
    number: '04',
    title: 'Get Help',
    description: 'Reach hospital safely with professional medical care on the way',
    icon: Shield,
  },
];

const HomePage = () => {
  const router = useRouter();

  const handleBookAsClient = () => {
    router.push('/signup?role=user');
  };

  const handleLoginAsDriver = () => {
    router.push('/signup?role=driver');
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="flex flex-col items-center justify-center px-4 py-16 text-center sm:py-24">
        <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-[#D70040] text-white shadow-[0_8px_20px_rgba(215,0,64,0.3)]">
          <Activity className="h-16 w-16" strokeWidth={2.5} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Emergency Help</h1>
        <h2 className="mt-2 text-4xl font-bold text-[#D70040] sm:text-5xl">Just One Tap Away</h2>
        <p className="mt-6 max-w-2xl text-base text-slate-500 sm:text-lg">
          Book emergency medical transportation in seconds. Available 24/7 with trained professionals.
        </p>
        <div className="mt-8 flex w-full max-w-xl flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-transparent bg-[#D70040] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#D70040] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D70040]"
            onClick={handleBookAsClient}
          >
            <Users className="h-5 w-5" />
            Book as Client
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
            onClick={handleLoginAsDriver}
          >
            <MapPin className="h-5 w-5" />
            Login as Driver
          </button>
        </div>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#FF0000] bg-[#FF0000]/10 px-6 py-3 text-sm font-semibold shadow-sm">
          <Phone className="h-4 w-4 text-[#FF0000]" />
          <span className="text-black">For immediate emergency: Call</span> <span className="font-bold text-[#FF0000]">911</span>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Why Choose AmbuConnect?</h2>
          <p className="mt-4 text-lg text-slate-500">
            Fast, reliable, and professional emergency medical services at your fingertips
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {featureCards.map(({ title, description, icon: Icon, gradient }) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br text-white ${gradient}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-slate-500">Getting emergency help is as simple as 1-2-3-4</p>
          </div>
          <div className="relative mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            <div className="pointer-events-none absolute left-1/2 top-14 hidden h-px w-[calc(100%-6rem)] -translate-x-1/2 bg-gray-200 md:block" />
            {steps.map(({ number, title, description, icon: Icon }) => (
              <div
                key={number}
                className="relative rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="absolute -top-4 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#D70040] to-[#D70040] text-base font-semibold text-white shadow-lg">
                  {number}
                </div>
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#D70040]/10">
                  <Icon className="h-10 w-10 text-[#D70040]" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl text-center text-sm text-slate-500">
          © {new Date().getFullYear()} AmbuConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
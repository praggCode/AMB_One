'use client';

import React from 'react';
import { Activity, Users, MapPin, Clock, Shield, Phone, ArrowRight, CheckCircle2, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useRouter } from 'next/navigation';

const featureCards = [
  {
    title: 'Instant Response',
    description: 'Get ambulances to your location within 5 minutes of booking.',
    icon: Clock,
  },
  {
    title: 'Real-Time Tracking',
    description: 'Track your ambulance location live on the map until arrival.',
    icon: MapPin,
  },
  {
    title: 'Verified Drivers',
    description: 'All drivers are verified medical professionals with proper licenses.',
    icon: Shield,
  },
  {
    title: '24/7 Support',
    description: 'Emergency assistance available round the clock, every day.',
    icon: Phone,
  },
  {
    title: 'Advanced Care',
    description: 'Choose from Basic, ICU, Neonatal, or Air Ambulance services.',
    icon: Activity,
  },
  {
    title: 'Smart Routes',
    description: 'Optimized routes to reach hospitals faster during emergencies.',
    icon: MapPin,
  },
];

const steps = [
  {
    number: '01',
    title: 'Book Ambulance',
    description: 'Enter your pickup and destination locations to book an ambulance.',
    icon: MapPin,
  },
  {
    number: '02',
    title: 'Choose Ambulance',
    description: 'Select ambulance type based on your specific medical emergency needs.',
    icon: Phone,
  },
  {
    number: '03',
    title: 'Track Live',
    description: 'Watch ambulance arrival in real-time with our live GPS map tracking.',
    icon: Activity,
  },
  {
    number: '04',
    title: 'Get Help',
    description: 'Reach the hospital safely with professional medical care on the way.',
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
    <div className="min-h-screen font-sans selection:bg-[#2563EB] selection:text-white overflow-x-hidden bg-white">

      {/* Hero Section with Wave Background */}
      <section className="relative px-6 pt-16 pb-24 lg:pt-32 lg:pb-32 overflow-hidden bg-white">
        {/* Hero Background Elements */}
        <div className="absolute inset-0 -z-10 bg-white">
          {/* Top Right Blue Wave */}
          <div className="absolute top-0 right-0 w-[80%] h-[90%] opacity-10">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-blue-600 fill-current">
              <path d="M0,0 L100,0 L100,100 C75,50 50,75 0,50 Z" />
            </svg>
          </div>

          {/* Bottom Left Blue Wave (Rotated) */}
          <div className="absolute bottom-0 left-0 w-[60%] h-[60%] opacity-5">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-blue-500 fill-current rotate-180">
              <path d="M0,0 L100,0 L100,100 C75,50 50,75 0,50 Z" />
            </svg>
          </div>

          {/* Soft Blue Gradients focused on Hero */}
          <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-br from-blue-50/50 via-transparent to-white"></div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            {/* Left Content */}
            <div className="max-w-xl animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-[#2563EB] mb-8 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                AmbuConnect Services
              </div>

              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-8 leading-[1.1]">
                AmbuConnect, We’re On the Way
              </h1>

              <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                Get immediate medical assistance with fast and reliable ambulance services. We ensure safe transport and rapid response when every moment matters.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={handleBookAsClient}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                >
                  Request Ambulance Now
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={handleLoginAsDriver}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-700 shadow-sm transition-all hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 active:scale-95"
                >
                  Partner Login
                </button>
              </div>

              <div className="mt-12 flex flex-wrap gap-y-4 gap-x-8 text-sm font-medium text-slate-600">
                <div className="flex items-center gap-2.5 bg-green-50/50 px-4 py-2 rounded-full border border-green-100/50">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Verified Medical Staff</span>
                </div>
                <div className="flex items-center gap-2.5 bg-green-50/50 px-4 py-2 rounded-full border border-green-100/50">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Rapid Response</span>
                </div>
                <div className="flex items-center gap-2.5 bg-green-50/50 px-4 py-2 rounded-full border border-green-100/50">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>24/7 Availability</span>
                </div>
              </div>
            </div>

            {/* Right Images - Floating Cards with Hover Animation */}
            <div className="relative lg:h-[600px] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {/* Card 1 - Top Left */}
              <div className="absolute top-0 left-0 w-[60%] z-30">
                <div className="group relative overflow-hidden rounded-2xl shadow-xl bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1554734867-bf3c00a49371?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1idWxhbmNlfGVufDB8fDB8fHww"
                      alt="Emergency Ambulance"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Top Right */}
              <div className="absolute top-12 right-0 w-[55%] z-20">
                <div className="group relative overflow-hidden rounded-2xl shadow-xl bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:-rotate-1 cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1625258110620-b213f56b9267?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YW1idWxhbmNlfGVufDB8fDB8fHww"
                      alt="Ambulance Fleet"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Bottom Center */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[65%] z-10">
                <div className="group relative overflow-hidden rounded-2xl shadow-xl bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:rotate-0 cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1718885168425-6a71da41845a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fGFtYnVsYW5jZXxlbnwwfHwwfHx8MA%3D%3D"
                      alt="Emergency Response Team"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>

              {/* Decorative Element within Hero Scope */}
              <div className="absolute -bottom-8 -right-8 -z-10 h-64 w-64 rounded-full bg-[#E84D4D]/5 blur-3xl"></div>
              <div className="absolute -top-8 -left-8 -z-10 h-64 w-64 rounded-full bg-[#2563EB]/5 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Plain White Background */}
      <section className="py-24 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#2563EB] font-bold tracking-wide uppercase text-xs mb-3">Our Services</h2>
            <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">Why Choose AmbuConnect</h3>
            <p className="mt-4 text-lg text-slate-600">
              Advanced technology meets compassionate care to provide the best emergency response.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:border-blue-100 hover:-translate-y-1"
              >
                {/* Background Large Icon - Always Visible */}
                <div className="absolute -right-6 -top-6 text-blue-50/50 block rotate-12 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <Icon className="h-40 w-40" />
                </div>

                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-700">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Steps - Plain White Background */}
      <section className="py-24 px-6 bg-white border-t border-slate-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#2563EB] font-bold tracking-wide uppercase text-xs mb-3">Simple Process</h2>
            <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">How to Book Help</h3>
          </div>

          <div className="grid gap-8 md:grid-cols-4 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-slate-100 to-transparent -z-10"></div>

            {steps.map(({ number, title, description, icon: Icon }) => (
              <div key={number} className="relative group">
                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-blue-100 h-full">
                  <div className="relative mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white border-4 border-slate-50 shadow-inner group-hover:border-blue-50 transition-colors">
                      <Icon className="h-8 w-8 text-slate-400 group-hover:text-[#2563EB] transition-colors" />
                    </div>
                    <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-[#E84D4D] text-white flex items-center justify-center text-sm font-bold shadow-md border-2 border-white ring-2 ring-red-50">
                      {number}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#2563EB] transition-colors">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Footer - Dark Theme */}
      <footer className="bg-slate-900 pt-16 pb-8 text-slate-300">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">

            {/* Column 1: About */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20">
                  <Activity className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">AmbuConnect</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Your trusted partner in emergency medical transportation. We provide rapid, safe, and professional ambulance services 24/7.
              </p>
              <div className="flex gap-4">
                <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-4 w-4 fill-current" />
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-4 w-4 fill-current" />
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-4 w-4 fill-current" />
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-4 w-4 fill-current" />
                </a>
              </div>
            </div>

            {/* Column 2: Services */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Our Services</h4>
              <ul className="space-y-4 text-sm font-medium">
                {['Emergency Ambulance', 'ICU Transport', 'Neonatal Care', 'Patient Transport', 'Air Ambulance', 'Hospital Transfer'].map((service) => (
                  <li key={service}>
                    <a href="#" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                      <span className="h-1 w-1 bg-blue-500 rounded-full"></span>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-500 flex-shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Main Office</p>
                    <p className="text-xs text-slate-500 mt-1">Pune, Maharashtra</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-500 flex-shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Phone Support</p>
                    <p className="text-xs text-slate-500 mt-1">+91 12345 67890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-500 flex-shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Email Us</p>
                    <p className="text-xs text-slate-500 mt-1">support@ambuconnect.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Emergency Call */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Emergency</h4>
              <div className="space-y-3">
                <p className="text-slate-400 text-sm">For emergency contact:</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10">
                    <Phone className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-3xl font-black text-white">102</h3>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">© {new Date().getFullYear()} AmbuConnect. All rights reserved.</p>
            <div className="flex gap-6 text-xs font-semibold text-slate-500">
              <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
'use client';

import React from 'react';
import {
  Activity, Users, MapPin, Clock, Shield, ArrowRight, Phone,
  CheckCircle2, Mail, Facebook, Twitter, Instagram, Linkedin,
  Navigation, User, Bell, BellRing, Compass, Navigation2, Ambulance
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('user');

  const handleBookAsClient = () => {
    router.push('/signup?role=user');
  };

  const handleLoginAsDriver = () => {
    router.push('/signup?role=driver');
  };

  const steps = {
    user: [
      {
        title: 'Share Location',
        description: 'Tell us where you are. We find the nearest ambulance for you.',
        icon: MapPin,
      },
      {
        title: 'See the Map',
        description: 'Watch the driver coming to you on your phone screen.',
        icon: Navigation2,
      },
      {
        title: 'Get Help',
        description: 'Our team takes care of you. We drive you to the hospital fast.',
        icon: Activity,
      }
    ],
    driver: [
      {
        title: 'See New Bookings',
        description: 'Get a message on your phone when someone needs help nearby.',
        icon: BellRing,
      },
      {
        title: 'Drive Fast',
        description: 'Use our easy map to find the best road to reach the patient.',
        icon: Compass,
      },
      {
        title: 'Finish Trip',
        description: 'Drop the person at the hospital and get ready for the next one.',
        icon: CheckCircle2,
      }
    ]
  };

  return (
    <div className="min-h-screen font-sans selection:bg-blue-600 selection:text-white bg-slate-950 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hospital.jpg"
            alt="Medical Facility"
            className="w-full h-full object-cover"
          />
          {/* Blue Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/80 to-blue-800/40"></div>
          <div className="absolute inset-0 bg-slate-950/20"></div>
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 inset-x-0 z-[100] px-6 py-10 backdrop-blur-[2px]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/30 group-hover:scale-110 transition-transform duration-500">
                <Ambulance className="h-7 w-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tighter leading-none group-hover:text-blue-400 transition-colors">AmbuConnect</span>
                {/* <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em] mt-1">Medical Logistics</span> */}
              </div>
            </div>
            <div className="hidden md:flex items-center gap-12 font-semibold text-[11px] uppercase tracking-[0.25em]">
              {[
                { label: 'Book Ambulance', onClick: handleBookAsClient },
                { label: 'Driver Login', onClick: handleLoginAsDriver },
                { label: 'Contact US', href: '#contact' }
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  onClick={link.onClick}
                  className="relative text-white/70 hover:text-white transition-all duration-300 group/link py-2 cursor-pointer"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-blue-500 transition-all duration-300 group-hover/link:w-full"></span>
                </a>
              ))}
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto w-full relative z-10 pt-20">
          <div className="max-w-4xl animate-in fade-in slide-in-from-left-8 duration-1000">

            <h1 className="font-black text-white tracking-tighter leading-[0.85] mb-12">
              <span className="text-4xl lg:text-8xl block">
                Book Ambulance
              </span>
              <span className="text-7xl lg:text-9xl text-blue-500 italic block">
                Save Lives
              </span>
            </h1>

            <p className="max-w-xl text-xl text-white/50 leading-relaxed font-medium mb-16 border-l-2 border-blue-500/30 pl-8">
              Book a reliable ambulance in seconds. We provide quick transport with professional medical staff to keep you safe.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button
                onClick={handleBookAsClient}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-4 bg-white text-slate-950 px-10 py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95 z-20"
              >
                Request Ambulance Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleLoginAsDriver}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-4 bg-white text-slate-950 px-10 py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95 z-20"
              >
                Partner Login
                <Users className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-40 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em] mb-6 flex items-center justify-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse"></span>
              Platform Guide
            </h3>
            <h4 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-12">
              How it Works.
            </h4>

            <div className="inline-flex p-2 bg-slate-100 rounded-2xl gap-2">
              <button
                onClick={() => setActiveTab('user')}
                className={`px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'user' ? 'bg-white text-blue-600 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              >
                For Patients
              </button>
              <button
                onClick={() => setActiveTab('driver')}
                className={`px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'driver' ? 'bg-white text-blue-600 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              >
                For Drivers
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-20 relative">
            {/* Timeline Line (Desktop) */}
            <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[1px] bg-slate-100 z-0"></div>

            {steps[activeTab].map((step, idx) => (
              <div key={idx} className="relative z-10 group">
                <div className={`mb-12 h-20 w-20 rounded-[2rem] flex items-center justify-center transition-all duration-500 border border-slate-100 ${activeTab === 'user' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : 'bg-slate-50 text-slate-900 group-hover:bg-slate-900 group-hover:text-white'}`}>
                  <step.icon size={32} strokeWidth={1.5} />
                  <div className="absolute -top-4 -right-4 h-12 w-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-[12px] font-black text-slate-950 group-hover:text-blue-600 group-hover:border-blue-600 transition-all shadow-md">
                    0{idx + 1}
                  </div>
                </div>
                <h5 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">{step.title}</h5>
                <p className="text-slate-500 font-medium leading-relaxed mb-8 max-w-sm">
                  {step.description}
                </p>
                <div className={`h-1.5 w-12 rounded-full transition-all duration-500 ${activeTab === 'user' ? 'bg-blue-100 group-hover:w-full group-hover:bg-blue-600' : 'bg-slate-100 group-hover:w-full group-hover:bg-slate-900'}`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Partnership Call-to-action */}
      <section className="py-40 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-950 rounded-[3rem] p-12 lg:p-32 gap-20 relative overflow-hidden min-h-[600px] flex items-center">
            <div className="absolute inset-0 z-0">
              <img
                src="/Users/mahisawner/.gemini/antigravity/brain/0923edfb-0911-4f9a-b390-2bb235711af3/medical_partnership_bg_png_1772218673674.png"
                alt="Medical Workstation"
                className="w-full h-full object-cover opacity-30 shadow-inner"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-2xl">
              <h3 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-12">
                Partner with the <br />
                Future of Care.
              </h3>
              <p className="text-white/40 text-lg font-medium mb-12 max-w-lg leading-relaxed">
                Join a verified network of hospitals, clinics, and professional drivers. Connect your infrastructure to our rapid response ecosystem.
              </p>

              <div className="flex flex-wrap items-center gap-12">
                <button
                  onClick={handleLoginAsDriver}
                  className="bg-red-600 text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-2xl shadow-red-600/20"
                >
                  Partner Registration
                </button>
                <div className="flex items-center gap-8 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-red-500" /> Hospitals</span>
                  <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-red-500" /> Drivers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Finalized Professional Medical Footer */}
      <footer id="contact" className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-24 pb-20 border-b border-slate-50">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Ambulance className="h-8 w-8 text-red-600" />
                <span className="text-2xl font-black tracking-tighter text-slate-950 uppercase">AmbuConnect</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Leading the transformation of medical logistics through high-fidelity response systems and integrated infrastructure.
              </p>
              <div className="flex gap-6">
                <Facebook size={20} className="text-slate-900 cursor-pointer hover:text-red-600 transition-colors" />
                <Twitter size={20} className="text-slate-900 cursor-pointer hover:text-red-600 transition-colors" />
                <Linkedin size={20} className="text-slate-900 cursor-pointer hover:text-red-600 transition-colors" />
                <Instagram size={20} className="text-slate-900 cursor-pointer hover:text-red-600 transition-colors" />
              </div>
            </div>

            <div className="space-y-8">
              <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Address</h5>
              <address className="not-italic text-slate-600 text-sm leading-loose font-medium">
                Pune<br />
                Maharashtra<br />
              </address>
            </div>

            <div className="space-y-8">
              <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Contact US</h5>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                  <Phone size={14} className="text-red-600" />
                  +1 (800) AMBU-READY
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                  <Mail size={14} className="text-red-600" />
                  support@gmail.com
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h5 className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">Emergency 24/7</h5>
              <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                <p className="text-2xl font-black text-red-600 tracking-tighter">102</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              &copy; 2026 AmbuConnect Medical Logistics — Autonomous Response Protocol
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
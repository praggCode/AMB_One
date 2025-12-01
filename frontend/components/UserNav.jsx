'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import { useDriver } from '@/context/DriverContext';
import { LogOut, User as UserIcon, Mail, Phone } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const defaultTabs = [
  { label: 'Dashboard', href: '/CompPages/UserDashboard' },
  { label: 'Book Ambulance', href: '/CompPages/UserAmbulance' },
  { label: 'History', href: '/CompPages/UserHistory' },
];

export default function UserNav({ active = '', tabs = defaultTabs }) {
  const router = useRouter();
  const { user, logout: userLogout } = useUser();
  const { driver, logout: driverLogout } = useDriver();

  // Determine which profile to show (user or driver)
  const profile = user || driver;
  const isDriver = !!driver && !user;
  const logout = isDriver ? driverLogout : userLogout;

  // Get the display name based on user or driver structure
  const getDisplayName = () => {
    if (user) {
      return user.name || '';
    }
    if (driver) {
      const firstName = driver.fullname?.firstName || '';
      const lastName = driver.fullname?.lastName || '';
      return `${firstName} ${lastName}`.trim();
    }
    return '';
  };

  const displayName = getDisplayName();

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-[1000]">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <button
            className="flex items-center gap-3 focus:outline-none hover:opacity-80 transition-opacity"
            onClick={() => router.push('/')}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
            />
            <span className="text-xl font-bold text-gray-900">MediRide</span>
          </button>

          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-3">
              {tabs.map((tab) => {
                const isActive = active.toLowerCase() === tab.label.toLowerCase();
                return (
                  <button
                    key={tab.href}
                    className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${isActive
                      ? 'bg-[#D70040] text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    onClick={() => router.push(tab.href)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {profile && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 focus:outline-none hover:opacity-80 transition-opacity">
                    <Avatar className="h-10 w-10 border-2 border-[#D70040]">
                      <AvatarFallback className="bg-[#D70040] text-white font-bold">
                        {getInitials(displayName)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4 text-gray-500" />
                        <p className="text-sm font-semibold text-gray-900">
                          {displayName}
                        </p>
                      </div>
                      {profile.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <p className="text-xs text-gray-600">
                            {profile.email}
                          </p>
                        </div>
                      )}
                      {(profile.phone || profile.phoneNumber) && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <p className="text-xs text-gray-600">
                            {profile.phone || profile.phoneNumber}
                          </p>
                        </div>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

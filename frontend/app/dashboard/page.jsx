'use client';

import { useSearchParams } from 'next/navigation';
import UserDashboard from '@/user/pages/Dashboard';
import { Suspense } from 'react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'user';

  if (role === 'user') {
    return <UserDashboard />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Driver Dashboard</h1>
        <p className="text-gray-600">Please use the driver specific routes or select a valid role.</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
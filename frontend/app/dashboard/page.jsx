'use client';

import { useSearchParams } from 'next/navigation';
import UserDashboard from '../CompPages/UserDashboard/UserDashboard';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'user';

  if (role === 'user') {
    return <UserDashboard />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Driver Dashboard</h1>
        <p className="text-gray-600">Coming soon.</p>
      </div>
    </div>
  );
}
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/user/context/UserContext';
import { useDriver } from '@/driver/context/DriverContext';
import Sidebar from '@/common/components/Sidebar';

const defaultTabs = [
  { label: 'Dashboard', href: '/user/dashboard' },
  { label: 'Book Ambulance', href: '/user/ambulance' },
  { label: 'History', href: '/user/history' },
];

export default function UserNav({ active = '', tabs = defaultTabs, role = 'user' }) {
  const router = useRouter();
  const { user, logout: userLogout } = useUser();
  const { driver, logout: driverLogout } = useDriver();

  // Determine which profile to show based on role
  const profile = role === 'driver' ? driver : user;
  const isDriver = role === 'driver';
  const logout = isDriver ? driverLogout : userLogout;

  // Use tabs provided via props as the source of truth for sidebar links
  // If tabs are default, ensure they match the role
  let sidebarLinks = tabs;

  if (role === 'driver' && tabs === defaultTabs) {
    // Fallback if driver didn't pass specific tabs (though they usually do)
    sidebarLinks = [
      { label: "Dashboard", href: "/driver/dashboard" },
      { label: "History", href: "/driver/history" },
    ];
  }

  // Effect to adjust main layout padding when sidebar is present
  // Effect to adjust main layout padding when sidebar is present
  // We use a global style to enforce the layout, which is more robust than useEffect for SSR/Hydration matching

  return (
    <>
      <style jsx global>{`
        /* 
          Layout Adjustment for Sidebar 
          This ensures that the content is pushed to the right when the sidebar is present.
          We target standard layout containers used in this app.
        */
        @media (min-width: 1024px) {
            /* Target the main content wrapper */
            body > div > main, 
            body > main,
            main {
                padding-left: 19rem !important; /* 72 (18rem) + 1rem buffer */
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
            }

            /* 
               If the page uses a full-screen wrapper (like .min-h-screen) that is NOT the body,
               we need to ensure IT has the padding if it contains the main content.
               However, usually UserNav is inside that wrapper.
               If UserNav is a sibling to the content, this global style works.
            */
            
            /* Specific fix for elements that might be centered with auto margins */
            main .max-w-7xl, 
            .mx-auto {
                margin-left: 0 !important;
                margin-right: auto !important;
                 /* If it was centered, now it should start from left of the remaining space? 
                    Actually, if we pad the main container, the inner content can still be centered 
                    relative to that padded area if we interpret mx-auto correctly.
                    But if width is 100%, mx-auto might not work as expected if we forced margins to 0.
                    Let's try to just pad the container and let children flow.
                 */
            }
            
            /* Better approach: Push the entire body content wrapper if possible, 
               but since we are inside a component, we rely on these selectors.
            */
           
           /* Fix for fixed/sticky headers inside the dashboard */
            .sticky.top-0 {
                left: 18rem;
                width: calc(100% - 18rem) !important;
            }
        }
      `}</style>
      <Sidebar
        links={sidebarLinks}
        user={profile}
        logout={logout}
      />
    </>
  );
}

'use client';

import { AppShell } from '@/components/vink/app-shell';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('vink-auth') === 'true';
    if (!isAuthenticated) {
      router.replace('/');
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);
  
  if (isCheckingAuth) {
    return <div className="w-full h-screen" />; // Or a loading spinner
  }

  return <AppShell>{children}</AppShell>;
}

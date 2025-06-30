'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignInForm } from '@/components/vink/sign-in-form';
import { BackgroundGrid } from '@/components/vink/background-grid';

export default function SignInPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('vink-auth') === 'true';
    if (isAuthenticated) {
      router.replace('/dashboard');
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  if (isCheckingAuth) {
    return <div className="w-full h-screen bg-background" />; // Or a loading spinner
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <BackgroundGrid />
      <div className="flex flex-col items-center gap-8 animate-fade-in">
        <SignInForm />
      </div>
    </main>
  );
}

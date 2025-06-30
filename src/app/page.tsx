'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignInForm } from '@/components/vink/sign-in-form';

function VinkLogo() {
  return (
    <div className="text-center">
      <h1 className="font-headline text-4xl font-bold text-primary tracking-wider">
        VINK — Cyber Guardian
      </h1>
    </div>
  );
}

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
    return <div className="w-full h-screen" />; // Or a loading spinner
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-8 animate-fade-in">
        <VinkLogo />
        <SignInForm />
      </div>
    </main>
  );
}

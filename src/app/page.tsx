'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignInForm } from '@/components/vink/sign-in-form';

function VinkLogo() {
  return (
    <div className="text-center">
      <h1 className="font-headline text-5xl font-bold text-primary tracking-widest">
        VINK
      </h1>
      <p className="text-muted-foreground text-lg -mt-1">Cyber Guardian</p>
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
        <p className="text-muted-foreground text-lg text-center font-headline animate-slide-up-fade-in [animation-delay:0.3s]">
          Guarding your digital self
        </p>
        <SignInForm />
      </div>
    </main>
  );
}

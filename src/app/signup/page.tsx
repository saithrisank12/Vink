'use client';

import { SignUpForm } from '@/components/vink/sign-up-form';

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

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-8 animate-fade-in">
        <VinkLogo />
        <p className="text-muted-foreground text-lg text-center font-headline animate-slide-up-fade-in [animation-delay:0.3s]">
          Create your guardian account
        </p>
        <SignUpForm />
      </div>
    </main>
  );
}

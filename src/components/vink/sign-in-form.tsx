'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mascot } from './mascot';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, Eye, EyeOff } from 'lucide-react';

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [eyeTarget, setEyeTarget] = useState({ x: 0.5, y: 0.5 });
  const [isHiding, setIsHiding] = useState(false);
  
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (document.activeElement === emailInputRef.current && emailInputRef.current) {
        const rect = emailInputRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        setEyeTarget({ x, y });
      } else {
        setEyeTarget({ x: 0.5, y: 0.5 });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('vink-auth', 'true');
      router.push('/dashboard');
    }, 1500);
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  return (
    <motion.div
      className="w-full max-w-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="bg-card text-card-foreground flex w-full flex-col items-center rounded-2xl p-8 gap-6 shadow-2xl border border-primary/20">
        <div className="text-center mb-2">
            <h1 className="font-headline text-3xl font-bold text-primary tracking-wider">VINK</h1>
            <p className="text-muted-foreground text-md -mt-1">Cyber Guardian</p>
        </div>
        
        <Mascot 
            eyeTargetX={eyeTarget.x} 
            eyeTargetY={eyeTarget.y} 
            isHiding={isHiding}
        />

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              ref={emailInputRef}
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              onFocus={() => setIsHiding(false)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                onFocus={() => setIsHiding(true)}
                onBlur={() => setIsHiding(false)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 h-full text-muted-foreground hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={handlePhoneChange}
              onFocus={() => setIsHiding(false)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full h-11 text-base font-bold" disabled={isLoading}>
            <AnimatePresence mode="wait">
              {isLoading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <Loader2 className="animate-spin" />
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    Log In
                  </motion.span>
              )}
            </AnimatePresence>
          </Button>

          <div className="mt-4 flex justify-between text-sm">
            <Link href="#" className="font-semibold text-primary/80 hover:text-primary">
              Forgot Password?
            </Link>
            <Link href="/signup" className="font-semibold text-primary/80 hover:text-primary">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

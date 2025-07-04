
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

export function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

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

  const validateForm = () => {
    let isValid = true;
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!/^\d{10}$/.test(phone)) {
        setPhoneError('Please enter a valid 10-digit phone number.');
        isValid = false;
    } else {
        setPhoneError('');
    }

    return isValid;
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
        return;
    }
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('vink-auth', 'true');
      router.push('/dashboard');
    }, 1500);
  };
  
  return (
    <motion.div
      className="w-full max-w-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="bg-card text-card-foreground flex w-full flex-col items-center rounded-2xl p-8 gap-6 shadow-2xl border border-primary/20">
        <Mascot 
          eyeTargetX={eyeTarget.x} 
          eyeTargetY={eyeTarget.y} 
          isHiding={isHiding}
        />
        <form onSubmit={handleSignUp} className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              ref={emailInputRef}
              id="email"
              type="email"
              placeholder="yourname@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              onFocus={() => setIsHiding(false)}
              required
              className="h-12 text-base"
            />
            {emailError && <p className="text-sm text-destructive mt-1">{emailError}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsHiding(true)}
                onBlur={() => setIsHiding(false)}
                required
                className="h-12 text-base pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 h-12 text-muted-foreground hover:bg-transparent"
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
              placeholder="1234567890"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (phoneError) setPhoneError('');
              }}
              onFocus={() => setIsHiding(false)}
              required
              className="h-12 text-base"
            />
             {phoneError && <p className="text-sm text-destructive mt-1">{phoneError}</p>}
          </div>

          <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={isLoading}>
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
                    Create Account
                  </motion.span>
              )}
            </AnimatePresence>
          </Button>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/" className="font-semibold text-primary hover:underline">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

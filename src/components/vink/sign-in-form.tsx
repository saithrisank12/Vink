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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [eyeTarget, setEyeTarget] = useState({ x: 0.5, y: 0.5 });
  const [isSleeping, setIsSleeping] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (document.activeElement === emailInputRef.current) {
        const rect = emailInputRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        setEyeTarget({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let winkTimeout: NodeJS.Timeout;
    if (email.length > 0 && password.length > 0) {
      setIsWinking(true);
      winkTimeout = setTimeout(() => setIsWinking(false), 1500);
    }
    return () => clearTimeout(winkTimeout);
  }, [email, password]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Simulate error for demo
      if (password.toLowerCase() === 'error') {
        setIsError(true);
        setIsLoading(false);
        setTimeout(() => setIsError(false), 2500);
      } else {
        localStorage.setItem('vink-auth', 'true');
        router.push('/dashboard');
      }
    }, 1500);
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    setIsError(false);
    // Simple caret tracking simulation
    setEyeTarget(prev => ({ ...prev, x: Math.min(value.length / 20, 1) }));
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsError(false);
  }

  return (
    <motion.div
      className="w-full max-w-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="bg-card text-card-foreground flex w-full flex-col items-center rounded-2xl p-8 gap-6 shadow-2xl">
        <Mascot 
          eyeTargetX={eyeTarget.x} 
          eyeTargetY={eyeTarget.y} 
          isSleeping={isSleeping} 
          isWinking={isWinking}
          isError={isError} 
        />
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              ref={emailInputRef}
              id="email"
              type="email"
              placeholder="yourname@example.com"
              value={email}
              onChange={handleEmailChange}
              onFocus={() => setIsSleeping(false)}
              required
              className="h-12 text-base"
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
                onFocus={() => setIsSleeping(true)}
                onBlur={() => setIsSleeping(false)}
                required
                className="h-12 text-base pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 text-muted-foreground hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </div>

          <div className="text-right text-sm">
            <Link href="#" className="font-medium text-primary hover:underline">
              Forgot Password?
            </Link>
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
                    Log In
                  </motion.span>
              )}
            </AnimatePresence>
          </Button>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="#" className="font-semibold text-primary hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

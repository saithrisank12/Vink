'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mascot } from './mascot';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [eyeTarget, setEyeTarget] = useState({ x: 0.5, y: 0.5 });
  const [isSleeping, setIsSleeping] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (emailInputRef.current) {
        const rect = emailInputRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        setEyeTarget({ x, y });
      }
    };

    const currentRef = emailInputRef.current;
    currentRef?.addEventListener('mousemove', handleMouseMove);
    return () => currentRef?.removeEventListener('mousemove', handleMouseMove);
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
    // Simple caret tracking simulation
    setEyeTarget(prev => ({ ...prev, x: Math.min(value.length / 20, 1) }));
  }

  return (
    <motion.div
      className="w-full max-w-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="glass-card flex w-full flex-col items-center rounded-2xl p-8 gap-6">
        <Mascot eyeTargetX={eyeTarget.x} eyeTargetY={eyeTarget.y} isSleeping={isSleeping} />
        <form onSubmit={handleLogin} className="w-full space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              ref={emailInputRef}
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              onFocus={() => setIsSleeping(false)}
              required
              className="h-12 bg-black/20 text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsSleeping(true)}
              onBlur={() => setIsSleeping(false)}
              required
              className="h-12 bg-black/20 text-base"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-password"
              checked={showPassword}
              onCheckedChange={() => setShowPassword(!showPassword)}
            />
            <Label htmlFor="show-password" className="text-sm font-normal text-muted-foreground">
              Show password
            </Label>
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
        </form>
      </div>
    </motion.div>
  );
}

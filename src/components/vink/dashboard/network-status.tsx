'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';

type Status = 'SECURE' | 'DANGER';

export function NetworkStatus() {
  const [status, setStatus] = useState<Status>('SECURE');
  const { toast } = useToast();

  useEffect(() => {
    // This logic is for demo purposes to show the status change.
    const interval = setInterval(() => {
      const isDanger = Math.random() > 0.95;
      if (isDanger) {
        setStatus('DANGER');
        toast({
          variant: 'destructive',
          title: 'Network Alert!',
          description: 'Suspicious activity detected on your network.',
        });
        // Switch back to secure after a few seconds
        setTimeout(() => setStatus('SECURE'), 5000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [toast]);

  const size = 256;
  const center = size / 2;
  const radius = size / 2 - 20;
  const dotCount = 10;
  const dotAngle = 8; // spacing between dots

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute">
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Static outer circle */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth="4"
          animate={{
            stroke: status === 'SECURE' ? 'hsl(var(--primary))' : 'hsl(var(--destructive))'
          }}
          style={{ filter: 'url(#neon-glow)' }}
        />
      </svg>
      
      {/* Animated dots container */}
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* A trail of dots */}
        {Array.from({ length: dotCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: `${(dotCount - i) / 2}px`,
              height: `${(dotCount - i) / 2}px`,
              // Position dots along the circle
              transform: `translateX(-50%) translateY(-50%) rotate(${i * dotAngle}deg) translateX(${radius}px)`,
              transformOrigin: '0px 0px',
              opacity: 1 - i / (dotCount * 1.2), // Create a fading trail
            }}
            animate={{
              backgroundColor: status === 'SECURE' ? 'hsl(var(--primary))' : 'hsl(var(--destructive))'
            }}
          />
        ))}
      </motion.div>

      {/* Center content */}
      <div className="z-10 flex flex-col items-center justify-center gap-2">
        <motion.div
          animate={{ scale: status === 'DANGER' ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Shield
            className={cn(
              'w-12 h-12 transition-colors',
              status === 'SECURE' ? 'text-primary' : 'text-destructive'
            )}
          />
        </motion.div>
        <span className="text-lg text-muted-foreground tracking-wider">
          Network Status
        </span>
        <motion.span
          key={status} // Animate when status changes
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'text-2xl font-bold tracking-widest transition-colors',
            status === 'SECURE' ? 'text-primary' : 'text-destructive'
          )}
        >
          {status}
        </motion.span>
      </div>
    </div>
  );
}

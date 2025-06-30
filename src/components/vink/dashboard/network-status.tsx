'use client';
import { useState, useEffect } from 'react';
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Status = 'Safe' | 'Danger';

export function NetworkStatus() {
  const [status, setStatus] = useState<Status>('Safe');
  const [percentage, setPercentage] = useState(100);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      const isDanger = Math.random() > 0.95;
      if (isDanger) {
        setStatus('Danger');
        setPercentage(25);
        toast({
            variant: 'destructive',
            title: 'Network Alert!',
            description: 'Suspicious activity detected on your network.'
        })
        setTimeout(() => {
          setStatus('Safe');
          setPercentage(100);
        }, 5000);
      } else {
        setStatus('Safe');
        setPercentage(100);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [toast]);

  const data = [{ name: 'status', value: percentage }];
  const fillColor = status === 'Safe' ? 'hsl(var(--primary))' : 'hsl(var(--destructive))';

  return (
    <motion.div
      className="relative w-64 h-64"
      animate={{
        scale: status === 'Danger' ? [1, 1.05, 1] : 1,
        x: status === 'Danger' ? [0, -5, 5, -5, 5, 0] : 0,
      }}
      transition={{ duration: 0.5, times: status === 'Danger' ? [0, 0.2, 0.4, 0.6, 0.8, 1] : undefined }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="80%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
            className="fill-muted"
          >
             <defs>
              <linearGradient id="statusGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={fillColor} stopOpacity={1}/>
                <stop offset="100%" stopColor={fillColor} stopOpacity={0.6}/>
              </linearGradient>
            </defs>
          </RadialBar>
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm text-muted-foreground">Network Status</span>
        <span className={cn('text-4xl font-bold', status === 'Safe' ? 'text-primary' : 'text-destructive')}>
          {status}
        </span>
      </div>
    </motion.div>
  );
}

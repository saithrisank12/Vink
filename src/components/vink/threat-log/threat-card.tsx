'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ThreatLogEntry, ThreatLevel } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { Shield, AlertTriangle, CheckCircle, HelpCircle, CornerDownRight, Clock, Server, BarChart } from 'lucide-react';

const levelConfig: Record<ThreatLevel, { color: string, icon: React.ElementType }> = {
    'Safe': { color: 'text-green-400', icon: CheckCircle },
    'Suspicious': { color: 'text-yellow-400', icon: HelpCircle },
    'Dangerous': { color: 'text-orange-500', icon: AlertTriangle },
    'Critical': { color: 'text-destructive', icon: Shield },
};

function ThreatIcon({ level }: { level: ThreatLevel }) {
  const { color, icon: Icon } = levelConfig[level];
  const glowColor = level === 'Critical' ? 'hsl(var(--destructive))' : level === 'Dangerous' ? 'hsl(30, 95%, 53%)' : 'hsl(var(--primary))';
  
  return (
    <div className={cn('z-10 flex h-10 w-10 items-center justify-center rounded-full glass-card', level === 'Critical' || level === 'Dangerous' ? 'animate-pulse' : '')} style={{
      boxShadow: `0 0 15px ${glowColor}`
    }}>
      <Icon className={cn('h-5 w-5', color)} />
    </div>
  );
}

export function ThreatCard({ entry }: { entry: ThreatLogEntry }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const confidenceColor = entry.confidence > 0.8 ? 'hsl(var(--destructive))' : entry.confidence > 0.5 ? 'hsl(39, 94%, 55%)' : 'hsl(var(--primary))';

  return (
    <div className="relative pl-5">
       <ThreatIcon level={entry.level} />
       <div className="ml-8">
            <motion.div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer"
                style={{ perspective: 1000 }}
            >
                <AnimatePresence initial={false}>
                {!isFlipped ? (
                    <motion.div
                        key="front"
                        className="glass-card p-4 rounded-lg"
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: -180 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold">{entry.attackType}</p>
                                <p className="text-sm text-muted-foreground">{entry.description}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">{format(entry.timestamp, 'HH:mm')}</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="back"
                        className="glass-card p-4 rounded-lg"
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: -180 }}
                        transition={{ duration: 0.5 }}
                    >
                         <h3 className="font-bold mb-3">{entry.attackType} Details</h3>
                         <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Timestamp: {format(entry.timestamp, 'PPpp')}</div>
                            <div className="flex items-center gap-2"><Server className="w-4 h-4 text-primary" /> Source IP: {entry.sourceIp}</div>
                            <div className="flex items-center gap-2"><CornerDownRight className="w-4 h-4 text-primary" /> Level: <span className={levelConfig[entry.level].color}>{entry.level}</span></div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2"><BarChart className="w-4 h-4 text-primary" /> AI Confidence:</div>
                                <Progress value={entry.confidence * 100} indicatorClassName="bg-gradient-to-r from-cyan-500 to-violet-500" />
                            </div>
                         </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </motion.div>
        </div>
    </div>
  );
}

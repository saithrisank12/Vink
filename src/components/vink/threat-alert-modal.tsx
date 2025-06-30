'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { useEffect } from 'react';
import type { ClassifyMessageOutput } from '@/ai/flows/classify-message';

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-24 h-24 text-destructive drop-shadow-[0_0_10px_hsl(var(--destructive))]">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);


type ThreatAlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  threatDetails: ClassifyMessageOutput | null;
};

export function ThreatAlertModal({ isOpen, onClose, threatDetails }: ThreatAlertModalProps) {
    
    useEffect(() => {
        if (isOpen) {
            try {
                if (window.navigator.vibrate) {
                    window.navigator.vibrate(200);
                }
            } catch (e) {
                console.log("Vibration not supported");
            }

            const timer = setTimeout(() => {
                onClose();
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

  if (!threatDetails) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="glass-card max-w-md animate-shield-slam">
        <AlertDialogHeader className="items-center text-center">
            <ShieldIcon />
          <AlertDialogTitle className="text-2xl font-headline mt-4">
            {threatDetails.riskLevel} Threat Detected!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-muted-foreground">
            {threatDetails.explanation}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center gap-2">
          <AlertDialogCancel onClick={onClose}>Dismiss</AlertDialogCancel>
          <AlertDialogAction>Details</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

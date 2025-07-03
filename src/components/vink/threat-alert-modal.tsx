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
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { ClassifyMessageOutput } from '@/ai/flows/classify-message';
import { cn } from '@/lib/utils';
import { generateSpeech, translateText } from '@/lib/actions';

const ShieldIcon = ({ isSafe }: { isSafe: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn(
        "w-24 h-24",
        isSafe 
            ? "text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]" 
            : "text-destructive drop-shadow-[0_0_10px_hsl(var(--destructive))]"
    )}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);


type ThreatAlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  threatDetails: ClassifyMessageOutput | null;
};

export function ThreatAlertModal({ isOpen, onClose, threatDetails }: ThreatAlertModalProps) {
    const router = useRouter();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const playAudio = async () => {
            if (!isOpen || !threatDetails) {
                return;
            }

            // Vibrate device if supported
            try {
                if (window.navigator.vibrate) {
                    window.navigator.vibrate(200);
                }
            } catch (e) {
                console.log("Vibration not supported");
            }
            
            // Stop any previously playing audio
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }

            let textToSpeak = threatDetails.riskLevel === 'Safe' 
                ? `Analysis Complete. ${threatDetails.explanation}`
                : `${threatDetails.riskLevel} threat detected. ${threatDetails.explanation}`;
            
            const selectedLanguage = localStorage.getItem('vink-language') || 'English';

            if (selectedLanguage !== 'English') {
                const translatedTextResult = await translateText({ text: textToSpeak, targetLanguage: selectedLanguage });
                textToSpeak = translatedTextResult;
            }
            
            try {
                const response = await generateSpeech(textToSpeak);
                if (response?.media) {
                    const audio = new Audio(response.media);
                    audioRef.current = audio;
                    
                    const playPromise = audio.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.error("Audio playback failed. This may be due to browser autoplay policies.", error);
                        });
                    }
                } else {
                     console.error("TTS generation failed, received no media.", response);
                }
            } catch (error) {
                console.error("Error generating or playing speech:", error);
            }
        };
        
        playAudio();

        // This cleanup function runs when the component unmounts or before the effect re-runs.
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [isOpen, threatDetails]);

  const handleDetailsClick = () => {
    onClose();
    router.push('/threat-log');
  };

  if (!threatDetails) return null;

  const isSafe = threatDetails.riskLevel === 'Safe';
  const titleText = isSafe ? "Analysis Complete: It's Safe" : `${threatDetails.riskLevel} Threat Detected!`;
  const showDetailsButton = threatDetails.riskLevel !== 'Safe';

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="glass-card max-w-md animate-shield-slam">
        <AlertDialogHeader className="items-center text-center">
            <ShieldIcon isSafe={isSafe} />
          <AlertDialogTitle className="text-2xl font-headline mt-4">
            {titleText}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-muted-foreground">
            {threatDetails.explanation}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center gap-2">
          <AlertDialogCancel onClick={onClose}>Dismiss</AlertDialogCancel>
          {showDetailsButton && (
            <AlertDialogAction onClick={handleDetailsClick}>Details</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

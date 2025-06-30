'use client';

import { motion, AnimatePresence } from 'framer-motion';

type MascotProps = {
  eyeTargetX: number;
  eyeTargetY: number;
  isHiding: boolean;
  isError: boolean;
  isWinking?: boolean;
};

const spring = { type: 'spring', stiffness: 200, damping: 20 };
const transition = { duration: 0.2 };
const exit = { opacity: 0, scale: 0.9, transition };
const animate = { opacity: 1, scale: 1, transition };

export function Mascot({ eyeTargetX, eyeTargetY, isHiding, isError, isWinking }: MascotProps) {
  const pupilX = -1.5 + eyeTargetX * 3;
  const pupilY = -1.5 + eyeTargetY * 3;

  const State = () => {
    if (isError) return <ErrorState />;
    if (isHiding) return <HidingState />;
    if (isWinking) return <WinkingState pupilX={pupilX} pupilY={pupilY}/>;
    return <DefaultState pupilX={pupilX} pupilY={pupilY} />;
  };

  return (
    <div className="relative w-[120px] h-[120px]">
      <motion.svg
        viewBox="0 0 40 40"
        width="120"
        height="120"
        aria-hidden="true"
        initial={false}
      >
        <defs>
          {/* Enhanced skin gradient for a softer, more realistic look */}
          <radialGradient id="faceGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="40%">
            <stop offset="0%" stopColor="#FDEAE1" />
            <stop offset="100%" stopColor="#F7D8C4" />
          </radialGradient>
           <linearGradient id="suitGradient" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#2D3748" />
            <stop offset="100%" stopColor="#1A202C" />
          </linearGradient>
           <radialGradient id="cheekBlush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 182, 193, 0.4)" />
            <stop offset="100%" stopColor="rgba(255, 182, 193, 0)" />
          </radialGradient>
        </defs>

        {/* Base body and head structure */}
        <g>
            {/* Suit Body */}
            <path d="M 8 38 C 8 28, 32 28, 32 38 L 28 38 C 28 32, 12 32, 12 38 Z" fill="url(#suitGradient)" />
            {/* Shirt Collar */}
            <path d="M 18 29 L 20 32 L 22 29 Z" fill="#FFFFFF" />
            {/* Tie */}
            <path d="M 20 29 L 19 32 L 20 34 L 21 32 Z" fill="#1A202C" />
            {/* Chubby Head */}
            <path d="M 20,5 C 9.5,5 2,14 2,25 C 2,36 10,30 20,30 C 30,30 38,36 38,25 C 38,14 30.5,5 20,5 Z" fill="url(#faceGradient)" />
            
            {/* Cheek blush */}
            <circle cx="13" cy="22" r="4" fill="url(#cheekBlush)" />
            <circle cx="27" cy="22" r="4" fill="url(#cheekBlush)" />
            
            {/* Hair swirl */}
            <path d="M 20 5.5 A 5 5 0 0 1 23 8 A 3 3 0 0 0 20 5.5" fill="#A0522D" />
        </g>
        
        <AnimatePresence mode="wait" initial={false}>
          <motion.g key={isError ? 'error' : isHiding ? 'hiding' : isWinking ? 'winking' : 'default'}>
            <State />
          </motion.g>
        </AnimatePresence>
      </motion.svg>
    </div>
  );
}

// Default happy, chubby state
const DefaultState = ({pupilX, pupilY}: {pupilX: number, pupilY: number}) => (
    <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Big, cute eyes */}
        <motion.g transform={`translate(${pupilX * 0.5}, ${pupilY * 0.5})`} transition={spring}>
            <ellipse cx="15" cy="19" rx="4" ry="4.5" fill="white" />
            <ellipse cx="15" cy="19" rx="3.5" ry="4" fill="#38A169" />
            <circle cx="15" cy="19" r="2" fill="black" />
            <circle cx="14" cy="17.5" r="0.8" fill="white" />
        </motion.g>
        <motion.g transform={`translate(${pupilX * 0.5}, ${pupilY * 0.5})`} transition={spring}>
            <ellipse cx="25" cy="19" rx="4" ry="4.5" fill="white" />
            <ellipse cx="25" cy="19" rx="3.5" ry="4" fill="#38A169" />
            <circle cx="25" cy="19" r="2" fill="black" />
            <circle cx="24" cy="17.5" r="0.8" fill="white" />
        </motion.g>

        {/* Cute smile with dimple chin */}
        <path d="M 18 26 C 20 27.5, 22 27.5, 24 26" stroke="#C06C84" fill="none" strokeWidth="1" strokeLinecap="round" />
        <path d="M 20 29.5 C 20.5 29, 20 29, 20.5 29.5" stroke="#E5989B" fill="none" strokeWidth="1.5" strokeLinecap="round" />

    </motion.g>
)

// Eyes closed with chubby hands
const HidingState = () => (
    <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Mouth */}
        <path d="M 18 26 C 20 27, 22 27, 24 26" stroke="#C06C84" fill="none" strokeWidth="1" strokeLinecap="round" />
        <path d="M 20 29.5 C 20.5 29, 20 29, 20.5 29.5" stroke="#E5989B" fill="none" strokeWidth="1.5" strokeLinecap="round" />

        {/* Chubby hands covering eyes */}
        <motion.g
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { ...spring, damping: 15, stiffness: 150 } }}
        >
            <path d="M 6 23 C 10 15, 20 18, 20 23 C 20 27, 10 28, 6 23 Z" fill="url(#faceGradient)" stroke="#E6A478" strokeWidth="0.5" />
            <path d="M 34 23 C 30 15, 20 18, 20 23 C 20 27, 30 28, 34 23 Z" fill="url(#faceGradient)" stroke="#E6A478" strokeWidth="0.5" />
        </motion.g>
    </motion.g>
)

// Sad, concerned state for errors
const ErrorState = () => (
    <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Sad eyes with a little tear */}
        <path d="M 12 20 C 14 18, 16 18, 18 20" stroke="black" fill="none" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 22 20 C 24 18, 26 18, 28 20" stroke="black" fill="none" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 28 21 L 27 23 L 29 23 Z" fill="#A2D2FF" />

        {/* Sad Mouth */}
        <path d="M 18 27 C 20 25.5, 22 25.5, 24 27" stroke="#C06C84" fill="none" strokeWidth="1" strokeLinecap="round" />
    </motion.g>
)

// Playful winking state
const WinkingState = ({pupilX, pupilY}: {pupilX: number, pupilY: number}) => (
     <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Normal Eye */}
        <motion.g transform={`translate(${pupilX * 0.5}, ${pupilY * 0.5})`} transition={spring}>
            <ellipse cx="15" cy="19" rx="4" ry="4.5" fill="white" />
            <ellipse cx="15" cy="19" rx="3.5" ry="4" fill="#38A169" />
            <circle cx="15" cy="19" r="2" fill="black" />
            <circle cx="14" cy="17.5" r="0.8" fill="white" />
        </motion.g>
        
        {/* Winking Eye */}
        <path d="M 22 19 C 24 21, 26 21, 28 19" stroke="black" fill="none" strokeWidth="1.2" strokeLinecap="round" />

        {/* Cheeky smile */}
        <path d="M 18 25 C 20 27, 24 26, 26 25" stroke="#C06C84" fill="none" strokeWidth="1" strokeLinecap="round" />
        <path d="M 20 29.5 C 20.5 29, 20 29, 20.5 29.5" stroke="#E5989B" fill="none" strokeWidth="1.5" strokeLinecap="round" />
    </motion.g>
)

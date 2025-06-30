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
    if (isWinking) return <WinkingState />;
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
          <radialGradient id="faceGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="40%">
            <stop offset="0%" stopColor="#FDEAE1" />
            <stop offset="100%" stopColor="#F7D8C4" />
          </radialGradient>
           <linearGradient id="suitGradient" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#2D3748" />
            <stop offset="100%" stopColor="#1A202C" />
          </linearGradient>
        </defs>

        {/* Head and Suit */}
        <g>
            {/* Suit Body */}
            <path d="M 8 38 C 8 28, 32 28, 32 38 L 28 38 C 28 32, 12 32, 12 38 Z" fill="url(#suitGradient)" />
            {/* Shirt Collar */}
            <path d="M 18 29 L 20 32 L 22 29 Z" fill="#FFFFFF" />
            {/* Tie */}
            <path d="M 20 29 L 19 32 L 20 34 L 21 32 Z" fill="#1A202C" />
            {/* Head */}
            <motion.path d="M 20 2.5 C 8 2.5, 2 15, 20 30 C 38 15, 32 2.5, 20 2.5 Z" fill="url(#faceGradient)" />
             {/* Hair */}
            <path d="M 15 3 C 18 2, 22 2.5, 25 4 C 23 3, 19 2.5, 16 3.5 Z" fill="#FAD7A0" />
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

const DefaultState = ({pupilX, pupilY}: {pupilX: number, pupilY: number}) => (
    <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Eyebrows */}
        <path d="M 13 14 c 2 -1, 4 -0.5, 6 0" stroke="#E6A478" fill="none" strokeWidth="0.8" />
        <path d="M 27 14 c -2 -1, -4 -0.5, -6 0" stroke="#E6A478" fill="none" strokeWidth="0.8" />
        
        {/* Eyes */}
        <motion.g transform={`translate(${pupilX * 0.5}, ${pupilY * 0.5})`} transition={spring}>
            <ellipse cx="16" cy="18" rx="3.5" ry="3" fill="#38A169" />
            <circle cx="16" cy="18" r="1.5" fill="#1A202C" />
            <circle cx="15.5" cy="17.5" r="0.5" fill="white" />
        </motion.g>
        <motion.g transform={`translate(${pupilX * 0.5}, ${pupilY * 0.5})`} transition={spring}>
            <ellipse cx="24" cy="18" rx="3.5" ry="3" fill="#38A169" />
            <circle cx="24" cy="18" r="1.5" fill="#1A202C" />
            <circle cx="23.5" cy="17.5" r="0.5" fill="white" />
        </motion.g>

        {/* Mouth */}
        <path d="M 18 25.5 c 1 -0.5, 3 -0.5, 4 0" stroke="#D5936E" fill="none" strokeWidth="0.7" strokeLinecap="round" />
    </motion.g>
)

const HidingState = () => (
    <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Mouth */}
        <path d="M 18 25.5 c 1 -0.5, 3 -0.5, 4 0" stroke="#D5936E" fill="none" strokeWidth="0.7" strokeLinecap="round" />

        {/* Hands covering eyes */}
        <motion.g
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { ...spring, damping: 15, stiffness: 150 } }}
        >
            <path d="M 8,22 C 12,16 20,18 20,22 C 20,26 12,28 8,22 Z" fill="url(#faceGradient)" stroke="#E6A478" strokeWidth="0.3" />
            <path d="M 32,22 C 28,16 20,18 20,22 C 20,26 28,28 32,22 Z" fill="url(#faceGradient)" stroke="#E6A478" strokeWidth="0.3" />
        </motion.g>
    </motion.g>
)

const ErrorState = () => (
    <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Sad Eyes */}
        <path d="M 14 18 h 4" stroke="#1A202C" fill="none" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 22 18 h 4" stroke="#1A202C" fill="none" strokeWidth="1.2" strokeLinecap="round" />
        {/* Sad Mouth */}
        <path d="M 18 26 q 2 -1.5 4 0" stroke="#D5936E" fill="none" strokeWidth="0.7" strokeLinecap="round" />
    </motion.g>
)

const WinkingState = () => (
     <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Eyebrows */}
        <path d="M 13 14 c 2 -1, 4 -0.5, 6 0" stroke="#E6A478" fill="none" strokeWidth="0.8" />
        <path d="M 27 14 c -2 -1, -4 -0.5, -6 0" stroke="#E6A478" fill="none" strokeWidth="0.8" />
        
        {/* Normal Eye */}
        <g>
            <ellipse cx="16" cy="18" rx="3.5" ry="3" fill="#38A169" />
            <circle cx="16" cy="18" r="1.5" fill="#1A202C" />
            <circle cx="15.5" cy="17.5" r="0.5" fill="white" />
        </g>
        
        {/* Winking Eye */}
        <path d="M 22 18 c 1.5 -1.5 3 -1.5 4 0" stroke="#D5936E" fill="none" strokeWidth="0.8" strokeLinecap="round" />

        {/* Mouth */}
        <path d="M 18 25.5 c 1 1, 3 1, 4 0" stroke="#D5936E" fill="none" strokeWidth="0.7" strokeLinecap="round" />
    </motion.g>
)

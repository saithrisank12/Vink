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
            {/* Head Shape */}
            <path d="M 20,5 C 9.5,5 2,14 2,25 C 2,36 10,30 20,30 C 30,30 38,36 38,25 C 38,14 30.5,5 20,5 Z" fill="url(#faceGradient)" />
            
            {/* Cheek blush */}
            <circle cx="13" cy="22" r="3" fill="url(#cheekBlush)" />
            <circle cx="27" cy="22" r="3" fill="url(#cheekBlush)" />
            
            {/* Hair swirl */}
            <path d="M 20 5.5 A 5 5 0 0 1 23 8 A 3 3 0 0 0 20 5.5" fill="#f0c89a" />
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

// Default "Born Leader" state
const DefaultState = ({pupilX, pupilY}: {pupilX: number, pupilY: number}) => (
    <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Determined Eyes */}
        <motion.g transform={`translate(${pupilX * 0.7}, ${pupilY * 0.7})`} transition={spring}>
            <ellipse cx="14.5" cy="19" rx="3.5" ry="3" fill="white" />
            <ellipse cx="14.5" cy="19" rx="2.5" ry="2" fill="#2ca280" />
            <circle cx="14.5" cy="19" r="1.5" fill="black" />
            <circle cx="13.8" cy="18.2" r="0.6" fill="white" />
        </motion.g>
        <motion.g transform={`translate(${pupilX * 0.7}, ${pupilY * 0.7})`} transition={spring}>
            <ellipse cx="25.5" cy="19" rx="3.5" ry="3" fill="white" />
            <ellipse cx="25.5" cy="19" rx="2.5" ry="2" fill="#2ca280" />
            <circle cx="25.5" cy="19" r="1.5" fill="black" />
            <circle cx="24.8" cy="18.2" r="0.6" fill="white" />
        </motion.g>
        
        {/* Eyebrows */}
        <path d="M 11 15.5 C 13 14.5, 16 15, 18 16" stroke="black" fill="none" strokeWidth="1" strokeLinecap="round" />
        <path d="M 22 16 C 24 15, 27 14.5, 29 15.5" stroke="black" fill="none" strokeWidth="1" strokeLinecap="round" />
        
        {/* Mouth Smirk */}
        <path d="M 17 25 C 19 26, 21 26, 23 25.5" stroke="#965A5A" fill="none" strokeWidth="0.8" strokeLinecap="round" />
    </motion.g>
)

// Eyes covered for privacy
const HidingState = () => (
    <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Mouth */}
        <path d="M 17 25 C 19 24.5, 21 24.5, 23 25" stroke="#965A5A" fill="none" strokeWidth="0.8" strokeLinecap="round" />
        {/* Eyebrows up */}
        <path d="M 11 15 C 13 14, 16 14.5, 18 15.5" stroke="black" fill="none" strokeWidth="1" strokeLinecap="round" />
        <path d="M 22 15.5 C 24 14.5, 27 14, 29 15" stroke="black" fill="none" strokeWidth="1" strokeLinecap="round" />

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

// Annoyed, concerned state for errors
const ErrorState = () => (
    <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Sad eyes */}
        <path d="M 12 20 C 14 18.5, 16 18.5, 18 20" stroke="black" fill="none" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 22 20 C 24 18.5, 26 18.5, 28 20" stroke="black" fill="none" strokeWidth="1.2" strokeLinecap="round" />
        
        {/* Worried Eyebrows */}
        <path d="M 11 15 C 13 16, 16 15.5, 18 15" stroke="black" fill="none" strokeWidth="1" strokeLinecap="round" />
        <path d="M 22 15 C 24 15.5, 27 16, 29 15" stroke="black" fill="none" strokeWidth="1" strokeLinecap="round" />

        {/* Sad Mouth */}
        <path d="M 18 27 C 20 25.5, 22 25.5, 24 27" stroke="#C06C84" fill="none" strokeWidth="1" strokeLinecap="round" />
    </motion.g>
)

// Playful winking state
const WinkingState = ({pupilX, pupilY}: {pupilX: number, pupilY: number}) => (
     <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Normal Eye */}
        <motion.g transform={`translate(${pupilX * 0.7}, ${pupilY * 0.7})`} transition={spring}>
            <ellipse cx="14.5" cy="19" rx="3.5" ry="3" fill="white" />
            <ellipse cx="14.5" cy="19" rx="2.5" ry="2" fill="#2ca280" />
            <circle cx="14.5" cy="19" r="1.5" fill="black" />
            <circle cx="13.8" cy="18.2" r="0.6" fill="white" />
        </motion.g>
        
        {/* Winking Eye */}
        <path d="M 23 19 C 25 20, 27 20, 29 19" stroke="black" fill="none" strokeWidth="1.2" strokeLinecap="round" />

        {/* Eyebrows */}
        <path d="M 11 15.5 C 13 14.5, 16 15, 18 16" stroke="black" fill="none" strokeWidth="1" strokeLinecap="round" />
        <path d="M 22 15.5 C 24 15, 27 14.5, 29 15" stroke="black" fill="none" strokeWidth="1" strokeLinecap="round" />

        {/* Cheeky smile */}
        <path d="M 17 25 C 19 26.5, 24 26, 26 25" stroke="#965A5A" fill="none" strokeWidth="0.8" strokeLinecap="round" />
    </motion.g>
)

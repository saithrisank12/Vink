'use client';

import { motion, AnimatePresence } from 'framer-motion';

type MascotProps = {
  eyeTargetX: number;
  eyeTargetY: number;
  isHiding: boolean;
};

const spring = { type: 'spring', stiffness: 200, damping: 20 };
const transition = { duration: 0.2 };
const exit = { opacity: 0, scale: 0.9, transition };
const animate = { opacity: 1, scale: 1, transition };

export function Mascot({ eyeTargetX, eyeTargetY, isHiding }: MascotProps) {
  const pupilX = -1.5 + eyeTargetX * 3;
  const pupilY = -1.5 + eyeTargetY * 3;

  const State = () => {
    if (isHiding) return <HidingState />;
    return <DefaultState pupilX={pupilX} pupilY={pupilY} />;
  };

  return (
    <div className="relative w-[150px] h-[150px]">
      <motion.svg
        viewBox="0 0 100 100"
        width="150"
        height="150"
        aria-hidden="true"
        initial={false}
      >
        <defs>
            <filter id="fur-texture" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
            </filter>
        </defs>

        <AnimatePresence mode="wait" initial={false}>
          <motion.g key={isHiding ? 'hiding' : 'default'} filter="url(#fur-texture)">
            <State />
          </motion.g>
        </AnimatePresence>
      </motion.svg>
    </div>
  );
}

// Default state: watching the user type
const DefaultState = ({pupilX, pupilY}: {pupilX: number, pupilY: number}) => (
    <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Head */}
        <path d="M 50,15 C 25,15 10,35 10,60 C 10,85 25,95 50,95 C 75,95 90,85 90,60 C 90,35 75,15 50,15 Z" fill="#E0F7FA" />
        
        {/* Eyes */}
        <motion.g transform={`translate(${pupilX}, ${pupilY})`} transition={spring}>
            <circle cx="38" cy="55" r="8" fill="white" />
            <circle cx="38" cy="55" r="4" fill="black" />
            <circle cx="62" cy="55" r="8" fill="white" />
            <circle cx="62"cy="55" r="4" fill="black" />
        </motion.g>
        
        {/* Mouth */}
        <path d="M 45 75 Q 50 80, 55 75" stroke="black" fill="none" strokeWidth="2" strokeLinecap="round" />
    </motion.g>
)

// Hiding state: covering eyes for password
const HidingState = () => (
    <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Head */}
        <path d="M 50,15 C 25,15 10,35 10,60 C 10,85 25,95 50,95 C 75,95 90,85 90,60 C 90,35 75,15 50,15 Z" fill="#E0F7FA" />
        
        {/* Mouth */}
        <path d="M 45 75 Q 50 82, 55 75" stroke="black" fill="none" strokeWidth="2" strokeLinecap="round" />

        {/* Hands covering eyes */}
        <motion.g
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { ...spring, damping: 15, stiffness: 150 } }}
        >
            {/* Left Hand */}
            <path d="M 15 60 C 25 40, 45 45, 48 55 L 45 65 C 35 70, 20 70, 15 60 Z" fill="#B2EBF2" />
            {/* Fingers */}
            <path d="M 48 55 C 49 52, 51 52, 52 55" stroke="#80DEEA" fill="none" strokeWidth="1.5" />
            <path d="M 43 58 C 44 55, 46 55, 47 58" stroke="#80DEEA" fill="none" strokeWidth="1.5" />

            {/* Right Hand */}
            <path d="M 85 60 C 75 40, 55 45, 52 55 L 55 65 C 65 70, 80 70, 85 60 Z" fill="#B2EBF2" />
             {/* Fingers */}
            <path d="M 52 55 C 51 52, 49 52, 48 55" stroke="#80DEEA" fill="none" strokeWidth="1.5" />
            <path d="M 57 58 C 56 55, 54 55, 53 58" stroke="#80DEEA" fill="none" strokeWidth="1.5" />
        </motion.g>
    </motion.g>
)

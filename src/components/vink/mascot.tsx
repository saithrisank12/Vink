'use client';

import { motion, AnimatePresence } from 'framer-motion';

type MascotProps = {
  eyeTargetX: number;
  eyeTargetY: number;
  isHiding: boolean;
  isError: boolean;
};

const spring = { type: 'spring', stiffness: 200, damping: 20 };
const transition = { duration: 0.2 };
const exit = { opacity: 0, scale: 0.9, transition };
const animate = { opacity: 1, scale: 1, transition };

export function Mascot({ eyeTargetX, eyeTargetY, isHiding, isError }: MascotProps) {
  const pupilX = -1.5 + eyeTargetX * 3;
  const pupilY = -1.5 + eyeTargetY * 3;

  const State = () => {
    if (isError) return <ErrorState />;
    if (isHiding) return <HidingState />;
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
          <radialGradient id="bearGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="90%" stopColor="#EAEAEA" />
          </radialGradient>
           <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Head and Ears */}
        <g>
            <motion.circle cx="9" cy="13" r="6" fill="url(#bearGradient)" />
            <motion.circle cx="31" cy="13" r="6" fill="url(#bearGradient)" />
            <motion.circle cx="20" cy="22" r="17" fill="url(#bearGradient)" />
        </g>
        <motion.circle cx="10" cy="14" r="4" fill="#fff" />
        <motion.circle cx="30" cy="14" r="4" fill="#fff" />

        {/* Muzzle and Nose */}
        <motion.ellipse cx="20" cy="27" rx="9" ry="7" fill="#FFFFFF" />
        <motion.path d="M 20 25 C 19 24, 21 24, 20 25 L 18 27 L 22 27 Z" fill="#4A3F35" />

        <AnimatePresence mode="wait" initial={false}>
          <motion.g key={isError ? 'error' : isHiding ? 'hiding' : 'default'}>
            <State />
          </motion.g>
        </AnimatePresence>
      </motion.svg>
    </div>
  );
}


const DefaultState = ({pupilX, pupilY}: {pupilX: number, pupilY: number}) => (
    <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Eyes */}
        <motion.g transform={`translate(${pupilX * 0.3}, ${pupilY * 0.3})`} transition={spring}>
            <circle cx="15" cy="21" r="2.5" fill="#2E2E2E" />
            <circle cx="14" cy="20" r="0.75" fill="white" />
        </motion.g>
        <motion.g transform={`translate(${pupilX * 0.3}, ${pupilY * 0.3})`} transition={spring}>
            <circle cx="25" cy="21" r="2.5" fill="#2E2E2E" />
            <circle cx="24" cy="20" r="0.75" fill="white" />
        </motion.g>
        {/* Mouth */}
        <motion.path d="M 17 30 q 3 -1 6 0" stroke="#4A3F35" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        {/* Paws Down */}
        <motion.path d="M7 32 C 3 32, 2 28, 6 27" fill="url(#bearGradient)" stroke="#C0C0C0" strokeWidth="0.3" initial={{ y: 0 }} animate={{ y: 0 }} transition={spring} />
        <motion.path d="M33 32 C 37 32, 38 28, 34 27" fill="url(#bearGradient)" stroke="#C0C0C0" strokeWidth="0.3" initial={{ y: 0 }} animate={{ y: 0 }} transition={spring} />
    </motion.g>
)

const HidingState = () => (
    <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Paws Up */}
        <motion.path d="M15 22 C 10 24, 8 18, 14 18" fill="url(#bearGradient)" stroke="#C0C0C0" strokeWidth="0.3" initial={{ y: 10, rotate: -15 }} animate={{ y: 0, rotate: 0 }} transition={spring} />
        <motion.path d="M25 22 C 30 24, 32 18, 26 18" fill="url(#bearGradient)" stroke="#C0C0C0" strokeWidth="0.3" initial={{ y: 10, rotate: 15 }} animate={{ y: 0, rotate: 0 }} transition={spring} />
        {/* Mouth */}
        <motion.path d="M 17 30 q 3 1.5 6 0" stroke="#4A3F35" strokeWidth="0.7" fill="none" strokeLinecap="round" />
    </motion.g>
)

const ErrorState = () => (
    <motion.g initial={{ opacity: 0 }} animate={animate} exit={exit}>
        {/* Sad Eyes */}
        <motion.g transform="translate(0, 0.5)">
            <path d="M 13 19.5 c 1 -1 3 -1 4 0" stroke="#2E2E2E" strokeWidth="1" fill="none" strokeLinecap="round" />
            <circle cx="15" cy="22" r="2.5" fill="#2E2E2E" />
            <path d="M 23 19.5 c 1 -1 3 -1 4 0" stroke="#2E2E2E" strokeWidth="1" fill="none" strokeLinecap="round" />
            <circle cx="25" cy="22" r="2.5" fill="#2E2E2E" />
        </motion.g>
        {/* Sad Mouth */}
        <motion.path d="M 17 31 q 3 -1.5 6 0" stroke="#4A3F35" strokeWidth="0.7" fill="none" strokeLinecap="round" />
    </motion.g>
)

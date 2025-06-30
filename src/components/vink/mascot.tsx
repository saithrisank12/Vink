'use client';

import { motion, AnimatePresence } from 'framer-motion';

type MascotProps = {
  eyeTargetX: number;
  eyeTargetY: number;
  isSleeping: boolean;
};

export function Mascot({ eyeTargetX, eyeTargetY, isSleeping }: MascotProps) {
  const pupilX = -1.5 + eyeTargetX * 3;
  const pupilY = -1.5 + eyeTargetY * 3;

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
        </defs>

        {/* Ears */}
        <motion.circle cx="10" cy="12" r="6" fill="url(#bearGradient)" stroke="#D1D1D1" strokeWidth="0.5" />
        <motion.circle cx="30" cy="12" r="6" fill="url(#bearGradient)" stroke="#D1D1D1" strokeWidth="0.5" />
        <motion.circle cx="11" cy="13" r="4.5" fill="#FFFFFF" />
        <motion.circle cx="29" cy="13" r="4.5" fill="#FFFFFF" />
        
        {/* Head */}
        <motion.circle cx="20" cy="23" r="16" fill="url(#bearGradient)" stroke="#D1D1D1" strokeWidth="0.5" />

        {/* Muzzle */}
        <motion.ellipse cx="20" cy="28" rx="9" ry="7" fill="white" stroke="#D1D1D1" strokeWidth="0.5" />
        
        {/* Nose */}
        <motion.path d="M 20 26 C 19 25, 21 25, 20 26 L 18 28 L 22 28 Z" fill="#6B4F3A" />

        {/* Mouth */}
        <motion.path d="M 20 28.5 C 20 29, 18 31, 17 31" stroke="#6B4F3A" strokeWidth="0.5" fill="none" strokeLinecap="round" />
        <motion.path d="M 20 28.5 C 20 29, 22 31, 23 31" stroke="#6B4F3A" strokeWidth="0.5" fill="none" strokeLinecap="round" />

        <AnimatePresence>
          {!isSleeping ? (
            <motion.g
              key="eyes-open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.1 } }}
              exit={{ opacity: 0 }}
            >
              {/* Left Eye */}
              <motion.g
                transform={`translate(${pupilX * 0.3}, ${pupilY * 0.3})`}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                  <circle cx="15" cy="22" r="2.5" fill="#2E2E2E" />
                  <circle cx="14" cy="21" r="0.75" fill="white" />
              </motion.g>
              
              {/* Right Eye */}
              <motion.g
                transform={`translate(${pupilX * 0.3}, ${pupilY * 0.3})`}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                  <circle cx="25" cy="22" r="2.5" fill="#2E2E2E" />
                  <circle cx="24" cy="21" r="0.75" fill="white" />
              </motion.g>
            </motion.g>
          ) : (
            <motion.g
              key="eyes-closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.1 } }}
              exit={{ opacity: 0 }}
            >
              <motion.path d="M 13,22 a 2.5,2.5 0 0,1 4,0" stroke="#2E2E2E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              <motion.path d="M 23,22 a 2.5,2.5 0 0,1 4,0" stroke="#2E2E2E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            </motion.g>
          )}
        </AnimatePresence>
      </motion.svg>
    </div>
  );
}

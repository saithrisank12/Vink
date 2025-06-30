'use client';

import { motion } from 'framer-motion';

type MascotProps = {
  eyeTargetX: number;
  eyeTargetY: number;
  isSleeping: boolean;
};

export function Mascot({ eyeTargetX, eyeTargetY, isSleeping }: MascotProps) {
  const pupilX = -0.5 + eyeTargetX * 1;
  const pupilY = -1 + eyeTargetY * 2;

  return (
    <div className="relative w-[120px] h-[120px]">
      <motion.svg
        viewBox="0 0 40 40"
        width="120"
        height="120"
        aria-hidden="true"
        initial={false}
        animate={isSleeping ? 'sleep' : 'awake'}
      >
        <defs>
            <radialGradient id="faceGradient" cx="50%" cy="40%" r="60%" fx="50%" fy="40%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary) / 0.2)' }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--primary) / 0.1)' }} />
            </radialGradient>
        </defs>

        {/* Face */}
        <motion.circle
          cx="20"
          cy="20"
          r="18"
          stroke="hsl(var(--primary))"
          strokeWidth="0.5"
          fill="url(#faceGradient)"
        />

        {/* Cheeks */}
        <motion.circle cx="12" cy="24" r="5" fill="hsl(var(--primary) / 0.05)" />
        <motion.circle cx="28" cy="24" r="5" fill="hsl(var(--primary) / 0.05)" />

        {/* Dimple Chin */}
        <motion.path d="M 18 33 Q 20 35 22 33" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.7" fill="none" strokeLinecap="round" />

        {/* Left Eye (Open and cute) */}
        <motion.g
          key="left-eye"
          transform="translate(11, 18)"
        >
          <motion.circle cx="0" cy="0" r="5" fill="white" />
          <motion.circle
            cx={pupilX * 1.5}
            cy={pupilY * 1.5}
            r="3"
            fill="black"
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
          {/* Highlight */}
          <motion.circle
            cx={pupilX * 1.5 - 1}
            cy={pupilY * 1.5 - 1}
            r="1"
            fill="white"
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        </motion.g>

        {/* Right Eye (Winking) */}
        <motion.g
          key="right-eye"
          transform="translate(29, 18)"
        >
            <motion.path
                d="M -5 0 C -2.5 -5 2.5 -5 5 0"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
            />
        </motion.g>

        {/* Left Eyebrow */}
        <motion.path
          d="M 6.5,18 C 6.5,15.5 15.5,15.5 15.5,18"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          variants={{
            sleep: { y: 2.5, transition: { duration: 0.3 } },
            awake: { y: -2.5, transition: { duration: 0.3 } },
          }}
          strokeLinecap="round"
        />
        
        {/* Right Eyebrow (for winking eye) */}
        <motion.path
          d="M 24.5,18 C 24.5,16.5 33.5,16.5 33.5,18" // Lowered eyebrow for wink
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          variants={{
            sleep: { y: 2.5, transition: { duration: 0.3 } },
            awake: { y: 0, transition: { duration: 0.3 } },
          }}
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
}

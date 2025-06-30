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
        <motion.circle
          cx="20"
          cy="20"
          r="18"
          stroke="hsl(var(--primary))"
          strokeWidth="0.5"
          fill="hsl(var(--primary) / 0.1)"
        />
        <motion.g
          key="left-eye"
          transform="translate(11, 18)"
          initial={{ scale: 1 }}
        >
          <motion.circle cx="0" cy="0" r="4.5" fill="white" />
          <motion.circle
            cx={pupilX}
            cy={pupilY}
            r="2"
            fill="black"
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        </motion.g>

        <motion.g
          key="right-eye"
          transform="translate(29, 18)"
          initial={{ scale: 1 }}
        >
          <motion.circle cx="0" cy="0" r="4.5" fill="white" />
          <motion.circle
            cx={pupilX}
            cy={pupilY}
            r="2"
            fill="black"
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        </motion.g>

        <motion.path
          d="M 6.5,18 C 6.5,15.5 15.5,15.5 15.5,18"
          stroke="white"
          strokeWidth="1"
          fill="none"
          variants={{
            sleep: { y: 2.5, transition: { duration: 0.3 } },
            awake: { y: -2, transition: { duration: 0.3 } },
          }}
          strokeLinecap="round"
        />
        <motion.path
          d="M 24.5,18 C 24.5,15.5 33.5,15.5 33.5,18"
          stroke="white"
          strokeWidth="1"
          fill="none"
          variants={{
            sleep: { y: 2.5, transition: { duration: 0.3 } },
            awake: { y: -2, transition: { duration: 0.3 } },
          }}
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
}

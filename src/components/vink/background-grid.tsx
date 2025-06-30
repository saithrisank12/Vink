'use client';

export function BackgroundGrid() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-1] h-full w-full bg-background"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 246, 255, 0.07) 1px, transparent 1px), linear-gradient(to right, rgba(0, 246, 255, 0.07) 1px, transparent 1px)',
        backgroundSize: '3.5rem 3.5rem',
        transform: 'skewY(-12deg)',
        animation: 'background-pan 30s linear infinite',
      }}
    />
  );
}

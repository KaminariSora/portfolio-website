'use client';

import { motion } from 'framer-motion';

const blobs = [
  {
    className: 'bg-orange-500/40',
    size: 'w-[42rem] h-[42rem]',
    style: { top: '-14%', left: '-12%' },
    animate: { x: [0, 80, -40, 0], y: [0, 60, -30, 0], scale: [1, 1.15, 0.95, 1] },
    duration: 22,
  },
  {
    className: 'bg-fuchsia-500/30',
    size: 'w-[36rem] h-[36rem]',
    style: { top: '4%', right: '-12%' },
    animate: { x: [0, -60, 40, 0], y: [0, 40, -50, 0], scale: [1, 0.9, 1.1, 1] },
    duration: 26,
  },
  {
    className: 'bg-cyan-400/25',
    size: 'w-[38rem] h-[38rem]',
    style: { bottom: '-18%', left: '18%' },
    animate: { x: [0, 50, -50, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.95, 1] },
    duration: 30,
  },
  {
    className: 'bg-amber-300/20',
    size: 'w-[30rem] h-[30rem]',
    style: { bottom: '0%', right: '8%' },
    animate: { x: [0, -40, 30, 0], y: [0, 30, -40, 0], scale: [1, 1.05, 0.9, 1] },
    duration: 24,
  },
];

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[110px] mix-blend-screen will-change-transform ${b.className} ${b.size}`}
          style={b.style}
          animate={b.animate}
          transition={{ duration: b.duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
      ))}

      {/* faint tech grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* vignette so text stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.55)_65%,rgba(2,6,23,0.95)_100%)]" />
    </div>
  );
}

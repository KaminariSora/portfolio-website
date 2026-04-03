import { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

export default function ParallaxElement({ children, distance = 50 }: { children: React.ReactNode, distance?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}
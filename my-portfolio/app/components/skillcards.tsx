'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  name: string;
  icon: LucideIcon;
  level: string;
  variants: Variants; // รับ variants จากตัวแม่มาใช้
}

const SkillCard = ({ name, icon: Icon, level, variants }: SkillCardProps) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ 
        y: -10, 
        backgroundColor: "rgba(30, 41, 59, 0.8)",
        borderColor: "rgba(251, 146, 60, 0.5)" 
      }}
      className="flex flex-col items-center justify-center p-8 bg-slate-900/50 rounded-2xl border border-slate-800 transition-colors shadow-lg group backdrop-blur-sm"
    >
      {/* Icon Container */}
      <div className="p-4 bg-slate-800 rounded-2xl mb-4 group-hover:bg-orange-500/10 transition-colors">
        <Icon 
          className="text-slate-400 group-hover:text-orange-400 transition-colors" 
          size={40} 
        />
      </div>

      {/* Skill Name */}
      <h3 className="text-lg font-medium text-slate-300 group-hover:text-white transition-colors">
        {name}
      </h3>

      {/* Expertise Level (แสดงเฉพาะตอน Hover) */}
      <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Expertise: {level}
      </span>
    </motion.div>
  );
};

export default SkillCard;
'use client'; // จำเป็นสำหรับ Framer Motion

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

import { Variants } from 'framer-motion';
import SkillCard from '../components/skillcards';
import AuroraBackground from '../components/AuroraBackground';
import { personalInfo, bio, skills } from '../lib/config/profile';

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

export default function AboutMe() {
    return (
        <div className="relative min-h-screen text-white">
        <AuroraBackground />
        <motion.main
            className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* --- หัวข้อหน้า --- */}
            <motion.div variants={itemVariants} className="text-center mb-16 md:mb-24">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight">
                    About <span className="text-orange-400">Me</span>
                </h1>
                <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg">
                    Discover the journey, passion, and skills behind the {personalInfo.role}.
                </p>
            </motion.div>

            {/* --- ส่วนเนื้อหาหลัก (Responsive Grid) --- */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-12 items-center mb-24">

                {/* ฝั่งซ้าย: เรื่องราว (Animated Text) */}
                <motion.div variants={itemVariants} className="space-y-6 text-slate-300 text-lg leading-relaxed">
                    <h2 className="text-3xl font-bold text-white tracking-tight mb-6">My Data Science Journey</h2>
                    {bio.story.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </motion.div>

                {/* ฝั่งขวา: รูปภาพ (Animated Image) */}
                <motion.div
                    variants={itemVariants}
                    className="relative aspect-[4/5] w-full max-w-md mx-auto md:w-full md:max-w-none group"
                    whileHover={{ scale: 1.03 }} // อนิเมชันตอนเอาเมาส์ไปชี้
                    transition={{ duration: 0.3 }}
                >
                    {/* กรอบสี่เหลี่ยมด้านหลัง (Animated Line) */}
                    <motion.div
                        className="absolute -inset-4 border-2 border-white/10 rounded-3xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    />

                    <Image
                        src={personalInfo.aboutImage}
                        alt="My Journey"
                        fill
                        className="rounded-3xl object-cover shadow-2xl transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(255,165,0,0.15)]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority
                    />
                </motion.div>
            </div>

            {/* --- ส่วน Skills (Responsive Grid & Animated Bars) --- */}
            <motion.section
                variants={itemVariants}
                className="py-16 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 px-6 md:px-12 shadow-[0_0_60px_rgba(249,115,22,0.06)]"
            >
                <h2 className="text-3xl font-bold text-white tracking-tight text-center mb-12">
                    Core <span className="text-orange-400">Tech Stack</span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {skills.map((skill) => (
                        <SkillCard
                            key={skill.name}
                            name={skill.name}
                            icon={skill.icon}
                            level={skill.level}
                            variants={itemVariants}
                        />
                    ))}
                </div>
            </motion.section>

            {/* --- ปุ่ม Call-to-Action (Responsive) --- */}
            <motion.div variants={itemVariants} className="text-center mt-20 space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 flex flex-col sm:flex-row justify-center items-center">
                <a href="/portfolio" className="bg-orange-500 text-black px-10 py-4 rounded-full font-bold hover:bg-orange-400 transition text-lg w-full sm:w-auto text-center shadow-[0_0_25px_rgba(249,115,22,0.3)]">
                    View My Portfolio
                </a>
                <a href="/contact" className="border border-white/15 bg-white/5 backdrop-blur-sm px-10 py-4 rounded-full font-bold hover:bg-white/10 transition text-lg w-full sm:w-auto text-center flex items-center justify-center gap-2">
                    Let's Collaborate <Zap size={18} className="text-orange-400" />
                </a>
            </motion.div>

        </motion.main>
        </div>
    );
}
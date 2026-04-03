'use client'; // จำเป็นสำหรับ Framer Motion

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Brain, Database, BarChart, Code, Award, Zap } from 'lucide-react';

import { Variants } from 'framer-motion';
import SkillCard from '../components/skillcards';

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

const skills = [
    { name: 'Python', icon: Code, level: "good" },
    { name: 'Machine Learning', icon: Brain, level: "90" },
    { name: 'Data Visualisation', icon: BarChart, level: "85" },
    { name: 'SQL & NoSQL', icon: Database, level: "80" },
    { name: 'Cloud (AWS/GCP)', icon: Zap, level: "75" },
    { name: 'TensorFlow/PyTorch', icon: Award, level: "88" },
];

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
        <motion.main
            className="max-w-7xl mx-auto px-6 pt-32 pb-20 overflow-hidden"
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
                    Discover the journey, passion, and skills behind the Data Scientist.
                </p>
            </motion.div>

            {/* --- ส่วนเนื้อหาหลัก (Responsive Grid) --- */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-12 items-center mb-24">

                {/* ฝั่งซ้าย: เรื่องราว (Animated Text) */}
                <motion.div variants={itemVariants} className="space-y-6 text-slate-300 text-lg leading-relaxed">
                    <h2 className="text-3xl font-bold text-white tracking-tight mb-6">My Data Science Journey</h2>
                    <p>
                        My journey in Data Science is driven by one belief — data alone has no value unless it creates impact.
                    </p>
                    <p>
                        I have developed my skills from data analysis to AI and intelligent systems, focusing on solving real-world problems through technology.
                    </p>
                    <p>
                        Each project I build is not just about models, but about delivering meaningful and usable solutions.
                    </p>
                    <p>
                        I am committed to continuous learning and pushing my limits to become a better AI and Data professional.
                    </p>
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
                        className="absolute -inset-4 border-2 border-slate-700 rounded-3xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    />

                    <Image
                        src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800" // รูปตัวอย่าง
                        alt="My Journey"
                        fill // ใช้ fill เพื่อให้เต็มคอนเทนเนอร์ aspect-ratio
                        className="rounded-3xl object-cover shadow-2xl transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(255,165,0,0.15)]"
                        sizes="(max-width: 768px) 100vw, 33vw" // สำหรับ Optimize รูปภาพ
                        priority
                    />
                </motion.div>
            </div>

            {/* --- ส่วน Skills (Responsive Grid & Animated Bars) --- */}
            <motion.section
                variants={itemVariants}
                className="py-16 bg-slate-800/30 rounded-3xl border border-slate-800 px-6 md:px-12 backdrop-blur-sm"
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
                <a href="/portfolio" className="bg-orange-500 text-black px-10 py-4 rounded-full font-bold hover:bg-orange-600 transition text-lg w-full sm:w-auto text-center">
                    View My Portfolio
                </a>
                <a href="/contact" className="border border-slate-700 px-10 py-4 rounded-full font-bold hover:bg-slate-800 transition text-lg w-full sm:w-auto text-center flex items-center justify-center gap-2">
                    Let's Collaborate <Zap size={18} className="text-orange-400" />
                </a>
            </motion.div>

        </motion.main>
    );
}
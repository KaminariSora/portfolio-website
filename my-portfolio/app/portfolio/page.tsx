'use client';

import { useMemo, useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Layers } from 'lucide-react';
import AuroraBackground from '../components/AuroraBackground';
import { projects } from '../lib/config/profile';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const gridVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function Portfolio() {
    const [activeTag, setActiveTag] = useState('All');

    const tags = useMemo(() => {
        const unique = new Set<string>();
        projects.forEach((project) => project.tags.forEach((tag) => unique.add(tag)));
        return ['All', ...Array.from(unique)];
    }, []);

    const filteredProjects = useMemo(() => {
        if (activeTag === 'All') return projects;
        return projects.filter((project) => project.tags.includes(activeTag));
    }, [activeTag]);

    return (
        <div className="relative min-h-screen text-white">
            <AuroraBackground />
            <motion.main
                className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* --- Header --- */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-orange-400 mb-4">
                        <Layers size={22} />
                        <span className="text-sm font-semibold tracking-widest uppercase">Portfolio</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight">
                        Things I've <span className="text-orange-400">Built</span>
                    </h1>
                    <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg">
                        A collection of AI agents, chatbots, and applications built while turning data into
                        real-world impact.
                    </p>
                </motion.div>

                {/* --- Filter Tags --- */}
                <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-14">
                    {tags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                                activeTag === tag
                                    ? 'bg-orange-500 text-black border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.35)]'
                                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </motion.div>

                {/* --- Project Grid --- */}
                <motion.div
                    layout
                    variants={gridVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                variants={cardVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                whileHover={{ y: -8 }}
                                className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 border border-white/10 hover:border-orange-400/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] flex flex-col"
                            >
                                <div className="h-48 relative overflow-hidden shrink-0">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="object-contain w-full h-full group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="p-6 flex flex-col gap-3 grow">
                                    <h3 className="text-xl font-bold">{project.title}</h3>
                                    {project.description && (
                                        <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
                                    )}
                                    <div className="flex flex-wrap gap-2 pt-1 mt-auto">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs bg-white/5 px-3 py-1 rounded-full border border-white/10"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <p className="text-center text-slate-500 mt-16">No projects match this tag yet.</p>
                )}

                {/* --- CTA --- */}
                <motion.div variants={itemVariants} className="text-center mt-24">
                    <a
                        href="/contact"
                        className="inline-block bg-orange-500 text-black px-10 py-4 rounded-full font-bold hover:bg-orange-400 transition text-lg shadow-[0_0_25px_rgba(249,115,22,0.3)]"
                    >
                        Let's Build Something Together
                    </a>
                </motion.div>
            </motion.main>
        </div>
    );
}

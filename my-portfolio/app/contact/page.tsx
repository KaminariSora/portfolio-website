'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, Variants } from 'framer-motion';
import { Mail, GitFork, Send, CheckCircle2 } from 'lucide-react';
import AuroraBackground from '../components/AuroraBackground';
import { personalInfo } from '../lib/config/profile';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const contactLinks = [
    {
        label: 'Email',
        value: personalInfo.email,
        href: `mailto:${personalInfo.email}`,
        icon: Mail,
    },
    {
        label: 'GitHub',
        value: personalInfo.github.replace('https://', ''),
        href: personalInfo.github,
        icon: GitFork,
    },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="relative min-h-screen text-white">
            <AuroraBackground />
            <motion.main
                className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* --- Header --- */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight">
                        Get In <span className="text-orange-400">Touch</span>
                    </h1>
                    <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg">
                        Have a project in mind, a role to fill, or just want to talk about AI and data? My inbox is open.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr,1.4fr] gap-10 items-start">
                    {/* --- Contact Info --- */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        {contactLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target={link.label === 'GitHub' ? '_blank' : undefined}
                                rel={link.label === 'GitHub' ? 'noopener noreferrer' : undefined}
                                className="flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-orange-400/50 hover:bg-white/10 transition-all group"
                            >
                                <div className="p-3 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors">
                                    <link.icon className="text-orange-400" size={22} />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-slate-500">{link.label}</p>
                                    <p className="text-slate-200 font-medium break-all">{link.value}</p>
                                </div>
                            </a>
                        ))}

                        <a
                            href={personalInfo.resume.file}
                            download={personalInfo.resume.downloadName}
                            className="flex items-center justify-center gap-2 border border-white/15 bg-white/5 backdrop-blur-sm rounded-2xl p-5 font-bold hover:bg-white/10 transition-all"
                        >
                            Download Resume
                        </a>
                    </motion.div>

                    {/* --- Contact Form --- */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(249,115,22,0.06)]"
                    >
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center py-16 gap-4"
                            >
                                <CheckCircle2 className="text-orange-400" size={48} />
                                <h3 className="text-2xl font-bold">Message received!</h3>
                                <p className="text-slate-400">
                                    Thanks for reaching out, {form.name || 'friend'} — I'll get back to you soon.
                                </p>
                            </motion.div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-900/50 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-orange-400 transition"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-900/50 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-orange-400 transition"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-900/50 border border-white/10 p-4 rounded-lg h-40 focus:outline-none focus:border-orange-400 transition"
                                        placeholder="Write your message..."
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-orange-500 text-black py-4 rounded-lg font-bold hover:bg-orange-400 transition text-lg shadow-[0_0_25px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2"
                                >
                                    Send Message <Send size={18} />
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </motion.main>
        </div>
    );
}

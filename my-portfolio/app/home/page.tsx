'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import aiFunction from '../lib/langchain'
import { Mail, FileText, Brain, Sparkles, GitFork } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AuroraBackground from '../components/AuroraBackground';
import { personalInfo, projects } from '../lib/config/profile';

const SUGGESTIONS = [
  { id: 1, label: "🛠️ About skills", query: "What programming language and tools are you proficient in?" },
  { id: 2, label: "🎓 About experience", query: "Share your internship experience." },
  { id: 3, label: "🚀 About projects", query: "What AI or Data Science project are you most proud of?" },
  { id: 4, label: "💡 About motivation", query: "Why do I like in AI?" },
];

const STATIC_RESPONSES: Record<number, string> = {
  1: "ทักษะของนายท่านมีทั้ง Python, Next.js และการทำ RAG ที่ล้ำสุดๆ เลยค่ะ!",
  2: "ประสบการณ์ฝึกงาน 6 เดือนที่ PTT Digital ทำให้นายท่านเก่งเรื่อง Data Science มากๆ เลยน๊าา ✨",
  3: "(ยืดอกอย่างภูมิใจ) นายท่านชื่นชอบโปรเจค Q&A Chatbot for meeting resolution มากที่สุดเลยค่ะ โปรเจคนี้เกี่ยวกับแชทบอทที่สรุปเนื้อหาการประชุมให้นายท่าน และนอกจากนี้ผู้สร้างของลูน่ากำไลังอยู่ในช่วงพัฒนา Project MIKAN ให้เก่งยิ่งขึ้นไปอีกด้วย ผู้สร้างของลูน่าเก่งสุดๆไปเลยใช่ไหมคะ 💕",
  4: "นายท่านชอบ AI เพราะมันช่วยสร้าง Impact และเปลี่ยนโลกด้วยข้อมูลได้ยังไงล่ะคะ! 🚀",
};

const heroContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerGrid: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const gridItem: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Home() {
  const [input, setInput] = useState('');
  const [queryId, setQueryID] = useState<number | undefined>()
  const [result, setResult] = useState('');
  const [time, setTime] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (isLoading) return;
    if (!input.trim()) {
      setResult("รบกวนนายท่านใส่คำถามก่อนนะคะ ✨");
      return;
    }

    const startTime = performance.now();
    setIsLoading(true);
    setResult('Thinking...');
    console.log(`Input: ${input}`)

    try {
      let response: string;

      const matchedSuggestion = SUGGESTIONS.find(s => s.query === input);
      console.log(`matchSuggestion: ${matchedSuggestion}`)
      const targetId = queryId || matchedSuggestion?.id;
      console.log(`targetId: ${targetId}`)

      if (targetId !== undefined && STATIC_RESPONSES[targetId]) {
        response = STATIC_RESPONSES[targetId];
        console.log(response)
      } else {
        response = await aiFunction(input);
      }

      setResult(response);
    } catch (error) {
      setResult("งือออ เกิดข้อผิดพลาดนิดหน่อยค่ะ 🥺");
    } finally {
      setTime(((performance.now() - startTime) / 1000).toFixed(2));
      setIsLoading(false);
      setQueryID(undefined);
    }
  };

  const handleContactMove = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-white font-sans">
      <AuroraBackground />

      {/* --- Main Content --- */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">

        {/* --- Section 1: Hero (Responsive Layout) --- */}
        <motion.section
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32"
        >
          {/* Left Side: Info */}
          <div className="space-y-6">
            <motion.p variants={heroItem} className="text-slate-400 text-lg">{personalInfo.greeting}</motion.p>
            <motion.h1 variants={heroItem} className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">
              I'm {personalInfo.displayName}
            </motion.h1>
            <motion.p variants={heroItem} className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight text-orange-400 [text-shadow:0_0_40px_rgba(251,146,60,0.35)]">
              {personalInfo.role}
            </motion.p>
            <motion.p variants={heroItem} className="text-slate-400 max-w-xl text-lg">
              {personalInfo.tagline}
            </motion.p>
            {/* Social Icons (แบบ responsive) */}
            <motion.div variants={heroItem} className="flex gap-4 text-slate-500 pt-2">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition"><GitFork size={24} /></a>
              <button onClick={handleContactMove} className="hover:text-orange-400 transition"><Mail size={24} /></button>
            </motion.div>
            {/* Buttons (Responsive) */}
            <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-orange-500 text-black px-8 py-3 rounded-full font-bold shadow-[0_0_25px_rgba(249,115,22,0.35)] hover:bg-orange-400 transition w-full sm:w-auto"
                onClick={handleContactMove}>
                Hire Me
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="border border-white/15 bg-white/5 backdrop-blur-sm px-8 py-3 rounded-full font-bold hover:bg-white/10 transition flex items-center justify-center gap-2 w-full sm:w-auto"
                href={personalInfo.resume.file}
                download={personalInfo.resume.downloadName}>
                <FileText size={20} /> Download Resume
              </motion.a>
            </motion.div>
          </div>

          {/* Right Side: Profile Image (Responsive) */}
          <motion.div variants={heroItem} className="relative aspect-square w-full max-w-lg mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full opacity-70"
              style={{
                background: "conic-gradient(from 0deg, rgba(251,146,60,0.5), rgba(217,70,239,0.35), rgba(34,211,238,0.35), rgba(251,146,60,0.5))",
                filter: "blur(30px)",
              }}
            />
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-3 bg-slate-900/60 backdrop-blur-sm rounded-full overflow-hidden border border-white/10"
            >
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.displayName}
                width={500}
                height={500}
                className="rounded-full relative object-cover w-full h-full p-4"
              />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* --- Section 2: AI Feature Showcase --- */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(249,115,22,0.06)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <Brain className="text-orange-400" size={32} />
            <h2 className="text-2xl font-bold text-white">AI Data Analyst Proxy by MIKAN</h2>
          </div>

          <div className="space-y-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask MIKAN about data science or about developer.."
              className="w-full bg-slate-900/60 border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-slate-200 h-32 transition-all mb-1"
            />

            <div className="flex flex-wrap gap-2 mb-5">
              {SUGGESTIONS.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setInput(item.query)
                    setQueryID(item.id)
                  }}
                  disabled={isLoading}
                  className="text-s bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-full border border-white/10 transition-all disabled:opacity-50"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:bg-slate-700 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(249,115,22,0.25)]"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Sparkles size={20} />
                </motion.div>
              ) : "Talk with MIKAN"}
            </motion.button>

            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-6 bg-slate-900/70 backdrop-blur-sm rounded-2xl border border-white/10 shadow-inner relative overflow-hidden"
              >
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-mono tracking-tighter uppercase">
                    MIKAN Intelligence Output
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Latency: {time}s
                  </span>
                </div>

                <div className="prose prose-invert prose-sm max-w-none
      prose-p:leading-relaxed prose-p:text-slate-300
      prose-strong:text-orange-400 prose-strong:font-bold
      prose-ul:list-disc prose-li:marker:text-orange-500">

                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {result}
                  </ReactMarkdown>

                </div>

                {/* ตกแต่งด้วยแสงไฟมุมกล่อง (Decoration) */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-orange-500/10 blur-3xl rounded-full" />
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* --- Section 3: Portfolio (Responsive Grid) --- */}
        <section className="py-20 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-12"
          >
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <a href="/portfolio" className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition">
              View All &rarr;
            </a>
          </motion.div>
          <motion.div
            variants={staggerGrid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {projects.slice(0, 6).map((project) => (
              <motion.div
                key={project.id}
                variants={gridItem}
                whileHover={{ y: -8 }}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 border border-white/10 hover:border-orange-400/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={project.image} alt={project.title} className="object-contain w-full h-full group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs bg-white/5 px-3 py-1 rounded-full border border-white/10">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* --- Section 4: Contact Form --- */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="py-20 bg-gradient-to-t from-black/60 to-slate-900/40 backdrop-blur-sm rounded-3xl border border-white/10 px-6 md:px-12"
          id='contact'
        >
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Get In Touch</h2>
            <p className="text-slate-400 mb-10 text-center">Interested in discussing a project or just want to say hello?</p>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                <input type="text" id="name" className="w-full bg-slate-900/50 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-orange-400 transition" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input type="email" id="email" className="w-full bg-slate-900/50 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-orange-400 transition" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                <textarea id="message" className="w-full bg-slate-900/50 border border-white/10 p-4 rounded-lg h-40 focus:outline-none focus:border-orange-400 transition" placeholder="Write your message..."></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-orange-500 text-black py-4 rounded-lg font-bold hover:bg-orange-400 transition text-lg shadow-[0_0_25px_rgba(249,115,22,0.3)]"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

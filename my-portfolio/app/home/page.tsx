// app/page.tsx
'use client'; // จำเป็นสำหรับ use-state

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { askAI } from './actions';
import aiFunction from '../lib/langchain'
import { Mail, FileText, Brain, Sparkles, GitFork } from 'lucide-react';

const projects = [
  { id: 1, title: 'CPE SWU line chatbot', tags: ['Python', 'Line Developer'], image: '../image/home/SWUChatBot.jpg' },
  { id: 2, title: 'Agentic AI for microsegmentation', tags: ['Python', 'Wazuh', 'Langchain'], image: '../image/home/wazuh.jpg' },
  { id: 3, title: 'AI Chatbot for marketplace', tags: ['Python', 'Langchain', 'Next.js', 'Web application'], image: '../image/home/AIChatbotForMarketplace.png' },
  { id: 4, title: 'Q&A Chatbot for meeting resolution', tags: ['NextJS', 'Python', 'Uvicorn', 'Web application', 'n8n'], image: '../image/home/QAChatbotForMeetingResolution.png' },
  { id: 5, title: 'WalkFromHome', tags: ['Flutter', 'Mobile Application'], image: '#' },
  { id: 6, title: 'ChickChat', tags: ['JavaScript', 'php', 'Web Application'], image: '../image/home/ChickChat.png' },
  { id: 7, title: 'HypnoCare', tags: ['Mobile Application', 'Flutter'], image: '../image/home/HypnoCare_logo.png' },
];

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [time, setTime] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    const startTime = performance.now();
    setIsLoading(true);
    setResult('Thinking...');

    try {
      const aiResponse = await aiFunction(input);
      setResult(aiResponse);
    } catch (error) {
      console.error(error);
    } finally {
      const endTime = performance.now();

      const durationInSeconds = ((endTime - startTime) / 1000).toFixed(2);

      setTime(durationInSeconds)
      setIsLoading(false);
    }
  };

  const handleHireMe = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans">
      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">

        {/* --- Section 1: Hero (Responsive Layout) --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
          {/* Left Side: Info */}
          <div className="space-y-6">
            <p className="text-slate-400 text-lg">Hello World.</p>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">
              I'm Thunder
            </h1>
            <p className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight text-orange-400">
              Data Scientist
            </p>
            <p className="text-slate-400 max-w-xl text-lg">
              Data Scientist & AI Developer with a strong focus on Agentic AI and Semantic Search. Experienced in building end-to-end AI solutions, from automated chatbots to real-time security segmentation policies. Proven ability to transform complex data into actionable business insights during internship at PTT Digital Solution
            </p>
            {/* Social Icons (แบบ responsive) */}
            <div className="flex gap-4 text-slate-500 pt-2">
              <a href="#" className="hover:text-white transition"></a>
              <a href="https://github.com/KaminariSora" target='https://github.com/KaminariSora' className="hover:text-white transition"><GitFork size={24} /></a>
              <a href="#" className="hover:text-white transition"><Mail size={24} /></a>
            </div>
            {/* Buttons (Responsive) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="bg-orange-500 text-black px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition w-full sm:w-auto"
                onClick={handleHireMe}>
                Hire Me
              </button>
              <a className="border border-slate-700 px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2 w-full sm:w-auto"
                href='/Nonthacha_Huanchitt_resume.pdf'
                download="Nonthacha_Huanchitt_Resume.pdf">
                <FileText size={20} /> Download Resume
              </a>
            </div>
          </div>

          {/* Right Side: Profile Image (Responsive) */}
          <div className="relative aspect-square md:aspect-auto w-full max-w-lg mx-auto md:w-full">
            <div className="absolute inset-0 bg-slate-800 rounded-full scale-95 opacity-50 shadow-[0_0_30px_rgba(255,165,0,0.2)]"></div>
            <img
              src="../image/Profile.jpg"
              alt="Profile"
              width={500}
              height={500}
              className="rounded-full relative object-cover w-full h-full p-4"
            />
          </div>
        </section>

        {/* --- Section 2: AI Feature Showcase --- */}
        <section className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="text-orange-400" size={32} />
            <h2 className="text-2xl font-bold text-white">AI Data Analyst Proxy</h2>
          </div>

          <div className="space-y-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about my developer..."
              className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-slate-200 h-32 transition-all"
            />

            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-700 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Sparkles size={20} />
                </motion.div>
              ) : "Invoke Gemini AI"}
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-slate-900 rounded-xl border-l-4 border-orange-500 text-slate-300 leading-relaxed"
              >
                <p className="text-xs text-orange-500 font-mono mb-2 uppercase tracking-widest">Response:</p>
                {result}
                <p className="text-xs text-gray-500 font-mono mt-2 tracking-widest">Though for: {time} s</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* --- Section 3: Portfolio (Responsive Grid) --- */}
        <section className="py-20 mb-32">
          <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <div key={project.id} className="group bg-slate-800 rounded-2xl overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 border border-slate-700 hover:border-orange-400/50">
                <div className="h-48 relative overflow-hidden">
                  <img src={project.image} alt={project.title} className="object-contain w-full h-full group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs bg-slate-700 px-3 py-1 rounded-full border border-slate-600">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Section 4: Contact Form --- */}
        <section className="py-20 bg-gradient-to-t from-black to-slate-900 rounded-3xl border border-slate-800 px-6 md:px-12" id='contact'>
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Get In Touch</h2>
            <p className="text-slate-400 mb-10 text-center">Interested in discussing a project or just want to say hello?</p>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                <input type="text" id="name" className="w-full bg-slate-800 border border-slate-700 p-4 rounded-lg focus:outline-none focus:border-orange-400 transition" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input type="email" id="email" className="w-full bg-slate-800 border border-slate-700 p-4 rounded-lg focus:outline-none focus:border-orange-400 transition" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                <textarea id="message" className="w-full bg-slate-800 border border-slate-700 p-4 rounded-lg h-40 focus:outline-none focus:border-orange-400 transition" placeholder="Write your message..."></textarea>
              </div>
              <button className="w-full bg-orange-500 text-black py-4 rounded-lg font-bold hover:bg-orange-600 transition text-lg">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
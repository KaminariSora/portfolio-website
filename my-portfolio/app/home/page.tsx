// app/page.tsx
'use client'; // จำเป็นสำหรับ use-state

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import aiFunction from '../lib/langchain'
import { Mail, FileText, Brain, Sparkles, GitFork } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const projects = [
  { id: 1, title: 'CPE SWU line chatbot', tags: ['Python', 'Line Developer'], image: '../image/home/SWUChatBot.jpg' },
  { id: 2, title: 'Agentic AI for microsegmentation', tags: ['Python', 'Wazuh', 'Langchain'], image: '../image/home/wazuh.jpg' },
  { id: 3, title: 'AI Chatbot for marketplace', tags: ['Python', 'Langchain', 'Next.js', 'Web application'], image: '../image/home/AIChatbotForMarketplace.png' },
  { id: 4, title: 'Q&A Chatbot for meeting resolution', tags: ['NextJS', 'Python', 'Uvicorn', 'Web application', 'n8n'], image: '../image/home/QAChatbotForMeetingResolution.png' },
  { id: 5, title: 'WalkFromHome', tags: ['Flutter', 'Mobile Application'], image: '#' },
  { id: 6, title: 'ChickChat', tags: ['JavaScript', 'php', 'Web Application'], image: '../image/home/ChickChat.png' },
  { id: 7, title: 'HypnoCare', tags: ['Mobile Application', 'Flutter'], image: '../image/home/HypnoCare_logo.png' },
];

const SUGGESTIONS = [
  { id: 1, label: "🛠️ About skills", query: "What programming language and tools are you proficient in?" },
  { id: 2, label: "🎓 About experience", query: "Share your internship experience." },
  { id: 3, label: "🚀 About projects", query: "What AI or Data Science project are you most proud of?" },
  { id: 4, label: "💡 About motivation", query: "Why do I like in AI?" },
];

const STATIC_RESPONSES: Record<number, string> = {
  1: "ทักษะของคุณมนุษย์มีทั้ง Python, Next.js และการทำ RAG ที่ล้ำสุดๆ เลยเจ้าค่ะ! 💕",
  2: "ประสบการณ์ฝึกงาน 6 เดือนที่ PTT Digital ทำให้คุณมนุษย์เก่งเรื่อง Data Science มากๆ เลยน๊าา ✨",
  3: "(ยืดอกอย่างภูมิใจ) คุณมนุษย์ชื่นชอบโปรเจค Q&A Chatbot for meeting resolution มากที่สุดเลยค่ะ โปรเจคนี้เกี่ยวกับแชทบอทที่สรุปเนื้อหาการประชุมให้คุณมนุษย์ และนอกจากนี้ผู้สร้างของลูน่ากำไลังอยู่ในช่วงพัฒนา Project LUNA ให้เก่งยิ่งขึ้นไปอีกด้วย ผู้สร้างของลูน่าเก่งสุดๆไปเลยใช่ไหมคะ 💕",
  4: "คุณมนุษย์ชอบ AI เพราะมันช่วยสร้าง Impact และเปลี่ยนโลกด้วยข้อมูลได้ยังไงล่ะคะ! 🚀",
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
      setResult("รบกวนคุณมนุษย์ใส่คำถามก่อนนะคะ ✨");
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
      // -------------------------------------------------------

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
              <button onClick={handleContactMove} className="hover:text-white transition"><Mail size={24} /></button>
            </div>
            {/* Buttons (Responsive) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="bg-orange-500 text-black px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition w-full sm:w-auto"
                onClick={handleContactMove}>
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
            <h2 className="text-2xl font-bold text-white">AI Data Analyst Proxy by LUNA</h2>
          </div>

          <div className="space-y-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask LUNA about data science or about developer.."
              className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-slate-200 h-32 transition-all mb-1"
            />

            <div className="flex flex-wrap gap-2 mb-5">
              {SUGGESTIONS.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(item.query)
                    setQueryID(item.id)
                  }}
                  disabled={isLoading}
                  className="text-s bg-slate-700/50 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full border border-slate-600 transition-all active:scale-95 disabled:opacity-50"
                >
                  {item.label}
                </button>
              ))}
            </div>

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
              ) : "Talk with Luna"}
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-6 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-inner relative overflow-hidden"
              >
                {/* หัวข้อ Response เก๋ๆ */}
                <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                  <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-mono tracking-tighter uppercase">
                    Luna Intelligence Output
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Latency: {time}s
                  </span>
                </div>

                {/* ส่วนของการจัดรูปแบบ Markdown */}
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
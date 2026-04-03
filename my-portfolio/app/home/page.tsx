// app/page.tsx
'use client'; // จำเป็นสำหรับ use-state

import React, { useState } from 'react';
import Image from 'next/image'; // สำหรับ optimize รูปภาพ
import { Mail, FileText, Brain } from 'lucide-react';

// ตัวอย่างข้อมูลโปรเจกต์
const projects = [
  { id: 1, title: 'AI Sentiment Analyzer', tags: ['Python', 'NLTK', 'Next.js'], image: 'https://via.placeholder.com/300x180.png?text=Sentiment+AI' },
  { id: 2, title: 'Customer Churn Prediction', tags: ['Python', 'Scikit-learn', 'SQL'], image: 'https://via.placeholder.com/300x180.png?text=Churn+Prediction' },
  { id: 3, title: 'Real-time Object Detection', tags: ['YOLOv8', 'Python', 'OpenCV'], image: 'https://via.placeholder.com/300x180.png?text=Object+Detection' },
];

export default function Home() {
  const [aiInput, setAiInput] = useState<string>('');
  const [aiResult, setAiResult] = useState<string | null>(null);

  // ฟังก์ชันจำลอง AI สำหรับ Data Science Showcase
  const analyzeSentiment = () => {
    if (!aiInput.trim()) {
      setAiResult('โปรดพิมพ์ข้อความภาษาอังกฤษ...');
      return;
    }
    const positiveWords = ['good', 'great', 'awesome', 'excellent', 'happy', 'love'];
    const negativeWords = ['bad', 'horrible', 'awful', 'sad', 'hate', 'worse'];
    let score = 0;
    const words = aiInput.toLowerCase().split(' ');
    words.forEach(word => {
      if (positiveWords.includes(word)) score++;
      if (negativeWords.includes(word)) score--;
    });
    setAiResult(score > 0 ? 'Positive 👍' : score < 0 ? 'Negative 👎' : 'Neutral 😐');
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
                <a href="#" className="hover:text-white transition"></a>
                <a href="#" className="hover:text-white transition"><Mail size={24}/></a>
            </div>
            {/* Buttons (Responsive) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="bg-orange-500 text-black px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition w-full sm:w-auto">
                Hire Me
              </button>
              <button className="border border-slate-700 px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2 w-full sm:w-auto">
                <FileText size={20} /> Download CV
              </button>
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
        <section className="py-20 bg-slate-800/50 rounded-3xl mb-32 border border-slate-800 px-6 md:px-12">
            <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Brain className="text-orange-400" size={36}/> <span className="text-orange-400">AI</span> Insights Showcase
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-center">
                This simple Sentiment Analysis demonstration showcases a basic machine learning principle. In my professional work, I deploy complex models (e.g., LLMs, Deep Learning) to solve real-world problems.
            </p>
            <div className="max-w-4xl mx-auto bg-slate-900 p-8 rounded-2xl border border-slate-700 shadow-xl">
                <p className="text-sm text-orange-400 mb-2 font-mono">// Simulate a basic Sentiment Analysis model</p>
                <input 
                  type="text" 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Type a phrase in English (e.g., 'I love this product')..."
                  className="w-full bg-slate-800 border border-slate-600 p-4 rounded-lg focus:outline-none focus:border-orange-400 transition"
                />
                <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <button 
                    onClick={analyzeSentiment}
                    className="bg-orange-500 text-black px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition w-full sm:w-auto">
                    Analyze with AI
                  </button>
                  {aiResult && (
                      <div className="font-mono text-xl py-3 px-6 bg-slate-800 rounded-lg w-full sm:w-auto text-center">
                          <span className="text-slate-500">Result:</span> <span className="text-orange-300 font-bold">{aiResult}</span>
                      </div>
                  )}
                </div>
            </div>
        </section>

        {/* --- Section 3: Portfolio (Responsive Grid) --- */}
        <section className="py-20 mb-32">
          <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <div key={project.id} className="group bg-slate-800 rounded-2xl overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 border border-slate-700 hover:border-orange-400/50">
                <div className="h-48 relative overflow-hidden">
                   <img src={project.image} alt={project.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
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
        <section className="py-20 bg-gradient-to-t from-black to-slate-900 rounded-3xl border border-slate-800 px-6 md:px-12">
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
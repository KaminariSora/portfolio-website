import { Code, Brain, BarChart, Database, Zap, Award, LucideIcon } from "lucide-react";

export const personalInfo = {
    displayName: "Thunder",
    fullName: "Nonthacha Huanchitt",
    role: "Data Scientist",
    greeting: "Hello World.",
    tagline: "Data Scientist & AI Developer with a strong focus on Agentic AI and Semantic Search. Experienced in building end-to-end AI solutions, from automated chatbots to real-time security segmentation policies. Proven ability to transform complex data into actionable business insights during internship at PTT Digital Solution",
    email: "nonthacha.h@gmail.com",
    github: "https://github.com/KaminariSora",
    profileImage: "/image/Profile.jpg",
    aboutImage: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
    resume: {
        file: "/Nonthacha_Huanchitt_resume.pdf",
        downloadName: "Nonthacha_Huanchitt_Resume.pdf",
    },
};

export const bio = {
    general: "I am a graduating Data Scientist with a focus on AI Agents and RAG.",
    experience: "Recently completed a 6-month internship at PTT Digital Solutions as a Data Scientist & Developer.",
    skillsSummary: "Proficient in Python, Next.js, LangChain, and Vector Databases like MongoDB/ChromaDB.",
    projectsSummary: `
        - CPE SWU line chatbot: Developed a chatbot on LINE platform for CPE SWU to assist users with automated responses and information retrieval, Designed conversational flows to handle common queries and improve user interaction experience
        - Agentic AI for microsegmentation: Designed and implemented intelligent agents using langchain and wazuh to analyze network traffic patterns and automate security policies. Improved system security posture by integrating AI-driven real-time decision-making.
        - AI agent for searching art works: Developed a semantic search system using Vector Databases and LLMs to enable natural language queries. Enhanced user exploration experience through advanced text-to-image metadata matching.`,
    reason: "I'm interested in Data and AI because it allows me to turn data into intelligent solutions. I enjoy solving problems and building systems that can create real impact for users.",
    story: [
        "My journey in Data Science is driven by one belief — data alone has no value unless it creates impact.",
        "I have developed my skills from data analysis to AI and intelligent systems, focusing on solving real-world problems through technology.",
        "Each project I build is not just about models, but about delivering meaningful and usable solutions.",
        "I am committed to continuous learning and pushing my limits to become a better AI and Data professional.",
    ],
};

export interface Project {
    id: number;
    title: string;
    tags: string[];
    image: string;
    description?: string;
}

export const projects: Project[] = [
    {
        id: 0,
        title: 'BreastFeedingModel',
        tags: ['Python', 'Flutter', 'Mobile Developer'],
        image: '/image/home/BreastFeedingModel.jpg',
        description: 'An AI system that helps breastfeeding mothers check nursing posture in real time, using a YOLOv8-pose + RandomForest pipeline with a custom 8-keypoint schema for mother and infant, plus real-time skeleton visualization.',
    },
    {
        id: 1,
        title: 'CPE SWU line chatbot',
        tags: ['Python', 'Line Developer'],
        image: '/image/home/SWUChatBot.jpg',
        description: 'Developed a chatbot on LINE platform for CPE SWU to assist users with automated responses and information retrieval, designed conversational flows to handle common queries and improve user interaction experience.',
    },
    {
        id: 2,
        title: 'Agentic AI for microsegmentation',
        tags: ['Python', 'Wazuh', 'Langchain'],
        image: '/image/home/wazuh.jpg',
        description: 'Designed and implemented intelligent agents using LangChain and Wazuh to analyze network traffic patterns and automate security policies. Improved system security posture by integrating AI-driven real-time decision-making.',
    },
    {
        id: 3,
        title: 'AI Chatbot for marketplace',
        tags: ['Python', 'Langchain', 'Next.js', 'Web application'],
        image: '/image/home/AIChatbotForMarketplace.png',
        description: "Most buyers don't remember an artist's name — they remember an image in their head. This chatbot searches by that mental image instead of by title, helping even undiscovered artists' work get found on merit, not fame."
    },
    {
        id: 4,
        title: 'Q&A Chatbot for meeting resolution',
        tags: ['NextJS', 'Python', 'Uvicorn', 'Web application', 'n8n'],
        image: '/image/home/QAChatbotForMeetingResolution.png',
        description: 'An AI chatbot that turns scattered meeting documents into a searchable knowledge base — cutting information retrieval time from ~30 minutes to 1–2 minutes and helping new employees grasp past meeting context instantly.'
    },
    {
        id: 5,
        title: 'WalkFromHome',
        tags: ['Flutter', 'Mobile Application'],
        image: '/image/home/WalkFromHome.png',
        description: 'A health app that helps post-COVID patients monitor recovery by tracking heart rate and breathlessness during walking exercises.'
    },
    {
        id: 6,
        title: 'ChickChat',
        tags: ['JavaScript', 'php', 'Web Application'],
        image: '/image/home/ChickChat.png',
        description: 'An online platform where anyone can chat and express themselves through a fun, anonymous new identity — a chicken avatar.'
    },
    {
        id: 7,
        title: 'HypnoCare',
        tags: ['Mobile Application', 'Flutter'],
        image: '/image/home/HypnoCare_logo.png',
        description: 'A health app that helps users manage food and sodium intake to prevent and control high blood pressure.'
    },
];

export interface Skill {
    name: string;
    icon: LucideIcon;
    level: string;
}

export const skills: Skill[] = [
    { name: 'Python', icon: Code, level: "GOOD" },
    { name: 'Machine Learning', icon: Brain, level: "MEDIUM" },
    { name: 'Data Visualisation', icon: BarChart, level: "MEDIUM" },
    { name: 'Supabase', icon: Database, level: "MEDIUM" },
    { name: 'Cloud (AWS/GCP)', icon: Zap, level: "BEGINNER" },
    { name: 'TensorFlow/PyTorch', icon: Award, level: "MEDIUM" },
];

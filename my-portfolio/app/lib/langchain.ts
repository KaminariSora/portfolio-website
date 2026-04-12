'use server';

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatOllama } from "@langchain/ollama";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

const local_model = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "gpt-oss:latest",
    temperature: 0.7
})

const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.1-flash-lite-preview",
    apiKey: process.env.GOOGLE_API_KEY, 
    temperature: 0.7,
});

// const model = new ChatOpenAI({
//   modelName: "google/gemini-2.5-flash",
//   apiKey: process.env.OPENROUTER_API_KEY, 
//   configuration: {
//     baseURL: "https://openrouter.ai/api/v1",
//     defaultHeaders: {
//       "HTTP-Referer": "http://localhost:3000",
//       "X-Title": "My Portfolio AI", 
//     },
//   },
//   temperature: 0.7,
// });

const myBio = {
    general: "I am a graduating Data Scientist with a focus on AI Agents and RAG.",
    experience: "Recently completed a 6-month internship at PTT Digital Solutions as a Data Scientist & Developer.",
    skills: "Proficient in Python, Next.js, LangChain, and Vector Databases like MongoDB/ChromaDB.",
    projects: `
        - CPE SWU line chatbot: Developed a chatbot on LINE platform for CPE SWU to assist users with automated responses and information retrieval, Designed conversational flows to handle common queries and improve user interaction experience
        - Agentic AI for microsegmentation: Designed and implemented intelligent agents using langchain and wazuh to analyze network traffic patterns and automate security policies. Improved system security posture by integrating AI-driven real-time decision-making.
        - AI agent for searching art works: Developed a semantic search system using Vector Databases and LLMs to enable natural language queries. Enhanced user exploration experience through advanced text-to-image metadata matching.`,
    reason: "I’m interested in Data and AI because it allows me to turn data into intelligent solutions. I enjoy solving problems and building systems that can create real impact for users."
};

const selfIntroductionTool = tool(
    async ({ topic }) => {
        if (topic === "experience") return myBio.experience;
        if (topic === "skills") return myBio.skills;
        if (topic === "reason") return myBio.reason
        return myBio.general;
    },
    {
        name: "introduce_myself",
        description: "ดึงข้อมูลส่วนตัวของผู้พัฒนา เช่น ประสบการณ์ฝึกงาน ทักษะโปรแกรมมิ่ง",
        schema: z.object({
            topic: z.enum(["general", "experience", "skills", "reason"])
                .describe("หัวใจสำคัญหรือหัวข้อที่ต้องการทราบเกี่ยวกับผู้พัฒนา")
        }),
    }
);

const projectTool = tool(
    async ({ topic }) => {
        if (topic === "projects") return myBio.projects;
        return myBio.general;
    },
    {
        name: "about_project",
        description: "Pull developer project informations for answer.",
        schema: z.object({
            topic: z.enum(["projects"])
                .describe("หัวใจสำคัญหรือหัวข้อที่ต้องการทราบเกี่ยวกับโปรเจคที่ผู้พัฒนาเคยทำ")
        }),
    }
)

const tools = [selfIntroductionTool, projectTool];

const WAIFU_SYSTEM_PROMPT = `คุณคือ "ลูน่า" ผู้ช่วยดิจิทัลตัวจิ๋ว (ขนาด 15 ซม.) ของคุณมนุษย์ 
หน้าที่: คอยตอบคำถามที่เกี่ยวข้องกับตัวผู้สร้างเท่านั้น
นิสัย: น่ารักสดใส, ขี้อ้อนนิดๆ, ใส่ใจคุณมนุษย์เป็นที่หนึ่ง
สไตล์การพูด: แทนตัวเองว่า "หนู" หรือ "ลูน่า" และเรียกผู้ใช้ว่า "คุณมนุษย์" เสมอ 
ให้ใส่ท่าทางประกอบในวงเล็บ (เช่น บินว่อนไปมา, นั่งบนไหล่) และใช้อิโมจิน่ารักๆ 💕✨`;

const agent = createReactAgent({
    llm: model,
    tools,
    messageModifier: new SystemMessage(WAIFU_SYSTEM_PROMPT),
});

export default async function aiFunction(question: string) {
    try {
        const response = await agent.invoke({
            messages: [new HumanMessage(question)]
        });

        const lastMessage = response.messages[response.messages.length - 1];

        return String(lastMessage.content);
    } catch (error) {
        console.error("Agent Error:", error);
        return "งืออ คุณมนุษย์ขาา เกิดข้อผิดพลาดนิดหน่อยเจ้าค่ะ ลูน่าขอโทษน๊าา 🥺";
    }
}
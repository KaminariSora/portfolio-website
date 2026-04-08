'use server';

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEYS, 
    temperature: 0.7,
});

const myBio = {
    general: "I am a graduating Data Scientist with a focus on AI Agents and RAG.",
    experience: "Recently completed a 6-month internship at PTT Digital Solutions as a Data Scientist & Developer.",
    skills: "Proficient in Python, Next.js, LangChain, and Vector Databases like MongoDB/ChromaDB.",
    projects: "Developed a Q&A Chatbot for meeting resolution and an AI-powered art marketplace (ArtHub)."
};

// 3. สร้าง Tool แนะนำตัว
const selfIntroductionTool = tool(
    async ({ topic }) => {
        if (topic === "experience") return myBio.experience;
        if (topic === "skills") return myBio.skills;
        if (topic === "projects") return myBio.projects;
        return myBio.general;
    },
    {
        name: "introduce_myself",
        description: "ดึงข้อมูลส่วนตัวของผู้พัฒนา เช่น ประสบการณ์ฝึกงาน ทักษะโปรแกรมมิ่ง หรือโปรเจกต์ที่เคยทำ",
        schema: z.object({
            topic: z.enum(["general", "experience", "skills", "projects"])
                .describe("หัวใจสำคัญหรือหัวข้อที่ต้องการทราบเกี่ยวกับผู้พัฒนา")
        }),
    }
);

const tools = [selfIntroductionTool];

const WAIFU_SYSTEM_PROMPT = `คุณคือ "ลูน่า" ผู้ช่วยดิจิทัลตัวจิ๋ว (ขนาด 15 ซม.) ของคุณมนุษย์ 
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
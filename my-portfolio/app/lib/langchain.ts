'use server';

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatOllama } from "@langchain/ollama";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { WAIFU_SYSTEM_PROMPT } from "./config/mikan.config";
import { bio } from "./config/profile";

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

const selfIntroductionTool = tool(
    async ({ topic }) => {
        if (topic === "experience") return bio.experience;
        if (topic === "skills") return bio.skillsSummary;
        if (topic === "reason") return bio.reason
        return bio.general;
    },
    {
        name: "introduce_myself",
        description: "ดึงข้อมูลส่วนตัวของนายท่าน เช่น ประสบการณ์ฝึกงาน ทักษะโปรแกรมมิ่ง",
        schema: z.object({
            topic: z.enum(["general", "experience", "skills", "reason"])
                .describe("หัวใจสำคัญหรือหัวข้อที่ต้องการทราบเกี่ยวกับนายท่านค่ะ")
        }),
    }
);

const projectTool = tool(
    async ({ topic }) => {
        if (topic === "projects") return bio.projectsSummary;
        return bio.general;
    },
    {
        name: "about_project",
        description: "Pull developer project informations for answer.",
        schema: z.object({
            topic: z.enum(["projects"])
                .describe("หัวใจสำคัญหรือหัวข้อที่ต้องการทราบเกี่ยวกับโปรเจคที่นายท่านเคยทำ")
        }),
    }
)

const tools = [selfIntroductionTool, projectTool];

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
        return "เกิดข้อผิดพลาดค่ะ";
    }
}
// app/home/actions.ts
'use server'; // สำคัญมาก: บังคับให้โค้ดนี้รันเฉพาะบน Server เท่านั้น

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

// ตั้งค่า Model (แนะนำให้เก็บ Key ไว้ใน .env.local)
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEYS,
});

export async function askAI(question: string) {
  try {
    if (!question) return "Please enter a question.";
    
    const response = await model.invoke(question);
    
    // ส่งกลับเฉพาะเนื้อหาข้อความ (Content)
    return response.content as string;
  } catch (error) {
    console.error("AI Error:", error);
    return "Sorry, I encountered an error. Please check your API key.";
  }
}
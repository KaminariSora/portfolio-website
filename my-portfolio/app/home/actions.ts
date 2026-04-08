// app/home/actions.ts
'use server';

import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

dotenv.config({ path: '.env.local' });

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEYS,
  temperature: 0.7
});

export async function askAI(question: string) {
  try {
    if (!question) return "Please enter a question.";

    const response = await model.invoke(question);

    return response.content as string;
  } catch (error) {
    console.error("AI Error:", error);
    return "Sorry, I encountered an error. Please check your API key.";
  }
}
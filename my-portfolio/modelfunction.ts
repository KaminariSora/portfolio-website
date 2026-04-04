import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEYS
});

async function runTest() {
  try {
    console.log("กำลังถาม Gemini...");
    const response = await model.invoke("Why do parrots talk?");
    console.log("-------------------");
    console.log(response.content);
    console.log("-------------------");
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
  }
}

runTest();
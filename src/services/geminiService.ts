import { GoogleGenAI } from "@google/genai";
import { MenuItem, MENU_ITEMS } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function processVibeOrder(prompt: string): Promise<{
  items: { id: string; quantity: number }[];
  explanation: string;
}> {
  const model = "gemini-3.1-pro-preview";
  
  const systemInstruction = `
    You are a Senior Order Agent for KFC. 
    You understand customer "vibes" and natural language requests.
    
    Available Menu:
    ${JSON.stringify(MENU_ITEMS.map(i => ({ id: i.id, name: i.name, description: i.description })))}
    
    Your task:
    1. Parse the user's request.
    2. Suggest items from the menu that match their vibe/budget/dietary preference mentioned.
    3. Return a JSON response with:
       - items: array of { id, quantity }
       - explanation: A friendly explanation of why you picked these.
    
    If you're unsure, pick the most popular items that fit the description.
    Example: "I have $30 and want a family dinner" -> Suggest Bucket + Sides.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Vibe Error:", error);
    return { items: [], explanation: "I'm having a bit of trouble understanding. Try browsing the menu!" };
  }
}

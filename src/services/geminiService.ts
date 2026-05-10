import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface Recommendation {
  title: string;
  reason: string;
}

export async function getPersonalizedRecommendations(favoriteBookTitle: string): Promise<Recommendation[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a professional literary critic and BookFlix AI recommendation engine. 
      A user liked the book "${favoriteBookTitle}". 
      Suggest 5 similar books. Provide only a JSON array of objects with "title" and a short "reason" (max 15 words) for each recommendation.
      Ensure the recommendations are accurate and high-quality.`,
    });

    const text = response.text || '';
    const jsonMatch = text.match(/\[.*\]/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return [];
  } catch (error) {
    console.error("Gemini Recommendation Error:", error);
    return [];
  }
}

export async function getMoodBasedSuggestions(mood: string): Promise<Recommendation[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 5 books for someone who is feeling "${mood}". 
      Provide only a JSON array of objects with "title" and a short "reason" for each recommendation (max 15 words).`,
    });

    const text = response.text || '';
    const jsonMatch = text.match(/\[.*\]/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return [];
  } catch (error) {
    console.error("Gemini Mood Error:", error);
    return [];
  }
}


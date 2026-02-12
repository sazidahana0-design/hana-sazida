
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const getCarAppraisal = async (details: string): Promise<string> => {
  if (!API_KEY) return "AI services are currently unavailable. Please use our manual quote form.";
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert car salvage valuer for "Salvage Car Centre". 
      A customer wants a rough quote for their car. 
      Details provided: ${details}. 
      Give a friendly, professional response estimating a price range (be realistic for salvage/wrecking prices in AUD) 
      and explain what factors might increase or decrease this value. Keep it under 150 words.`,
    });
    return response.text || "I couldn't generate a quote right now. Please call us for a faster appraisal.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong with our AI valuer. Please contact our support team directly.";
  }
};

export const chatWithAssistant = async (history: { role: 'user' | 'model', text: string }[], newMessage: string): Promise<string> => {
  if (!API_KEY) return "Chat is unavailable.";

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'You are the helpful assistant for Salvage Car Centre. You help people sell their cars (junk, damaged, or used). You explain our process: 1. Instant Quote, 2. Free Towing, 3. Cash on the Spot. Be professional and encouraging.',
    }
  });

  // Since we use the SDK chats, we could loop history if we wanted, but for brevity:
  const response = await chat.sendMessage({ message: newMessage });
  return response.text || "I'm sorry, I didn't catch that.";
};

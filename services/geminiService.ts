
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getSmartSuggestions = async (jobTitle: string): Promise<string[]> => {
  if (!API_KEY) return ["API Key not configured. Please set the API_KEY environment variable."];
  try {
    const prompt = `Generate 5 concise, impactful resume bullet points for a ${jobTitle}. Focus on achievements and metrics.`;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    suggestions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    }
                }
            }
        }
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result.suggestions || [];
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return ["Failed to get AI suggestions. Please try again."];
  }
};

export const analyzeJobDescription = async (jobDescription: string, resumeText: string): Promise<string> => {
    if (!API_KEY) return "API Key not configured. Please set the API_KEY environment variable.";
    try {
        const prompt = `
        Analyze the following job description and resume content.
        Identify key skills and keywords missing from the resume that are present in the job description.
        Provide a brief analysis and a list of recommended keywords to add.

        Job Description:
        ---
        ${jobDescription}
        ---

        Resume Content:
        ---
        ${resumeText}
        ---

        Provide your analysis in a concise summary.
        `;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error analyzing job description:", error);
        return "Failed to analyze the job description. Please try again.";
    }
};

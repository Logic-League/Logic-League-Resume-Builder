import { GoogleGenAI, Type } from "@google/genai";

let ai: GoogleGenAI | null = null;
let currentApiKey: string | null = null;

function getAiClient(apiKey: string): GoogleGenAI | null {
  if (ai && currentApiKey === apiKey) {
    return ai;
  }
  
  if (!apiKey) {
    console.warn("API Key is missing. AI features will be disabled.");
    ai = null;
    currentApiKey = null;
    return null;
  }

  try {
    ai = new GoogleGenAI({ apiKey: apiKey });
    currentApiKey = apiKey;
    return ai;
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
    ai = null;
    currentApiKey = null;
    return null;
  }
}

export const getSmartSuggestions = async (jobTitle: string, apiKey: string): Promise<string[]> => {
  const localAi = getAiClient(apiKey);
  if (!localAi) return ["API Key not configured or invalid. Please set your key."];
  try {
    const prompt = `Generate 5 concise, impactful resume bullet points for a ${jobTitle}. Focus on achievements and metrics.`;
    const response = await localAi.models.generateContent({
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
    return ["Failed to get AI suggestions. Please check your API key or try again."];
  }
};

export const analyzeJobDescription = async (jobDescription: string, resumeText: string, apiKey: string): Promise<string> => {
    const localAi = getAiClient(apiKey);
    if (!localAi) return "API Key not configured or invalid. Please set your key.";
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
        const response = await localAi.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error analyzing job description:", error);
        return "Failed to analyze the job description. Please check your API key or try again.";
    }
};
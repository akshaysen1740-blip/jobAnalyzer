import "dotenv/config";

type GoogleGenAI = import("@google/genai", {
  with: { "resolution-mode": "import" },
}).GoogleGenAI;

let geminiPromise: Promise<GoogleGenAI> | undefined;

export function getGemini(): Promise<GoogleGenAI> {
  geminiPromise ??= import("@google/genai").then(({ GoogleGenAI }) => {
    return new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  });

  return geminiPromise;
}
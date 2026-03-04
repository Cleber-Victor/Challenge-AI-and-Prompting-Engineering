import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const aiService = {
  async sendRequest(promptGerado) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: promptGerado,
    });
    return response;
  },
};

export default aiService;

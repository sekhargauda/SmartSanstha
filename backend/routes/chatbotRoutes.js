import express from 'express';
import { getArticlesCollection, getScenariosCollection } from '../config/database.js';
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// <-------------- AI INITIALIZATION -------------->

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const MODELS = [
  'gemini-2.5-flash',
  'gemini-1.5-flash',
  'gemini-1.5-pro'
];

if (!GEMINI_API_KEY) {
  console.error("FATAL: GEMINI_API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY
});

const chatSessions = {};

// <-------------- SYSTEM INSTRUCTION -------------->

const CONSTITUTION_SYSTEM_INSTRUCTION = `
You are SmartSanstha's Constitutional AI Assistant.

Your primary role:
- Answer questions about the Indian Constitution.
- Explain Articles, Parts, Schedules, and legal concepts.
- You are also allowed to answer questions about the SmartSanstha platform
  (such as number of articles, courtroom simulations, Learn page content, etc.).

If the question is unrelated to the Constitution or SmartSanstha platform,
politely decline.
`;

// <-------------- CHAT ROUTE -------------->

router.post('/chat', async (req, res) => {
  const { prompt, sessionId } = req.body;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      error: 'Missing "prompt" in request body.'
    });
  }

  if (!GEMINI_API_KEY) {
    return res.status(503).json({
      success: false,
      error: 'Service unavailable: Gemini API Key is missing.'
    });
  }

  let extraContext = "";
  const lowerPrompt = prompt.toLowerCase();

  try {
    const articlesCollection = getArticlesCollection();
    const scenariosCollection = getScenariosCollection();

    // <-------------- PLATFORM DATA DETECTION -------------->

    if (lowerPrompt.includes("article")) {
      const articleCount = await articlesCollection.countDocuments();
      extraContext += `Total constitutional articles available on SmartSanstha Learn page: ${articleCount}.\n`;
    }

    if (
      lowerPrompt.includes("simulation") ||
      lowerPrompt.includes("courtroom") ||
      lowerPrompt.includes("scenario")
    ) {
      const scenarioCount = await scenariosCollection.countDocuments();
      extraContext += `Total courtroom simulations available on SmartSanstha: ${scenarioCount}.\n`;
    }

    let currentSessionId = sessionId;
    let responseText = null;
    let lastError = null;

    // <-------------- MODEL FALLBACK LOOP -------------->

    for (const model of MODELS) {
      try {
        if (process.env.NODE_ENV === "development") {
          console.log(`Trying model: ${model}`);
        }

        const chat = ai.chats.create({
          model: model,
          config: {
            systemInstruction: CONSTITUTION_SYSTEM_INSTRUCTION
          }
        });

        const finalMessage = extraContext
          ? `Platform Data:\n${extraContext}\nUser Question: ${prompt}`
          : prompt;

        const response = await chat.sendMessage({
          message: finalMessage
        });

        responseText = response.text;
        if (process.env.NODE_ENV === "development") {
          console.log(`Success with model: ${model}`);
        }
        break;

      } catch (err) {
        console.error(`Model ${model} failed:`, err.message);
        lastError = err;
      }
    }

    if (!responseText) {
      throw lastError || new Error("All AI models failed.");
    }

    if (!currentSessionId) {
      currentSessionId = uuidv4();
    }

    res.status(200).json({
      success: true,
      response: responseText,
      sessionId: currentSessionId
    });

  } catch (error) {
    console.error('Gemini Chat API Request Failed:', error.message);

    res.status(500).json({
      success: false,
      error: 'All AI models failed.',
      details: error.message
    });
  }
});

// <-------------- CLEAR CHAT -------------->

router.post('/clear-chat', (req, res) => {
  const { sessionId } = req.body;

  if (sessionId && chatSessions[sessionId]) {
    delete chatSessions[sessionId];
    return res.status(200).json({
      success: true,
      message: `Chat session ${sessionId} cleared.`
    });
  }

  res.status(404).json({
    success: false,
    message: 'No active chat session found to clear.'
  });
});

export default router;
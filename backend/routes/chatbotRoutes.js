import express from 'express';
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// -----------------------------------------------------------------
// 1. CHAT API INITIALIZATION & STATE MANAGEMENT
// -----------------------------------------------------------------

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
const modelName = 'gemini-2.5-flash';

if (!GEMINI_API_KEY) {
  console.error("FATAL: GEMINI_API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ 
    apiKey: GEMINI_API_KEY 
});

// In-memory store for chat sessions. 
// Key: sessionId (string) | Value: Chat object from the Gemini SDK
const chatSessions = {}; 

// Define the System Instruction to set the model's persona
const CONSTITUTION_SYSTEM_INSTRUCTION = 
  "You are the 'Constitutional AI Assistant'. Your sole purpose is to answer questions, explain concepts, and provide information exclusively about the Indian Constitution. Be precise, refer to relevant Articles, Parts, or Schedules when possible, and maintain a professional and helpful tone. Do not answer questions outside the scope of the Indian Constitution or general Indian legal framework.";

// -----------------------------------------------------------------
// 2. CHAT ROUTE IMPLEMENTATION
// -----------------------------------------------------------------

router.post('/chat', async (req, res) => {
  const { prompt, sessionId } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ success: false, error: 'Missing "prompt" in request body.' });
  }

  if (!GEMINI_API_KEY) {
     return res.status(503).json({ success: false, error: 'Service unavailable: Gemini API Key is missing.' });
  }

  let currentSessionId = sessionId;
  let chat;

  // 1. Check for existing session or create a new one
  if (currentSessionId && chatSessions[currentSessionId]) {
    // Session exists, use it
    chat = chatSessions[currentSessionId];
  } else {
    // No session ID or session expired/not found, create a new session
    currentSessionId = uuidv4();
    console.log(`Creating new chat session: ${currentSessionId}`);

    // Create a new chat session with the system instruction
    chat = ai.chats.create({
      model: modelName,
      config: {
        systemInstruction: CONSTITUTION_SYSTEM_INSTRUCTION
      }
    });
    
    // Store the new session
    chatSessions[currentSessionId] = chat;
  }
  
  try {
    // 2. Send the new message to the chat session
    const response = await chat.sendMessage({ 
        message: prompt 
    });

    // 3. Extract and Send Response
    const modelResponseText = response.text;

    res.status(200).json({
      success: true,
      response: modelResponseText,
      sessionId: currentSessionId, // Return the ID so the client can send it back next time
    });

  } catch (error) {
    console.error('Gemini Chat API Request Failed:', error.message);
    
    // 4. Error Handling: Consider deleting a session if the API call fails
    delete chatSessions[currentSessionId]; 

    res.status(500).json({
      success: false,
      error: 'An internal error occurred while communicating with the AI model.',
      details: error.message,
    });
  }
});

// Optional: Add a route to explicitly clear the chat history (e.g., a "Start New Chat" button)
router.post('/clear-chat', (req, res) => {
    const { sessionId } = req.body;
    if (sessionId && chatSessions[sessionId]) {
        delete chatSessions[sessionId];
        return res.status(200).json({ success: true, message: `Chat session ${sessionId} cleared.` });
    }
    res.status(404).json({ success: false, message: 'No active chat session found to clear.' });
});

export default router;
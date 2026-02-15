import express from "express";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import UserStats from "../models/UserStats.js";
import { v4 as uuidv4 } from "uuid";
import { verifyAccessToken } from "../middleware/authMiddleware.js"; // ✅ ADD THIS
import { getOrCreateStats } from "../utils/statsHelper.js";
import { calculateTotalScore } from "../utils/scoreUtils.js";



const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const modelName = "gemini-2.5-flash";

let genAI;
let modelsAPI;

if (!GEMINI_API_KEY) {
  console.error("❌ FATAL: GEMINI_API_KEY environment variable not set for quiz routes.");
} else {
  console.log("✅ GEMINI_API_KEY found for quiz routes.");
  try {
    genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    if (genAI && genAI.models) {
      modelsAPI = genAI.models;
      console.log(`✅ Google AI Models API endpoint initialized (Using model: ${modelName}).`);
    } else {
      throw new Error("Failed to access .models property on GoogleGenAI client.");
    }
  } catch (error) {
    console.error("❌ FATAL: Failed to initialize Google AI client:", error.message);
    modelsAPI = null;
  }
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


async function generateQuizPool(topic) {
  console.log(`🧠 Generating pool of 10 questions for topic: ${topic} (5 easy, 2 medium, 3 hard) using ${modelName}`);

  const prompt = `
    You are a quiz generation expert for a web app about the Indian Constitution.
    Generate a JSON object containing a pool of 10 quiz questions strictly about: "${topic}".

    The JSON object must have three keys: "easy", "medium", and "hard".
    - "easy": An array of exactly 5 easy question objects.
    - "medium": An array of exactly 2 medium question objects.
    - "hard": An array of exactly 3 hard question objects.

    Each question object in the arrays must have this exact structure:
    {
      "id": "a-unique-id-string-like-e1-or-m1", 
      "question": "The question text.",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0, 
      "explanation": "A brief explanation of why this is the correct answer.",
      "difficulty": "easy" 
    }

    Replace "easy" with "medium" or "hard" in the difficulty field as appropriate.
    Ensure each "id" is unique.
    CRITICAL: "correctAnswer" MUST be the zero-based index of the correct option.
    Do not include any text or backticks before or after the JSON object.
  `;

  if (!modelsAPI) throw new Error("Google AI Models API client is not initialized.");

  const result = await modelsAPI.generateContent({
    model: modelName,
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const response = result.response || result;
  const candidates = response.candidates;

  if (!candidates || candidates.length === 0 || !candidates[0].content?.parts?.[0]?.text) {
    console.error("❌ Unexpected response structure from Gemini API:", JSON.stringify(response, null, 2));
    throw new Error("Failed to parse response from AI model.");
  }

  let jsonText = candidates[0].content.parts[0].text;
  console.log("Raw JSON text from Gemini:", jsonText);

  jsonText = jsonText.replace(/^```json\s*/, "").replace(/\s*```$/, "").trim();

  const questionPool = JSON.parse(jsonText);

  const ensureIds = (arr, prefix) =>
    arr.map((q, i) => ({ ...q, id: q.id || `${prefix}${i}-${uuidv4()}` }));

  questionPool.easy = ensureIds(questionPool.easy, "e");
  questionPool.medium = ensureIds(questionPool.medium, "m");
  questionPool.hard = ensureIds(questionPool.hard, "h");

  shuffleArray(questionPool.easy);
  shuffleArray(questionPool.medium);
  shuffleArray(questionPool.hard);

  console.log(
    `✅ Successfully generated and shuffled pool: ${questionPool.easy.length} easy, ${questionPool.medium.length} medium, ${questionPool.hard.length} hard.`
  );

  return questionPool;
}

const quizSessions = {};

const sanitizeQuestion = (question) => {
  if (!question) return null;
  const { correctAnswer, explanation, ...clientQuestion } = question;
  return clientQuestion;
};

// ✅ PROTECT START QUIZ (so req.user exists)
router.post("/start", verifyAccessToken, async (req, res) => {
  console.log("🎯 /api/quiz/start endpoint was hit!");

  const { part } = req.body;
  if (!part) return res.status(400).json({ success: false, error: 'Missing "part" (topic).' });

  try {
    const questionPool = await generateQuizPool(part);

    const quizId = uuidv4();
    const session = {
      quizId,
      part,
      pool: questionPool,
      currentDifficulty: "easy",
      poolIndex: { easy: 0, medium: 0, hard: 0 },
      score: 0,
      questionsAnswered: 0,
      totalQuestions: 5,
      lastQuestion: null,
    };

    const firstQuestion = session.pool.easy[session.poolIndex.easy];
    session.poolIndex.easy++;
    session.lastQuestion = firstQuestion;
    session.questionsAnswered = 1;

    quizSessions[quizId] = session;

    return res.json({
      success: true,
      quizId,
      question: sanitizeQuestion(firstQuestion),
      questionNumber: session.questionsAnswered,
      totalQuestions: session.totalQuestions,
    });
  } catch (error) {
    console.error("❌ Error in /api/quiz/start:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ MAKE ANSWER ROUTE ASYNC + PROTECTED ✅
router.post("/answer", verifyAccessToken, async (req, res) => {
  console.log("🎯 /api/quiz/answer endpoint was hit!");

  const { quizId, questionId, answerIndex } = req.body;

  if (!quizId || !questionId || answerIndex === undefined) {
    return res.status(400).json({ success: false, error: "Missing quizId, questionId, or answerIndex." });
  }

  const session = quizSessions[quizId];
  if (!session) {
    return res.status(404).json({ success: false, error: "Quiz session not found or has expired." });
  }

  const lastQuestion = session.lastQuestion;
  if (lastQuestion.id !== questionId) {
    return res.status(400).json({ success: false, error: "Question ID mismatch. Out of sync?" });
  }

  const isCorrect = lastQuestion.correctAnswer === answerIndex;
  if (isCorrect) session.score++;

  const result = {
    isCorrect,
    correctAnswer: lastQuestion.correctAnswer,
    explanation: lastQuestion.explanation,
  };

  // ✅ QUIZ OVER -> SAVE IN DB
  if (session.questionsAnswered >= session.totalQuestions) {
    console.log(`[Quiz ${quizId}] Quiz finished. Score: ${session.score}/${session.totalQuestions}`);

    try {
      const userId = req.user._id;
      const stats = await getOrCreateStats(userId, req.user.type);

      const part = session.part; // current quiz part

      // Get previous best score for this part
      const previousBest = stats.quizzesScore?.get(part) || 0;

      // Cap max score to 5 (extra safety)
      const finalScore = Math.min(session.score, 5);

      // Only update if new score is higher
      if (finalScore > previousBest) {
        stats.quizzesScore.set(part, finalScore);
      }

      // Increase attempts
      stats.quizzesTaken = (stats.quizzesTaken || 0) + 1;

      // Recalculate total quiz score
      stats.totalScore = calculateTotalScore(stats);

      stats.lastActive = new Date();

      await stats.save();
      console.log("✅ Quiz progress saved in MongoDB");
    } catch (err) {
      console.error("❌ Failed to save quiz progress:", err.message);
    }


    delete quizSessions[quizId];

    return res.json({
      success: true,
      quizOver: true,
      result,
      finalScore: session.score,
      totalQuestions: session.totalQuestions,
    });
  }

  // continue quiz
  let nextDifficulty;
  if (isCorrect) {
    if (session.currentDifficulty === "easy") nextDifficulty = "medium";
    else if (session.currentDifficulty === "medium") nextDifficulty = "hard";
    else nextDifficulty = "hard";
  } else {
    nextDifficulty = "easy";
  }

  let nextQuestion = null;
  let pool = session.pool[nextDifficulty];
  let index = session.poolIndex[nextDifficulty];

  if (index < pool.length) {
    nextQuestion = pool[index];
    session.poolIndex[nextDifficulty]++;
  } else {
    nextDifficulty = "easy";
    pool = session.pool.easy;
    index = session.poolIndex.easy;

    if (index >= pool.length) {
      session.poolIndex.easy = 0;
      index = 0;
    }

    nextQuestion = pool[index];
    session.poolIndex.easy++;
  }

  session.currentDifficulty = nextDifficulty;
  session.questionsAnswered++;
  session.lastQuestion = nextQuestion;

  return res.json({
    success: true,
    quizOver: false,
    result,
    question: sanitizeQuestion(nextQuestion),
    questionNumber: session.questionsAnswered,
    totalQuestions: session.totalQuestions,
  });
});

export default router;

// frontend/src/services/api.ts
import axios from 'axios';

// --- CONFIGURATION ---
const API_BASE_URL =
  import.meta.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const WITH_CREDENTIALS = true;
// ---------------------

console.log('🔗 Connecting to API:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 90000,
  withCredentials: WITH_CREDENTIALS,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('📤 Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request setup error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ Got response from:', response.config.url);
    return response.data;
  },
  (error) => {
    console.error('❌ API Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return Promise.reject(error);
  }
);

// =================================================================
// 📚 Article APIs
// =================================================================
export const articleAPI = {
  getAllParts: () => api.get('/articles/parts'),
  getArticlesByPart: (part: string) =>
    api.get(`/articles/part/${encodeURIComponent(part)}`),
  getArticle: (articleNumber: string) => api.get(`/articles/${articleNumber}`),
  searchArticles: (query: string) =>
    api.get('/articles/search', { params: { q: query } }),
  getAllSubjects: () => api.get('/articles/subjects'),
  getRecommendations: () => api.get('/articles/recommendations'),
};

// =================================================================
// 🤖 Chatbot APIs
// =================================================================
export const chatbotAPI = {
  sendMessage: (prompt: string, sessionId: string) =>
    api.post('/chatbot/chat', { prompt, sessionId }),
  clearHistory: (sessionId: string) =>
    api.delete(`/chatbot/history/${sessionId}`),
  askAboutArticle: (articleNumber: string, question: string) =>
    api.post('/chatbot/article-question', { articleNumber, question }),
};

// =================================================================
// 📝 Quiz APIs
// =================================================================
export const quizAPI = {
  startQuiz: (part: string) => api.post('/quiz/start', { part }),
  submitAnswer: (quizId: string, questionId: string, answerIndex: number) =>
    api.post('/quiz/answer', { quizId, questionId, answerIndex }),
  generateFromArticle: (articleNumber: string) =>
    api.post('/quiz/from-article', { articleNumber }),
};

// =================================================================
// 📈 Progress / Dashboard APIs
// =================================================================
export const progressAPI = {
  markArticleRead: (articleNumber: string, partName?: string) =>
    api.post("/progress/article/read", { articleNumber, partName }),

  toggleBookmark: (articleNumber: string, partName?: string) =>
    api.post("/progress/article/bookmark", { articleNumber, partName }),

  getDashboard: () => api.get("/progress/dashboard"),

  getPartProgress: (partName: string) =>
    api.get(`/progress/part/${encodeURIComponent(partName)}`),
};


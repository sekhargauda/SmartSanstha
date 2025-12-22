// backend/server.js

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path'; // <-- Re-added
import { fileURLToPath } from 'url'; // <-- Re-added
import { connectDB } from './config/database.js';
import articleRoutes from './routes/articleRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import courtRoutes from './routes/courtRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import progressRoutes from "./routes/progressRoutes.js";

// --- Path resolution for ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- END Path resolution ---

// Load environment variables using the absolute path to the .env file
dotenv.config({ path: path.resolve(__dirname, './.env') }); 
console.log('📝 Environment loaded');

const app = express();
const PORT = process.env.PORT || 5001; 

// =================================================================
// MIDDLEWARE
// =================================================================
console.log('⚙️  Setting up middleware...');

const allowedOrigins = [
  'http://localhost:5173',                   // local Vite
  'https://smartsanstha-7zax.onrender.com', // your deployed frontend
];

app.use(
  cors({
    origin(origin, callback) {
      // allow tools/no origin (like curl, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log('❌ CORS blocked for origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true, // 🔴 REQUIRED for cookies
  })
);

app.use(express.json());
app.use(cookieParser());
console.log('✅ Middleware configured');



// =================================================================
// ROUTES
// =================================================================

// Root route
app.get('/', (req, res) => {
  console.log('🎯 Root endpoint was hit!');
  res.json({ 
    message: 'SmartSanstha Backend API',
    version: '1.0.0',
    endpoints: {
      articles: '/api/articles',
      chatbot: '/api/chatbot',
      quiz: '/api/quiz'
    }
  });
});

// Test route
app.get('/api/test', (req, res) => {
  console.log('🎯 /api/test endpoint was hit!');
  res.json({ 
    success: true,
    message: 'Backend is working!',
    timestamp: new Date().toISOString()
  });
});


// // =================================================================
// // CORS CONFIGURATION (Fix for deployed frontend)
// // =================================================================
// const allowedOrigins = [
//   'http://localhost:5173',                      // local development
//   process.env.FRONTEND_ORIGIN,                 // Render frontend URL
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true); // allow tools / mobile apps

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       console.log('❌ CORS blocked for origin:', origin);
//       return callback(new Error('Not allowed by CORS'));
//     },
//     credentials: true, // REQUIRED for cookies & auth
//   })
// );

// app.options('*', cors({
//   origin: allowedOrigins,
//   credentials: true,
// }));



// Mount route modules
app.use('/api/articles', articleRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/court', courtRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/progress", progressRoutes);

// 404 handler
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ 
    success: false, 
    error: 'Route not found',
    path: req.url 
  });
});

// =================================================================
// START SERVER
// =================================================================
console.log('🚀 Starting server...');
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`✅ Server is RUNNING!`);
    console.log(`🌐 Local: http://localhost:${PORT}`);
    console.log(`📍 API Base: http://localhost:${PORT}/api`);
    console.log(`🧪 Test: http://localhost:${PORT}/api/test`);
    console.log('='.repeat(50));
    console.log('');
    console.log('📁 Available endpoints:');
    console.log('  Articles:');
    console.log('    GET  /api/articles/parts');
    console.log('    GET  /api/articles/subjects');
    console.log('    GET  /api/articles/:articleNumber');
    console.log('    GET  /api/articles/part/:part');
    console.log('    GET  /api/articles/search?q=...');
    console.log('  Chatbot:');
    console.log('    POST /api/chatbot/chat');
    console.log('  Quiz:');
    console.log('    POST /api/quiz/from-part');
    console.log('    POST /api/quiz/from-article');
    console.log('');
    console.log('Press Ctrl+C to stop');
    console.log('');
  });
}).catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

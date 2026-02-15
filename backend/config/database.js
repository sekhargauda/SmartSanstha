// backend/config/database.js

import mongoose from 'mongoose';

// Declaring collections globally for access via getter functions
let articlesCollection;
let scenariosCollection;

const dbName = 'Constitution_db'; 

/**
 * Connect to MongoDB using only Mongoose.
 * We retrieve the raw collection objects directly from the Mongoose connection object.
 */
export async function connectDB() {
  // Read process.env.MONGODB_URI inside the function to ensure dotenv has completed.
  const mongoURI = process.env.MONGODB_URI;
  
  if (!mongoURI) {
    throw new Error('MongoDB URI is missing. Set MONGODB_URI in your .env file.');
  }

  try {
    console.log('🔗 Connecting to MongoDB...');

    // -----------------------------
    // 1️⃣ Connect using Mongoose (Handles all connections)
    // -----------------------------
    const connection = await mongoose.connect(mongoURI, {
      // Removed deprecated options: useNewUrlParser and useUnifiedTopology
      dbName: dbName,
    });
    console.log('✅ Mongoose connected');

    // -----------------------------
    // 2️⃣ Get Raw Collections from Mongoose Connection
    // -----------------------------
    const db = connection.connection.db; // Get the native MongoDB DB object

    // Initialize collections
    articlesCollection = db.collection('Articles');
    scenariosCollection = db.collection('Scenarios');

    // -----------------------------
    // 3️⃣ Test queries
    // -----------------------------
    const articleCount = await articlesCollection.countDocuments();
    console.log(`📚 Found ${articleCount} Articles`);

    const scenarioCount = await scenariosCollection.countDocuments();
    console.log(`⚖️ Found ${scenarioCount} Court Scenarios`);

    console.log('🚀 Database connection initialized successfully');

    return { mongoose, articlesCollection, scenariosCollection };
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); 
  }
}

/**
 * Get Articles collection (for direct operations)
 * 🚨 This function MUST be exported to resolve the error in articleRoutes.js
 */
export function getArticlesCollection() {
  if (!articlesCollection) {
    throw new Error('Articles Collection not initialized. Call connectDB() first.');
  }
  return articlesCollection;
}

/**
 * Get Scenarios collection (for direct operations)
 */
export function getScenariosCollection() {
  if (!scenariosCollection) {
    throw new Error('Scenarios Collection not initialized. Call connectDB() first.');
  }
  return scenariosCollection;
}

/**
 * Close Mongoose connection
 */
export async function closeDB() {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('🔌 Mongoose connection closed');
    }
  } catch (error) {
    console.error('⚠️ Error closing database connections:', error.message);
  }
}

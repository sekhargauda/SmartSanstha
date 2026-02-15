import express from 'express';
import { getScenariosCollection } from '../config/database.js'; // Assuming database.js is in ./config/

const router = express.Router();

// Get all court scenarios
router.get('/scenarios', async (req, res) => {
  console.log('🎯 /api/court/scenarios endpoint was hit!');
  try {
    const scenariosCollection = getScenariosCollection();
    
    // Fetch all scenarios from MongoDB
    const scenarios = await scenariosCollection.find({}).toArray();

    res.json({
      success: true,
      data: scenarios,
      count: scenarios.length
    });
  } catch (error) {
    console.error('❌ Error in /api/court/scenarios:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch court scenarios from database',
      message: error.message 
    });
  }
});

export default router;
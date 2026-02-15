// // backend/routes/articleRoutes.js

// import express from 'express';
// import { getArticlesCollection } from '../config/database.js';
// import { extractPartNumber, getDifficultyLevel } from '../helpers/partHelpers.js';
// import { verifyAccessToken } from '../middleware/authMiddleware.js';
// import { allowRoles } from '../middleware/roleMiddleware.js';

// const RECOMMENDATION_MAP = {
//   "middle_school": ["Preamble", "Part I", "Part II", "Part III", "Part IV", "Part IV A"],
//   "high_school": ["Part V", "Part VI", "Part IX", "Part IXA", "Part X", "Part XV"],
//   "college_student": ["Part XI", "Part XII", "Part XIII", "Part XIV", "Part XVIII", "Part XIX"],
//   "advanced_learner": ["Part XIV A", "Part XVII", "Part XX", "Part XXI", "Part XXII"],
// };

// const router = express.Router();

// // =================================================================
// // SPECIFIC ROUTES (must come first)
// // =================================================================

// // Get all parts with articles
// router.get('/parts', async (req, res) => {
//   console.log('🎯 /api/articles/parts endpoint was hit!');
//   try {
//     const articlesCollection = getArticlesCollection();
//     const articles = await articlesCollection.find({}).toArray();
    
//     const partsMap = new Map();
    
//     articles.forEach(article => {
//       const partName = article.Part;
//       if (!partsMap.has(partName)) {
//         const difficulty = getDifficultyLevel(partName);
//         partsMap.set(partName, {
//           id: `part-${partName.toLowerCase().replace(/\s+/g, '-')}`,
//           partNumber: extractPartNumber(partName),
//           title: partName,
//           description: `Learn about ${partName} of the Indian Constitution`,
//           articles: [],
//           totalArticles: 0,
//           subjects: new Set(),
//           difficulty: difficulty
//         });
//       }
//       partsMap.get(partName).articles.push({
//         article: article.Article,
//         title: article.Title,
//         subject: article.Subject
//       });
//       partsMap.get(partName).totalArticles++;
//       if (article.Subject) partsMap.get(partName).subjects.add(article.Subject);
//     });

//     const parts = Array.from(partsMap.values()).map(part => {
//       const subjectsArray = Array.from(part.subjects);
//       const primarySubject = subjectsArray.length > 0 ? subjectsArray[0] : 'Other';
//       return {
//         id: part.id,
//         partNumber: part.partNumber,
//         title: part.title,
//         description: part.description,
//         articles: part.articles,
//         totalArticles: part.totalArticles,
//         subjects: subjectsArray,
//         primarySubject: primarySubject,
//         difficulty: part.difficulty
//       };
//     }).sort((a, b) => a.partNumber - b.partNumber);
    
//     res.json({ success: true, data: parts, count: parts.length });
//   } catch (error) {
//     console.error('❌ Error in /api/articles/parts:', error.message);
//     res.status(500).json({ success: false, error: 'Failed to fetch parts', message: error.message });
//   }
// });

// // Get all unique subjects
// router.get('/subjects', async (req, res) => {
//   try {
//     const articlesCollection = getArticlesCollection();
//     const subjects = await articlesCollection.distinct('Subject');
//     res.json({ success: true, data: subjects, count: subjects.length });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Failed to fetch subjects', message: error.message });
//   }
// });

// // Search articles
// router.get('/search', async (req, res) => {
//   try {
//     const articlesCollection = getArticlesCollection();
//     const { q } = req.query;
//     if (!q) return res.status(400).json({ success: false, error: 'Search query required' });

//     const regex = new RegExp(q, 'i');
//     const articles = await articlesCollection
//       .find({
//         $or: [
//           { Title: { $regex: regex } },
//           { Simplified_Description: { $regex: regex } },
//           { Article: { $regex: regex } },
//           { Subject: { $regex: regex } },
//           { Part: { $regex: regex } }
//         ]
//       })
//       .limit(20)
//       .toArray();

//     const formatted = articles.map(article => ({
//       id: `article-${article.Article}`,
//       article: article.Article === '0' ? 'Preamble' : `Article ${article.Article}`,
//       title: article.Title,
//       summary: article.Simplified_Description,
//       readTime: Math.ceil(article.Simplified_Description.split(' ').length / 200),
//       category: 'fundamental-rights',
//       part: article.Part
//     }));

//     res.json({ success: true, data: formatted, count: formatted.length });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Failed to search', message: error.message });
//   }
// });

// // Get recommendations
// router.get('/recommendations', verifyAccessToken, async (req, res) => {
//   try {
//     const userCategory = req.user.category;
//     if (!userCategory) return res.status(400).json({ success: false, message: 'User category not found.' });

//     const partNames = RECOMMENDATION_MAP[userCategory] || RECOMMENDATION_MAP['advanced_learner'];
//     const articlesCollection = getArticlesCollection();
//     const articles = await articlesCollection.find({ 'Part': { $in: partNames } }).toArray();

//     if (!articles || articles.length === 0) {
//       return res.status(404).json({ success: false, message: 'No recommended articles found.' });
//     }

//     const formatted = articles.map(article => ({
//       id: `article-${article.Article}`,
//       article: article.Article === '0' ? 'Preamble' : `Article ${article.Article}`,
//       title: article.Title,
//       summary: article.Simplified_Description,
//       readTime: Math.ceil(article.Simplified_Description.split(' ').length / 200),
//       category: 'recommendation',
//       part: article.Part
//     }));

//     res.json({ success: true, data: formatted, count: formatted.length });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Failed to fetch recommendations', message: error.message });
//   }
// });

// // =================================================================
// // ADMIN ROUTES (Edit Functionality)
// // =================================================================

// // Update Article (Admin Only)
// router.put('/:articleNumber', verifyAccessToken, allowRoles('admin'), async (req, res) => {
//   console.log('📝 /api/articles/:articleNumber PUT endpoint hit');
//   try {
//     const articlesCollection = getArticlesCollection();
//     const { articleNumber } = req.params;
//     const { simplifiedDescription, keyPoints, historicalContext, landmarkCases } = req.body;

//     console.log(`🛠 Admin updating Article ID: "${articleNumber}"`);

//     // Dynamic update object
//     const updateData = {};
//     if (simplifiedDescription !== undefined) updateData.Simplified_Description = simplifiedDescription;
//     if (keyPoints !== undefined) updateData.Key_Points = keyPoints;
//     if (historicalContext !== undefined) updateData.Historical_Context = historicalContext;
    
//     if (landmarkCases !== undefined) {
//       updateData.Landmark_Cases = landmarkCases.map(c => {
//         if (typeof c === 'string') return c;
//         if (c.name && c.significance) return `${c.name}: ${c.significance}`;
//         return c.name || '';
//       });
//     }

//     const result = await articlesCollection.updateOne(
//       { Article: articleNumber },
//       { $set: updateData }
//     );

//     if (result.matchedCount === 0) {
//       console.log(`❌ Article "${articleNumber}" NOT found in DB.`);
//       return res.status(404).json({ success: false, error: 'Article not found in database' });
//     }

//     console.log(`✅ Article "${articleNumber}" updated successfully`);
//     res.json({
//       success: true,
//       message: 'Article updated successfully',
//       data: { articleNumber, ...req.body }
//     });

//   } catch (error) {
//     console.error('❌ Error updating article:', error.message);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to update article',
//       message: error.message
//     });
//   }
// });

// // =================================================================
// // DYNAMIC ROUTES (must come last)
// // =================================================================

// // Get single article by article number
// router.get('/:articleNumber', async (req, res) => {
//   try {
//     const articlesCollection = getArticlesCollection();
//     const { articleNumber } = req.params;
//     const article = await articlesCollection.findOne({ Article: articleNumber });

//     if (!article) return res.status(404).json({ success: false, error: 'Article not found' });

//     const formatted = {
//       id: article.Article, // ✅ Added Raw ID for frontend use
//       articleNumber: article.Article === '0' ? 'Preamble' : `Article ${article.Article}`,
//       articleName: article.Title,
//       part: {
//         number: extractPartNumber(article.Part),
//         name: article.Part,
//         category: 'fundamental-rights'
//       },
//       simplifiedDescription: article.Simplified_Description,
//       originalText: article.Original_Description,
//       keyPoints: article.Key_Points || [],
//       historicalContext: article.Historical_Context || 'Not available',
//       landmarkCases: (article.Landmark_Cases || []).map(caseStr => {
//         const colonIndex = caseStr.indexOf(':');
//         if (colonIndex > -1) {
//           return {
//             name: caseStr.substring(0, colonIndex).trim(),
//             significance: caseStr.substring(colonIndex + 1).trim()
//           };
//         }
//         return { name: caseStr, significance: '' };
//       }),
//       relatedArticles: (article.Related_Articles || []).map(related => {
//         const match = related.match(/^(.*?)\s*\((.*?)\)$/);
//         if (match) return { number: match[1].trim(), name: match[2].trim() };
//         return { number: related, name: related };
//       }),
//       subject: article.Subject
//     };

//     res.json({ success: true, data: formatted });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Failed to fetch article', message: error.message });
//   }
// });

// // Get articles by part
// router.get('/part/:part', async (req, res) => {
//   try {
//     const articlesCollection = getArticlesCollection();
//     const { part } = req.params;
//     const articles = await articlesCollection.find({ Part: part }).toArray();
//     const partDifficulty = getDifficultyLevel(part);

//     const formatted = articles.map(article => ({
//       id: `article-${article.Article}`,
//       article: article.Article === '0' ? 'Preamble' : `Article ${article.Article}`,
//       title: article.Title,
//       summary: article.Simplified_Description,
//       readTime: Math.ceil(article.Simplified_Description.split(' ').length / 200),
//       category: 'fundamental-rights',
//       part: article.Part,
//       difficulty: partDifficulty
//     }));

//     res.json({ success: true, data: formatted, count: formatted.length });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Failed to fetch articles', message: error.message });
//   }
// });

// export default router;














// backend/routes/articleRoutes.js

import express from 'express';
import { getArticlesCollection } from '../config/database.js';
import { extractPartNumber, getDifficultyLevel } from '../helpers/partHelpers.js';
import { verifyAccessToken } from '../middleware/authMiddleware.js';
import { allowRoles } from '../middleware/roleMiddleware.js';

const RECOMMENDATION_MAP = {
  "middle_school": ["Preamble", "Part I", "Part II", "Part III", "Part IV", "Part IV A"],
  "high_school": ["Part V", "Part VI", "Part IX", "Part IXA", "Part X", "Part XV"],
  "college_student": ["Part XI", "Part XII", "Part XIII", "Part XIV", "Part XVIII", "Part XIX"],
  "advanced_learner": ["Part XIV A", "Part XVII", "Part XX", "Part XXI", "Part XXII"],
};

const router = express.Router();

// =================================================================
// SPECIFIC ROUTES (must come first)
// =================================================================

// Get all parts with articles
router.get('/parts', async (req, res) => {
  console.log('🎯 /api/articles/parts endpoint was hit!');
  try {
    const articlesCollection = getArticlesCollection();
    const articles = await articlesCollection.find({}).toArray();
    
    const partsMap = new Map();
    
    articles.forEach(article => {
      const partName = article.Part;
      if (!partsMap.has(partName)) {
        const difficulty = getDifficultyLevel(partName);
        partsMap.set(partName, {
          id: `part-${partName.toLowerCase().replace(/\s+/g, '-')}`,
          partNumber: extractPartNumber(partName),
          title: partName,
          description: `Learn about ${partName} of the Indian Constitution`,
          articles: [],
          totalArticles: 0,
          subjects: new Set(),
          difficulty: difficulty
        });
      }
      partsMap.get(partName).articles.push({
        article: article.Article,
        title: article.Title,
        subject: article.Subject
      });
      partsMap.get(partName).totalArticles++;
      if (article.Subject) partsMap.get(partName).subjects.add(article.Subject);
    });

    const parts = Array.from(partsMap.values()).map(part => {
      const subjectsArray = Array.from(part.subjects);
      const primarySubject = subjectsArray.length > 0 ? subjectsArray[0] : 'Other';
      return {
        id: part.id,
        partNumber: part.partNumber,
        title: part.title,
        description: part.description,
        articles: part.articles,
        totalArticles: part.totalArticles,
        subjects: subjectsArray,
        primarySubject: primarySubject,
        difficulty: part.difficulty
      };
    }).sort((a, b) => a.partNumber - b.partNumber);
    
    res.json({ success: true, data: parts, count: parts.length });
  } catch (error) {
    console.error('❌ Error in /api/articles/parts:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch parts', message: error.message });
  }
});

// Get all unique subjects
router.get('/subjects', async (req, res) => {
  try {
    const articlesCollection = getArticlesCollection();
    const subjects = await articlesCollection.distinct('Subject');
    res.json({ success: true, data: subjects, count: subjects.length });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch subjects', message: error.message });
  }
});

// Search articles
router.get('/search', async (req, res) => {
  try {
    const articlesCollection = getArticlesCollection();
    const { q } = req.query;
    if (!q) return res.status(400).json({ success: false, error: 'Search query required' });

    const regex = new RegExp(q, 'i');
    const articles = await articlesCollection
      .find({
        $or: [
          { Title: { $regex: regex } },
          { Simplified_Description: { $regex: regex } },
          { Article: { $regex: regex } },
          { Subject: { $regex: regex } },
          { Part: { $regex: regex } }
        ]
      })
      .limit(20)
      .toArray();

    const formatted = articles.map(article => ({
      id: `article-${article.Article}`,
      article: article.Article === '0' ? 'Preamble' : `Article ${article.Article}`,
      title: article.Title,
      summary: article.Simplified_Description,
      readTime: Math.ceil(article.Simplified_Description.split(' ').length / 200),
      category: 'fundamental-rights',
      part: article.Part
    }));

    res.json({ success: true, data: formatted, count: formatted.length });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to search', message: error.message });
  }
});

// Get recommendations
router.get('/recommendations', verifyAccessToken, async (req, res) => {
  try {
    const userCategory = req.user.category;
    if (!userCategory) return res.status(400).json({ success: false, message: 'User category not found.' });

    const partNames = RECOMMENDATION_MAP[userCategory] || RECOMMENDATION_MAP['advanced_learner'];
    const articlesCollection = getArticlesCollection();
    const articles = await articlesCollection.find({ 'Part': { $in: partNames } }).toArray();

    if (!articles || articles.length === 0) {
      return res.status(404).json({ success: false, message: 'No recommended articles found.' });
    }

    const formatted = articles.map(article => ({
      id: `article-${article.Article}`,
      article: article.Article === '0' ? 'Preamble' : `Article ${article.Article}`,
      title: article.Title,
      summary: article.Simplified_Description,
      readTime: Math.ceil(article.Simplified_Description.split(' ').length / 200),
      category: 'recommendation',
      part: article.Part
    }));

    res.json({ success: true, data: formatted, count: formatted.length });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch recommendations', message: error.message });
  }
});

// =================================================================
// ADMIN ROUTES (Edit Functionality)
// =================================================================

// Update Article (Admin Only)
router.put('/:articleNumber', verifyAccessToken, allowRoles('admin'), async (req, res) => {
  console.log('📝 /api/articles/:articleNumber PUT endpoint hit');
  try {
    const articlesCollection = getArticlesCollection();
    const { articleNumber } = req.params;
    
    // Accept relatedArticles from body
    const { simplifiedDescription, keyPoints, historicalContext, landmarkCases, relatedArticles } = req.body;

    console.log(`🛠 Admin updating Article ID: "${articleNumber}"`);

    // Dynamic update object
    const updateData = {};
    if (simplifiedDescription !== undefined) updateData.Simplified_Description = simplifiedDescription;
    if (keyPoints !== undefined) updateData.Key_Points = keyPoints;
    if (historicalContext !== undefined) updateData.Historical_Context = historicalContext;
    
    // Handle Landmark Cases (Array of Strings or Objects -> Array of Strings)
    if (landmarkCases !== undefined) {
      updateData.Landmark_Cases = landmarkCases.map(c => {
        if (typeof c === 'string') return c;
        if (c.name && c.significance) return `${c.name}: ${c.significance}`;
        return c.name || '';
      });
    }

    // Handle Related Articles (Array of Objects -> Array of Strings)
    // Frontend sends: [{ number: "Article 19", name: "Freedom" }]
    // Database expects: ["Article 19 (Freedom)"]
    if (relatedArticles !== undefined) {
      updateData.Related_Articles = relatedArticles.map(r => {
        if (typeof r === 'string') return r;
        if (r.number && r.name) return `${r.number} (${r.name})`;
        return r.number || r.name || '';
      });
    }

    const result = await articlesCollection.updateOne(
      { Article: articleNumber },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      console.log(`❌ Article "${articleNumber}" NOT found in DB.`);
      return res.status(404).json({ success: false, error: 'Article not found in database' });
    }

    console.log(`✅ Article "${articleNumber}" updated successfully`);
    res.json({
      success: true,
      message: 'Article updated successfully',
      data: { articleNumber, ...req.body }
    });

  } catch (error) {
    console.error('❌ Error updating article:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to update article',
      message: error.message
    });
  }
});

// =================================================================
// DYNAMIC ROUTES (must come last)
// =================================================================

// Get single article by article number
router.get('/:articleNumber', async (req, res) => {
  try {
    const articlesCollection = getArticlesCollection();
    const { articleNumber } = req.params;
    const article = await articlesCollection.findOne({ Article: articleNumber });

    if (!article) return res.status(404).json({ success: false, error: 'Article not found' });

    const formatted = {
      id: article.Article, // Raw ID
      articleNumber: article.Article === '0' ? 'Preamble' : `Article ${article.Article}`,
      articleName: article.Title,
      part: {
        number: extractPartNumber(article.Part),
        name: article.Part,
        category: 'fundamental-rights'
      },
      simplifiedDescription: article.Simplified_Description,
      originalText: article.Original_Description,
      keyPoints: article.Key_Points || [],
      historicalContext: article.Historical_Context || 'Not available',
      landmarkCases: (article.Landmark_Cases || []).map(caseStr => {
        const colonIndex = caseStr.indexOf(':');
        if (colonIndex > -1) {
          return {
            name: caseStr.substring(0, colonIndex).trim(),
            significance: caseStr.substring(colonIndex + 1).trim()
          };
        }
        return { name: caseStr, significance: '' };
      }),
      // Parse Related Articles from "Number (Name)" string to Object
      relatedArticles: (article.Related_Articles || []).map(related => {
        const match = related.match(/^(.*?)\s*\((.*?)\)$/);
        if (match) return { number: match[1].trim(), name: match[2].trim() };
        return { number: related, name: related };
      }),
      subject: article.Subject
    };

    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch article', message: error.message });
  }
});

// Get articles by part
router.get('/part/:part', async (req, res) => {
  try {
    const articlesCollection = getArticlesCollection();
    const { part } = req.params;
    const articles = await articlesCollection.find({ Part: part }).toArray();
    const partDifficulty = getDifficultyLevel(part);

    const formatted = articles.map(article => ({
      id: `article-${article.Article}`,
      article: article.Article === '0' ? 'Preamble' : `Article ${article.Article}`,
      title: article.Title,
      summary: article.Simplified_Description,
      readTime: Math.ceil(article.Simplified_Description.split(' ').length / 200),
      category: 'fundamental-rights',
      part: article.Part,
      difficulty: partDifficulty
    }));

    res.json({ success: true, data: formatted, count: formatted.length });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch articles', message: error.message });
  }
});

export default router;
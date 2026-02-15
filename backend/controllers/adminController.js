// controllers/adminController.js
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import User from '../models/User.js';
import getCategoryFromDOB from '../utils/categorize.js';
import { getArticlesCollection } from '../config/database.js';
import UserStats from '../models/UserStats.js';



// Admins can CRUD both admins and users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createUserAsAdmin = async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;
    if (!name || !dob || !email || !password)
      return res.status(400).json({ message: 'Missing required fields' });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: 'Email exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Model's pre-save hook will handle the category on creation
    const user = new User({
      name,
      dob,
      email: email.toLowerCase(),
      password: hashed,
    });

    await user.save();
    return res.status(201).json({
      message: 'User created',
      user: { id: user._id, email: user.email, category: user.category },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateUserByAdmin = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    // If 'dob' is updated, use the imported utility to recalculate the 'category'
    if (updates.dob) {
      updates.category = getCategoryFromDOB(updates.dob);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json({ message: 'User updated', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUserByAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Admin CRUD for admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    return res.json({ admins });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }
    delete updates.role; // Ensure 'role' field is not passed

    const admin = await Admin.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    return res.json({ message: 'Admin updated', admin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    return res.json({ message: 'Admin deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


/**
 * Get Admin Dashboard Statistics
 */
export const getAdminStats = async (req, res) => {
  try {
    // 1. Total Users
    const totalUsers = await User.countDocuments();

    // 2. Total Articles (🔥 ADD HERE)
    const articlesCollection = getArticlesCollection();
    const totalArticles = await articlesCollection.countDocuments();

    // 3. User Category Distribution
    const categoryDistribution = await User.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // 4. Recent Signups (Last 10 users)
    const recentSignups = await User.find()
      .select('name email category createdAt')
      .sort({ createdAt: -1 })
      .limit(10);

    // 5. User Signups Over Time (Last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // 6. Total Quiz Attempts (SUM of all users)
    const quizAgg = await UserStats.aggregate([
      {
        $group: {
          _id: null,
          totalAttempts: { $sum: '$quizzesTaken' },
        },
      },
    ]);

    const totalQuizAttempts = quizAgg[0]?.totalAttempts || 0;

    const signupsOverTime = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // 6. Total Admins
    const totalAdmins = await Admin.countDocuments();

    return res.json({
      success: true,
      stats: {
        totalUsers,
        totalArticles,
        totalAdmins,
        totalQuizAttempts,
        categoryDistribution,
        recentSignups,
        signupsOverTime,
      }
    });
  } catch (err) {
    console.error('Get admin stats error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error fetching statistics'
    });
  }
};
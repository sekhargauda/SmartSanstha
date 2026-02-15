// controllers/userController.js
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import getCategoryFromDOB from '../utils/categorize.js';


export const getProfile = async (req, res) => {
  try {
    if (!req.user && !req.profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    const profile = req.profile || req.user;
    
    // ✅ Determine type from req.user.type (set by middleware)
    const userType = req.user?.type || 'user';
    
    return res.json({ 
      profile: {
        id: profile._id.toString(),
        name: profile.name,
        email: profile.email,
        category: profile.category,
        type: userType // ✅ Add this
      }
    });
  } catch (err) {
    console.error('getProfile error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = {};
    const { name, dob, password } = req.body;

    if (name) updates.name = name;
    if (dob) {
      updates.dob = dob;
      updates.category = getCategoryFromDOB(dob);
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select('-password');

    return res.json({ message: 'Profile updated', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    await User.findByIdAndDelete(userId);

    // Use same options as when setting cookies
    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });

    return res.json({ message: 'Account deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

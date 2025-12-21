// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';
import getCategoryFromDOB from '../utils/categorize.js';
import dotenv from 'dotenv';
dotenv.config();

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '15m',
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '7d',
  });
};

// ✅ Treat Render as production too
const isProduction =
  process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,                    // true on Render (HTTPS), false locally
  sameSite: isProduction ? 'none' : 'lax', // NONE for cross-site cookies from frontend → backend
  path: '/',                               // send to all routes
  // domain: process.env.COOKIE_DOMAIN,    // optional; fine to omit on Render
};


export const registerUser = async (req, res) => {
  try {
    // Updated to use name, dob and removed institutionName, acceptedTerms
    const { name, dob, email, password, confirmPassword } = req.body;
    if (!name || !dob || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // The 'category' will be set automatically by the pre-save hook in your User model
    const user = new User({
      name,
      dob,
      email: email.toLowerCase(),
      password: hashed,
    });

    await user.save();

    // create tokens
    const accessToken = createAccessToken({ id: user._id, type: 'user' });
    const refreshToken = createRefreshToken({ id: user._id, type: 'user' });

    res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 }); // 15m
    res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    // Updated response to return 'name' instead of 'fullName'
    return res.status(201).json({
      message: 'User registered',
      user: { id: user._id, name: user.name, email: user.email, category: user.category },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = createAccessToken({ id: user._id, type: 'user' });
    const refreshToken = createRefreshToken({ id: user._id, type: 'user' });

    res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    // Updated response to return 'name' instead of 'fullName'
    return res.json({
      message: 'Logged in',
      user: { id: user._id, name: user.name, email: user.email, category: user.category },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) return res.status(401).json({ message: 'Invalid admin credentials' });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: 'Invalid admin credentials' });

    const accessToken = createAccessToken({ id: admin._id, type: 'admin' });
    const refreshToken = createRefreshToken({ id: admin._id, type: 'admin' });

    res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    // Updated response to return 'name' and removed 'role'
    return res.json({
      message: 'Admin logged in',
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('accessToken', { ...cookieOptions });
  res.clearCookie('refreshToken', { ...cookieOptions });
  return res.json({ message: 'Logged out' });
};

// refresh token endpoint
export const refreshToken = async (req, res) => {
  try {
    // console.log('Cookies on refresh:', req.cookies);

    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    // create new access token
    const accessToken = createAccessToken({ id: payload.id, type: payload.type });
    res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    return res.json({ message: 'Access token refreshed' });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

// Endpoint to create admin (protected by master key)
export const createAdmin = async (req, res) => {
  try {
    const { masterKey } = req.body;
    if (masterKey !== process.env.ADMIN_MASTER_KEY)
      return res.status(403).json({ message: 'Invalid master key' });

    // Updated to include 'name' and remove 'role'
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Missing name, email, or password' });

    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: 'Admin email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const admin = new Admin({ name, email: email.toLowerCase(), password: hashed });
    await admin.save();

    // Updated response to include 'name' and remove 'role'
    return res.status(201).json({
      message: 'Admin created',
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const getProfile = async (req, res) => {
  try {
    // req.user is set by verifyAccessToken middleware
    if (!req.user) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    // Return user profile with proper structure
    return res.json({ 
      profile: {
        id: req.user._id.toString(),
        name: req.user.name,
        email: req.user.email,
        category: req.user.category
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
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
    const userId = req.user._id || req.user.id;
    await User.findByIdAndDelete(userId);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.json({ message: 'Account deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
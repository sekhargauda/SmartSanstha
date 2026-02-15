// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User Name is required'],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, 'User Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'User Password is required'],
    minLength: 6,
  },
  dob: {
    type: Date,
    required: [true, 'Date of Birth is required'],
  },
  category: {
    type: String,
    enum: ['middle_school', 'high_school', 'college_student', 'advanced_learner'],
  },
}, { timestamps: true });

// Pre-save middleware to compute category automatically
userSchema.pre('save', function (next) {
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age >= 12 && age <= 15) this.category = 'middle_school';
  else if (age >= 16 && age <= 18) this.category = 'high_school';
  else if (age >= 19 && age <= 22) this.category = 'college_student';
  else this.category = 'advanced_learner';

  next();
});

export default mongoose.model('User', userSchema);

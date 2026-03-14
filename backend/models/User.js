import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'developer'],
    default: 'user',
  },
  preferences: {
    theme: {
      type: String,
      default: 'technical',
    },
    notifications: {
      type: Boolean,
      default: true,
    }
  },
  lastLogin: {
    type: Date,
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', UserSchema);

export default User;

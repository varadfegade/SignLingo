import mongoose from 'mongoose';

const TranslationHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sourceSignLanguage: {
    type: String,
    default: 'ASL', // e.g., American Sign Language
  },
  translatedText: {
    type: String,
    required: true,
  },
  confidenceScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  durationMs: {
    type: Number, // duration of the sign gesture
  },
  videoSessionId: {
    type: String, // To group translations from a single continuous session
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Index for faster queries on user's translation history
TranslationHistorySchema.index({ user: 1, createdAt: -1 });

const TranslationHistory = mongoose.model('TranslationHistory', TranslationHistorySchema);

export default TranslationHistory;

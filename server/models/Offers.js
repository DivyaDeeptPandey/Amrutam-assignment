import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  isLimitedTime: {
    type: Boolean,
    default: false,
  },
  expiresAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

const Offer = mongoose.model('Offer', offerSchema);

export default Offer;

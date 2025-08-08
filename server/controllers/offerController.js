import Offer from '../models/Offers.js';

// @desc Get all trending offers
export const getTrendingOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Create a new offer (for admin / seeding)
export const createOffer = async (req, res) => {
  try {
    const { title, image, slug, isLimitedTime, expiresAt } = req.body;

    const newOffer = new Offer({
      title,
      image,
      slug,
      isLimitedTime,
      expiresAt,
    });

    const saved = await newOffer.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create offer' });
  }
};

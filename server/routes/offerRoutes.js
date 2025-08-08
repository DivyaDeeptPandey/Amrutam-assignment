import express from 'express';
import { getTrendingOffers, createOffer } from '../controllers/offerController.js';

const router = express.Router();

// GET /api/offers/trending
router.get('/trending', getTrendingOffers);

// POST /api/offers (optional - for creating offers manually)
//router.post('/', createOffer);

export default router;

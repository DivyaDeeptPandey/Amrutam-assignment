// server/routes/productRoutes.js
import express from 'express';
import { getProductById, getAllProducts, searchProducts, getBestsellerProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/bestsellers', getBestsellerProducts);
router.get('/search', searchProducts);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

export default router;

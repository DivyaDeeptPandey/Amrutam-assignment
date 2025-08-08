// server/routes/orderRoutes.js
import express from 'express';
import { placeOrder, getUserOrders } from '../controllers/orderController.js';
import  protect  from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/my', protect, getUserOrders);

export default router;

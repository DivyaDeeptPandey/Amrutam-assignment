// server/routes/orderRoutes.js
import express from 'express';
import { placeOrder, getUserOrders } from '../controllers/orderController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken , placeOrder);
router.get('/my', verifyToken , getUserOrders);

export default router;

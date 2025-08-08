// server/routes/cartRoutes.js
import express from 'express';
import {
  createOrUpdateCart,
  getCartByUserId,
  deleteCart,
} from '../controllers/cartController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, createOrUpdateCart);
router.get('/:userId', verifyToken, getCartByUserId);
router.delete('/:userId', verifyToken, deleteCart);

export default router;

// server/controllers/orderController.js
import Order from '../models/Order.js';

export const placeOrder = async (req, res) => {
  const userId = req.user.id;
  const { products, total } = req.body;

  try {
    const newOrder = new Order({ userId, products, total });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getUserOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ userId }).populate('products.productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

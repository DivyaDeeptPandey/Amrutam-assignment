// server/controllers/cartController.js
import Cart from '../models/Cart.js';

// Create or update cart
export const createOrUpdateCart = async (req, res) => {
  const userId = req.user.id;
  const { products } = req.body;


  try {
    const existingCart = await Cart.findOne({ userId });

    if (existingCart) {
      existingCart.products = products;
      const updatedCart = await existingCart.save();
      res.status(200).json(updatedCart);
    } else {
      const newCart = new Cart({ userId, products });
      const savedCart = await newCart.save();
      res.status(201).json(savedCart);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get cart by user ID
export const getCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete cart
export const deleteCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.status(200).json({ message: 'Cart deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// server/controllers/cartController.js
import Cart from '../models/Cart.js';

// Create or update cart
// Create or update cart
export const createOrUpdateCart = async (req, res) => {
  console.log("USer->>>> ",req.user)
  const userId = req.user.id;
  const { products } = req.body;
  console.log('Creating or updating cart for user:', userId, 'with products:', products);

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      cart.products = products;
      await cart.save();
    } else {
      console.log('Creating new cart for user:', userId);
      cart = new Cart({ userId, products });
      await cart.save();
    }

    const populatedCart = await Cart.findOne({ userId }).populate('products.productId');
    res.status(200).json(populatedCart);
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

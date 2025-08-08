// server/controllers/productController.js
import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

export const getBestsellerProducts = async (req, res) => {
  try {
    const bestsellers = await Product.find({ bestseller: true });
    res.json(bestsellers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bestsellers' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  const { query } = req.query;

  try {
    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const regex = new RegExp(query, 'i'); // case-insensitive search

    const results = await Product.find({
      $or: [
        { title: regex },
        { description: regex }
      ]
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search products', error: error.message });
  }
};
  // server/models/Product.js
  import mongoose from 'mongoose';

  const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    inStock: { type: Boolean, default: true },
    bestseller: {
      type: Boolean,
      default: false
    }
  }, { timestamps: true });

  const Product = mongoose.model('Product', productSchema);
  export default Product;
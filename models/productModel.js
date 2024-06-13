import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: [
    {
      type: String,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  mrp: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: [
    {
      type: String,
      trim: true,
    },
  ],
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;

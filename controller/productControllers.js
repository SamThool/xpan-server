import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, mrp, imageUrl, stock } =
      req.body;

    if (
      !name ||
      !category ||
      price === undefined ||
      mrp === undefined ||
      stock === undefined ||
      !Array.isArray(description) ||
      !Array.isArray(imageUrl)
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields or invalid data format" });
    }

    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      category,
      price,
      mrp,
      imageUrl,
      stock,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Respond with the saved product
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProducts = async (req, res) => {
  const products = await Product.find();

  if (!products) {
    return res.status(405).json({
      success: false,
      message: "No Products Found",
    });
  }

  return res.status(200).json({
    success: true,
    products,
  });
};

export const updateAProduct = async (req, res) => {
  try {
    const { name, ...updates } = req.body; // Extract name and the rest of the fields from the request body

    const product = await Product.findOneAndUpdate({ name: name }, updates, {
      new: true,
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product name can not be Changed" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAProduct = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Product name is required" });
    }

    const product = await Product.findOne({ name: name });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const productByName = async (req, res) => {
  const { prod } = req.body;

  const product = await Product.findOne({ name: prod });

  res.status(200).json(product);
};

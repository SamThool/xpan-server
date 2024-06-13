import Product from "../models/productModel.js";
import User from "../models/userModels.js";
import jwt from "jsonwebtoken";

const secretKey = "isdbfjabdsofufbaisond";

export const login = async (req, res) => {
  const { name, email, picture } = req.body;

  const euser = await User.findOne({ email: email });

  if (euser) {
    const token = jwt.sign({ userId: euser._id }, secretKey, {
      expiresIn: "5d",
    });
    let user = euser;
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ message: "Login successful", token, user });
  }

  const user = new User({
    name,
    picture,
    email,
  });

  await user.save();

  const token = jwt.sign({ userId: user._id }, secretKey, {
    expiresIn: "5d",
  });

  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ message: "User Created", token, user });
};

export const getUser = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Token not provided" });
    }

    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error during getUser:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addToCart = async (req, res) => {
  const { prod, token } = req.body;

  const decodedToken = jwt.verify(token, secretKey);

  console.log(prod);

  const uid = decodedToken.userId;

  try {
    const user = await User.findById(uid);

    const isProductInCart = user.cart.some((cartItem) => cartItem === prod);

    if (isProductInCart) {
      return res
        .status(200)
        .json({ message: "Product is already in the cart", cart: user.cart });
    }

    user.cart.push(prod);

    await user.save();

    res.status(200).json({ message: "Product added to cart", cart: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { prod, token } = req.body;

  try {
    const decodedToken = jwt.verify(token, secretKey);
    const uid = decodedToken.userId;

    const user = await User.findById(uid);

    const productIndex = user.cart.findIndex((cartItem) => cartItem === prod);

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Product not found in cart", cart: user.cart });
    }

    user.cart.splice(productIndex, 1);

    await user.save();

    res
      .status(200)
      .json({ message: "Product removed from cart", cart: user.cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getcart = async (req, res) => {
  const { token } = req.body;

  const decodedToken = jwt.verify(token, secretKey);

  const uid = decodedToken.userId;

  const user = await User.findById(uid);

  // console.log(user);

  // const productNames = await user.cart.map((item) => item.name);

  // console.log(productNames);

  const productsInCart = await Product.find({ name: { $in: user.cart } });

  res
    .status(200)
    .json({ message: "Products retrieved successfully", cart: productsInCart });
};

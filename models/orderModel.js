import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: null,
  },
  picture: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  landmark: {
    type: String,
  },
  address: {
    type: String,
  },
  pincode: {
    type: String,
  },
  cart: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

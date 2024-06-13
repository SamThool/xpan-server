import express from "express";
import { createOrder } from "../controller/orderControllers.js";

export const orderRouter = express.Router();

// userRouter.route("/register").post(createUser);

// userRouter.route("/login").post(login);

orderRouter.route("/createOrder").post(createOrder);

// userRouter.route("/getcart").post(getcart);

// userRouter.route("/logout").get(logout);

// userRouter.route("/removefromcart").post(removeFromCart);

// userRouter.route("/addtocart").post(addToCart);

// userRouter.route("/getotp").post(authviaOTP);

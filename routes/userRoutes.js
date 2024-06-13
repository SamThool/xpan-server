import express from "express";
import {
  addToCart,
  getUser,
  getcart,
  login,
  logout,
  removeFromCart,
  //   userCart,
} from "../controller/usercontrollers.js";

export const userRouter = express.Router();

// userRouter.route("/register").post(createUser);

userRouter.route("/login").post(login);

userRouter.route("/getuser").post(getUser);

userRouter.route("/getcart").post(getcart);

userRouter.route("/logout").get(logout);

userRouter.route("/removefromcart").post(removeFromCart);

userRouter.route("/addtocart").post(addToCart);

// userRouter.route("/getotp").post(authviaOTP);

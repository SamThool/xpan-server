import express from "express";
//    adminNeedsProducts,
//   changeProductDataById,
//   createFilters,
//   deleteProduct,
//   get4Products,
//   getAllProducts
//   productById,
//   removeproductById,
// "../controller/productControllers.js";

import {
  createProduct,
  getAProduct,
  getAllProducts,
  productByName,
  updateAProduct,
} from "../controller/productControllers.js";

export const productRouter = express.Router();

productRouter.route("/getproducts").post(getAllProducts);

// productRouter.route("/get4products").post(get4Products);

productRouter.route("/product").post(productByName);

// productRouter.route("/removeproduct").post(removeproductById);

// productRouter.route("/admin/products").post(adminNeedsProducts);

// productRouter.route("/admin/updateProduct").post(changeProductDataById);

// productRouter.route("/createFilter").post(createFilters);

// productRouter.route("/delete").post(deleteProduct);

productRouter.route("/create-product").post(createProduct);

productRouter.route("/update-a-product").post(updateAProduct);

productRouter.route("/get-a-product").post(getAProduct);

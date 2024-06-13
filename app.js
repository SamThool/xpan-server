import express from "express";
import { connectDatabase } from "./database.js";
import { userRouter } from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { productRouter } from "./routes/productRoutes.js";
import { orderRouter } from "./routes/orderRoutes.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: ["http://localhost:3000", "https://zenoxin.vercel.app"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(productRouter);
app.use(orderRouter);
// app.use(productRouter);
// app.use(orderRouter);
// app.use(blogRouter);
// app.use(faqRouter);
// app.use(acRouter);

connectDatabase();

app.listen(5000, () => {
  console.log("Server Started on => 5000");
});

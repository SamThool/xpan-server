import mongoose from "mongoose";

export const connectDatabase = () => {
  // mongoose.connect("mongodb://localhost:27017/sul").then((data) => {
  mongoose
    .connect(
      "mongodb+srv://xpanindiain:xpanindiain@xpan.unjunnw.mongodb.net/xpan"
    )
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

import Order from "../models/orderModel.js";
import User from "../models/userModels.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const secretKey = "isdbfjabdsofufbaisond";

export const createOrder = async (req, res) => {
  const { name, phone, state, city, pincode, address, landmark, token } =
    req.body;

  console.log(req.body);

  const decodedToken = jwt.verify(token, secretKey);
  const uid = decodedToken.userId;

  const user = await User.findById(uid);

  const order = new Order({
    name,
    phone: phone,
    email: user.email,
    pincode,
    cart: user.cart,
    state,
    city,
    address,
    landmark,
  });

  await order.save();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "smilesdelivery.in@gmail.com",
      pass: "kqwb bdcr zbii ydut",
    },
    debug: true,
  });

  const mailOptions = {
    from: "samythool102002@gmail.com",
    to: "zenoxindia.in@gmail.com",
    subject: `Order Recived from ${name}`,
    text: `
        Order Details:
        --------------
        Name: ${name}
        Contact: ${phone}
        Email: ${user.email}
        Pincode: ${pincode}
        State: ${state}
        City: ${city}
        Address: ${address}
        Landmark: ${landmark}
        Cart Items: ${JSON.stringify(user.cart, null, 2)}
      `,
  };

  await transporter.sendMail(mailOptions);

  res.status(200).json(order);
};

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/User.js";
import UserModel from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ username, password: hashedPassword });
    await newUser.save();

    return res.json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SESSION_SECRET);

    res.json({ token, userID: user._id });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

export { router as userRouter };

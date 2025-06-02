import User from "../models/AuthModel.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  try {
    const newuser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newuser.save();
    res.status(201).json(newuser);
  } catch (error) {
    next(error);
  }
};
export const LoginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "user not found? "));

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword)
      return next(createError(400, "Wrong password or username !"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};

import User from "../models/AuthModel.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      password: hash,
      email: req.body.email,
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const updatedbyid = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updatedbyid);
  } catch (error) {
    next(error);
  }
};

export const deleteUsers = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.id);
    res.status(201).json("Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();

    res.status(201).json(allUsers);
  } catch (error) {
    next(error);
  }
};

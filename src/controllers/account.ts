import express from "express";
import { userModel } from "../model/user";
import jwt from "jsonwebtoken";

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      res.status(400).send({ message: "All fields required" });
    }
    const existing = await userModel.findOne({ email });
    if (existing) {
      res.status(400).send({ message: "Email already in use " });
    }

    const user = new userModel({
      email,
      name,
      password: password,
    });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: "Some error occured" });
  }
};

export const validateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(404).send({ message: "Invalid credentials" });
    }
    // const valid = await bcrypt.compare(password, user.password);
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });
      res.send({ token, user });
    }
  } catch (error) {
    res.status(500).send({ message: "Some error occured" });
  }
};

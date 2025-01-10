import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcrypt";
import { userModel } from "../models/users.model.js";
import { courseModel } from "../models/course.model.js";
import { purchaseModel } from "../models/purchase.model.js";
const requiredBody = z.object({
  firstname: z.string().min(3).max(32),
  lastname: z.string().min(3).max(32),
  email: z.string().email(),
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    ),
});
const userSigninValidation = requiredBody.pick({ username: true, password: true,})
export const createUser = async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;
  const parsedBody = requiredBody.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({ message: parsedBody.error });
  }
  try {
    const userExist = await userModel.findOne({
      email: email,
      username: username,
    });
    if (userExist) {
      return res.status(400).json({
        message: `${username} and email already exists`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    await userModel.create({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.status(200).json({ message: "User Signed Up Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const userSignin = async (req, res) => {
  const { username, password } = req.body;
  const parsedBody = userSigninValidation.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({ message: parsedBody.error });
  }
  try {
    const user = await userModel.findOne({ username: username });
    if (!user) {
      res.status(404).json({ message:"Incorrect Credentials" });
    } else {
      const passwordMatch =await  bcrypt.compare(password, user.password);
      console.log(passwordMatch)
      console.log(user.password)
      if (passwordMatch) {
        const token = jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_USER_SECRET
        );
        res.status(200).json({ messgae: "user signed in successfully", token });
      }
      else
      {
        res.status(403).json({message:"Incorrect Credentials"})
      }
    }
  } catch (error) {
    res.status(500).json({ messgae: error.message });
  }
};

export const getCoursesPurchased = async (req, res) => {
  const userId=req.userId
  try {
    const purchases=await purchaseModel.find(
      {
        userId:userId
      })
    const courses=await courseModel.find({_id:purchases.map((i)=>i.courseId)})
    res.status(200).json({PurchasedCourses:courses})
  } catch (error) {
    
  }
  if(token)
    {
      res.status(200).json({message:"All courses"})
    }
    else{
  res.json({ messgae: "see purchased courses Router" });
}
};

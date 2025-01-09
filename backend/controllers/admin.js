import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminModel } from "../models/admin.model.js";
import { courseModel } from "../models/course.model.js";
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
  title: z.string().min(3).max(32),
  description: z.string().min(10).max(720),
  price: z.number().positive(),
  imageUrl: z.string().url(),
});
const adminSigninValidation = requiredBody.pick({
  username: true,
  password: true,
});
const createCourseValidation = requiredBody.pick({
  title: true,
  description: true,
  price: true,
  imageUrl: true,
});
export const createAdmin = async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;
  const parsedBody = requiredBody.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({ message: parsedBody.error });
  }
  try {
    const adminExist = await adminModel.findOne({
      email: email,
      username: username,
    });
    if (adminExist) {
      return res.status(400).json({
        message: `${username} and email already exists`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    await adminModel.create({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.status(200).json({ message: "Admin Signed Up Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const adminSignin = async (req, res) => {
  const { username, password } = req.body;
  const parsedBody = adminSigninValidation.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({ message: parsedBody.error });
  }
  try {
    const admin = await adminModel.findOne({ username: username });
    if (!admin) {
      res.status(404).json({ message: "Incorrect Credentials" });
    } else {
      const passwordMatch = bcrypt.compare(password, admin.password);
      if (passwordMatch) {
        const token = jwt.sign(
          {
            id: admin._id,
          },
          process.env.JWT_ADMIN_SECRET
        );
        res
          .status(200)
          .json({ messgae: "admin signed in successfully", token });
      } else {
        res.status(403).json({ message: "Incorrect Credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ messgae: error.message });
  }
};
export const createcourse = async (req, res) => {
  const { title, description, price, imageUrl } = req.body;
  const parsedBody = createCourseValidation.safeParse(req.body);
  console.log(req.adminId);
  if (!parsedBody.success) {
    return res.status(400).json({ message: parsedBody.error });
  }
  try {
    await courseModel.create({
      title: title,
      description: description,
      price: price,
      imageUrl: imageUrl,
      creatorId: req.adminId,
    });
    res.status(200).json({ message: "Course Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message, message: error });
  }
};
export const deletecourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    const delCourse = await courseModel.findOneAndDelete({
      _id: courseId,
      creatorId: req.adminId,
    });
    if (delCourse) {
      res.status(201).json({ message: "Course Deleted Successfully" });
    } else {
      res.status(404).json({ message: "Course Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const editcourse = async (req, res) => {
  const { title, description, price, imageUrl } = req.body;
  const creatorId = req.adminId;
  const courseId = req.params.id;
  console.log(creatorId);
  console.log(courseId);
  const parsedBody = createCourseValidation.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({ message: parsedBody.error });
  }
  try {
    const course = await courseModel.findOne({
      _id: courseId,
      creatorId: creatorId,
    });
    if (!course) {
      res.status(404).json({ message: "course not found" });
    } else {
      course.title = title;
      course.description = description;
      course.price = price;
      course.imageUrl = imageUrl;
      await course.save();
      res.status(200).json({ message: "Course Updated Successfully" });
    }
  } catch (error) {
    res.json({ messgae: error.message });
  }
};
export const getAdminCourses = async (req, res) => {
  const creatorId = req.adminId;
  try {
    const adminCourses = await courseModel.find({
      creatorId: creatorId,
    });
    if (!adminCourses) {
      res.status(404).json({ message: "No Courses Found" });
    } else {
      res.status(200).json({ message: adminCourses });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

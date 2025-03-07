import mongoose from "mongoose";
import express from "express";
import jwt from "jsonwebtoken";
export const adminAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decodedData = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    if (decodedData) {
      req.adminId = decodedData.id;
      next();
    } else {
      res.status(403).json({
        message: "Not Authorized",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

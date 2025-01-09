import mongoose from "mongoose";
import express from "express";
import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  const decodedData = jwt.verify(token,process.env.JWT_USER_SECRET);
  if(decodedData)
    {
        req.userId=decodedData.id
        next()
    }
    else
    {
        res.status(403).json(
            {
                message:"User Not Authorized"
            })
    }
};

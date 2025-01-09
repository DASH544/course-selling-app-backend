import express from "express";
import {
  createAdmin,
  adminSignin,
  createcourse,
  deletecourse,
  addcoursecontent,
} from "../controllers/admin.js";
import { adminAuth } from "../middlewares/admin.js";
const router = express.Router();
router.post("/signup",createAdmin);
router.post("/signin", adminSignin);
router.post("/createcourse", adminAuth,createcourse);
router.delete("/deletecourse/:id",adminAuth ,deletecourse);
router.put("/addcoursecontent",adminAuth,addcoursecontent);
export default router;

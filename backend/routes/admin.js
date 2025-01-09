import express from "express";
import {
  createAdmin,
  adminSignin,
  createcourse,
  deletecourse,
  editcourse,
  getAdminCourses
} from "../controllers/admin.js";
import { adminAuth } from "../middlewares/admin.js";
const router = express.Router();
router.post("/signup",createAdmin);
router.post("/signin", adminSignin);
router.post("/createcourse", adminAuth,createcourse);
router.delete("/deletecourse/:id",adminAuth ,deletecourse);
router.put("/editcourse/:id",adminAuth,editcourse);
router.get("/courses/all",adminAuth,getAdminCourses)
export default router;

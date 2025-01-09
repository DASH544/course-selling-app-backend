import express from "express";
import { getAllCourses, coursePurchase } from "../controllers/courses.js";
import { userAuth } from "../middlewares/users.js";

const router = express.Router();
router.get("/all", getAllCourses);
router.post("/purchase/:id", userAuth, coursePurchase);
export default router;

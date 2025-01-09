import express from "express";
import {

  createUser,
  getCoursesPurchased,
  userSignin,
} from "../controllers/users.js";
import { userAuth } from "../middlewares/users.js";
const router = express.Router();

router.post("/signup" ,createUser);
router.post("/signin", userSignin);

router.get("/courses/purchased",userAuth ,getCoursesPurchased);


export default router;

import mongoose from "mongoose";
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref:"Admin",
    required: true,
  },
});
export const courseModel = mongoose.model("courses", CourseSchema);

import mongoose from "mongoose";
const purchaseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Types.ObjectId,
    ref:"Course",
    required: true,
  },
    UserId: {
    type: mongoose.Types.ObjectId,
    ref:"User",
    required: true,
  },
});
export const purchaseModel = mongoose.model("purchases", purchaseSchema);

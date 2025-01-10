import express from 'express'
import { courseModel } from '../models/course.model';
import { purchaseModel } from '../models/purchase.model';
export const getAllCourses = async(req, res) => {
  try {
    const coursesAll=await courseModel.find({})
    if(coursesAll)
      {
        res.status(200).json({coursesData:coursesAll})
      }
      else
      {
        res.status(404).json({messgae:"Courses Not Found"})
      }
  } catch (error) {
    res.status(500).json({message:error.message})
  }
  };
  export const coursePurchase= async (req, res) => {
      const courseId=req.params.courseId
      const userId=req.userId
      try {
        await purchaseModel.create(
            {
              courseId:course._id,
              UserId:userId
            })
          res.status(200).json({message:"Course Purchased Successfully"})
      
      } catch (error) {
        res.status(500).json({message:error.message})
      }
  };
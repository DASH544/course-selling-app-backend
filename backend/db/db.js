import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.DB_URI}/course-database`
    );
    console.log(connection.connection.host)
  } catch (error) {
    console.log(error);
  }
};

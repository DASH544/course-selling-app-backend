import express from 'express'
import jwt from 'jsonwebtoken'
import usersRoutes from './routes/users.js'
import adminRoutes from './routes/admin.js'
import dotenv from 'dotenv'
import coursesRoutes from './routes/courses.js'
import { connectDB } from './db/db.js';
dotenv.config()
connectDB();
const app=express();
app.use(express.json())
app.use("/users",usersRoutes)
app.use("/admin",adminRoutes)
app.use("/courses",coursesRoutes)
app.listen(process.env.PORT,()=>
    {
        console.log(`http://localhost:${process.env.PORT}`)
    })
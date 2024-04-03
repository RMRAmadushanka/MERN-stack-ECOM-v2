import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

//Create app
const app = express()

//Middleware
app.use(morgan("dev"))
app.use(cors());

//DB
connectDB()

//Port
const port  = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})




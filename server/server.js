import cors from 'cors'
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
//Import Routes
import authRoutes from "./routes/authRoutes.js";
import bodyParser from "body-parser";

//Create app
const app = express()

//Middleware
app.use(cors())
app.use(express.json());
app.use(morgan("dev"))
app.use(bodyParser.json({limit:"2mb"}))
//DB
connectDB()


//Routes Middleware
app.use('/api',authRoutes)
//Port
const port  = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})




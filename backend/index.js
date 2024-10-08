import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/database.js";
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser"
import messageRouter from "./routes/messageRoute.js"
import cors from 'cors';
dotenv.config({});


const app = express();

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOption={
  origin:'http://localhost:3000',
  credentials:true
}
app.use(cors(corsOption));

//routes
app.use("/api/v1/user",userRouter)
app.use("/api/v1/message",messageRouter)

app.listen(PORT,()=>{
  connectDB();
  console.log(`Server listen at port ${PORT}`)
})
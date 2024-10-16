import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";

import connectDB from "./config/db";
 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection

connectDB();

// Routes
app.use("/auth", authRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




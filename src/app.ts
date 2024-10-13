import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRouters/*";

import connectDB from "./config/db"; ;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

connectDB();

// Routes
app.use("/auth", authRouter);



// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



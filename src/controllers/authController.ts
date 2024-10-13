import { Request, Response } from "express";
import User, { IUser } from "../models/Users";
import Class from "../models/Class";import bcrypt from "bcrypt";
import { createClass, isClassExists } from "../services/classServic";

export const teacherRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, password, className } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const classExists = await isClassExists(className);
    if (classExists) {
      res.status(500).json({ message: "Class already exists" });
      return;
    }
    const user = new User({ name, email, password: hashedPassword, className, role: "teacher" });
    user.save();
    console.log("----------------------")
    createClass(className);
    res.status(201).json({ message: "Teacher registered successfully" });
    return;
  }

  catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const studentRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, password, className } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const classExists = await isClassExists(className);
    if (!classExists) {
      res.status(404).json({ message: "Class not found" });
      return;
    }
    const user = new User({ name, email, password: hashedPassword, className, role: "student" });
    user.save();
    Class.findOneAndUpdate({ name: className }, { $push: { students: user._id } });
    console.log("----------------------")
    res.status(201).json({ message: "Student registered successfully" });
    return;
  }
  catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}



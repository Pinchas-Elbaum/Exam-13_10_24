import mongoose, { Schema, Document, Types } from "mongoose";
import Class from "./Class";
import validator from "validator";

export interface ITeacher extends Document {
  name: string;
  email: string;
  password: string;
  class: string 
}

const TeacherSchema = new Schema<ITeacher>({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true,
    minlength: [3, "name must be at least 3 characters long"],
    maxlength: [30, "name cannot exceed 30 characters"],
    match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (value: string) {
        return validator.isEmail(value);
      },
      message: "Please provide a valid email address",
    },
  },
  
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  class:{
    type: String,
    required: [true, "className is required"],
    unique: true,
    match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"],
  },
  
}
);

export default mongoose.model<ITeacher>("Teacher",TeacherSchema );

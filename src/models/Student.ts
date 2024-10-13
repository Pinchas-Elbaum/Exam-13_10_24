import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IStudent extends Document {
  name: string;
  email: string;
  password: string;
  class: Types.ObjectId;
  Grades: number[];
  }

const StudentSchema = new Schema<IStudent>({
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
  class: { type: Schema.Types.ObjectId, ref: "Class" },
  Grades: [Number]
});

export default mongoose.model<IStudent>("Teacher", StudentSchema );

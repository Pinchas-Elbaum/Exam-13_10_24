import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "student" | "teacher";
  class: Types.ObjectId;
  className: string;
  Grades?: number[];
  }

const UserSchema = new Schema< IUser>({
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
  role: {
    type: String,
    required: [true, "Role is required"], 
    enum: ["student", "teacher"], default : "student",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  class: { type: Schema.Types.ObjectId, ref: "Class" },
  className: { type: String },
  Grades: [Number]
});

export default mongoose.model<IUser>("User", UserSchema);

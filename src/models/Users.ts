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

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    unique: true,
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
  role: {
    type: String,
    required: [true, "Role is required"], 
    enum: ["student", "teacher"], default : "student",
  },
  class: { type: Schema.Types.ObjectId, ref: "Class" },
  className: { type: String,  required: true },
  Grades: [Number]
});

export default mongoose.model<IUser>("User", UserSchema);

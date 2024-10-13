import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClass extends Document {
  name: string;
  teacher?: Types.ObjectId;
  students?: Types.ObjectId[];
}

const ClassSchema = new Schema<IClass>({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true,
    minlength: [3, "name must be at least 3 characters long"],
    maxlength: [30, "name cannot exceed 30 characters"],
    match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"],
  },  
  teacher: { type: Schema.Types.ObjectId, ref: "User" },
  students: [{ type: Schema.Types.ObjectId, ref: "User" }],
});


export default mongoose.model<IClass>("Class",ClassSchema );

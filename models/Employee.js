import { Schema, model } from "mongoose";
import Collection from "../utils/collections.js";

const employeeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: Collection.User,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    dob: { type: Date },
    gender: { type: String },
    maritalStatus: { type: String },
    designation: { type: String },
    department: {
      type: Schema.Types.ObjectId,
      ref: Collection.Department,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Employee = model(Collection.Employee, employeeSchema);
export default Employee;

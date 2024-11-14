import { model, Schema } from "mongoose";
import Collection from "../utils/collections.js";

const salarySchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: Collection.Employee,
      trim: true,
      required: true,
    },
    salary: {
      type: Number,
      trim: true,
      required: true,
    },
    allowances: {
      type: Number,
      trim: true,
      default: 0,
    },
    deductions: {
      type: Number,
      trim: true,
      default: 0,
    },
    netSalary: {
      type: Number,
      trim: true,
      required: true,
    },
    paydate: {
      type: Date,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Salary = model(Collection.Salary, salarySchema);
export default Salary;

import { model, Schema } from "mongoose";
import Collection from "../utils/collections.js";
import Employee from "./Employee.js";
import Leave from "./Leave.js";
import Salary from "./Salary.js";
import User from "../models/User.js";

const departmentSchema = new Schema(
  {
    dep_name: {
      type: String,
      required: true,
      // minlength: 3,
      // maxlength: 50,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      // minlength: 10,
      // maxlength: 200,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: Collection.User,
    },
  },
  { timestamps: true }
);

// Cascade Delete functionality
departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const employees = await Employee.find({ department: this._id });
      const employee_id = employees.map((employee) => employee._id);
      const userId = employees.map((employee) => employee.userId);

      await User.deleteMany({ _id: userId });
      await Employee.deleteMany({ department: this._id });
      await Leave.deleteMany({ employeeId: { $in: employee_id } });
      await Salary.deleteMany({ employeeId: { $in: employee_id } });
      next();
    } catch (error) {
      next(error);
    }
  }
);

const DepartMent = model(Collection.Department, departmentSchema);
export default DepartMent;

import { model, Schema } from "mongoose";
import Collection from "../utils/collections.js";
import {
  Annual,
  Approved,
  Casual,
  Pending,
  Rejected,
  Sick,
} from "../utils/commonUtils.js";

const leaveSchema = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: Collection.Employee,
    trim: true,
    required: true,
  },
  leaveType: {
    type: String,
    enum: [Annual, Sick, Casual],
    trim: true,
    required: true,
  },
  startDate: {
    type: Date,
    trim: true,
    required: true,
  },
  endDate: {
    type: Date,
    trim: true,
    required: true,
  },
  reason: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    enum: [Pending, Approved, Rejected],
    default: Pending,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
},{timestamps: true});

const Leave = model(Collection.Leave, leaveSchema);
export default Leave;

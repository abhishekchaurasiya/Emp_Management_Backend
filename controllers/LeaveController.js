import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    if (!userId || !leaveType || !startDate || !endDate || !reason) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const employee = await Employee.findOne({ userId: userId });

    const leaveData = new Leave({
      employeeId: employee._id,
      leaveType: leaveType,
      startDate: startDate,
      endDate: endDate,
      reason: reason,
    });

    const leave = await leaveData.save();
    if (!leave) {
      return res
        .status(400)
        .json({ success: false, message: "Error saving leave request" });
    }

    return res
      .status(201)
      .json({ success: true, message: "Leave request created" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error creating leave request" });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name",
        },
      ],
    });

    // user Aggregation
    // const leaves = await Leave.aggregate([
    //   {
    //     $lookup: {
    //       from: "employees", // Collection name for employees
    //       localField: "employeeId",
    //       foreignField: "_id",
    //       as: "empdata",
    //     },
    //   },
    //   {
    //     $unwind: "$empdata", // Unwind to deconstruct empdata array
    //   },
    //   {
    //     $lookup: {
    //       from: "departments", // Collection name for departments
    //       localField: "empdata.department",
    //       foreignField: "_id",
    //       as: "empdata.depData",
    //     },
    //   },
    //   {
    //     $unwind: "$empdata.depData",
    //   },
    //   {
    //     $lookup: {
    //       from: "users", // Collection name for users
    //       localField: "empdata.userId",
    //       foreignField: "_id",
    //       as: "empdata.userInfo",
    //     },
    //   },
    //   {
    //     $unwind: "$empdata.userInfo",
    //   },
    //   {
    //     $project: {
    //       _id: 1,
    //       leaveType: 1, // Include leave fields you need
    //       startDate: 1,
    //       endDate: 1,
    //       status: 1,
    //       "empdata._id": 1,
    //       "empdata.depData.dep_name": 1,
    //       "empdata.userInfo.name": 1,
    //     },
    //   },
    // ]);

    if (leaves.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Leaves not found" });
    }
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error getting leaves" });
  }
};

const getLeaveList = async (req, res) => {
  try {
    const { id, role } = req.params;

    let leaveList;
    if (role === "admin") {
      leaveList = await Leave.find({ employeeId: id });
    } else {
      const employee = await Employee.findOne({ userId: id });
      leaveList = await Leave.find({ employeeId: employee._id });
    }


    return res.status(200).json({ success: true, leaves: leaveList });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error getting leave list" });
  }
};

const getLeaveDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: {
            name: 1,
            profileImage: 1,
          },
        },
      ],
    });
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error getting leave details" });
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leaveUpdate = await Leave.findByIdAndUpdate(
      { _id: id },
      { $set: { status: status } },
      { new: true, runValidators: true }
    );
    if (!leaveUpdate) {
      return res
        .status(400)
        .json({ success: false, error: "Leave request not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Leave request successfully completed ",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error updating leave status" });
  }
};

export {
  addLeave,
  getLeaves,
  getLeaveList,
  getLeaveDetails,
  updateLeaveStatus,
};

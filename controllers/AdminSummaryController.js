import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import Leave from "../models/Leave.js";


const getSummary = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();

    const totalResult = await Employee.aggregate([
      { $group: { _id: null, totalSalary: { $sum: "$salary" } } },
    ]);

    const totalSalary = totalResult.length > 0 ? totalResult[0].totalSalary : 0;

    const employeeAppliedForLeave = await Leave.distinct("employeeId");
    const leaveStatus = await Leave.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const leaveSummary = {
      appliedForLeave: employeeAppliedForLeave.length,
      approved:
        leaveStatus.find((leave) => leave?._id === "Approved")?.count || 0,
      pending:
        leaveStatus.find((leave) => leave?._id === "Pending")?.count || 0,
      rejected:
        leaveStatus.find((leave) => leave?._id === "Rejected")?.count || 0,
    };


    const summary = {
      totalEmployees,
      totalDepartments,
      totalSalary,
      leaveSummary,
    };

    return res.status(200).json({ success: true, summary });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export { getSummary };

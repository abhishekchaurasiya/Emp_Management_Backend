import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";

const addSalary = async (req, res) => {
  try {
    const { employeeId, salary, allowances, deductions, paydate } = req.body;
    
    if (!employeeId || !salary || !allowances || !deductions || !paydate) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required!" });
    }

    const totalSalary =
      parseInt(salary) + parseInt(allowances) - parseInt(deductions);

    if (totalSalary < 0) {
      return res
        .status(400)
        .json({ success: false, error: "Total salary cannot be negative." });
    }

    const newSalary = new Salary({
      employeeId: employeeId,
      salary: salary,
      allowances: allowances,
      deductions: deductions,
      netSalary: totalSalary,
      paydate: paydate,
    });

    // await Employee.findByIdAndUpdate(
    //   { _id: employeeId },
    //   { $set: { salary: totalSalary } },
    //   { upsert: true }
    // );

    await newSalary.save();

    return res
      .status(201)
      .json({ success: true, message: "Salary added successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error to add salary." });
  }
};

const getSalary = async (req, res) => {
  try {
    const { id, role } = req.params; // here is getting userId means(admin or employee)
    let salaries;

    if (role === "admin") {
      salaries = await Salary.find({ employeeId: id }).populate(
        "employeeId",
        "employeeId"
      );
    } else {
      const employee = await Employee.findOne({ userId: id });
      if (!employee) {
        return res
          .status(404)
          .json({ success: false, error: "Employee not found" });
      }
      salaries = await Salary.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId"
      );
    }

    return res.status(200).json({ success: true, salaries });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error for get salary..." });
  }
};

export { addSalary, getSalary };

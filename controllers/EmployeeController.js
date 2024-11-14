import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import uploadCloudinaryImage from "../config/cloudinary.js";

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const image = req.file;

    // Validate the data
    if (!name || !email || !employeeId || !dob || !gender || !maritalStatus || !designation || !department || !salary || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email: email }, { new: true });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const upload_image = await uploadCloudinaryImage(image)

    // Here created a new user means admin or employee
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: upload_image?.secure_url,

    });

    const savedUser = await newUser.save();

    // here create a employee
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();

    return res.status(201).json({ success: true, message: "Employee created" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error in adding employee" });
  }
};

const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", "-__v -password")
      .populate("department", { __v: 0 })
      .select("-__v");
    if (employees.length < 1) {
      return res
        .status(400)
        .json({ success: false, error: "Not employees found" });
    }
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error in getting employee" });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    let employee;
    // find the employee by employeeId
    employee = await Employee.findById({ _id: id })
      .populate("userId", "-__v -password  -createdAt -updatedAt")
      .populate("department", "-__v -password  -createdAt -updatedAt")
      .select("-__v");

    // find the user by useId inside the employee model
    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", "-__v -password -createdAt -updatedAt")
        .populate("department", "-__v  -createdAt -updatedAt")
        .select("-__v -createdAt -updatedAt");
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error in getting employee" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, department, designation, salary } = req.body;

    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res
        .status(400)
        .json({ success: false, error: "Employee not found" });
    }

    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res.status(400).json({ success: false, error: "User not found" });
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      {
        $set: {
          name: name,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: employee._id },
      {
        $set: {
          maritalStatus: maritalStatus,
          designation: designation,
          salary: salary,
          department: department,
        },
      }
    );

    if (!updateUser || !updateEmployee) {
      return res
        .status(400)
        .json({ success: false, error: "Failed to update employee" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Successfully Updated!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error in updating employee" });
  }
};

const getEmployeeByDepId = async (req, res) => {
  try {
    const { id: depId } = req.params;
    const employees = await Employee.find({ department: depId });
    if (employees.length < 1) {
      return res.status(400).json({
        success: false,
        error: "No employees found in this department",
      });
    }
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error in getting employee by department",
    });
  }
};

export {
  addEmployee,
  getEmployee,
  getEmployeeById,
  updateEmployee,
  getEmployeeByDepId,
};

import DepartMent from "../models/Department.js";
import { isValidId } from "../utils/commonMethod.js";

export const addDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required!" });
    }

    const newDepartment = new DepartMent({
      dep_name: name,
      description,
    });

    await newDepartment.save();
    return res.status(201).json({ success: true, department: newDepartment });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add department server error!" });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const depData = await DepartMent.find().select("-__v");
    if (!depData) {
      return res
        .status(400)
        .json({ success: false, error: "Not departments found!" });
    }

    return res.status(200).json({ success: true, departments: depData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get department server" });
  }
};

export const getDepartmentsById = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await DepartMent.findById({ _id: id }).select("-__v");
    if (!department) {
      return res
        .status(400)
        .json({ success: false, error: "Department not found!" });
    }

    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get data department server" });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const updateDepartment = await DepartMent.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          dep_name,
          description,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateDepartment) {
      return res.status(400).json({
        success: false,
        error: "Some error for update department data!",
      });
    }

    return res
      .status(200)
      .json({ success: true, department: updateDepartment });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "update department server" });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID!" });
    }

    const deleteDep = await DepartMent.findById({ _id: id });
    if (!deleteDep) {
      return res
        .status(400)
        .json({ success: false, error: "Department not found!" });
    }
    await deleteDep.deleteOne();

    return res
      .status(200)
      .json({
        success: true,
        department: deleteDep,
        message: "Department deleted successfully...",
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "delete department server" });
  }
};

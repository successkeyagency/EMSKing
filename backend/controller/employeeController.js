import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Department from "../models/Department.js";

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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User already exists." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.path : "",
    });

    const savedUser = await newUser.save();

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

    return res.status(200).json({ success: true, message: "Employee created successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error while adding employee." });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server error while fetching employees." });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee = await Employee.findById(id)
      .populate("userId", { password: 0 })
      .populate("department");

    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server error while fetching employee." });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found." });
    }

    const updates = { name };
    if (req.file) {
      updates.profileImage = req.file.path;
    }

    await User.findByIdAndUpdate(employee.userId, updates, { new: true });
    await Employee.findByIdAndUpdate(id, { maritalStatus, designation, salary, department }, { new: true });

    return res.status(200).json({ success: true, message: "Employee updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error while updating employee." });
  }
};

const updateEmployeeImage = async (req, res) => {
  try {
    const { id } = req.params;
    const imageUrl = req.file?.path;

    if (!imageUrl) {
      return res.status(400).json({ success: false, error: "No image uploaded." });
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found." });
    }

    await User.findByIdAndUpdate(employee.userId, { profileImage: imageUrl }, { new: true });

    return res.status(200).json({ success: true, profileImage: imageUrl });
  } catch (error) {
    console.error("Error updating image:", error);
    return res.status(500).json({ success: false, error: "Server error while updating image." });
  }
};

const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.find({ department: id })
      .populate("userId", { password: 0 })
      .populate("department");

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server error while fetching employees by department." });
  }
};

export {
  addEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  updateEmployeeImage,
  fetchEmployeesByDepId,
};

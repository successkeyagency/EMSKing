import Department from "../models/Department.js";
import mongoose from "mongoose";

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
        return res.status(200).json({success: true, departments})
    } catch(error) {
        return res.status(500).json({success: false, error: "get department server error"})
    }
}

const addDepartment = async (req, res) => {
    try {
        const {dep_name, description} = req.body;
        const newDep = new Department({ 
            dep_name,
            description
        })
        await newDep.save()
        return res.status(200).json({success: true, department: newDep})
    } catch(error) {
        return res.status(500).json({success: false, error: "add department server error"})
    }
}

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid department ID" });
    }

    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department });
  } catch (error) {
    console.error("Error in getDepartment:", error);
    return res.status(500).json({ success: false, error: "get department server error" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    if (!dep_name) {
      return res.status(400).json({ success: false, error: "Department name is required" });
    }

    const updateDep = await Department.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true, runValidators: true }  
    );

    if (!updateDep) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department: updateDep });
  } catch (error) {
    console.error("Error updating department:", error);
    return res.status(500).json({ success: false, error: "Edit department server error" });
  }
};


const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, error: "Department ID is required" });
    }

    const deletedep = await Department.findById(id);

    if (!deletedep) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    await deletedep.deleteOne();

    return res.status(200).json({ success: true, deletedep });
  } catch (error) {
    console.error("Error deleting department:", error);
    return res.status(500).json({ success: false, error: error.message || "Delete department server error" });
  }
};



export {addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment}
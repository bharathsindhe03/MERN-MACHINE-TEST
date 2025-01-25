const express = require("express");
const { upload } = require("../middleware/multer");
const Employee = require("../models/Employee");
const router = express.Router();

// Create Employee
router.post("/create", upload.single("image"), async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;

  if (!name || !email || !mobile || !designation || !gender || !course) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  if (!/^\d+$/.test(mobile)) {
    return res.status(400).json({ message: "Mobile number must be numeric." });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  try {
    const isDuplicate = await Employee.findOne({ email });
    if (isDuplicate) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const newEmployee = new Employee({
      eid: (await Employee.countDocuments()) + 1,
      name,
      email,
      mobile,
      designation,
      gender,
      course: Array.isArray(course) ? course : [course],
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee created successfully!" });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Error creating employee." });
  }
});

// Get All Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ message: "Error occurred while fetching employees." });
  }
});

// Get Employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ eid: req.params.id });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Error occurred." });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;

    if (!/^\d+$/.test(mobile)) {
      return res
        .status(400)
        .json({ message: "Mobile number must be numeric." });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const updateData = {
      name,
      email,
      mobile,
      designation,
      gender,
      course: course ? JSON.parse(course) : [],
    };

    // Log the uploaded file
    if (req.file) {
      console.log("File uploaded:", req.file);
      updateData.image = `/uploads/${req.file.filename}`;
    } else {
      console.log("No file uploaded.");
    }

    const employee = await Employee.findOneAndUpdate(
      { eid: req.params.id },
      updateData,
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res
      .status(200)
      .json({ message: "Employee updated successfully!", employee });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Error updating employee" });
  }
});

// Delete Employee
router.delete("/:id", async (req, res) => {
  try {
    const result = await Employee.deleteOne({ eid: req.params.id });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Error deleting employee" });
  }
});

module.exports = router;

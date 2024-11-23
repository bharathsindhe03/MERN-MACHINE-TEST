const express = require('express');
const multer = require('multer');
const Employee = require('../models/Employee');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Create Employee
router.post('/create', upload.single('image'), async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;

  if (!name || !email || !mobile || !designation || !gender || !course || !req.file) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    const employeeCount = await Employee.countDocuments();
    const newEmployeeId = employeeCount + 1;

    const newEmployee = new Employee({
      eid: newEmployeeId,
      name,
      email,
      mobile,
      designation,
      gender,
      course: Array.isArray(course) ? course : [course],
      image: `/uploads/${req.file.filename}`,
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully!', employee: newEmployee });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Get All Employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error occurred while fetching employees.' });
  }
});

// Get Employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findOne({ eid: req.params.id });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Error occurred.' });
  }
});

// Update Employee
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      designation: req.body.designation,
      gender: req.body.gender,
      course: req.body.course ? JSON.parse(req.body.course) : undefined,
    };

    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const employee = await Employee.findOneAndUpdate({ eid: req.params.id }, updateData, { new: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    res.status(200).json({ message: 'Employee updated successfully!', employee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Error updating employee' });
  }
});

// Delete Employee
router.delete('/:id', async (req, res) => {
  try {
    const result = await Employee.deleteOne({ eid: req.params.id });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Employee deleted successfully' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Error deleting employee' });
  }
});

module.exports = router;

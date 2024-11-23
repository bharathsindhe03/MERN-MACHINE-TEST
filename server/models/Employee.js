const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  eid: { type: Number, unique: true, required: true },
  name: String,
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  designation: String,
  gender: String,
  course: [String],
  image: String,
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', EmployeeSchema);

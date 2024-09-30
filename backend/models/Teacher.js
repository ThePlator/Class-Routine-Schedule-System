const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String },
  phoneNumber: { type: String },
  department: { type: String },
  joinDate: { type: Date },
});

module.exports = mongoose.model('Teacher', TeacherSchema);
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: String,
  role: String,
  experience: String,
  location: String,
  salary: String,
  jobType: String,
  salaryMin: String,
  salaryMax: String,
  deadline: String,
  description: String,
  time: { type: String, default: "Just now" }
});

module.exports = mongoose.model("Job", JobSchema);

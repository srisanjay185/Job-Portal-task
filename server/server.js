const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Job = require("./models/job");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = "mongodb://127.0.0.1:27017/jobportal"; // Local MongoDB

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(5000, () => console.log("Server running on port 5000"));
})
.catch(err => console.error("MongoDB connection error:", err));

// --------------------
// Routes (no separate folder)
// --------------------

// Get all jobs
app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ _id: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new job
app.post("/jobs", async (req, res) => {
  const job = new Job(req.body);
  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

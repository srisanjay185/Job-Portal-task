import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../styles.css";

const initialJobs = [
  {
    id: 1,
    company: "Amazon",
    role: "Full Stack Developer",
    experience: "1-3 yr Exp",
    location: "Onsite",
    salary: "12 LPA",
    time: "24h Ago",
  },
  {
    id: 2,
    company: "Tesla",
    role: "Node Js Developer",
    experience: "1-3 yr Exp",
    location: "Onsite",
    salary: "12 LPA",
    time: "24h Ago",
  },
  {
    id: 3,
    company: "Swiggy",
    role: "UX/UI Designer",
    experience: "1-3 yr Exp",
    location: "Onsite",
    salary: "12 LPA",
    time: "24h Ago",
  },
  {
    id: 1,
    company: "Amazon",
    role: "Full Stack Developer",
    experience: "1-3 yr Exp",
    location: "Onsite",
    salary: "12 LPA",
    time: "24h Ago",
  },
  {
    id: 2,
    company: "Tesla",
    role: "Node Js Developer",
    experience: "1-3 yr Exp",
    location: "Onsite",
    salary: "12 LPA",
    time: "24h Ago",
  },
  {
    id: 3,
    company: "Swiggy",
    role: "UX/UI Designer",
    experience: "1-3 yr Exp",
    location: "Onsite",
    salary: "12 LPA",
    time: "24h Ago",
  },
  {
    id: 1,
    company: "Amazon",
    role: "Full Stack Developer",
    experience: "1-3 yr Exp",
    location: "Onsite",
    salary: "12 LPA",
    time: "24h Ago",
  }
];

export default function JobPortal() {
  const [jobs, setJobs] = useState(initialJobs);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("apply");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Load dynamic jobs on mount
  useEffect(() => {
    axios.get("http://localhost:5000/jobs").then((res) => {
      setJobs([...initialJobs, ...res.data]);
    });
  }, []);

  const handleCreateClick = () => {
    setFormType("create");
    setShowForm(true);
    reset();
  };

  const onSubmit = async (data) => {
    if (formType === "create") {
      const newJob = {
        company: data.companyName,
        role: data.jobTitle,
        experience: "0-1 yr Exp",
        location: data.location,
        salary: `${data.salaryMin} - ${data.salaryMax}`,
        time: "Just now",
        jobType: data.jobType,
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        deadline: data.deadline,
        description: data.description,
      };

      const res = await axios.post("http://localhost:5000/jobs", newJob);
      setJobs([res.data, ...jobs]);
    }
    setShowForm(false);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo-section">
          <img src="https://cybermindworks.com/images/cmwlogo.svg" alt="logo" className="logo" />
        </div>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Find Jobs</a>
          <a href="#">Find Talents</a>
          <a href="#">About us</a>
          <a href="#">Testimonials</a>
        </nav>
        <button className="create-job-btn" onClick={handleCreateClick}>
          Create Jobs
        </button>
      </header>

      <div className="filters">
        <input type="text" placeholder="Search By Job Title, Role" className="search-input" />
        <select className="dropdown">
          <option>Preferred Location</option>
          <option>Chennai</option>
          <option>Bangalore</option>
          <option>Coimbatore</option>
        </select>
        <select className="dropdown">
          <option>Job type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>
        <div className="salary-range">
          <span>Salary Per Month</span>
          <input type="range" min="50000" max="80000" />
          <span className="range-label">₹50k - ₹80k</span>
        </div>
      </div>

      <div className="job-grid">
        {jobs.map((job, idx) => (
          <div className="job-card" key={idx}>
            <div className="card-header">
              <img
                src={`/${job.company?.toLowerCase()}.png`}
                alt={job.company}
                className="company-logo"
              />
              <span className="badge">{job.time || "Just now"}</span>
            </div>
            <h3 className="job-title">{job.role}</h3>
            <span className="job-info">👤 {job.experience || "0-1 yr Exp"}</span> &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="job-info">📍 {job.location}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="job-info">💰 {job.salary}</span>
            <ul className="job-desc">
              <li>A user-friendly interface lets you browse stunning photos and videos</li>
              <li>Filter destinations based on interests and travel style, and create personalized</li>
            </ul>
            <button className="apply-btn" onClick={() => setFormType("apply")}>
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal">
          <form className="job-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="job-header">
              <h2 className="modal-title">Create Job Opening</h2>
            </div>

            <div className="form-row">
              <label>Job Title</label>
              <input {...register("jobTitle", { required: true })} placeholder="Full Stack Developer" />
              {errors.jobTitle && <span className="error">This field is required</span>}
            </div>

            <div className="form-row">
              <label>Company Name</label>
              <input {...register("companyName", { required: true })} placeholder="Amazon, Google, etc." />
              {errors.companyName && <span className="error">This field is required</span>}
            </div>

            <div className="form-row">
              <label>Location</label>
              <input {...register("companyName", { required: true })} placeholder="Chennai" />
              {errors.location && <span className="error">This field is required</span>}
            </div>

            <div className="form-row">
              <label>Job Type</label>
              <select {...register("jobType", { required: true })}>
                <option value="">Select</option>
                <option value="Internship">Internship</option>
                <option value="Full Time">Full Time</option>
                <option value="Partime">Partime</option>
                <option value="Contract">Contract</option>
              </select>
              {errors.jobType && <span className="error">This field is required</span>}
            </div>

            <div className="form-row salary-range-fields">
              <label>Salary Range</label>
              <div className="salary-range">
                <input type="text" {...register("salaryMin", { required: true })} placeholder="₹0" />
                <input type="text" {...register("salaryMax", { required: true })} placeholder="₹12,00,000" />
              </div>
              {(errors.salaryMin || errors.salaryMax) && <span className="error">This field is required</span>}
            </div>

            <div className="form-row">
              <label>Application Deadline</label>
              <input type="date" {...register("deadline", { required: true })} />
              {errors.deadline && <span className="error">This field is required</span>}
            </div>

            <div className="form-row">
              <label>Job Description</label>
              <textarea {...register("description", { required: true })} placeholder="Please share a description to let the candidate know..." />
              {errors.description && <span className="error">This field is required</span>}
            </div>

            <div className="form-actions"> 
              <button type="button" className="draft-btn" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="publish-btn">Publish »</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

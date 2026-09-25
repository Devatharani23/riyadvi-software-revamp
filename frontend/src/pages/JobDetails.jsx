import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { jobs } from "../data/content";

export default function JobDetails() {
  const { slug } = useParams();

  const job = jobs.find(
    (item) => String(item.slug).trim() === String(slug).trim()
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!job) {
    return (
      <div className="page container">
        <div className="eyebrow">CAREERS</div>

        <h1>Job not found.</h1>

        <p style={{ color: "#888", marginBottom: "25px" }}>
          The position you are looking for does not exist or the URL is
          incorrect.
        </p>

        <Link className="button gold-btn" to="/careers">
          Back to careers
        </Link>
      </div>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const base =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

      const payload = {
        ...formData,
        jobTitle: job.title,
        jobSlug: job.slug,
      };

      const response = await fetch(`${base}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            result.message ||
            "Application submission failed."
        );
      }

      setSubmitted(true);
      setStatus("");
    } catch (error) {
      console.error("Application error:", error);

      setStatus(
        error.message ||
          "Something went wrong while submitting your application."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page container">

      {/* HERO */}
      <div className="detail-hero">

        <div>
          <div className="eyebrow">
            CAREERS / OPEN POSITION
          </div>

          <h1>{job.title}</h1>

          <p>{job.summary}</p>

          <div className="pill-row">
            <span>{job.department}</span>
            <span>{job.experience}</span>
            <span>{job.location}</span>
            <span>{job.type}</span>
          </div>
        </div>

        <div className="scene compact">
          <div className="page-orbit">R</div>
        </div>

      </div>


      {/* MAIN CONTENT */}
      <div className="detail-grid">

        {/* LEFT SIDE */}
        <div>

          <h2>About the role</h2>

          <p>
            {job.summary}
          </p>


          {/* RESPONSIBILITIES */}
          <h2>Responsibilities</h2>

          <div className="feature-list">

            {job.responsibilities?.map((item, index) => (
              <div key={index}>

                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p>{item}</p>

              </div>
            ))}

          </div>


          {/* REQUIREMENTS */}
          <h2>Requirements</h2>

          <div className="feature-list">

            {job.requirements?.map((item, index) => (
              <div key={index}>

                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p>{item}</p>

              </div>
            ))}

          </div>

        </div>


        {/* RIGHT SIDE */}
        <div>

          <h2>Apply for this position</h2>

          {submitted ? (

            <div className="success-box">

              <div className="eyebrow">
                APPLICATION RECEIVED
              </div>

              <h1>
                Thanks for applying.
              </h1>

              <p>
                Your application for{" "}
                <strong>{job.title}</strong>{" "}
                has been received successfully.
              </p>

              <Link
                className="button gold-btn"
                to="/careers"
              >
                Back to careers
              </Link>

            </div>

          ) : (

            <form
              className="form"
              onSubmit={handleSubmit}
            >

              {/* NAME */}
              <label>
                Full name

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </label>


              {/* EMAIL */}
              <label>
                Email address

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </label>


              {/* PHONE */}
              <label>
                Phone number

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                />
              </label>


              {/* RESUME */}
              <label>
                Resume / CV link

                <input
                  type="url"
                  name="resume"
                  value={formData.resume}
                  onChange={handleChange}
                  placeholder="Google Drive / LinkedIn / portfolio link"
                />
              </label>


              {/* MESSAGE */}
              <label>
                Cover message

                <textarea
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us why you are interested in this role."
                />
              </label>


              {/* ERROR */}
              {status && (
                <div
                  className="form-status"
                  aria-live="polite"
                >
                  {status}
                </div>
              )}


              {/* SUBMIT */}
              <button
                className="button gold-btn"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : "Submit application ↗"}
              </button>

            </form>

          )}

        </div>

      </div>

    </div>
  );
}
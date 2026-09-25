import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LeadMagnet() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [done, setDone] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const base =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

      const res = await fetch(`${base}/api/lead-magnet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error || result.message || "Submission failed"
        );
      }

      setDone(true);
    } catch (error) {
      console.error("Lead magnet error:", error);

      setStatus(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="page container narrow health-success-page">
        <div className="success-box">
          <div className="eyebrow">REQUEST RECEIVED</div>

          <h1>Your project planning guide is ready.</h1>

          <p>
            Thanks for sharing your details. You can now access the
            Software Project Planning Guide.
          </p>

          <div className="actions">
            <a
              href="/software-project-planning-guide.pdf"
              className="button gold-btn"
              target="_blank"
              rel="noreferrer"
            >
              Access the guide ↗
            </a>

            <Link to="/contact" className="button ghost-btn">
              Contact Riyadvi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page container narrow">
      <div className="eyebrow">
        SOFTWARE PROJECT PLANNING GUIDE
      </div>

      <h1>
        Plan your next software project with clarity.
      </h1>

      <p className="health-intro">
        Get a practical guide to help you understand project
        requirements, technology choices, development planning,
        timelines and important considerations before starting a
        software project.
      </p>

      <div className="progress">
        <span style={{ width: "100%" }} />
      </div>

      <div className="wizard">
        <div className="wizard-heading">
          <span className="step-number">01</span>

          <div>
            <h2>Get the free guide</h2>

            <p>
              Enter your details and we'll give you access to the
              Software Project Planning Guide.
            </p>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
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

          <label>
            Company

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company name"
              required
            />
          </label>

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

          <label>
            Phone number

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
            />
          </label>

          {status && (
            <div className="form-status" aria-live="polite">
              {status}
            </div>
          )}

          <button
            className="button gold-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Get the guide ↗"}
          </button>
        </form>
      </div>
    </div>
  );
}
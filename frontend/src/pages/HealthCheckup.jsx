import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HealthCheckup() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const total = 5;

  const [answers, setAnswers] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    website: "",
    marketing: "",
    technology: "",
    challenges: "",
  });

  const topics = [
    "business",
    "website",
    "marketing",
    "technology",
    "challenges",
  ];

  const titles = [
    "Business information",
    "Website & digital presence",
    "Marketing",
    "Technology",
    "Business challenges",
  ];

  const descriptions = [
    "Tell us about your business and what you are currently working on.",
    "Help us understand your current website and digital presence.",
    "Tell us about your current marketing activities and goals.",
    "Share the technology your business currently uses.",
    "Tell us about the biggest digital challenges you want to solve.",
  ];

  function updateAnswer(field, value) {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function next() {
    setStatus("");

    // Validate contact information before moving to the assessment
    if (step === 1) {
      if (!answers.name.trim()) {
        setStatus("Please enter your name.");
        return;
      }

      if (!answers.email.trim()) {
        setStatus("Please enter your email.");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) {
        setStatus("Please enter a valid email address.");
        return;
      }

      setStep(2);
      return;
    }

    if (step < total) {
      setStep((prev) => prev + 1);
      return;
    }

    setLoading(true);

    try {
      const base =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

      const res = await fetch(`${base}/api/health-checkup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error || result.message || "Submission failed"
        );
      }

      setDone(true);
    } catch (error) {
      console.error("Health checkup error:", error);

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
          <div className="eyebrow">SUBMITTED</div>

          <h1>Your health checkup is ready for review.</h1>

          <p>
            Thanks for sharing your business information. Our team can now
            review your responses and understand where your business can
            improve digitally.
          </p>

          <Link className="button gold-btn" to="/contact">
            Continue to contact ↗
          </Link>
        </div>
      </div>
    );
  }

  // Step 1 is the contact-information step
  if (step === 1) {
    return (
      <div className="page container narrow health-checkup-page">
        <div className="eyebrow">BUSINESS HEALTH CHECKUP / 01</div>

        <h1>
          Is your business ready for its next digital growth stage?
        </h1>

        <p className="health-intro">
          Start with your details, then answer a few questions about your
          business. Your responses help us understand your current digital
          situation.
        </p>

        <div className="progress">
          <span style={{ width: "20%" }} />
        </div>

        <div className="wizard">
          <div className="wizard-heading">
            <span className="step-number">01</span>

            <div>
              <h2>Tell us about yourself</h2>
              <p>
                We'll use these details to follow up on your health checkup.
              </p>
            </div>
          </div>

          <div className="health-contact-grid">
            <label>
              Full name
              <input
                type="text"
                value={answers.name}
                onChange={(e) =>
                  updateAnswer("name", e.target.value)
                }
                placeholder="Your full name"
                required
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                value={answers.email}
                onChange={(e) =>
                  updateAnswer("email", e.target.value)
                }
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="full-width">
              Phone number
              <input
                type="tel"
                value={answers.phone}
                onChange={(e) =>
                  updateAnswer("phone", e.target.value)
                }
                placeholder="+91 98765 43210"
              />
            </label>
          </div>

          {status && (
            <div className="form-status" aria-live="polite">
              {status}
            </div>
          )}

          <button
            className="button gold-btn"
            type="button"
            onClick={next}
          >
            Start assessment ↗
          </button>
        </div>
      </div>
    );
  }

  const currentTopic = topics[step - 2];
  const currentTitle = titles[step - 2];
  const currentDescription = descriptions[step - 2];

  return (
    <div className="page container narrow health-checkup-page">
      <div className="eyebrow">
        BUSINESS HEALTH CHECKUP / 0{step}
      </div>

      <h1>
        Is your business ready for its next digital growth stage?
      </h1>

      <p className="health-intro">
        Answer a few questions so we can understand your current digital
        position.
      </p>

      <div className="progress">
        <span style={{ width: `${(step / total) * 100}%` }} />
      </div>

      <div className="wizard">
        <div className="wizard-heading">
          <span className="step-number">
            {String(step).padStart(2, "0")}
          </span>

          <div>
            <h2>{currentTitle}</h2>
            <p>{currentDescription}</p>
          </div>
        </div>

        <label>
          Your response

          <textarea
            rows="7"
            value={answers[currentTopic]}
            onChange={(e) =>
              updateAnswer(currentTopic, e.target.value)
            }
            placeholder="Tell us a little about your current situation."
          />
        </label>

        {status && (
          <div className="form-status" aria-live="polite">
            {status}
          </div>
        )}

        <div className="wizard-actions">
          <button
            className="button ghost-btn"
            type="button"
            onClick={() => {
              setStatus("");
              setStep((prev) => prev - 1);
            }}
          >
            ← Back
          </button>

          <button
            className="button gold-btn"
            type="button"
            onClick={next}
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : step === total
              ? "Submit assessment"
              : "Continue ↗"}
          </button>
        </div>
      </div>
    </div>
  );
}
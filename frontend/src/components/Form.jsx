import React, { useState } from "react";

export default function Form({ type = "contact", fields = [] }) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const endpoint = {
      contact: "/api/contact",
      consultation: "/api/consultation",
      health: "/api/health-checkup",
      lead: "/api/lead-magnet",
      application: "/api/applications",
    }[type] || "/api/contact";

    try {
      const base =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

      const res = await fetch(`${base}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Try to read the backend response
      const result = await res.json();

      // Handle backend errors
      if (!res.ok) {
        throw new Error(result.message || "Request failed");
      }

      // Success
      setStatus(
        result.message ||
          "Submitted successfully. Your information has been received."
      );

      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);

      setStatus(
        error.message ||
          "Something went wrong while submitting. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      {fields.map((field) => (
        <label key={field.name}>
          {field.label}

          <input
            name={field.name}
            type={field.type || "text"}
            required={field.required !== false}
            placeholder={field.placeholder || ""}
          />
        </label>
      ))}

      <label>
        Message

        <textarea
          name="message"
          rows="5"
          placeholder="Tell us what you want to build."
        />
      </label>

      <button
        className="button gold-btn"
        type="submit"
        disabled={loading}
      >
        {loading ? "Sending..." : "Submit enquiry ↗"}
      </button>

      <div className="form-status" aria-live="polite">
        {status}
      </div>
    </form>
  );
}
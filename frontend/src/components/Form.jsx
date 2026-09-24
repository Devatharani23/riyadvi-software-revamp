import React, { useState } from "react";

export default function Form({type="contact", fields=[]}) {
  const [status,setStatus] = useState("");
  const [loading,setLoading] = useState(false);
  async function submit(e) {
    e.preventDefault(); setLoading(true); setStatus("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const endpoint = {
      contact:"/api/contact", consultation:"/api/consultation",
      health:"/api/health-checkup", lead:"/api/lead-magnet", application:"/api/applications"
    }[type] || "/api/contact";
    try {
      const base = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(base + endpoint, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
      if (!res.ok) throw new Error("Request failed");
      setStatus("Submitted successfully. Your information has been received.");
      e.currentTarget.reset();
    } catch {
      setStatus("Demo mode: the form is ready, but the backend is not running. Start the backend to save submissions.");
    } finally { setLoading(false); }
  }
  return <form className="form" onSubmit={submit}>
    {fields.map(f => <label key={f.name}>{f.label}<input name={f.name} type={f.type||"text"} required={f.required!==false} placeholder={f.placeholder||""}/></label>)}
    <label>Message<textarea name="message" rows="5" placeholder="Tell us what you want to build." /></label>
    <button className="button gold-btn" disabled={loading}>{loading ? "Sending..." : "Submit enquiry ↗"}</button>
    <div className="form-status" aria-live="polite">{status}</div>
  </form>;
}
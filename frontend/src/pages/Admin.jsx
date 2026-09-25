import React, { useEffect, useMemo, useState } from "react";

export default function Admin() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function loadLeads() {
      try {
        const base =
          import.meta.env.VITE_API_URL || "http://localhost:5000";

        const response = await fetch(`${base}/api/leads`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || result.error || "Failed to load leads"
          );
        }

        setLeads(result.leads || []);
      } catch (err) {
        console.error("Admin API error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeads();
  }, []);

  const counts = {
    enquiries: leads.filter((lead) => lead.type === "contact").length,
    consultations: leads.filter(
      (lead) => lead.type === "consultation"
    ).length,
    health: leads.filter(
      (lead) => lead.type === "health-checkup"
    ).length,
    magnet: leads.filter(
      (lead) => lead.type === "lead-magnet"
    ).length,
    applications: leads.filter(
      (lead) => lead.type === "application"
    ).length,
  };

  const cards = [
    ["contact", counts.enquiries, "Enquiries"],
    ["consultation", counts.consultations, "Consultations"],
    ["health-checkup", counts.health, "Health Checkups"],
    ["lead-magnet", counts.magnet, "Lead Magnet Leads"],
    ["application", counts.applications, "Applications"],
  ];

  const filteredLeads = useMemo(() => {
    if (filter === "all") return leads;

    return leads.filter((lead) => lead.type === filter);
  }, [leads, filter]);

  function formatType(type) {
    const labels = {
      contact: "Enquiry",
      consultation: "Consultation",
      "health-checkup": "Health Checkup",
      "lead-magnet": "Lead Magnet",
      application: "Application",
    };

    return labels[type] || type;
  }

  function formatDate(date) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="page container">

      {/* HEADER */}
      <div className="page-hero admin-hero">
        <div>
          <div className="eyebrow">
            ADMIN / LEAD MANAGEMENT
          </div>

          <h1>Lead management dashboard.</h1>

          <p>
            View enquiries, consultations, health checkups,
            lead magnet requests and job applications.
          </p>
        </div>
      </div>


      {/* STATS */}
      <div className="admin-grid">

        {cards.map(([type, number, label]) => (
          <button
            key={label}
            className={`admin-card ${
              filter === type ? "active" : ""
            }`}
            onClick={() =>
              setFilter(filter === type ? "all" : type)
            }
          >
            <b>{number}</b>
            <span>{label}</span>
          </button>
        ))}

      </div>


      {/* TABLE HEADER */}
      <div className="admin-toolbar">

        <div>
          <div className="eyebrow">
            SUBMISSIONS
          </div>

          <h2>
            {filter === "all"
              ? "All submissions"
              : formatType(filter)}
          </h2>
        </div>

        <button
          className="admin-filter"
          onClick={() => setFilter("all")}
        >
          {filter === "all"
            ? "All leads"
            : "Show all"}
        </button>

      </div>


      {/* ERROR */}
      {error && (
        <div className="form-status">
          {error}
        </div>
      )}


      {/* TABLE */}
      <div className="admin-table">

        <div className="table-head">
          <span>Name</span>
          <span>Type</span>
          <span>Status</span>
          <span>Date</span>
        </div>


        {loading ? (

          <div className="table-row admin-empty">
            <span>Loading submissions...</span>
          </div>

        ) : filteredLeads.length === 0 ? (

          <div className="table-row admin-empty">
            <span>
              No submissions found for this filter.
            </span>
          </div>

        ) : (

          filteredLeads.map((lead) => (

            <div
              className="table-row"
              key={lead._id}
            >

              <span className="admin-name">
                {lead.name || "Unknown"}
              </span>

              <span>
                {formatType(lead.type)}
              </span>

              <span>
                <small className="status-badge">
                  {lead.status || "New"}
                </small>
              </span>

              <span>
                {formatDate(lead.createdAt)}
              </span>

            </div>

          ))

        )}

      </div>

    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { jobs } from "../data/content";

export default function Careers() {
  return (
    <div className="page container">

      {/* PAGE HEADER */}
      <div className="section-heading">
        <div>
          <div className="eyebrow">CAREERS</div>

          <h1>
            Build what moves
            <br />
            business forward.
          </h1>

          <p>
            Join a team building thoughtful digital products,
            immersive experiences, and scalable technology solutions.
          </p>
        </div>
      </div>


      {/* JOB LIST */}
      <section className="career-list">

        <div className="eyebrow">OPEN POSITIONS</div>

        {jobs.length === 0 ? (
          <p>No open positions available.</p>
        ) : (
          <div className="job-grid">

            {jobs.map((job) => (
              <article
                className="job-card"
                key={job.slug}
              >

                <div className="job-card-top">

                  <div>
                    <div className="eyebrow">
                      {job.department}
                    </div>

                    <h2>{job.title}</h2>

                    <p>{job.summary}</p>
                  </div>

                  <div className="job-arrow">
                    ↗
                  </div>

                </div>


                <div className="pill-row">

                  <span>{job.experience}</span>

                  <span>{job.location}</span>

                  <span>{job.type}</span>

                </div>


                <Link
                  to={`/careers/${job.slug}`}
                  className="button gold-btn"
                >
                  View position ↗
                </Link>

              </article>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}
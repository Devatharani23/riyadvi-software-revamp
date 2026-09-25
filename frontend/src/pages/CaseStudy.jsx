import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/content";
import Scene from "../components/Scene";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudy() {
  const { slug } = useParams();
  const ref = useRef();

  const p = projects.find((x) => x.slug === slug);

  useEffect(() => {
    if (!p) return;

    const ctx = gsap.context(() => {
      gsap.from(".case-reveal", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".case-block", {
        scrollTrigger: {
          trigger: ".case-grid",
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".result-item", {
        scrollTrigger: {
          trigger: ".result-box",
          start: "top 80%",
        },
        scale: 0.85,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "back.out(1.5)",
      });

      gsap.to(".case-visual", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".case-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [p]);

  if (!p) {
    return (
      <div className="page container">
        <h1>Case study not found.</h1>
      </div>
    );
  }

  return (
    <div ref={ref} className="page container case-study-page">

      {/* HERO */}
      <div className="case-hero">
        <div className="case-reveal">
          <div className="eyebrow">
            {p.client} / {p.industry}
          </div>

          <h1>{p.title}</h1>

          <p>{p.summary}</p>

          <div className="pill-row">
            {p.tech.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>

        <div className="case-visual">
          <Scene compact />
        </div>
      </div>

      {/* CHALLENGE / SOLUTION */}
      <div className="case-grid">

        <div className="case-block">
          <div className="eyebrow">
            01 / CHALLENGE
          </div>

          <h2>
            Create a clearer path from interest to action.
          </h2>

          <p>
            The experience balances brand, information and
            conversion so users can understand the value quickly.
          </p>
        </div>

        <div className="case-block">
          <div className="eyebrow">
            02 / SOLUTION
          </div>

          <h2>
            A reusable digital system.
          </h2>

          <p>
            Structured content, responsive components and
            interaction patterns make the experience easier
            to extend.
          </p>
        </div>

      </div>

      {/* RESULTS */}
      <div className="result-box">

        <div className="eyebrow">
          03 / RESULTS
        </div>

        <div className="result-grid">
          {p.results.map((result, index) => (
            <div
              className="result-item"
              key={result}
            >
              <b>
                0{index + 1}
              </b>

              <span>
                {result}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* TECHNOLOGY */}
      <div className="case-tech">

        <div>
          <div className="eyebrow">
            TECHNOLOGY
          </div>

          <h2>
            Built for flexibility and scale.
          </h2>
        </div>

        <div className="pill-row">
          {p.tech.map((tech) => (
            <span key={tech}>
              {tech}
            </span>
          ))}
        </div>

      </div>

      {/* CTA */}
      <div className="case-cta">

        <div>
          <div className="eyebrow">
            NEXT PROJECT
          </div>

          <h2>
            Discuss a similar project.
          </h2>
        </div>

        <Link
          className="button gold-btn"
          to="/contact"
        >
          Start a conversation ↗
        </Link>

      </div>

    </div>
  );
}
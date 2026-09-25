import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services, projects } from "../data/content";
import Scene from "../components/Scene";
import SectionTitle from "../components/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.from(".reveal", {
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Transformation steps animation
      gsap.from(".step", {
        scrollTrigger: {
          trigger: ".transformation-section",
          start: "top 75%",
          end: "bottom 45%",
          scrub: 1,
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        ease: "power2.out",
      });

      // Step numbers glow as they enter
      gsap.to(".step b", {
        scrollTrigger: {
          trigger: ".transformation-section",
          start: "top 70%",
          end: "bottom 40%",
          scrub: true,
        },
        color: "#d4af37",
        stagger: 0.1,
      });

      // Service cards reveal
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: ".service-grid",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const steps = [
    "Business Challenge",
    "Strategy",
    "Design",
    "Technology",
    "Launch",
    "Growth",
  ];

  return (
    <div ref={ref}>
      {/* HERO */}
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow reveal">
            TECHNOLOGY × DESIGN × BUSINESS
          </div>

          <h1 className="reveal">
            Custom Software & Digital Solutions to{" "}
            <span>Grow Your Business.</span>
          </h1>

          <p className="hero-sub reveal">
            Web & App Development, UI/UX Design, and Business Strategy,
            all tailored to your needs.
          </p>

          <div className="actions reveal">
            <Link className="button gold-btn" to="/contact">
              Book a Free Consultation ↗
            </Link>

            <Link className="button ghost-btn" to="/services">
              Explore Our Solutions
            </Link>
          </div>

          <div className="hero-proof reveal">
            <span>Since 2021</span>
            <span>Full-stack delivery</span>
            <span>3D & interactive experiences</span>
          </div>
        </div>

        <Scene />
      </section>

      {/* TRANSFORMATION */}
      <section className="section dark-band transformation-section">
        <div className="container">
          <SectionTitle
            eyebrow="THE TRANSFORMATION"
            title="From business challenge to measurable growth."
          >
            A structured journey that connects strategy, design and technology
            instead of treating them as separate departments.
          </SectionTitle>

          <div className="steps">
            {steps.map((step, index) => (
              <div className="step" key={step}>
                <b>0{index + 1}</b>

                <span>{step}</span>

                {index < steps.length - 1 && <i />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section container">
        <SectionTitle
          eyebrow="CAPABILITIES"
          title="Six ways to turn an idea into a digital product."
        />

        <div className="service-grid">
          {services.map((service, index) => (
            <Link
              className="service-card"
              to={"/services/" + service.slug}
              key={service.slug}
            >
              <span className="card-num">
                0{index + 1}
              </span>

              <span className="service-icon">
                {service.icon}
              </span>

              <h3>{service.title}</h3>

              <p>{service.short}</p>

              <span className="text-link">
                Explore service ↗
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY RIYADVI */}
      <section className="section split-section">
        <div className="container split">
          <div>
            <SectionTitle
              eyebrow="WHY RIYADVI"
              title="Technology that understands the business behind it."
            >
              The goal is not to add more software. It is to create better
              ways for people to discover, decide, buy and work.
            </SectionTitle>

            <div className="metric-row">
              <div>
                <strong>2021</strong>
                <span>Founded</span>
              </div>

              <div>
                <strong>360°</strong>
                <span>Digital thinking</span>
              </div>

              <div>
                <strong>∞</strong>
                <span>Room to scale</span>
              </div>
            </div>
          </div>

          <div className="quote-box">
            <span className="quote-mark">“</span>

            <p>
              Good digital experiences make complex things feel simple.
            </p>

            <span className="eyebrow">
              RIYADVI APPROACH
            </span>
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="section container">
        <SectionTitle
          eyebrow="SELECTED WORK"
          title="Case studies built around real business contexts."
        />

        <div className="project-grid">
          {projects.slice(0, 3).map((project) => (
            <Link
              className="project-card"
              to={"/portfolio/" + project.slug}
              key={project.slug}
            >
              <div className="project-visual">
                <span>{project.client}</span>
                <b>{project.industry}</b>
              </div>

              <div className="project-body">
                <div className="eyebrow">
                  {project.client}
                </div>

                <h3>{project.title}</h3>

                <p>{project.summary}</p>

                <span className="text-link">
                  View case study ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <div className="eyebrow">
              READY WHEN YOU ARE
            </div>

            <h2>
              Have a business problem worth solving?
            </h2>
          </div>

          <Link className="button gold-btn" to="/contact">
            Start a conversation ↗
          </Link>
        </div>
      </section>
    </div>
  );
}
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { services, projects } from "../data/content";
import Scene from "../components/Scene";
import SectionTitle from "../components/SectionTitle";

export default function Home() {
  const ref = useRef();
  useEffect(() => { const ctx=gsap.context(()=>{gsap.from(".reveal",{y:45,opacity:0,duration:0.9,stagger:0.1,ease:"power3.out"})},ref); return ()=>ctx.revert(); },[]);
  const steps=["Business Challenge","Strategy","Design","Technology","Launch","Growth"];
  return <div ref={ref}>
    <section className="hero container">
      <div className="hero-copy">
        <div className="eyebrow reveal">TECHNOLOGY × DESIGN × BUSINESS</div>
        <h1 className="reveal">Custom Software & Digital Solutions to <span>Grow Your Business.</span></h1>
        <p className="hero-sub reveal">Web & App Development, UI/UX Design, and Business Strategy, all tailored to your needs.</p>
        <div className="actions reveal"><Link className="button gold-btn" to="/contact">Book a Free Consultation ↗</Link><Link className="button ghost-btn" to="/services">Explore Our Solutions</Link></div>
        <div className="hero-proof reveal"><span>Since 2021</span><span>Full-stack delivery</span><span>3D & interactive experiences</span></div>
      </div>
      <Scene />
    </section>

    <section className="section dark-band">
      <div className="container">
        <SectionTitle eyebrow="THE TRANSFORMATION" title="From business challenge to measurable growth." children="A structured journey that connects strategy, design and technology instead of treating them as separate departments." />
        <div className="steps">{steps.map((s,i)=><div className="step" key={s}><b>0{i+1}</b><span>{s}</span>{i<steps.length-1&&<i/>}</div>)}</div>
      </div>
    </section>

    <section className="section container">
      <SectionTitle eyebrow="CAPABILITIES" title="Six ways to turn an idea into a digital product." />
      <div className="service-grid">{services.map((s,i)=><Link className="service-card" to={"/services/"+s.slug} key={s.slug}><span className="card-num">0{i+1}</span><span className="service-icon">{s.icon}</span><h3>{s.title}</h3><p>{s.short}</p><span className="text-link">Explore service ↗</span></Link>)}</div>
    </section>

    <section className="section split-section">
      <div className="container split">
        <div><SectionTitle eyebrow="WHY RIYADVI" title="Technology that understands the business behind it." children="The goal is not to add more software. It is to create better ways for people to discover, decide, buy and work." />
          <div className="metric-row"><div><strong>2021</strong><span>Founded</span></div><div><strong>360°</strong><span>Digital thinking</span></div><div><strong>∞</strong><span>Room to scale</span></div></div>
        </div>
        <div className="quote-box"><span className="quote-mark">“</span><p>Good digital experiences make complex things feel simple.</p><span className="eyebrow">RIYADVI APPROACH</span></div>
      </div>
    </section>

    <section className="section container">
      <SectionTitle eyebrow="SELECTED WORK" title="Case studies built around real business contexts." />
      <div className="project-grid">{projects.slice(0,3).map(p=><Link className="project-card" to={"/portfolio/"+p.slug} key={p.slug}><div className="project-visual"><span>{p.client}</span><b>{p.industry}</b></div><div className="project-body"><div className="eyebrow">{p.client}</div><h3>{p.title}</h3><p>{p.summary}</p><span className="text-link">View case study ↗</span></div></Link>)}</div>
    </section>

    <section className="cta-band"><div className="container cta-inner"><div><div className="eyebrow">READY WHEN YOU ARE</div><h2>Have a business problem worth solving?</h2></div><Link className="button gold-btn" to="/contact">Start a conversation ↗</Link></div></section>
  </div>;
}
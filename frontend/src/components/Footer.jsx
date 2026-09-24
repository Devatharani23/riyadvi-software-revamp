import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return <footer className="footer">
    <div><div className="eyebrow">RIYADVI SOFTWARE TECHNOLOGIES</div><h2>Build what moves your business forward.</h2></div>
    <div className="footer-links">
      <Link to="/services">Services</Link><Link to="/portfolio">Portfolio</Link><Link to="/about">About</Link>
      <Link to="/contact">Contact</Link><Link to="/software-project-planning-guide">Planning Guide</Link>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Riyadvi Software Technologies</span><span>Technology · Design · Growth</span></div>
  </footer>;
}
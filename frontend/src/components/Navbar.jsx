import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [["Services","/services"],["Portfolio","/portfolio"],["About","/about"],["Blog","/blog"],["Careers","/careers"],["Contact","/contact"]];
  return (
    <header className="nav">
      <Link className="brand" to="/" onClick={() => setOpen(false)}>
        <span className="brand-mark">R</span><span>RIYADVI<span className="gold">.</span></span>
      </Link>
      <button className="menu-btn" onClick={() => setOpen(v=>!v)} aria-label="Toggle menu">{open ? "×" : "☰"}</button>
      <nav className={open ? "nav-links open" : "nav-links"}>
        {links.map(([label,path]) => <NavLink key={path} to={path} onClick={() => setOpen(false)}>{label}</NavLink>)}
        <Link className="nav-cta" to="/business-health-checkup" onClick={() => setOpen(false)}>Health Checkup ↗</Link>
      </nav>
    </header>
  );
}
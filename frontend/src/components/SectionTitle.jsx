import React from "react";
export default function SectionTitle({eyebrow,title,children}) {
  return <div className="section-title"><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}
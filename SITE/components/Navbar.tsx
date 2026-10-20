import React from "react";
import { MailIcon, LinkedinIcon, ArrowRightIcon } from "./Icons";

export function Navbar() {
  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: "16px 24px",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      background: "rgba(7, 9, 14, 0.75)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #00f0ff 0%, #8b5cf6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "800",
            color: "#030712",
            fontFamily: "var(--font-mono)",
            fontSize: "1.1rem",
            boxShadow: "0 0 20px rgba(0, 240, 255, 0.4)"
          }}>
            SS
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#f8fafc", letterSpacing: "-0.02em" }}>
              SHIVAM SAXENA
            </div>
            <div style={{ fontSize: "0.72rem", color: "#00f0ff", fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}>
              SR. SOFTWARE ENGINEER 1 • HCLSOFTWARE
            </div>
          </div>
        </a>

        <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <a href="#about" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }} className="nav-link">
            About
          </a>
          <a href="#experience" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }} className="nav-link">
            Journey
          </a>
          <a href="#skills" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }} className="nav-link">
            Architecture
          </a>
          <a href="#portfolio" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }} className="nav-link">
            Portfolio
          </a>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a
            href="https://www.linkedin.com/in/shivam-saxena-b71157167"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: "8px 14px", fontSize: "0.85rem" }}
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:shivamsaxena8273@gmail.com"
            className="btn-primary"
            style={{ padding: "8px 16px", fontSize: "0.85rem" }}
          >
            <MailIcon className="w-4 h-4" />
            <span>Initiate Comms</span>
          </a>
        </div>
      </div>
    </header>
  );
}

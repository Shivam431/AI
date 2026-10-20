"use client";

import React, { useState } from "react";
import {
  TerminalIcon,
  CpuIcon,
  LayersIcon,
  ShieldCheckIcon,
  ZapIcon,
  ExternalLinkIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  MailIcon,
  LinkedinIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon
} from "@/components/Icons";
import { Navbar } from "@/components/Navbar";
import { ChatBot } from "@/components/ChatBot";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"frontend" | "enterprise" | "edgy">("frontend");

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div className="cyber-grid" />
      <Navbar />

      {/* Hero Section */}
      <section id="hero" style={{ paddingTop: "140px", paddingBottom: "80px", maxWidth: "1200px", margin: "0 auto", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "48px", alignItems: "center" }}>
          <div>
            <div className="badge-edgy" style={{ marginBottom: "20px" }}>
              <span className="pulse-dot"></span>
              <span>FRONTEND ARCHITECTURE • PROVEN SCALE</span>
            </div>

            <h1 className="font-display" style={{ fontSize: "3.75rem", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: "24px" }}>
              Enterprise Grade. <br />
              <span className="gradient-text-accent">Edgy Engineering.</span>
            </h1>

            <p style={{ fontSize: "1.2rem", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: "32px", maxWidth: "580px" }}>
              I am <strong style={{ color: "var(--text-main)" }}>Shivam Saxena</strong>, Senior Software Engineer 1 at <span style={{ color: "#00f0ff", fontWeight: 600 }}>HCLSoftware</span>.
              With over 5 years of experience designing and developing scalable, high-performance web applications, I craft razor-sharp, reactive frontend ecosystems powered by React.js, Next.js, and modern UI engineering.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "40px" }}>
              <a href="#experience" className="btn-primary">
                <span>Explore Career Journey</span>
                <ArrowRightIcon />
              </a>
              <a href="#portfolio" className="btn-secondary">
                <LayersIcon />
                <span>Future Portfolio</span>
              </a>
              <a href="mailto:shivamsaxena8273@gmail.com" className="btn-secondary">
                <MailIcon />
                <span>Contact Shivam</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", paddingTop: "20px", borderTop: "1px solid var(--border-subtle)" }}>
              <div>
                <div className="font-mono gradient-text-accent" style={{ fontSize: "2rem", fontWeight: 800 }}>5+ YRS</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-subtle)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>High-Scale Frontend</div>
              </div>
              <div>
                <div className="font-mono gradient-text-accent" style={{ fontSize: "2rem", fontWeight: 800 }}>99.9%</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-subtle)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>UI Reliability &amp; Perf</div>
              </div>
              <div>
                <div className="font-mono gradient-text-accent" style={{ fontSize: "2rem", fontWeight: 800 }}>HCL + QuEST</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-subtle)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Enterprise Pedigree</div>
              </div>
            </div>
          </div>

          {/* Interactive Edgy HUD Terminal */}
          <div className="glass-panel floating" style={{ padding: "28px", border: "1px solid rgba(0, 240, 255, 0.25)", background: "rgba(10, 15, 29, 0.85)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "12px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }}></span>
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }}></span>
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
              </div>
              <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-subtle)" }}>hcl-frontend-core-v5.0</span>
            </div>

            <div className="font-mono" style={{ fontSize: "0.85rem", lineHeight: 1.8 }}>
              <p style={{ color: "#94a3b8" }}><span style={{ color: "#00f0ff" }}>shivam@enterprise</span>:<span style={{ color: "#8b5cf6" }}>~</span>$ sysinfo --profile</p>

              <div style={{ marginTop: "12px", background: "rgba(0, 0, 0, 0.4)", padding: "16px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <p><span style={{ color: "#8b5cf6" }}>CURRENT_ROLE:</span> Senior Software Engineer 1</p>
                <p><span style={{ color: "#8b5cf6" }}>ORGANIZATION:</span> HCLSoftware (Noida, India)</p>
                <p><span style={{ color: "#8b5cf6" }}>CORE_SPECIALTY:</span> Advanced Frontend Systems &amp; Modern UI</p>
                <p><span style={{ color: "#8b5cf6" }}>ACTIVE_STACK:</span> React.js, Next.js, JavaScript, Tailwind, TypeScript</p>
                <p><span style={{ color: "#8b5cf6" }}>RESEARCH_RADAR:</span> AI-Driven Frontend Optimizations &amp; SSR</p>
                <p style={{ marginTop: "8px", color: "#10b981" }}>&gt;&gt; STATUS: ARCHITECTING SUB-MILLISECOND UI RENDERING &amp; SCALE</p>
              </div>

              <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                <button
                  onClick={() => setActiveTab("frontend")}
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: activeTab === "frontend" ? "rgba(0, 240, 255, 0.15)" : "rgba(255, 255, 255, 0.04)",
                    border: `1px solid ${activeTab === "frontend" ? "var(--neon-cyan)" : "transparent"}`,
                    color: activeTab === "frontend" ? "#00f0ff" : "#94a3b8",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem"
                  }}
                >
                  [MODERN UI]
                </button>
                <button
                  onClick={() => setActiveTab("enterprise")}
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: activeTab === "enterprise" ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.04)",
                    border: `1px solid ${activeTab === "enterprise" ? "var(--neon-emerald)" : "transparent"}`,
                    color: activeTab === "enterprise" ? "#10b981" : "#94a3b8",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem"
                  }}
                >
                  [ENTERPRISE]
                </button>
                <button
                  onClick={() => setActiveTab("edgy")}
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: activeTab === "edgy" ? "rgba(139, 92, 246, 0.15)" : "rgba(255, 255, 255, 0.04)",
                    border: `1px solid ${activeTab === "edgy" ? "var(--neon-violet)" : "transparent"}`,
                    color: activeTab === "edgy" ? "#8b5cf6" : "#94a3b8",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem"
                  }}
                >
                  [AI / EDGY]
                </button>
              </div>

              <div style={{ marginTop: "14px", padding: "12px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "6px", fontSize: "0.8rem", color: "#cbd5e1" }}>
                {activeTab === "frontend" && (
                  <span>🌐 <strong>Modern UI Paradigm:</strong> Reusable atomic components, React concurrent features, design system tokens, and seamless user interaction loops.</span>
                )}
                {activeTab === "enterprise" && (
                  <span>🔒 <strong>Enterprise Paradigm:</strong> Resilient client architecture, cross-platform accessibility, automated release workflows, and enterprise-grade performance stability.</span>
                )}
                {activeTab === "edgy" && (
                  <span>⚡ <strong>Edgy Paradigm:</strong> Aggressive Core Web Vitals optimization, Next.js server-side rendering (SSR), and AI-assisted frontend workflows.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" style={{ padding: "90px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "48px", alignItems: "start" }}>
          <div>
            <div className="badge-edgy" style={{ marginBottom: "16px" }}>01 • CORE PHILOSOPHY</div>
            <h2 className="font-display" style={{ fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "20px" }}>
              Engineered for resilience, <br />
              <span className="gradient-text-accent">crafted for the edge.</span>
            </h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "20px", fontSize: "1.05rem" }}>
              With 5 continuous years delivering production software, my journey has specialized in designing and building scalable, high-performance web applications that demand both enterprise stability and pixel-perfect aesthetics.
            </p>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "28px", fontSize: "1.05rem" }}>
              My engineering motto is simple: enterprise applications must never compromise on speed, fluidity, or user delight. I architect modular React &amp; Next.js frontend ecosystems, creating reusable component hierarchies that deliver instant responsiveness even under intense enterprise workloads.
            </p>

            <div className="glass-panel" style={{ padding: "20px", display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(0, 240, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00f0ff" }}>
                <GraduationCapIcon className="w-6 h-6" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>B.Tech - Computer Science Engineering</div>
                <div style={{ color: "var(--text-subtle)", fontSize: "0.85rem", fontFamily: "var(--font-mono)" }}>University of Petroleum and Energy Studies (2017 – 2021)</div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            <div className="glass-panel" style={{ padding: "24px" }}>
              <div style={{ color: "#00f0ff", marginBottom: "16px" }}>
                <LayersIcon className="w-7 h-7" />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "10px" }}>Modern UI &amp; Frameworks</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Expertise in React.js, Next.js, and modern styling frameworks like Tailwind CSS to deliver responsive, scalable component libraries.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: "24px" }}>
              <div style={{ color: "#8b5cf6", marginBottom: "16px" }}>
                <CpuIcon className="w-7 h-7" />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "10px" }}>Clean Architecture</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Applying object-oriented design and clean component architecture ensuring maintainable, modular, and testable frontend codebases.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: "24px" }}>
              <div style={{ color: "#10b981", marginBottom: "16px" }}>
                <ShieldCheckIcon className="w-7 h-7" />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "10px" }}>Automated Pipelines</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Automated deployment pipelines and continuous integration ensuring smooth frontend releases with minimal downtime and zero regression.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: "24px" }}>
              <div style={{ color: "#f59e0b", marginBottom: "16px" }}>
                <ZapIcon className="w-7 h-7" />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "10px" }}>SSR &amp; AI Optimizations</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Harnessing Server-Side Rendering (SSR), Core Web Vitals optimization, and AI-driven frontend workflows to stay ahead in web trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Journey Section */}
      <section id="experience" style={{ padding: "90px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="badge-edgy" style={{ marginBottom: "16px" }}>02 • CAREER TRAJECTORY</div>
          <h2 className="font-display" style={{ fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
            The Professional Journey
          </h2>
          <p style={{ color: "var(--text-muted)", marginTop: "12px", fontSize: "1.1rem" }}>
            5 years of progressive leadership, frontend scale, and mission-critical engineering.
          </p>
        </div>

        <div className="timeline-track">
          {/* Milestone 1: HCLSoftware */}
          <div style={{ position: "relative", marginBottom: "50px" }}>
            <div className="timeline-node" style={{ borderColor: "#00f0ff", boxShadow: "0 0 16px #00f0ff" }} />
            <div className="glass-panel" style={{ padding: "32px", borderLeft: "3px solid #00f0ff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#f8fafc" }}>HCLSoftware</h3>
                    <span className="badge-edgy" style={{ borderColor: "#00f0ff", color: "#00f0ff" }}>Current Enterprise Lead</span>
                  </div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "#00f0ff", marginTop: "4px" }}>
                    Senior Software Engineer 1
                  </div>
                </div>
                <div className="font-mono" style={{ fontSize: "0.85rem", color: "var(--text-subtle)", background: "rgba(255, 255, 255, 0.04)", padding: "6px 14px", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                  July 2025 – Present • Noida, Uttar Pradesh, India
                </div>
              </div>

              <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "20px", fontSize: "0.98rem" }}>
                Leading the architectural development of flagship enterprise web applications. Driving scalable, high-performance web solutions with clean frontend architecture, rock-solid security, and aggressive client-side performance optimization.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <CheckCircleIcon style={{ color: "#00f0ff", marginTop: "3px" }} />
                  <span style={{ fontSize: "0.92rem", color: "#cbd5e1", lineHeight: 1.5 }}>Spearheading high-availability web applications ensuring seamless user functionality across modern browsers.</span>
                </div>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <CheckCircleIcon style={{ color: "#00f0ff", marginTop: "3px" }} />
                  <span style={{ fontSize: "0.92rem", color: "#cbd5e1", lineHeight: 1.5 }}>Exploring AI-driven frontend optimizations, server-side rendering (SSR), and GraphQL client integration.</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "24px" }}>
                <span className="tech-tag">React.js</span>
                <span className="tech-tag">Next.js SSR</span>
                <span className="tech-tag">Tailwind CSS</span>
                <span className="tech-tag">Modern UI Systems</span>
                <span className="tech-tag">Core Web Vitals</span>
              </div>
            </div>
          </div>

          {/* Milestone 2: QuEST Global - Software Engineer */}
          <div style={{ position: "relative", marginBottom: "50px" }}>
            <div className="timeline-node" style={{ borderColor: "#8b5cf6", boxShadow: "0 0 16px #8b5cf6" }} />
            <div className="glass-panel" style={{ padding: "32px", borderLeft: "3px solid #8b5cf6" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#f8fafc" }}>QuEST Global</h3>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)" }}>4 Years Total Tenure</span>
                  </div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "#8b5cf6", marginTop: "4px" }}>
                    Software Engineer
                  </div>
                </div>
                <div className="font-mono" style={{ fontSize: "0.85rem", color: "var(--text-subtle)", background: "rgba(255, 255, 255, 0.04)", padding: "6px 14px", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                  June 2022 – July 2025 • (3 years 2 months) • Gurugram, India
                </div>
              </div>

              <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "20px", fontSize: "0.98rem" }}>
                Designed and developed high-performance web applications ensuring seamless functionality and responsive client interfaces. Championed reusable UI components, API integration, and automated CI/CD release cycles.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <CheckCircleIcon style={{ color: "#8b5cf6", marginTop: "3px" }} />
                  <span style={{ fontSize: "0.92rem", color: "#cbd5e1", lineHeight: 1.5 }}>Built efficient and reusable components, optimizing system performance and enhancing user experience.</span>
                </div>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <CheckCircleIcon style={{ color: "#8b5cf6", marginTop: "3px" }} />
                  <span style={{ fontSize: "0.92rem", color: "#cbd5e1", lineHeight: 1.5 }}>Implemented real-time communication features, enabling dynamic and interactive user experiences.</span>
                </div>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <CheckCircleIcon style={{ color: "#8b5cf6", marginTop: "3px" }} />
                  <span style={{ fontSize: "0.92rem", color: "#cbd5e1", lineHeight: 1.5 }}>Optimized application performance, reducing load times and improving overall responsiveness.</span>
                </div>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <CheckCircleIcon style={{ color: "#8b5cf6", marginTop: "3px" }} />
                  <span style={{ fontSize: "0.92rem", color: "#cbd5e1", lineHeight: 1.5 }}>Ensured cross-platform compatibility and accessibility (WCAG), aligning with industry best practices.</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "24px" }}>
                <span className="tech-tag">React.js</span>
                <span className="tech-tag">JavaScript / ES6+</span>
                <span className="tech-tag">Component Architecture</span>
                <span className="tech-tag">Real-Time UI</span>
                <span className="tech-tag">Automated CI/CD</span>
                <span className="tech-tag">Accessibility (a11y)</span>
              </div>
            </div>
          </div>

          {/* Milestone 3: QuEST Global - Trainee Engineer */}
          <div style={{ position: "relative" }}>
            <div className="timeline-node" style={{ borderColor: "#10b981", boxShadow: "0 0 16px #10b981" }} />
            <div className="glass-panel" style={{ padding: "32px", borderLeft: "3px solid #10b981" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#f8fafc" }}>QuEST Global</h3>
                  <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "#10b981", marginTop: "4px" }}>
                    Trainee Engineer
                  </div>
                </div>
                <div className="font-mono" style={{ fontSize: "0.85rem", color: "var(--text-subtle)", background: "rgba(255, 255, 255, 0.04)", padding: "6px 14px", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                  August 2021 – June 2022 • (11 months) • Gurugram, India
                </div>
              </div>

              <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.98rem" }}>
                Trained and delivered mission-critical foundational software modules under enterprise engineering guidelines. Mastered core object-oriented programming, clean code principles, and web performance optimization.
              </p>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "20px" }}>
                <span className="tech-tag">Modern Web Foundations</span>
                <span className="tech-tag">OOP Fundamentals</span>
                <span className="tech-tag">UI Testing</span>
                <span className="tech-tag">Git Workflows</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack & Architecture */}
      <section id="skills" style={{ padding: "90px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="badge-edgy" style={{ marginBottom: "16px" }}>03 • TECHNICAL CAPABILITIES</div>
          <h2 className="font-display" style={{ fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
            The Architecture Matrix
          </h2>
          <p style={{ color: "var(--text-muted)", marginTop: "12px", fontSize: "1.1rem" }}>
            Advanced frontend capabilities engineered for mission-critical enterprise web applications.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          <div className="glass-panel" style={{ padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ padding: "10px", borderRadius: "10px", background: "rgba(0, 240, 255, 0.1)", color: "#00f0ff" }}>
                <LayersIcon className="w-6 h-6" />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Core UI &amp; Frameworks</h3>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "0.92rem" }}>
                <CheckCircleIcon style={{ color: "#00f0ff" }} /> React.js &amp; Next.js (SSR / SSG)
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "0.92rem" }}>
                <CheckCircleIcon style={{ color: "#00f0ff" }} /> JavaScript (ES6+) &amp; TypeScript
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "0.92rem" }}>
                <CheckCircleIcon style={{ color: "#00f0ff" }} /> Modern UI Frameworks &amp; Tailwind CSS
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "0.92rem" }}>
                <CheckCircleIcon style={{ color: "#00f0ff" }} /> Reusable Component Architecture
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "0.92rem" }}>
                <CheckCircleIcon style={{ color: "#00f0ff" }} /> Real-Time &amp; Interactive UI Sockets
              </li>
            </ul>
          </div>

          <div className="glass-panel" style={{ padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ padding: "10px", borderRadius: "10px", background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" }}>
                <CpuIcon className="w-6 h-6" />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Frontend Engineering</h3>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "0.92rem" }}>
                <CheckCircleIcon style={{ color: "#8b5cf6" }} /> High-Performance State Management
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "0.92rem" }}>
                <CheckCircleIcon style={{ color: "#8b5cf6" }} /> Object-Oriented Component Design
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "0.92rem" }}>
                <CheckCircleIcon style={{ color: "#8b5cf6" }} /> Client API Integration &amp; GraphQL
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "0.92rem" }}>
                <CheckCircleIcon style={{ color: "#8b5cf6" }} /> Core Web Vitals &amp; Render Profiling
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#8b5cf6", fontSize: "0.92rem" }}>
                <CheckCircleIcon style={{ color: "#8b5cf6" }} /> AI-Driven Frontend Optimizations
              </li>
            </ul>
          </div>

          <div className="glass-panel" style={{ padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ padding: "10px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
                <ShieldCheckIcon className="w-6 h-6" />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Quality &amp; Delivery</h3>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "0.92rem" }}>
                <CheckCircleIcon style={{ color: "#10b981" }} /> Automated CI/CD Frontend Deployments
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "0.92rem" }}>
                <CheckCircleIcon style={{ color: "#10b981" }} /> Cross-Platform Compatibility
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "0.92rem" }}>
                <CheckCircleIcon style={{ color: "#10b981" }} /> Accessibility Compliance (WCAG/a11y)
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "0.92rem" }}>
                <CheckCircleIcon style={{ color: "#10b981" }} /> Java (Basic) Certified Credential
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "0.92rem" }}>
                <CheckCircleIcon style={{ color: "#10b981" }} /> Cross-Functional Agile Collaboration
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Future Portfolio Hub Section */}
      <section id="portfolio" style={{ padding: "90px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "50px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div className="badge-edgy" style={{ marginBottom: "16px" }}>04 • FUTURE PORTFOLIO VAULT</div>
            <h2 className="font-display" style={{ fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Featured &amp; Upcoming Systems
            </h2>
            <p style={{ color: "var(--text-muted)", marginTop: "10px", fontSize: "1.05rem" }}>
              Enterprise frontend blueprints and innovative applications currently in active delivery.
            </p>
          </div>
          <div className="badge-edgy" style={{ background: "rgba(245, 158, 11, 0.1)", borderColor: "rgba(245, 158, 11, 0.3)", color: "#f59e0b" }}>
            <SparklesIcon className="w-4 h-4" />
            <span>INCUBATION MODE • READY FOR DEMO</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
          {/* Card 1 */}
          <div className="glass-panel" style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span className="font-mono" style={{ fontSize: "0.75rem", color: "#00f0ff" }}>SYSTEM 01 • DESIGN SYSTEM</span>
                <span style={{ fontSize: "0.75rem", padding: "4px 10px", borderRadius: "6px", background: "rgba(0, 240, 255, 0.1)", color: "#00f0ff" }}>In Production</span>
              </div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "12px", color: "#f8fafc" }}>
                Enterprise Design System &amp; Portal
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "20px" }}>
                High-performance enterprise UI portal built with scalable React and Next.js, featuring reusable tokenized component libraries, theme switching, and sub-second page transitions.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
                <span className="tech-tag">React.js</span>
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">Tailwind CSS</span>
              </div>
            </div>

            <a
              href="#contact"
              className="btn-secondary"
              style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem" }}
            >
              <span>Request System Walkthrough</span>
              <ExternalLinkIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Card 2 */}
          <div className="glass-panel" style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span className="font-mono" style={{ fontSize: "0.75rem", color: "#8b5cf6" }}>SYSTEM 02 • REACTIVE UI</span>
                <span style={{ fontSize: "0.75rem", padding: "4px 10px", borderRadius: "6px", background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" }}>Active Prototype</span>
              </div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "12px", color: "#f8fafc" }}>
                Sub-Millisecond Real-Time Board
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "20px" }}>
                WebSocket-powered dynamic orchestration board with optimistic UI state updates, smooth micro-interactions, and conflict-free client data synchronization.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
                <span className="tech-tag">React.js</span>
                <span className="tech-tag">WebSockets</span>
                <span className="tech-tag">Tailwind</span>
              </div>
            </div>

            <a
              href="#contact"
              className="btn-secondary"
              style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem" }}
            >
              <span>Inspect Architecture Spec</span>
              <ExternalLinkIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Card 3 */}
          <div className="glass-panel" style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span className="font-mono" style={{ fontSize: "0.75rem", color: "#10b981" }}>SYSTEM 03 • NEXT-GEN</span>
                <span style={{ fontSize: "0.75rem", padding: "4px 10px", borderRadius: "6px", background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>R&amp;D Lab</span>
              </div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "12px", color: "#f8fafc" }}>
                AI-Driven Frontend Orchestrator
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "20px" }}>
                Experimental Next.js SSR architecture integrating intelligent client-side prefetching, GraphQL data hydration, and dynamic UI component generation.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
                <span className="tech-tag">Next.js SSR</span>
                <span className="tech-tag">AI Optimizations</span>
                <span className="tech-tag">GraphQL</span>
              </div>
            </div>

            <a
              href="#contact"
              className="btn-secondary"
              style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem" }}
            >
              <span>View Research Blueprint</span>
              <ExternalLinkIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact & Connect Section */}
      <section id="contact" style={{ padding: "90px 24px 120px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <div className="glass-panel" style={{ padding: "50px 36px", border: "1px solid rgba(0, 240, 255, 0.3)", position: "relative" }}>
          <div className="badge-edgy" style={{ marginBottom: "20px" }}>
            <span className="pulse-dot"></span>
            <span>GET IN TOUCH</span>
          </div>

          <h2 className="font-display" style={{ fontSize: "3rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Ready to Build <span className="gradient-text-accent">High-Performance Scale?</span>
          </h2>

          <p style={{ color: "var(--text-muted)", fontSize: "1.15rem", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 36px" }}>
            Whether discussing high-scale React architectures, modern frontend design systems, or next-generation enterprise applications, let&apos;s connect.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <a
              href="mailto:shivamsaxena8273@gmail.com"
              className="btn-primary"
              style={{ padding: "14px 28px", fontSize: "1rem" }}
            >
              <MailIcon className="w-5 h-5" />
              <span>shivamsaxena8273@gmail.com</span>
            </a>

            <a
              href="https://www.linkedin.com/in/shivam-saxena-b71157167"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ padding: "14px 28px", fontSize: "1rem" }}
            >
              <LinkedinIcon className="w-5 h-5" />
              <span>LinkedIn Network</span>
            </a>
          </div>

          <div style={{ marginTop: "32px", fontSize: "0.85rem", color: "var(--text-subtle)", fontFamily: "var(--font-mono)" }}>
            📍 Base: Noida, Uttar Pradesh, India • Available for Global Strategic Engineering
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", padding: "30px 24px", textAlign: "center", fontSize: "0.85rem", color: "var(--text-subtle)", background: "rgba(7, 9, 14, 0.9)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            © 2026 Shivam Saxena. Engineered with Next.js, React &amp; Enterprise Glassmorphism.
          </div>
          <div style={{ display: "flex", gap: "20px", fontFamily: "var(--font-mono)" }}>
            <a href="#hero" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Back to Top ↑</a>
            <a href="https://www.linkedin.com/in/shivam-saxena-b71157167" target="_blank" rel="noopener noreferrer" style={{ color: "#00f0ff", textDecoration: "none" }}>LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* TwinMe AI Chatbot */}
      <ChatBot />
    </div>
  );
}

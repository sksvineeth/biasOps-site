import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowRight,
  ExternalLink,
  Github,
  ChevronDown,
  Mail,
  Linkedin,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════
   BIASOPS LANDING PAGE — OpenLayer-inspired + Gaming transitions
   Preserved: Logo, shimmer, silver palette, dashboard, YAML block
   New: Cinematic intro, parallax reveals, animated product demos
   ══════════════════════════════════════════════════════════════════ */

/* ─── Scroll Reveal Hook ─── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", fromY = 32 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      transitionDelay: `${delay}ms`,
      transitionDuration: "900ms",
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      transitionProperty: "opacity, transform",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${fromY}px)`,
    }}>
      {children}
    </div>
  );
}

/* ─── BiasOps Logo SVG ─── */
let logoC = 0;
function BiasOpsLogo({ size = 40 }) {
  const [id] = useState(() => `logo-${++logoC}`);
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-light`} x1="6" y1="16" x2="24" y2="38"><stop offset="0%" stopColor="#D1D8E3" /><stop offset="100%" stopColor="#A0ABBE" /></linearGradient>
        <linearGradient id={`${id}-dark`} x1="42" y1="16" x2="24" y2="38"><stop offset="0%" stopColor="#6B7A90" /><stop offset="100%" stopColor="#4A5568" /></linearGradient>
        <linearGradient id={`${id}-bottom`} x1="6" y1="38" x2="42" y2="48"><stop offset="0%" stopColor="#3D4756" /><stop offset="100%" stopColor="#2A3240" /></linearGradient>
        <linearGradient id={`${id}-silver`} x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stopColor="#E8ECF1" /><stop offset="40%" stopColor="#C4CCD8" /><stop offset="100%" stopColor="#8A95A8" /></linearGradient>
        <linearGradient id={`${id}-check`} x1="16" y1="18" x2="34" y2="32"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#E0E5EC" /></linearGradient>
        <filter id={`${id}-glow`}><feGaussianBlur stdDeviation="1.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <path d="M6 16L24 6L24 28L6 38Z" fill={`url(#${id}-light)`} opacity="0.35" />
      <path d="M6 16L24 6L24 28L6 38Z" stroke={`url(#${id}-silver)`} strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M42 16L24 6L24 28L42 38Z" fill={`url(#${id}-dark)`} opacity="0.25" />
      <path d="M42 16L24 6L24 28L42 38Z" stroke={`url(#${id}-silver)`} strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M6 38L24 28L42 38L24 48Z" fill={`url(#${id}-bottom)`} opacity="0.3" />
      <path d="M6 38L24 28L42 38L24 48Z" stroke={`url(#${id}-silver)`} strokeWidth="1" fill="none" opacity="0.5" />
      <line x1="24" y1="6" x2="24" y2="28" stroke="#E8ECF1" strokeWidth="0.5" opacity="0.4" />
      <line x1="6" y1="38" x2="24" y2="48" stroke="#8A95A8" strokeWidth="0.5" opacity="0.3" />
      <line x1="42" y1="38" x2="24" y2="48" stroke="#6B7A90" strokeWidth="0.5" opacity="0.3" />
      <path d="M16 26L22 32L34 18" stroke={`url(#${id}-check)`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" filter={`url(#${id}-glow)`} />
    </svg>
  );
}

function BiasOpsIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M6 16L24 6L24 28L6 38Z" fill="#C4CCD8" opacity="0.35" />
      <path d="M42 16L24 6L24 28L42 38Z" fill="#6B7A90" opacity="0.25" />
      <path d="M6 38L24 28L42 38L24 48Z" fill="#3D4756" opacity="0.3" />
      <path d="M16 26L22 32L34 18" stroke="#E8ECF1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ─── Cinematic Intro Overlay (Gaming-style) ─── */
function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0=logo, 1=text, 2=wipe, 3=done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2000);
    const t3 = setTimeout(() => { setPhase(3); onComplete(); }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  if (phase === 3) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#08090C",
      display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
      transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      opacity: phase >= 2 ? 0 : 1,
      transform: phase >= 2 ? "scale(1.1)" : "scale(1)",
      pointerEvents: phase >= 2 ? "none" : "all",
    }}>
      {/* Scanline overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(196,204,216,0.1) 2px, rgba(196,204,216,0.1) 4px)",
      }} />
      {/* Center glow */}
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,204,216,0.06), transparent 70%)",
        animation: "pulse 2s ease-in-out infinite",
      }} />
      {/* Logo */}
      <div style={{
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        transform: phase >= 1 ? "scale(1) translateY(-12px)" : "scale(1.3)",
        opacity: phase >= 1 ? 1 : 0.7,
      }}>
        <BiasOpsLogo size={80} />
      </div>
      {/* Text reveal */}
      <div style={{
        marginTop: 24,
        transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? "translateY(0)" : "translateY(16px)",
        textAlign: "center",
      }}>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 800, color: "#ECEFF4", letterSpacing: -1.5 }}>
          Bias<span style={{ color: "#C4CCD8" }}>Ops</span>
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#6C7690", marginTop: 8, letterSpacing: 2 }}>
          SCANNING FOR BIAS IN YOUR PIPELINE
        </div>
        {/* Loading bar */}
        <div style={{ marginTop: 16, width: 200, height: 2, background: "#1F2330", borderRadius: 1, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 1,
            background: "linear-gradient(90deg, #C4CCD8, #E0E5EC)",
            animation: "loadBar 1.4s ease-in-out forwards",
            transformOrigin: "left",
          }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Animated Hero Card (OpenLayer-style) ─── */
function HeroCard({ name, org, action, checks, delay = 0, env }) {
  const [activeCheck, setActiveCheck] = useState(-1);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay + 800);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < checks.length) { setActiveCheck(i); i++; }
      else clearInterval(interval);
    }, 400);
    return () => clearInterval(interval);
  }, [started, checks.length]);

  const statusColor = (s) => s === "pass" ? "#28C840" : s === "fail" ? "#FF5F57" : "#F5A623";
  const statusLabel = (s) => s === "pass" ? "Passing" : s === "fail" ? "Failing" : "Warning";

  return (
    <div style={{
      background: "#0F1114", border: "1px solid #1F2330", borderRadius: 16,
      padding: 20, width: 340, flexShrink: 0,
      opacity: started ? 1 : 0, transform: started ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "linear-gradient(135deg, #2A2E3D, #3A3F52)", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#C4CCD8",
        }}>{name[0]}</div>
        <div>
          <div style={{ fontSize: 11, color: "#6C7690" }}>{action}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#E0E5EC" }}>{name} <span style={{ color: "#6C7690", fontWeight: 400 }}>committed just now</span></div>
        </div>
      </div>
      {env && (
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          <span style={{ fontSize: 10, color: "#6C7690" }}>Environment</span>
          <span style={{ fontSize: 10, color: "#C4CCD8", fontWeight: 600 }}>{env}</span>
        </div>
      )}
      {/* Org badge */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12,
        padding: "8px 12px", background: "#16181D", borderRadius: 8, border: "1px solid #1F2330",
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#E0E5EC" }}>{org}</span>
        <span style={{ fontSize: 11, color: "#6C7690" }}>
          {activeCheck >= 0 ? Math.min(activeCheck + 1, checks.length) : 0} of {checks.length}
        </span>
      </div>
      {/* Checks */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {checks.map((c, i) => {
          const resolved = i <= activeCheck;
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "6px 0",
              opacity: resolved ? 1 : 0.4, transition: "opacity 0.3s",
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: resolved ? statusColor(c.status) : "#2A2E3D",
                boxShadow: resolved ? `0 0 6px ${statusColor(c.status)}40` : "none",
                transition: "all 0.3s",
              }} />
              <span style={{ fontSize: 12, color: resolved ? "#C4CCD8" : "#3E4559", flex: 1, transition: "color 0.3s" }}>{c.name}</span>
              <span style={{
                fontSize: 10, color: resolved ? statusColor(c.status) : "#3E4559",
                fontWeight: resolved ? 600 : 400, transition: "all 0.3s",
              }}>{resolved ? statusLabel(c.status) : "Waiting"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Product Section Card (OpenLayer-inspired) ─── */
function ProductSection({ tag, title, desc, children, reverse = false, links = [] }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      display: "flex", flexDirection: reverse ? "row-reverse" : "row",
      gap: 60, alignItems: "center", padding: "80px 0",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
      flexWrap: "wrap",
    }}>
      <div style={{ flex: "1 1 380px", minWidth: 300 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
          color: "#6C7690", marginBottom: 12,
        }}>{tag}</div>
        <h3 style={{
          fontSize: 36, fontWeight: 800, color: "#ECEFF4", letterSpacing: -1.5,
          lineHeight: 1.15, marginBottom: 16,
        }}>{title}</h3>
        <p style={{ fontSize: 16, color: "#6C7690", lineHeight: 1.7, marginBottom: 24 }}>{desc}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {links.map((l, i) => {
            const label = typeof l === "string" ? l : l.label;
            const href = typeof l === "string" ? "#" : l.href;
            return (
              <a key={i} href={href} style={{
                fontSize: 13, fontWeight: 600, color: "#C4CCD8", textDecoration: "none",
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 16px", borderRadius: 8, border: "1px solid #2A2E3D",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.target.style.borderColor = "#C4CCD8"; e.target.style.color = "#E0E5EC"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#2A2E3D"; e.target.style.color = "#C4CCD8"; }}
              >{label} →</a>
            );
          })}
        </div>
      </div>
      <div style={{ flex: "1 1 440px", minWidth: 320 }}>{children}</div>
    </div>
  );
}

/* ─── Spotlight Card ─── */
function SpotlightCard({ children, style = {} }) {
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref}
      onMouseMove={e => { const r = ref.current.getBoundingClientRect(); setMouse({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding: 1, borderRadius: 16,
        background: hovered ? `radial-gradient(300px circle at ${mouse.x}px ${mouse.y}px, rgba(196,204,216,0.25), #2A2E3D 50%, #1F2330)` : "#1F2330",
        transition: "background 0.15s", ...style,
      }}>
      <div style={{
        background: "#0F1114", borderRadius: 15, padding: 24, height: "100%",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(196,204,216,0.12), transparent)",
        }} />
        {children}
      </div>
    </div>
  );
}

/* ─── YAML Code Block ─── */
function YamlBlock() {
  const lines = [
    { indent: 0, key: "- check_id:", val: ' "ecoa_adverse_impact_ratio"' },
    { indent: 1, key: "name:", val: ' "ECOA Adverse Impact Ratio"' },
    { indent: 1, key: "regulation:", val: ' "ECOA / Reg B"' },
    { indent: 1, key: "metric:", val: ' "adverse_impact_ratio"' },
    { indent: 1, key: "threshold:", val: " 0.80" },
    { indent: 1, key: "operator:", val: ' ">="' },
    { indent: 1, key: "protected_attributes:", val: "" },
    { indent: 2, key: '- "race"', val: "" },
    { indent: 2, key: '- "sex"', val: "" },
    { indent: 2, key: '- "national_origin"', val: "" },
    { indent: 1, key: "severity:", val: ' "critical"' },
    { indent: 1, key: "remediation:", val: ' "Review model features"' },
  ];
  return (
    <div style={{
      borderRadius: 16, overflow: "hidden", border: "1px solid #1F2330",
      background: "#0A0C10", maxWidth: 520, boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px", borderBottom: "1px solid #1F2330",
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F5A623" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        </div>
        <span style={{ fontSize: 11, color: "#3E4559", fontFamily: "'IBM Plex Mono', monospace" }}>ecoa_policy.yaml</span>
      </div>
      <pre style={{ padding: "16px 20px", fontSize: 13, fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1.7, margin: 0, overflowX: "auto" }}>
        {lines.map((l, i) => (
          <div key={i}>
            <span style={{ color: "#3E4559" }}>{"  ".repeat(l.indent)}</span>
            <span style={{ color: "#6C7690" }}>{l.key}</span>
            {l.val && l.val.includes('"')
              ? <span style={{ color: "#C4CCD8" }}>{l.val}</span>
              : <span style={{ color: "#E0E5EC" }}>{l.val}</span>}
          </div>
        ))}
      </pre>
    </div>
  );
}

/* ─── Dashboard Mini (for product section) ─── */
function DashboardMini() {
  const checks = [
    { name: "ECOA Adverse Impact Ratio", status: "pass", val: "0.847" },
    { name: "HMDA Denial Rate Disparity", status: "fail", val: "1.73" },
    { name: "CFPB Proxy Detection", status: "pass", val: "0.042" },
    { name: "SR 11-7 Explainability", status: "pass", val: "0.94" },
    { name: "FHA Steering Detection", status: "warn", val: "0.048" },
  ];
  const dot = s => s === "pass" ? "#28C840" : s === "fail" ? "#FF5F57" : "#F5A623";
  return (
    <div style={{
      borderRadius: 16, overflow: "hidden", border: "1px solid #1F2330",
      background: "#0F1114", boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", borderBottom: "1px solid #1F2330" }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F5A623" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        <span style={{ marginLeft: 12, fontSize: 11, color: "#3E4559", fontFamily: "monospace" }}>app.biasops.dev/dashboard</span>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 16 }}>
          {[{ l: "Models", v: "4" }, { l: "Policies", v: "10" }, { l: "Checks", v: "23" }, { l: "Score", v: "73.9%" }].map(s => (
            <div key={s.l} style={{ background: "#16181D", borderRadius: 10, padding: "10px 12px", border: "1px solid #1F2330" }}>
              <div style={{ fontSize: 9, color: "#6C7690", textTransform: "uppercase", letterSpacing: 1 }}>{s.l}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#E0E5EC", fontFamily: "'IBM Plex Mono', monospace", marginTop: 4 }}>{s.v}</div>
            </div>
          ))}
        </div>
        {checks.map((c, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "8px 0",
            borderTop: i > 0 ? "1px solid #1F233060" : "none",
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: dot(c.status), boxShadow: `0 0 6px ${dot(c.status)}30` }} />
            <span style={{ fontSize: 12, color: "#C4CCD8", flex: 1 }}>{c.name}</span>
            <span style={{ fontSize: 11, color: "#6C7690", fontFamily: "monospace" }}>{c.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Compliance Badge Grid ─── */
function ComplianceMini() {
  const items = [
    { name: "ECOA / Reg B", icon: "§", status: "active" },
    { name: "HMDA / Reg C", icon: "§", status: "active" },
    { name: "CFPB 2023-03", icon: "⚖", status: "active" },
    { name: "EU AI Act", icon: "🇪🇺", status: "active" },
    { name: "NYC LL144", icon: "🏙", status: "active" },
    { name: "OCC SR 11-7", icon: "§", status: "active" },
    { name: "ISO 42001", icon: "✓", status: "soon" },
    { name: "NIST AI RMF", icon: "✓", status: "soon" },
  ];
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8,
    }}>
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 14px", borderRadius: 12,
          background: "#0F1114", border: "1px solid #1F2330",
          opacity: item.status === "soon" ? 0.5 : 1,
        }}>
          <span style={{ fontSize: 16 }}>{item.icon}</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#E0E5EC" }}>{item.name}</div>
            <div style={{ fontSize: 10, color: item.status === "soon" ? "#3E4559" : "#28C840" }}>
              {item.status === "soon" ? "Coming soon" : "Active"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Agentic Pipeline Diagram ─── */
function AgenticPipeline() {
  const steps = [
    { label: "ML Prediction", color: "#6C7690" },
    { label: "Critique Agent", color: "#F5A623" },
    { label: "Bias Detected?", color: "#FF5F57" },
    { label: "Repair Agent", color: "#28C840" },
    { label: "Bias Ledger", color: "#C4CCD8" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%", background: s.color,
            boxShadow: `0 0 8px ${s.color}40`,
          }} />
          <div style={{
            flex: 1, padding: "12px 16px", borderRadius: 10,
            background: "#16181D", border: "1px solid #1F2330",
            fontSize: 13, fontWeight: 600, color: "#E0E5EC",
            fontFamily: "'IBM Plex Mono', monospace",
          }}>{s.label}</div>
          {i < steps.length - 1 && (
            <div style={{ position: "absolute", left: 20, marginTop: 36, width: 1, height: 8, background: "#2A2E3D" }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Inline SVG Icons (from original repo) ─── */
const FeatureIcons = {
  radar: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" opacity="0.4" /><circle cx="12" cy="12" r="6" opacity="0.6" /><circle cx="12" cy="12" r="2" />
      <path d="M12 2C12 2 12 12 12 12" /><path d="M12 12L18.5 5.5" />
    </svg>
  ),
  branch: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2" /><circle cx="18" cy="9" r="2" /><circle cx="18" cy="18" r="2" />
      <path d="M6 8v8c0 2 2 3 4 3h4" /><path d="M6 8c0 2 2 4 4 4h4" />
    </svg>
  ),
  chart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 3v18" />
      <path d="M13 13h4" /><path d="M13 17h4" />
    </svg>
  ),
  code: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1" />
      <path d="M9 7l-2 3 2 3" /><path d="M15 7l2 3-2 3" /><path d="M13 7l-2 6" />
    </svg>
  ),
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  plug: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 2v4" /><path d="M17 2v4" />
      <path d="M5 6h14a1 1 0 0 1 1 1v3a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V7a1 1 0 0 1 1-1z" />
      <path d="M12 16v4" /><path d="M8 20h8" />
    </svg>
  ),
  data: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12v-2" opacity="0.4" /><path d="M21 12v-2" opacity="0.4" />
      <path d="M9 8l2 2 4-3" opacity="0.7" />
    </svg>
  ),
};

const carouselFeatures = [
  { num: "01", title: "Adaptive Bias Detection", desc: "Scan predictions for group level disparity in real time. Measure uncertainty to determine risk, not just accuracy.", icon: "radar" },
  { num: "02", title: "Smart Routing Engine", desc: "Automatically trigger critique and repair agents when bias and uncertainty exceed your declared thresholds.", icon: "branch" },
  { num: "03", title: "Governance Dashboard", desc: "Visualize bias metrics, model confidence, and human feedback loops for every prediction across every model.", icon: "chart" },
  { num: "04", title: "Policy as Code", desc: "Define fairness thresholds in simple YAML files. Track changes in Git, review with your team, enforce on every deploy.", icon: "code" },
  { num: "05", title: "Immutable Audit Trail", desc: "Every mitigation event logged with timestamps, explanations, and policy references. Ready for SOC 2, EU AI Act, and LL144.", icon: "shield" },
  { num: "06", title: "Pipeline Integration", desc: "Drop into any MLOps pipeline via API or CLI. Works with your existing stack. No rip and replace required.", icon: "plug" },
  { num: "07", title: "Data Quality Intelligence", desc: "Go beyond nulls and schema drift. Detect representation gaps, hidden demographic proxies, and historical bias in your training data before a model ever trains.", icon: "data" },
];

/* ─── Feature Card with Spotlight Hover ─── */
function FeatureCard({ num, title, desc, icon }) {
  const cardRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={cardRef}
      onMouseMove={e => { if (!cardRef.current) return; const r = cardRef.current.getBoundingClientRect(); setMouse({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "0 0 320px", scrollSnapAlign: "center", padding: 1, borderRadius: 18,
        background: hovered
          ? `radial-gradient(320px circle at ${mouse.x}px ${mouse.y}px, rgba(196,204,216,0.3), #2A2E3D 50%, #1F2330)`
          : "#1F2330",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.15s",
      }}
    >
      <div style={{ borderRadius: 17, background: "#0F1114", padding: 28, minHeight: 220, position: "relative", overflow: "hidden" }}>
        {/* Spotlight glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, rgba(196,204,216,0.05), transparent 60%)`,
          transition: "opacity 0.3s",
        }} />
        {/* Top shimmer line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(196,204,216,0.15), transparent)" }} />
        {/* Number watermark */}
        <span style={{
          position: "absolute", top: 16, right: 20, fontSize: 44, lineHeight: 1, fontWeight: 800,
          color: "#C4CCD8", opacity: hovered ? 0.07 : 0.03, transition: "opacity 0.4s",
          fontFamily: "'IBM Plex Mono', monospace", userSelect: "none",
        }}>{num}</span>
        {/* Icon */}
        <div style={{
          width: 46, height: 46, borderRadius: 12, background: "#16181D", border: "1px solid #2A2E3D",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: hovered ? "#E0E5EC" : "#C4CCD8", transition: "color 0.3s", marginBottom: 20,
        }}>{FeatureIcons[icon]}</div>
        {/* Title */}
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#E0E5EC", margin: 0, lineHeight: 1.3 }}>{title}</h3>
        {/* Expanding divider */}
        <div style={{
          height: 1, marginTop: 12, marginBottom: 12,
          width: hovered ? 44 : 24,
          background: "linear-gradient(90deg, rgba(196,204,216,0.35), rgba(196,204,216,0.1))",
          transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
        }} />
        {/* Description */}
        <p style={{
          fontSize: 13.5, lineHeight: 1.6, margin: 0,
          color: hovered ? "#B0B8C9" : "#6C7690", transition: "color 0.3s",
        }}>{desc}</p>
      </div>
    </div>
  );
}

/* ─── Features Carousel with Draggable Slider ─── */
function FeaturesCarousel() {
  const scrollRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const scrollTo = (clientX) => {
    const track = trackRef.current;
    const scroll = scrollRef.current;
    if (!track || !scroll) return;
    const rect = track.getBoundingClientRect();
    const thumbW = 120;
    const usable = rect.width - thumbW;
    if (usable <= 0) return;
    const pos = Math.max(0, Math.min(1, (clientX - rect.left - thumbW / 2) / usable));
    scroll.scrollLeft = pos * (scroll.scrollWidth - scroll.clientWidth);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => scrollTo(e.touches ? e.touches[0].clientX : e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  });

  return (
    <div>
      <div style={{ position: "relative" }}>
        {/* Left fade */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, zIndex: 10, pointerEvents: "none", width: 80, background: "linear-gradient(to right, #08090C, transparent)" }} />
        {/* Right fade */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, zIndex: 10, pointerEvents: "none", width: 80, background: "linear-gradient(to left, #08090C, transparent)" }} />
        {/* Scroll container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            display: "flex", gap: 24, padding: "16px 0", overflowX: "auto",
            scrollSnapType: "x proximity",
            paddingLeft: "max(24px, calc((100% - 1152px) / 2))",
            paddingRight: "max(24px, calc((100% - 1152px) / 2))",
            scrollbarWidth: "none", msOverflowStyle: "none",
          }}
        >
          {carouselFeatures.map(f => <FeatureCard key={f.num} {...f} />)}
        </div>
      </div>
      {/* Custom slider bar */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40, padding: "0 24px" }}>
        <div
          ref={trackRef}
          style={{
            position: "relative", width: "100%", maxWidth: 400, height: 4,
            borderRadius: 2, backgroundColor: "#1F2330", cursor: "pointer",
          }}
          onMouseDown={e => { setDragging(true); scrollTo(e.clientX); }}
          onTouchStart={e => { setDragging(true); scrollTo(e.touches[0].clientX); }}
        >
          <div style={{
            position: "absolute", top: 0, height: 4, width: 120, borderRadius: 2,
            background: "linear-gradient(90deg, #C4CCD8, #E0E5EC, #C4CCD8)",
            boxShadow: "0 0 8px rgba(224,229,236,0.15)",
            left: `calc(${progress * 100}% - ${progress * 120}px)`,
            transition: dragging ? "none" : "left 0.1s ease-out",
          }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Data Quality Monitor (Compliance-Aware) ─── */
function DataQualityMonitor() {
  const [activeLayer, setActiveLayer] = useState(0);
  const layers = [
    {
      id: "ingest",
      label: "Ingestion Gate",
      status: "pass",
      checks: [
        { name: "HMDA field completeness", result: "98.2%", threshold: "≥ 95%", ok: true },
        { name: "Protected attribute coverage", result: "6 of 6", threshold: "All required", ok: true },
        { name: "Schema version match", result: "v3.1", threshold: "v3.x", ok: true },
      ],
      desc: "Validates regulatory field requirements before data enters the pipeline"
    },
    {
      id: "repr",
      label: "Representation Audit",
      status: "warn",
      checks: [
        { name: "Demographic distribution drift", result: "+4.2%", threshold: "< 5%", ok: true },
        { name: "Minority group representation", result: "18.1%", threshold: "≥ 20%", ok: false },
        { name: "Age band coverage", result: "All bands", threshold: "No gaps", ok: true },
      ],
      desc: "Catches shifts in who your data represents, not just what it contains"
    },
    {
      id: "proxy",
      label: "Proxy Detection",
      status: "fail",
      checks: [
        { name: "ZIP code → race correlation", result: "0.72", threshold: "< 0.30", ok: false },
        { name: "Name → gender inference", result: "0.08", threshold: "< 0.15", ok: true },
        { name: "Income × geography compound", result: "0.41", threshold: "< 0.25", ok: false },
      ],
      desc: "Finds hidden demographic proxies before your model learns them"
    },
    {
      id: "historical",
      label: "Historical Bias Scan",
      status: "warn",
      checks: [
        { name: "Redlining pattern match", result: "12 ZIPs flagged", threshold: "0 flagged", ok: false },
        { name: "Outcome label bias index", result: "0.14", threshold: "< 0.20", ok: true },
        { name: "Temporal fairness stability", result: "Stable 3yr", threshold: "Stable 2yr+", ok: true },
      ],
      desc: "Detects when historical discrimination is baked into your training labels"
    },
    {
      id: "gate",
      label: "Pre-Training Gate",
      status: "block",
      checks: [
        { name: "All critical checks passed", result: "7 of 9", threshold: "9 of 9", ok: false },
        { name: "Remediation plan filed", result: "Pending", threshold: "Required", ok: false },
        { name: "Compliance sign-off", result: "Pending", threshold: "Required", ok: false },
      ],
      desc: "Blocks model training until data meets your compliance policy"
    },
  ];

  const dotColor = (s) => s === "pass" ? "#28C840" : s === "fail" ? "#FF5F57" : s === "block" ? "#FF5F57" : "#F5A623";
  const dotLabel = (s) => s === "pass" ? "Passed" : s === "fail" ? "Failed" : s === "block" ? "Blocked" : "Warning";
  const active = layers[activeLayer];

  return (
    <div style={{ background: "#0F1114", border: "1px solid #1F2330", borderRadius: 16, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", borderBottom: "1px solid #1F2330" }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F5A623" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        <span style={{ marginLeft: 12, fontSize: 11, color: "#3E4559", fontFamily: "'IBM Plex Mono', monospace" }}>biasops data-quality · acme_lending_q1.csv</span>
      </div>

      <div style={{ display: "flex", minHeight: 320 }}>
        {/* Pipeline stages sidebar */}
        <div style={{ width: 200, borderRight: "1px solid #1F2330", padding: "12px 0", flexShrink: 0 }}>
          <div style={{ padding: "0 12px 8px", fontSize: 10, color: "#3E4559", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Pipeline stages</div>
          {layers.map((l, i) => (
            <div
              key={l.id}
              onClick={() => setActiveLayer(i)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 12px", cursor: "pointer",
                background: i === activeLayer ? "#16181D" : "transparent",
                borderLeft: i === activeLayer ? `2px solid ${dotColor(l.status)}` : "2px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: dotColor(l.status),
                boxShadow: `0 0 6px ${dotColor(l.status)}30`,
              }} />
              <span style={{ fontSize: 12, color: i === activeLayer ? "#E0E5EC" : "#6C7690", fontWeight: i === activeLayer ? 600 : 400, transition: "color 0.15s" }}>{l.label}</span>
            </div>
          ))}
          {/* Pipeline connector lines */}
          <div style={{ padding: "16px 12px 8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {layers.map((l, i) => (
                <React.Fragment key={l.id}>
                  <div style={{
                    width: 12, height: 12, borderRadius: "50%",
                    background: dotColor(l.status),
                    opacity: i === activeLayer ? 1 : 0.4,
                    transition: "opacity 0.2s",
                  }} />
                  {i < layers.length - 1 && (
                    <div style={{ flex: 1, height: 2, background: "#1F2330", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, background: dotColor(layers[i+1].status), opacity: 0.3 }} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <div style={{ flex: 1, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: dotColor(active.status),
              boxShadow: `0 0 8px ${dotColor(active.status)}40`,
            }} />
            <span style={{ fontSize: 15, fontWeight: 700, color: "#E0E5EC" }}>{active.label}</span>
            <span style={{
              fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase",
              padding: "2px 8px", borderRadius: 4,
              background: `${dotColor(active.status)}18`,
              color: dotColor(active.status),
            }}>{dotLabel(active.status)}</span>
          </div>
          <div style={{ fontSize: 12, color: "#6C7690", marginBottom: 16, lineHeight: 1.5 }}>{active.desc}</div>

          {/* Check results */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {active.checks.map((c, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 8,
                background: "#16181D", border: "1px solid #1F2330",
              }}>
                <div style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: c.ok ? "#28C840" : "#FF5F57",
                  boxShadow: `0 0 6px ${c.ok ? "#28C840" : "#FF5F57"}30`,
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: 12, color: "#C4CCD8", flex: 1 }}>{c.name}</span>
                <span style={{
                  fontSize: 11, fontFamily: "'IBM Plex Mono', monospace",
                  color: c.ok ? "#6C7690" : "#FF5F57", fontWeight: c.ok ? 400 : 600,
                }}>{c.result}</span>
                <span style={{
                  fontSize: 10, color: "#3E4559", fontFamily: "'IBM Plex Mono', monospace",
                }}>{c.threshold}</span>
              </div>
            ))}
          </div>

          {/* Action bar */}
          {active.status !== "pass" && (
            <div style={{
              marginTop: 14, padding: "10px 12px", borderRadius: 8,
              border: `1px solid ${dotColor(active.status)}25`,
              background: `${dotColor(active.status)}08`,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ fontSize: 12, color: dotColor(active.status), fontWeight: 600 }}>
                {active.status === "block" ? "⛔ Training blocked" : active.status === "fail" ? "⚠ Remediation required" : "△ Review recommended"}
              </span>
              <span style={{ fontSize: 11, color: "#6C7690", marginLeft: "auto" }}>
                {active.status === "block" ? "Resolve all critical checks to proceed" : "Auto-generated fix plan available"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Template Card ─── */
function TemplateCard({ title, desc, tags, href }) {
  const inner = (
    <SpotlightCard>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#E0E5EC" }}>{title}</div>
        {href && <span style={{ fontSize: 11, color: "#8A95A8" }}>→</span>}
      </div>
      <div style={{ fontSize: 12, color: "#6C7690", lineHeight: 1.6, marginBottom: 14 }}>{desc}</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tags.map((t, i) => (
          <span key={i} style={{
            fontSize: 10, padding: "3px 8px", borderRadius: 4,
            background: "#16181D", border: "1px solid #1F2330", color: "#C4CCD8",
          }}>{t}</span>
        ))}
      </div>
    </SpotlightCard>
  );
  return href ? <a href={href} style={{ textDecoration: "none", color: "inherit" }}>{inner}</a> : inner;
}

/* ─── Nav Dropdown ─── */
function NavDropdown({ label, items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: 14, color: open ? "#E0E5EC" : "#6C7690",
          display: "flex", alignItems: "center", gap: 4,
          fontFamily: "inherit", padding: 0, transition: "color 0.2s",
        }}
        onMouseEnter={e => e.target.style.color = "#E0E5EC"}
        onMouseLeave={e => { if (!open) e.target.style.color = "#6C7690"; }}
      >
        {label}
        <ChevronDown className="w-3 h-3" style={{
          transform: open ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 0.2s",
        }} />
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)",
          background: "#0F1114", border: "1px solid #1F2330", borderRadius: 14,
          padding: 8, minWidth: 280, boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          animation: "fadeIn 0.2s ease-out",
        }}>
          {items.map((item, i) => (
            <a
              key={i}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block", padding: "10px 14px", borderRadius: 8,
                transition: "background 0.15s", textDecoration: "none",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#16181D"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: "#E0E5EC", marginBottom: 2 }}>{item.text}</div>
              <div style={{ fontSize: 11, color: "#6C7690" }}>{item.desc}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN LANDING PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function BiasOpsLanding() {
  const [introComplete, setIntroComplete] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "#08090C", color: "#E0E5EC",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      position: "relative", overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #08090C; }
        ::selection { background: rgba(196,204,216,0.25); color: #E0E5EC; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #08090C; }
        ::-webkit-scrollbar-thumb { background: #1F2330; border-radius: 3px; }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.035; }
          50% { opacity: 0.06; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.06; }
          50% { transform: scale(1.1); opacity: 0.1; }
        }
        @keyframes loadBar {
          0% { width: 0; }
          100% { width: 100%; }
        }
        @keyframes slideCards {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .text-shimmer {
          background: linear-gradient(135deg, #E8ECF1 0%, #8A95A8 40%, #4A5568 70%, #8A95A8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .float-anim { animation: float 6s ease-in-out infinite; }
        [style*="scrollbarWidth"] ::-webkit-scrollbar, .hide-scrollbar::-webkit-scrollbar { display: none; }
        a { color: inherit; text-decoration: none; }
      `}</style>

      {/* ── Cinematic Intro ── */}
      <CinematicIntro onComplete={handleIntroComplete} />

      {/* ── Background FX ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        animation: "gridPulse 8s ease-in-out infinite",
        backgroundImage: "linear-gradient(rgba(31,35,48,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(31,35,48,0.5) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />
      <div style={{
        position: "fixed", top: "-20%", left: "-10%", width: "60%", height: "60%",
        zIndex: 0, pointerEvents: "none", borderRadius: "50%", opacity: 0.07,
        background: "radial-gradient(circle, #C4CCD8 0%, transparent 70%)",
      }} />

      {/* ══════ NAV ══════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        background: "rgba(8,9,12,0.82)", borderBottom: "1px solid rgba(31,35,48,0.5)",
        height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px",
        opacity: introComplete ? 1 : 0, transform: introComplete ? "translateY(0)" : "translateY(-10px)",
        transition: "all 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s",
      }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BiasOpsLogo size={30} />
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3, color: "#E0E5EC" }}>BiasOps</span>
        </a>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {/* Products dropdown */}
          <NavDropdown label="Products" items={[
            { text: "Policy Engine", desc: "Define compliance rules as versioned code", href: "#product" },
            { text: "Data Compliance", desc: "Fairness checks before your model trains", href: "#product" },
            { text: "Model Compliance", desc: "Real time bias detection for ML models", href: "#product" },
            { text: "LLM Compliance", desc: "Regulatory observability for LLM systems", href: "/llm-observability.html" },
            { text: "Agent Governance", desc: "Govern multi-step AI agent chains", href: "#product" },
            { text: "Audit & Reporting", desc: "Auto-generated proof for regulators", href: "#product" },
            { text: "Policy Marketplace", desc: "Pre-built packs for major regulations", href: "#marketplace" },
          ]} />
          {/* Docs dropdown */}
          <NavDropdown label="Docs" items={[
            { text: "Fair Lending Compliance", desc: "ECOA, HMDA, CFPB policy walkthrough", href: "/fair-lending.html" },
            { text: "LLM Compliance Observability", desc: "Six monitoring layers for regulated LLMs", href: "/llm-observability.html" },
          ]} />
          <a href="#cta" style={{ fontSize: 14, color: "#6C7690", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#E0E5EC"}
            onMouseLeave={e => e.target.style.color = "#6C7690"}
          >Pricing</a>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="#" style={{ fontSize: 13, color: "#B0B8C9" }}>Sign in</a>
          <a href="#cta" style={{
            fontSize: 13, fontWeight: 600, color: "#08090C", background: "#E0E5EC",
            padding: "8px 20px", borderRadius: 99,
            transition: "background 0.2s",
          }}
            onMouseEnter={e => e.target.style.background = "#C4CCD8"}
            onMouseLeave={e => e.target.style.background = "#E0E5EC"}
          >Book a Demo</a>
        </div>
      </nav>

      {/* ══════ HERO ══════ */}
      <section id="top" style={{
        position: "relative", zIndex: 1, paddingTop: 140, paddingBottom: 40,
        maxWidth: 1200, margin: "0 auto", textAlign: "center",
      }}>
        <Reveal delay={200}>
          <div className="float-anim" style={{ display: "inline-block", marginBottom: 24 }}>
            <BiasOpsLogo size={80} />
          </div>
        </Reveal>

        <Reveal delay={350}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#0F1114", border: "1px solid #2A2E3D", borderRadius: 99,
            padding: "6px 16px", fontSize: 13, color: "#B0B8C9", marginBottom: 28,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#28C840", animation: "pulse 2s infinite" }} />
            EU AI Act &amp; NYC LL144 Ready
          </div>
        </Reveal>

        <Reveal delay={500}>
          <h1 style={{
            fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 800,
            lineHeight: 1.05, letterSpacing: -3.5, color: "#ECEFF4",
            maxWidth: 900, margin: "0 auto",
          }}>
            Deploy Models{" "}
            <br />
            <span className="text-shimmer">You Can Defend</span>
          </h1>
        </Reveal>

        <Reveal delay={650}>
          <p style={{
            fontSize: 17, color: "#6C7690", maxWidth: 580, margin: "24px auto 0",
            lineHeight: 1.7, fontWeight: 300,
          }}>
            BiasOps embeds compliance policies directly into your ML pipelines. Regulated industries can adopt AI at scale without bolting on governance as an afterthought.
          </p>
        </Reveal>

        <Reveal delay={800}>
          <div style={{ marginTop: 32, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#cta" style={{
              background: "#E0E5EC", color: "#08090C", fontWeight: 600,
              padding: "14px 32px", borderRadius: 99, fontSize: 15,
              display: "inline-flex", alignItems: "center", gap: 8,
              transition: "all 0.2s",
            }}
              onMouseEnter={e => e.target.style.background = "#C4CCD8"}
              onMouseLeave={e => e.target.style.background = "#E0E5EC"}
            >Book a Demo <ArrowRight className="w-4 h-4" /></a>
            <a href="https://github.com/sksvineeth/biasops-policy-marketplace" target="_blank" rel="noopener noreferrer" style={{
              border: "1px solid #4A5568", color: "#E0E5EC", fontWeight: 600,
              padding: "14px 32px", borderRadius: 99, fontSize: 15,
              display: "inline-flex", alignItems: "center", gap: 8,
              transition: "all 0.2s",
            }}
              onMouseEnter={e => e.target.style.borderColor = "#C4CCD8"}
              onMouseLeave={e => e.target.style.borderColor = "#4A5568"}
            ><Github className="w-4 h-4" /> View on GitHub <ExternalLink className="w-3 h-3" /></a>
          </div>
        </Reveal>

        <Reveal delay={950}>
          <div style={{ marginTop: 16, fontSize: 13, color: "#3E4559" }}>
            Born from years of building AI compliance systems at Fortune 500 companies. Where governance wasn't optional. It was the architecture.
          </div>
        </Reveal>

        {/* ── Hero Cards (OpenLayer-style animated demo) ── */}
        <Reveal delay={1100} fromY={48}>
          <div style={{
            marginTop: 60, display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap",
            perspective: 1200,
          }}>
            <HeroCard
              name="Alice Chen" org="FinServe Corp" action="Pushing new model version..."
              env="Development"
              delay={1200}
              checks={[
                { name: "ECOA adverse impact ratio ≥ 0.80", status: "pass" },
                { name: "HMDA denial rate disparity ≤ 1.50", status: "fail" },
                { name: "CFPB proxy detection < 0.10", status: "pass" },
                { name: "P99 latency < 500ms", status: "pass" },
              ]}
            />
            <HeroCard
              name="Marcus Roy" org="MortgageAI" action="Deploying to production..."
              env="Production"
              delay={1600}
              checks={[
                { name: "FHA steering detection < 0.05", status: "warn" },
                { name: "SR 11-7 explainability ≥ 0.90", status: "pass" },
                { name: "Feature proxy score < 0.15", status: "pass" },
                { name: "Adverse action notice = true", status: "pass" },
              ]}
            />
            <HeroCard
              name="Priya Sharma" org="InsureTech" action="Running compliance scan..."
              env="Staging"
              delay={2000}
              checks={[
                { name: "EEOC disparate impact ratio", status: "pass" },
                { name: "Age discrimination threshold", status: "pass" },
                { name: "Gender proxy detection", status: "pass" },
                { name: "Model card completeness", status: "warn" },
              ]}
            />
          </div>
        </Reveal>
      </section>

      {/* ── Trust Bar ── */}
      <Reveal delay={200}>
        <div style={{
          textAlign: "center", padding: "48px 0 20px", fontSize: 12,
          color: "#3E4559", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600,
          position: "relative", zIndex: 1,
        }}>
          Design partners welcome · Built by the team behind $50M+ in enterprise risk avoidance
        </div>
      </Reveal>

      {/* ── Stats Bar ── */}
      <section style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(31,35,48,0.5)", borderBottom: "1px solid rgba(31,35,48,0.5)",
        padding: "48px 0",
      }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto", display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", gap: 24, textAlign: "center",
        }}>
          {[
            { value: "10+", label: "Ready-to-use policy packs" },
            { value: "23", label: "Automated bias checks" },
            { value: "5", label: "Federal regulations covered" },
            { value: "< 4 min", label: "From code to audit report" },
          ].map((s, i) => (
            <Reveal key={i} delay={300 + i * 100} fromY={16}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#E0E5EC", fontFamily: "'IBM Plex Mono', monospace" }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "#6C7690", marginTop: 4 }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════ CAPABILITIES CAROUSEL (from original site) ══════ */}
      <section id="capabilities" style={{ position: "relative", zIndex: 1, padding: "100px 0 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56, padding: "0 24px" }}>
              <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#3E4559", marginBottom: 16 }}>
                Capabilities
              </span>
              <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -2, lineHeight: 1.1, color: "#ECEFF4" }}>
                Built for{" "}
                <span className="text-shimmer">Regulated Industries</span>
              </h2>
              <p style={{ marginTop: 20, fontSize: 17, color: "#6C7690", maxWidth: 600, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
                Finance, healthcare, hiring. Wherever decisions impact people, BiasOps embeds compliance directly in the pipeline.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <FeaturesCarousel />
          </Reveal>
        </div>
      </section>

      {/* ══════ PRODUCT SECTIONS (OpenLayer-style) ══════ */}
      <div id="product" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>

        {/* Section 1: Real-Time Detection */}
        <ProductSection
          tag="Model Compliance"
          title="Compliance that runs with every prediction"
          desc="Every model prediction is checked against your policy thresholds in real time, across protected groups like race, gender, and age. Not a post-deployment scan. Not a quarterly audit. Compliance runs inside your pipeline, on every request, from day one. The same approach that prevented $50M+ in compliance risk at enterprise scale."
          links={[{ label: "See fair lending use case", href: "/fair-lending.html" }, "API docs"]}
        >
          <DashboardMini />
        </ProductSection>

        {/* Section 2: Config-as-Code */}
        <ProductSection
          tag="Policy Engine"
          title="Policies that ship with your code, not after it"
          desc="Define compliance rules in simple YAML files that live in your repo, right next to the models they govern. Track changes in Git, review with your team, and enforce automatically in every deployment. When policy is part of the build, compliance stops being a bottleneck and becomes a feature."
          links={["View policies on GitHub", "Write your first policy"]}
          reverse
        >
          <YamlBlock />
        </ProductSection>

        {/* Section 3: Agentic Governance (SAGA) */}
        <ProductSection
          tag="Agent Governance"
          title="Govern AI agents, not just models"
          desc="As organizations move from single models to multi step AI agents, compliance gets harder, not easier. BiasOps governs the entire decision chain, flagging risky steps, fixing biased outputs, and logging every action to your audit trail. Governance is part of the agent architecture, not a wrapper around it. Powered by our SAGA framework."
          links={[{ label: "LLM compliance observability", href: "/llm-observability.html" }, "Read the whitepaper"]}
        >
          <AgenticPipeline />
        </ProductSection>

        {/* Section 4: Compliance */}
        <ProductSection
          tag="Policy Marketplace"
          title="Compliance, without the custom engineering"
          desc="Pre-built policy packs for the regulations that matter: fair lending (ECOA, HMDA), consumer protection (CFPB), risk management (OCC), and the EU AI Act. Each pack plugs directly into your pipeline. No custom integrations, no consultants, no six month implementation. Every policy is Apache 2.0. Inspect the code, fork it, make it yours."
          links={[{ label: "Fair lending walkthrough", href: "/fair-lending.html" }, "Browse all frameworks"]}
          reverse
        >
          <ComplianceMini />
        </ProductSection>

        {/* Section 5: Data Quality */}
        <ProductSection
          tag="Data Compliance"
          title="Your data is biased before your model is"
          desc="Most data quality tools check for nulls and schema drift. BiasOps checks for fairness. Is your training data representative across protected groups? Are hidden proxies like ZIP code encoding race? Does your historical data embed discrimination from a decade ago? BiasOps catches all of it and blocks model training until the data is compliance ready."
          links={[{ label: "LLM compliance monitoring", href: "/llm-observability.html" }, { label: "Fair lending data checks", href: "/fair-lending.html" }]}
        >
          <DataQualityMonitor />
        </ProductSection>
      </div>

      {/* ══════ MARKETPLACE ══════ */}
      <section id="marketplace" style={{
        position: "relative", zIndex: 1, padding: "100px 40px",
        maxWidth: 1100, margin: "0 auto",
      }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#6C7690", marginBottom: 12 }}>POLICY MARKETPLACE</div>
            <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -2, color: "#ECEFF4" }}>
              Get started in <span className="text-shimmer">seconds</span>
            </h2>
            <p style={{ fontSize: 16, color: "#6C7690", marginTop: 12, maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>
              Drop a policy pack into your pipeline. Clone, customize, deploy. Compliance ships with your next release.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            <TemplateCard title="Fair Lending Compliance" desc="23 bias checks covering mortgage approvals, rate pricing, and adverse action notices. ECOA, HMDA, and CFPB ready." tags={["ECOA", "HMDA", "YAML"]} href="/fair-lending.html" />
            <TemplateCard title="Hiring Bias Detection" desc="Bias checks for hiring algorithms and resume screeners. NYC Local Law 144 and EEOC compliant." tags={["LL144", "EEOC", "Python"]} />
            <TemplateCard title="Insurance Underwriting" desc="Detect unfair pricing patterns and hidden demographic proxies in insurance underwriting models." tags={["FHA", "State Regs", "YAML"]} />
            <TemplateCard title="EU AI Act Starter" desc="High-risk AI system requirements, transparency obligations, and conformity checks." tags={["EU AI Act", "ISO 42001", "YAML"]} />
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <div style={{
              display: "inline-block", padding: "12px 24px", borderRadius: 10,
              background: "#0F1114", border: "1px solid #1F2330",
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, color: "#C4CCD8",
            }}>
              $ biasops init --template fair-lending
            </div>
          </div>
        </Reveal>
      </section>


      {/* ══════ CTA ══════ */}
      <section id="cta" style={{
        position: "relative", zIndex: 1, padding: "120px 40px",
        textAlign: "center",
      }}>
        <Reveal>
          <div className="float-anim" style={{ display: "inline-block", marginBottom: 20 }}>
            <BiasOpsLogo size={56} />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -2, color: "#ECEFF4", maxWidth: 600, margin: "0 auto" }}>
            Compliance is not a patch.{" "}
            <span className="text-shimmer">It is the architecture.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p style={{ fontSize: 17, color: "#6C7690", marginTop: 16, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            Policies embedded in your pipeline. Compliance enforced on every prediction. Audit trails generated automatically.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div style={{ marginTop: 32 }}>
            <a href="#" style={{
              background: "#E0E5EC", color: "#08090C", fontWeight: 700,
              padding: "16px 40px", borderRadius: 99, fontSize: 17,
              display: "inline-flex", alignItems: "center", gap: 8,
              transition: "all 0.2s",
            }}
              onMouseEnter={e => e.target.style.background = "#C4CCD8"}
              onMouseLeave={e => e.target.style.background = "#E0E5EC"}
            >Book a Demo <ArrowRight className="w-4 h-4" /></a>
          </div>
        </Reveal>
        <Reveal delay={400}>
          <div style={{
            marginTop: 24, fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: "#3E4559",
          }}>
            $ biasops deploy --model lending-v3 --policy fair-lending
          </div>
        </Reveal>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(31,35,48,0.5)",
        padding: "64px 40px 40px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1fr 1fr", gap: 32 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <BiasOpsIcon size={20} />
              <span style={{ fontSize: 17, fontWeight: 700, color: "#E0E5EC" }}>BiasOps</span>
            </div>
            <p style={{ fontSize: 13, color: "#6C7690", lineHeight: 1.7, maxWidth: 260 }}>
              Compliance infrastructure for ML pipelines. Built for regulated industries adopting AI at scale.
            </p>
          </div>

          {/* Products */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#B0B8C9", marginBottom: 16 }}>Products</div>
            {[
              { text: "Policy Engine", href: "#product" },
              { text: "Data Compliance", href: "#product" },
              { text: "Model Compliance", href: "#product" },
              { text: "LLM Compliance", href: "/llm-observability.html" },
              { text: "Agent Governance", href: "#product" },
              { text: "Audit & Reporting", href: "#product" },
              { text: "Policy Marketplace", href: "#marketplace" },
            ].map((l, j) => (
              <a key={j} href={l.href} style={{ display: "block", fontSize: 13, color: "#6C7690", marginBottom: 9, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#E0E5EC"}
                onMouseLeave={e => e.target.style.color = "#6C7690"}
              >{l.text}</a>
            ))}
          </div>

          {/* Use Cases */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#B0B8C9", marginBottom: 16 }}>Use Cases</div>
            {[
              { text: "Fair Lending", href: "/fair-lending.html" },
              { text: "LLM Observability", href: "/llm-observability.html" },
              { text: "Hiring Bias", href: "#" },
              { text: "Insurance Underwriting", href: "#" },
              { text: "EU AI Act", href: "#" },
            ].map((l, j) => (
              <a key={j} href={l.href} style={{ display: "block", fontSize: 13, color: "#6C7690", marginBottom: 9, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#E0E5EC"}
                onMouseLeave={e => e.target.style.color = "#6C7690"}
              >{l.text}</a>
            ))}
          </div>

          {/* Resources */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#B0B8C9", marginBottom: 16 }}>Resources</div>
            {[
              { text: "Documentation", href: "#" },
              { text: "Blog", href: "#" },
              { text: "GitHub", href: "https://github.com/sksvineeth/biasops-policy-marketplace", icon: <Github className="w-3 h-3" />, external: true },
              { text: "API Reference", href: "#" },
              { text: "Changelog", href: "#" },
            ].map((l, j) => (
              <a key={j} href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6C7690", marginBottom: 9, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#E0E5EC"}
                onMouseLeave={e => e.currentTarget.style.color = "#6C7690"}
              >{l.icon}{l.text}{l.external && <ExternalLink className="w-3 h-3" />}</a>
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#B0B8C9", marginBottom: 16 }}>Company</div>
            {[
              { text: "About", href: "#" },
              { text: "Contact", href: "mailto:Vineeth@biasops.ai", icon: <Mail className="w-3 h-3" /> },
              { text: "LinkedIn", href: "https://www.linkedin.com/company/biasops", icon: <Linkedin className="w-3 h-3" />, external: true },
              { text: "Vineeth@biasops.ai", href: "mailto:Vineeth@biasops.ai", icon: <Mail className="w-3 h-3" /> },
            ].map((l, j) => (
              <a key={j} href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6C7690", marginBottom: 9, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#E0E5EC"}
                onMouseLeave={e => e.currentTarget.style.color = "#6C7690"}
              >{l.icon}{l.text}{l.external && <ExternalLink className="w-3 h-3" />}</a>
            ))}
          </div>
        </div>

        <div style={{
          maxWidth: 1100, margin: "40px auto 0", paddingTop: 24,
          borderTop: "1px solid rgba(31,35,48,0.5)",
          display: "flex", justifyContent: "space-between", fontSize: 12, color: "#3E4559",
        }}>
          <span>© 2026 BiasOps</span>
          <span>Apache 2.0 Licensed</span>
        </div>
      </footer>
    </div>
  );
}

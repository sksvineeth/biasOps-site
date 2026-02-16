import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ExternalLink,
  Github,
  ChevronDown,
  Mail,
  Linkedin,
  Upload,
  Settings,
  Play,
  ShieldCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Scroll-reveal hook                                                 */
/* ------------------------------------------------------------------ */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", fromY = 24 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${fromY}px)`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BiasOpsLogo — full version with glow                               */
/* ------------------------------------------------------------------ */
let logoCounter = 0;
function BiasOpsLogo({ size = 40 }) {
  const [id] = useState(() => `logo-${++logoCounter}`);
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-light`} x1="6" y1="16" x2="24" y2="38">
          <stop offset="0%" stopColor="#D1D8E3" />
          <stop offset="100%" stopColor="#A0ABBE" />
        </linearGradient>
        <linearGradient id={`${id}-dark`} x1="42" y1="16" x2="24" y2="38">
          <stop offset="0%" stopColor="#6B7A90" />
          <stop offset="100%" stopColor="#4A5568" />
        </linearGradient>
        <linearGradient id={`${id}-bottom`} x1="6" y1="38" x2="42" y2="48">
          <stop offset="0%" stopColor="#3D4756" />
          <stop offset="100%" stopColor="#2A3240" />
        </linearGradient>
        <linearGradient id={`${id}-silver`} x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor="#E8ECF1" />
          <stop offset="40%" stopColor="#C4CCD8" />
          <stop offset="100%" stopColor="#8A95A8" />
        </linearGradient>
        <linearGradient id={`${id}-check`} x1="16" y1="18" x2="34" y2="32">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E0E5EC" />
        </linearGradient>
        <filter id={`${id}-glow`}>
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
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

/* ------------------------------------------------------------------ */
/*  BiasOpsIcon — compact, no glow                                     */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  YAML Code Block                                                    */
/* ------------------------------------------------------------------ */
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
    { indent: 1, key: "remediation:", val: ' "Review model features for disparate impact"' },
  ];

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-[#0A0C10] shadow-2xl max-w-2xl mx-auto text-left">
      <div className="flex items-center justify-between px-6 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#F5A623]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[11px] text-text-dim font-mono">ecoa_disparate_impact.yaml</span>
      </div>
      <pre className="px-6 py-6 text-sm font-mono leading-relaxed overflow-x-auto">
        {lines.map((l, i) => (
          <div key={i}>
            <span className="text-text-dim">{"  ".repeat(l.indent)}</span>
            <span className="text-text-muted">{l.key}</span>
            {l.val && l.val.includes('"') ? (
              <span className="text-silver">{l.val}</span>
            ) : (
              <span className="text-silver-light">{l.val}</span>
            )}
          </div>
        ))}
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard Preview Mock                                             */
/* ------------------------------------------------------------------ */
function DashboardPreview() {
  const checks = [
    { name: "ECOA Adverse Impact Ratio", status: "pass", threshold: "≥ 0.80", measured: "0.847", regulation: "ECOA / Reg B" },
    { name: "HMDA Denial Rate Disparity", status: "fail", threshold: "≤ 1.50", measured: "1.73", regulation: "HMDA / Reg C" },
    { name: "CFPB Proxy Detection", status: "pass", threshold: "< 0.10", measured: "0.042", regulation: "CFPB 2023-03" },
    { name: "SR 11-7 Explainability Coverage", status: "pass", threshold: "≥ 0.90", measured: "0.94", regulation: "OCC SR 11-7" },
    { name: "FHA Steering Detection", status: "warn", threshold: "< 0.05", measured: "0.048", regulation: "Fair Housing Act" },
    { name: "ECOA Feature Proxy Score", status: "pass", threshold: "< 0.15", measured: "0.083", regulation: "ECOA / Reg B" },
    { name: "HMDA Rate Spread Analysis", status: "pass", threshold: "≤ 1.50", measured: "1.12", regulation: "HMDA / Reg C" },
    { name: "CFPB Adverse Action Notice", status: "fail", threshold: "= true", measured: "false", regulation: "CFPB 2023-03" },
  ];

  const dot = (s) =>
    s === "pass"
      ? "bg-[#28C840]"
      : s === "fail"
      ? "bg-[#FF5F57]"
      : "bg-[#F5A623]";

  return (
    <div className="relative max-w-5xl mx-auto">
      <div
        className="rounded-[20px] overflow-hidden border border-border-light"
        style={{ boxShadow: "0 32px 100px rgba(0,0,0,0.5)" }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-surface-raised border-b border-border">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#F5A623]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          <div className="ml-3 flex-1 h-7 rounded-md bg-bg border border-border flex items-center px-3">
            <span className="text-xs text-text-muted font-mono">app.biasops.dev/dashboard</span>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="flex bg-bg">
          {/* Mini sidebar */}
          <div className="w-12 border-r border-border flex flex-col items-center py-4 gap-3 shrink-0">
            <BiasOpsIcon size={22} />
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-6 h-6 rounded-md ${i === 0 ? "bg-[rgba(196,204,216,0.12)] border border-[rgba(196,204,216,0.25)]" : ""}`} />
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-5 min-w-0">
            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-3 mb-5">
              {[
                { label: "Models", value: "4" },
                { label: "Policies", value: "10" },
                { label: "Checks", value: "23" },
                { label: "Compliance", value: "73.9%" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-surface border border-border p-3">
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">{s.label}</p>
                  <p className="text-lg font-extrabold text-silver-light font-mono mt-1">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Results table */}
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-surface text-text-muted text-left">
                    <th className="px-3 py-2 font-medium">Check</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                    <th className="px-3 py-2 font-medium hidden sm:table-cell">Threshold</th>
                    <th className="px-3 py-2 font-medium hidden sm:table-cell">Measured</th>
                    <th className="px-3 py-2 font-medium hidden md:table-cell">Regulation</th>
                  </tr>
                </thead>
                <tbody>
                  {checks.map((c, i) => (
                    <tr key={i} className="border-t border-border/60">
                      <td className="px-3 py-2 text-silver-light truncate max-w-[180px]">{c.name}</td>
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${dot(c.status)}`} />
                          <span className="text-text-secondary capitalize">{c.status}</span>
                        </span>
                      </td>
                      <td className="px-3 py-2 text-text-muted font-mono hidden sm:table-cell">{c.threshold}</td>
                      <td className="px-3 py-2 text-silver font-mono hidden sm:table-cell">{c.measured}</td>
                      <td className="px-3 py-2 text-text-muted hidden md:table-cell">{c.regulation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Fade reflection */}
      <div
        className="absolute -bottom-20 left-[5%] right-[5%] h-20 rounded-[20px] opacity-20 blur-sm"
        style={{
          background: "linear-gradient(to bottom, rgba(15,17,20,0.6), transparent)",
          transform: "scaleY(-1)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Item                                                           */
/* ------------------------------------------------------------------ */
function FaqItem({ question, answer, open, onClick }) {
  return (
    <div className="border-b border-border-light">
      <button onClick={onClick} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-lg font-medium text-silver-light pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-text-muted shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"}`}>
        <p className="text-text-muted leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  MAIN COMPONENT                                                     */
/* ================================================================== */
export default function BiasOpsLanding() {
  const [mobileNav, setMobileNav] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const appUrl = process.env.REACT_APP_APP_URL || "http://localhost:3000";

  const navLinks = [
    { label: "Product", href: "#how-it-works" },
    { label: "Marketplace", href: "#open-source" },
    { label: "Docs", href: "#open-source" },
    { label: "Pricing", href: "#cta" },
  ];

  return (
    <div className="min-h-screen bg-bg text-silver-light scroll-smooth relative overflow-x-hidden">
      {/* ====== Background Effects ====== */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="fixed inset-0 z-0 pointer-events-none animate-grid-pulse"
        style={{
          backgroundImage:
            "linear-gradient(rgba(31,35,48,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(31,35,48,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] z-0 pointer-events-none rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #C4CCD8 0%, transparent 70%)" }}
      />
      <div
        className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] z-0 pointer-events-none rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #8A95A8 0%, transparent 70%)" }}
      />

      {/* ====== NAVBAR ====== */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-bg/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <a href="#top" className="flex items-center gap-2.5">
            <BiasOpsLogo size={36} />
            <span className="text-lg font-bold tracking-tight text-silver-light">BiasOps</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href + l.label} href={l.href} className="text-sm text-text-muted hover:text-silver-light transition">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href={`${appUrl}/sign-in`} className="text-sm text-text-secondary hover:text-silver-light transition">
              Sign in
            </a>
            <a
              href={`${appUrl}/sign-in`}
              className="bg-silver-light text-bg text-sm font-semibold px-5 py-2 rounded-full hover:bg-silver transition"
            >
              Request Early Access
            </a>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <a href={`${appUrl}/sign-in`} className="bg-silver-light text-bg text-xs font-semibold px-4 py-2 rounded-full">
              Early Access
            </a>
            <button onClick={() => setMobileNav(!mobileNav)} className="text-text-muted" aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {mobileNav && (
          <div className="md:hidden border-t border-border/50 bg-bg/95 px-6 pb-4">
            {navLinks.map((l) => (
              <a key={l.href + l.label} href={l.href} onClick={() => setMobileNav(false)} className="block py-2 text-sm text-text-muted hover:text-silver-light">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ====== HERO ====== */}
      <section id="top" className="relative z-10 scroll-mt-20 pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
        <Reveal delay={0}>
          <div className="flex justify-center mb-8">
            <div className="animate-float">
              <BiasOpsLogo size={96} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <span className="inline-flex items-center gap-2 bg-surface border border-border-light rounded-full px-4 py-1.5 text-sm text-text-secondary mb-8">
            NEW — Fair Lending compliance pack &middot; 5 federal regulations
          </span>
        </Reveal>

        <Reveal delay={200}>
          <h1
            className="text-5xl md:text-[72px] font-extrabold leading-[1.05] tracking-[-3.5px]"
            style={{ color: "#ECEFF4" }}
          >
            Deploy Models you can{" "}
            <span className="text-shimmer">Defend</span>
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-6 text-[17px] text-text-muted max-w-[560px] mx-auto leading-relaxed">
            BiasOps is real-time fairness infrastructure for ML. Detect, mitigate, and audit bias directly in your pipeline — with config-as-code policies and an immutable audit trail.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`${appUrl}/sign-in`}
              className="bg-silver-light text-bg font-semibold px-8 py-3.5 rounded-full hover:bg-silver transition inline-flex items-center gap-2"
            >
              Request Early Access <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/sksvineeth/biasops-policy-marketplace"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-silver-dark text-silver-light font-semibold px-8 py-3.5 rounded-full hover:border-silver transition inline-flex items-center gap-2"
            >
              <Github className="w-4 h-4" /> View Policies on GitHub
            </a>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <div className="mt-6 text-sm text-text-dim">
            Built for ML engineers, compliance officers, and audit teams at banks, fintechs, mortgage lenders, and insurers.
          </div>
        </Reveal>
      </section>

      {/* ====== STATS ====== */}
      <section className="relative z-10 border-y border-border/50">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-12 px-6 text-center">
          {[
            { value: "10+", label: "Policy packages" },
            { value: "23", label: "Automated checks" },
            { value: "5", label: "Regulatory frameworks" },
            { value: "< 4 min", label: "Upload to audit" },
          ].map((s, i) => (
            <Reveal key={i} delay={400 + i * 100} fromY={16}>
              <div>
                <p className="text-3xl font-extrabold text-silver-light font-mono">{s.value}</p>
                <p className="text-sm text-text-muted mt-1">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ====== DASHBOARD PREVIEW ====== */}
      <section className="relative z-10 py-24 px-6">
        <Reveal delay={700} fromY={32}>
          <DashboardPreview />
        </Reveal>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section id="how-it-works" className="relative z-10 scroll-mt-20 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-silver-light">How It Works</h2>
              <p className="mt-4 text-text-muted text-lg">Four steps. Upload to audit-ready in minutes.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Upload",
                icon: Upload,
                desc: "Register your AI model and upload prediction datasets. Supports CSV, .pkl, .onnx, .pt.",
              },
              {
                step: "02",
                title: "Configure",
                icon: Settings,
                desc: "Install config-as-code policies from the open-source marketplace. ECOA, HMDA, CFPB, SR 11-7, FHA, GDPR, EEOC, and more.",
              },
              {
                step: "03",
                title: "Run",
                icon: Play,
                desc: "Execute automated fairness checks in your pipeline. Adverse impact ratios, proxy detection, denial rate disparity, explainability coverage.",
              },
              {
                step: "04",
                title: "Defend",
                icon: ShieldCheck,
                desc: "Get pass/fail results with measured values, thresholds, remediation steps, and an immutable audit trail. Export PDF reports for regulators.",
              },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="rounded-2xl border border-border-light hover:border-[#3A3F52] transition-colors bg-surface p-7 h-full relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(196,204,216,0.12), transparent)" }} />
                  <span className="text-[36px] font-mono font-extrabold leading-none" style={{ color: "rgba(196,204,216,0.15)" }}>{card.step}</span>
                  <div className="w-10 h-10 rounded-lg bg-[rgba(196,204,216,0.08)] border border-border-light flex items-center justify-center mt-3 mb-4">
                    <card.icon className="w-5 h-5 text-silver" />
                  </div>
                  <h3 className="text-lg font-semibold text-silver-light">{card.title}</h3>
                  <p className="mt-3 text-sm text-text-muted leading-relaxed">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== WHY BIASOPS ====== */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-silver-light">Why BiasOps</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Config-as-Code Policies",
                desc: "Version-controlled YAML policies tied to real regulations. No black boxes. Inspect every threshold, submit PRs, fork and customize.",
              },
              {
                title: "Real-Time Pipeline Integration",
                desc: "Detect bias before deployment, not after enforcement. Run checks in CI/CD, on every model update, or on a schedule.",
              },
              {
                title: "Immutable Audit Trail",
                desc: "Every check, every result, every timestamp. Audit-ready evidence that stands up to regulatory examination.",
              },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="rounded-2xl border border-border-light hover:border-[#3A3F52] transition-colors bg-surface p-8 h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(196,204,216,0.12), transparent)" }} />
                  <h3 className="text-xl font-semibold text-silver-light mb-4">{card.title}</h3>
                  <p className="text-text-muted leading-relaxed">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== REGULATORY FRAMEWORKS ====== */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-silver-light">Regulatory Frameworks</h2>
              <p className="mt-4 text-text-muted text-lg">Policy packs mapped to real federal and international regulations.</p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                "ECOA / Reg B",
                "HMDA / Reg C",
                "CFPB Circular 2023-03",
                "OCC SR 11-7",
                "Fair Housing Act",
                "GDPR Article 22",
                "EEOC Title VII",
                "FCPA",
              ].map((reg) => (
                <span
                  key={reg}
                  className="border border-border-light bg-surface rounded-full px-5 py-2.5 text-sm text-silver hover:border-[rgba(196,204,216,0.3)] hover:text-silver-light transition cursor-default"
                >
                  {reg}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====== OPEN SOURCE / POLICIES ON GITHUB ====== */}
      <section id="open-source" className="relative z-10 scroll-mt-20 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-silver-light">Policies Live on GitHub</h2>
              <p className="mt-4 text-text-muted text-lg max-w-2xl mx-auto">
                Every threshold is traceable to published federal regulation. Apache 2.0 licensed. Inspect, fork, contribute.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <YamlBlock />
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 text-center">
              <a
                href="https://github.com/sksvineeth/biasops-policy-marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-silver-dark text-silver-light font-semibold px-6 py-3 rounded-full hover:border-silver transition"
              >
                <Github className="w-4 h-4" /> View on GitHub <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====== CREDIBILITY ====== */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-silver-light">Built on Experience</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "7+ years", desc: "Enterprise AI experience across Schneider Electric and Honeywell" },
              { value: "$50M+", desc: "Documented risk avoidance from ML systems" },
              { value: "IEEE & MLWeek", desc: "Presented at IEEE conferences, speaking at MLWeek 2026" },
              { value: "Apache 2.0", desc: "Fully open source. Inspect, fork, contribute." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="rounded-2xl border border-border-light hover:border-[#3A3F52] transition-colors bg-surface p-6 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(196,204,216,0.12), transparent)" }} />
                  <p className="text-[28px] font-extrabold text-silver-light font-mono leading-tight">{item.value}</p>
                  <p className="text-[13px] text-text-muted mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section id="cta" className="relative z-10 scroll-mt-20 py-28 px-6 text-center">
        <Reveal>
          <div className="flex justify-center mb-6">
            <BiasOpsLogo size={48} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-silver-light">
            Ready to defend your models?
          </h2>
          <p className="mt-4 text-text-muted text-lg max-w-xl mx-auto">
            Real-time fairness infrastructure. Config-as-code policies. Immutable audit trail.
          </p>
          <div className="mt-8">
            <a
              href={`${appUrl}/sign-in`}
              className="bg-silver-light text-bg font-semibold px-10 py-4 rounded-full hover:bg-silver transition inline-flex items-center gap-2 text-lg"
            >
              Request Early Access <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="relative z-10 border-t border-border/50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <a href="#top" className="flex items-center gap-2">
                <BiasOpsIcon size={18} />
                <span className="text-lg font-bold tracking-tight text-silver-light">BiasOps</span>
              </a>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-text-secondary mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>
                  <a href="https://github.com/sksvineeth/biasops-policy-marketplace" target="_blank" rel="noopener noreferrer" className="hover:text-silver-light transition inline-flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                </li>
                <li><a href="#how-it-works" className="hover:text-silver-light transition">Documentation</a></li>
                <li><a href="#open-source" className="hover:text-silver-light transition">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-text-secondary mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li><a href="mailto:Vineeth@biasops.ai" className="hover:text-silver-light transition">Contact</a></li>
                <li>
                  <a href="https://www.linkedin.com/company/biasops" target="_blank" rel="noopener noreferrer" className="hover:text-silver-light transition inline-flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-text-secondary mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>
                  <a href="mailto:Vineeth@biasops.ai" className="hover:text-silver-light transition inline-flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> Vineeth@biasops.ai
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between text-sm text-text-dim">
            <p>&copy; 2026 BiasOps</p>
            <p className="mt-2 md:mt-0">Apache 2.0 Licensed</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

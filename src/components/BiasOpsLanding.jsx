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

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Isometric Cube Logo                                                */
/* ------------------------------------------------------------------ */
function CubeLogo({ size = 30, animate = false, className = "" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={`${animate ? "animate-float" : ""} ${className}`}
    >
      <defs>
        <linearGradient id="lt" x1="24" y1="4" x2="24" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3D4756" stopOpacity="0.3" />
          <stop offset="1" stopColor="#2A3240" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="ll" x1="4" y1="20" x2="24" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D1D8E3" stopOpacity="0.35" />
          <stop offset="1" stopColor="#A0ABBE" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="lr" x1="44" y1="20" x2="24" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6B7A90" stopOpacity="0.25" />
          <stop offset="1" stopColor="#4A5568" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="lc" x1="16" y1="22" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E0E5EC" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <polygon points="24,4 44,16 24,28 4,16" fill="url(#lt)" stroke="#C4CCD8" strokeWidth="0.5" strokeOpacity="0.2" />
      <polygon points="4,16 24,28 24,44 4,32" fill="url(#ll)" stroke="#C4CCD8" strokeWidth="0.5" strokeOpacity="0.2" />
      <polygon points="44,16 24,28 24,44 44,32" fill="url(#lr)" stroke="#C4CCD8" strokeWidth="0.5" strokeOpacity="0.2" />
      <polyline
        points="16,26 22,32 33,20"
        fill="none"
        stroke="url(#lc)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
      />
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
    <div className="rounded-2xl overflow-hidden border border-border bg-[#0D1017] shadow-2xl max-w-2xl mx-auto text-left">
      <div className="flex items-center gap-2 px-4 py-3 bg-surface-raised border-b border-border">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#F5A623]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-xs text-text-muted font-mono">ecoa_policy.yaml</span>
      </div>
      <pre className="p-5 text-sm font-mono leading-relaxed overflow-x-auto">
        {lines.map((l, i) => (
          <div key={i}>
            <span className="text-text-dim">{"  ".repeat(l.indent)}</span>
            <span className="text-text-muted">{l.key}</span>
            <span className="text-silver-light">{l.val}</span>
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
        className="rounded-[20px] overflow-hidden border border-border"
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
            <CubeLogo size={20} />
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
                  <p className="text-lg font-bold text-silver-light font-mono mt-1">{s.value}</p>
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
    <div className="border-b border-border">
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

  const navLinks = [
    { label: "Product", href: "#how-it-works" },
    { label: "Marketplace", href: "#open-source" },
    { label: "Docs", href: "#open-source" },
    { label: "Pricing", href: "#cta" },
  ];

  return (
    <div className="min-h-screen bg-bg text-silver-light scroll-smooth relative overflow-x-hidden">
      {/* ====== Background Effects ====== */}
      {/* Noise overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Grid pattern */}
      <div
        className="fixed inset-0 z-0 pointer-events-none animate-grid-pulse"
        style={{
          backgroundImage:
            "linear-gradient(rgba(31,35,48,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(31,35,48,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Ambient radial glows */}
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
            <CubeLogo size={30} />
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
            <a href="#cta" className="text-sm text-text-secondary hover:text-silver-light transition">
              Sign in
            </a>
            <a
              href="#cta"
              className="bg-silver-light text-bg text-sm font-semibold px-5 py-2 rounded-full hover:bg-silver transition"
            >
              Request Early Access
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-3">
            <a href="#cta" className="bg-silver-light text-bg text-xs font-semibold px-4 py-2 rounded-full">
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
        <Reveal>
          <span className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 text-sm text-text-secondary mb-8">
            NEW — Fair Lending compliance pack &middot; 5 federal regulations
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1
            className="text-5xl md:text-[72px] font-extrabold leading-[1.05] tracking-[-3.5px]"
          >
            Deploy Models{" "}
            <span className="text-shimmer">you can Defend</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 text-[17px] text-text-muted max-w-[560px] mx-auto leading-relaxed">
            BiasOps is real-time fairness infrastructure for ML. Detect, mitigate, and audit bias directly in your pipeline — with config-as-code policies and an immutable audit trail.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#cta"
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

        <Reveal delay={400}>
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
            <Reveal key={i} delay={400 + i * 100}>
              <div>
                <p className="text-3xl font-bold text-silver-light font-mono">{s.value}</p>
                <p className="text-sm text-text-muted mt-1">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ====== DASHBOARD PREVIEW ====== */}
      <section className="relative z-10 py-24 px-6">
        <Reveal delay={700}>
          <DashboardPreview />
        </Reveal>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section id="how-it-works" className="relative z-10 scroll-mt-20 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How It Works</h2>
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
                <div className="rounded-2xl border border-border bg-surface p-7 h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-silver/30 to-transparent" />
                  <span className="text-sm font-mono text-text-dim">{card.step}</span>
                  <div className="w-10 h-10 rounded-lg bg-[rgba(196,204,216,0.08)] border border-border flex items-center justify-center mt-3 mb-4">
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
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Why BiasOps</h2>
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
                <div className="rounded-2xl border border-border bg-surface p-8 h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-silver/30 to-transparent" />
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
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Regulatory Frameworks</h2>
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
                  className="border border-silver-dark/50 rounded-full px-5 py-2.5 text-sm text-text-secondary hover:border-silver/50 hover:text-silver-light transition"
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
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Policies Live on GitHub</h2>
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
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Built on Experience</h2>
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
                <div className="rounded-2xl border border-border bg-surface p-6 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-silver/30 to-transparent" />
                  <p className="text-2xl font-bold text-silver-light font-mono">{item.value}</p>
                  <p className="text-sm text-text-muted mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section id="cta" className="relative z-10 scroll-mt-20 py-28 px-6 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Ready to defend your models?
          </h2>
          <p className="mt-4 text-text-muted text-lg max-w-xl mx-auto">
            Real-time fairness infrastructure. Config-as-code policies. Immutable audit trail.
          </p>
          <div className="mt-8">
            <a
              href="mailto:Vineeth@biasops.ai"
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
                <CubeLogo size={24} />
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

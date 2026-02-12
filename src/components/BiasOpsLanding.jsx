import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Shield,
  ScanSearch,
  Route,
  LayoutDashboard,
  FileCode2,
  ScrollText,
  Plug,
  ChevronDown,
  ExternalLink,
  Mail,
  Linkedin,
  Github,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Scroll-reveal hook (IntersectionObserver)                         */
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
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Accordion Item                                                */
/* ------------------------------------------------------------------ */
function FaqItem({ question, answer, open, onClick }) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-lg font-medium text-white pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-gray-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  YAML Code Block (faux terminal)                                   */
/* ------------------------------------------------------------------ */
function YamlTerminal() {
  const lines = [
    { text: "policy:", cls: "text-cyan-400" },
    { text: "  name: ", cls: "text-purple-400", val: '"hiring-fairness-v2"', valCls: "text-green-400" },
    { text: "  standard: ", cls: "text-purple-400", val: '"EU-AI-Act-Article-10"', valCls: "text-green-400" },
    { text: "  thresholds:", cls: "text-purple-400" },
    { text: "    demographic_parity: ", cls: "text-purple-400", val: "0.80", valCls: "text-orange-400" },
    { text: "    equalized_odds: ", cls: "text-purple-400", val: "0.85", valCls: "text-orange-400" },
    { text: "  on_violation: ", cls: "text-purple-400", val: '"repair_and_log"', valCls: "text-green-400" },
    { text: "", cls: "" },
    { text: "# Drop into your pipeline:", cls: "text-gray-500" },
    { text: "# biasops scan --config biasops.yaml", cls: "text-gray-500" },
  ];

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl max-w-2xl mx-auto">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-gray-500 font-mono">biasops.yaml</span>
      </div>
      <pre className="p-5 text-sm font-mono leading-relaxed overflow-x-auto">
        {lines.map((l, i) => (
          <div key={i}>
            <span className={l.cls}>{l.text}</span>
            {l.val && <span className={l.valCls}>{l.val}</span>}
          </div>
        ))}
      </pre>
    </div>
  );
}

/* ================================================================== */
/*  MAIN COMPONENT                                                    */
/* ================================================================== */
export default function BiasOpsLanding() {
  const [faqOpen, setFaqOpen] = useState(null);
  const [formData, setFormData] = useState({ email: "", role: "", challenge: "" });
  const [submitted, setSubmitted] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to Formspree/ConvertKit endpoint
    setSubmitted(true);
  };

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Marketplace", href: "#marketplace" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white scroll-smooth">
      {/* ============================================================ */}
      {/*  NAVBAR                                                      */}
      {/* ============================================================ */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#0a0e1a]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#top" className="text-2xl font-bold tracking-tight">
            <span className="text-white">Bias</span>
            <span className="text-cyan-400">Ops</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-gray-400 hover:text-white transition">
                {l.label}
              </a>
            ))}
            <a href="#waitlist" className="bg-cyan-400 text-[#0a0e1a] text-sm font-semibold px-5 py-2 rounded-full hover:bg-cyan-300 transition">
              Join Waitlist
            </a>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <a href="#waitlist" className="bg-cyan-400 text-[#0a0e1a] text-xs font-semibold px-4 py-2 rounded-full">
              Join Waitlist
            </a>
            <button onClick={() => setMobileNav(!mobileNav)} className="text-gray-400" aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {mobileNav && (
          <div className="md:hidden border-t border-white/5 bg-[#0a0e1a]/95 px-6 pb-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileNav(false)} className="block py-2 text-sm text-gray-400 hover:text-white">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ============================================================ */}
      {/*  1. HERO                                                     */}
      {/* ============================================================ */}
      <section id="top" className="scroll-mt-20 pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-gray-300 mb-8">
            <Shield className="w-4 h-4 text-cyan-400" />
            EU AI Act &amp; NYC LL144 Ready
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Deploy Models
            <br />
            <span className="text-cyan-400">you can Defend</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            BiasOps is real-time fairness infrastructure for ML. Detect, mitigate, and audit bias directly in your pipeline — with config-as-code policies and an immutable audit trail.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#waitlist" className="bg-cyan-400 text-[#0a0e1a] font-semibold px-8 py-3 rounded-full hover:bg-cyan-300 transition inline-flex items-center gap-2">
              Request Early Access <ArrowRight className="w-4 h-4" />
            </a>
            <a href="https://github.com/sksvineeth/biasOps-site" target="_blank" rel="noopener noreferrer" className="border border-white/20 text-white font-semibold px-8 py-3 rounded-full hover:border-white/40 transition inline-flex items-center gap-2">
              View on GitHub <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-14">
            <YamlTerminal />
          </div>
        </Reveal>
      </section>

      {/* ============================================================ */}
      {/*  2. METRICS BAR                                              */}
      {/* ============================================================ */}
      <section className="border-y border-white/5 bg-[#0c1020]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-10 px-6 text-center">
          {[
            { title: "Policy-as-Code", sub: "Declarative YAML policies" },
            { title: "Real-Time", sub: "In-pipeline enforcement" },
            { title: "Audit-Ready", sub: "Immutable compliance trail" },
            { title: "Open Source", sub: "MIT licensed, community-driven" },
          ].map((m, i) => (
            <Reveal key={i} delay={i * 100}>
              <div>
                <p className="text-lg font-semibold text-white">{m.title}</p>
                <p className="text-sm text-gray-500 mt-1">{m.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. DIFFERENTIATOR STATEMENT                                 */}
      {/* ============================================================ */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Others detect bias. <span className="text-cyan-400">We enforce fairness.</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            Most AI fairness tools stop at measurement — surfacing metrics in a dashboard someone checks quarterly. BiasOps embeds policy enforcement directly into your ML pipeline, so bias violations are caught, mitigated, and logged before predictions reach production. Not after the audit finds them.
          </p>
        </Reveal>
      </section>

      {/* ============================================================ */}
      {/*  4. HOW IT WORKS                                             */}
      {/* ============================================================ */}
      <section id="how-it-works" className="scroll-mt-20 py-24 px-6 bg-[#0c1020]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How It Works</h2>
              <p className="mt-4 text-gray-400 text-lg">Three agents. One pipeline. Zero blind spots.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Critique Agent Scans", accent: "cyan", desc: "Every prediction is evaluated for group-level disparity. The Critique Agent quantifies bias risk using evidential learning and uncertainty estimation — flagging issues before they reach users." },
              { step: "02", title: "Repair Agent Mitigates", accent: "purple", desc: "When bias exceeds your policy thresholds, the Repair Agent kicks in — rerouting predictions, applying recalibration, or triggering alerts. Automated remediation, not just reporting." },
              { step: "03", title: "Bias Ledger Logs", accent: "green", desc: "Every detection, mitigation, and decision is written to an immutable audit trail. When regulators or auditors come knocking, your compliance story is already written." },
            ].map((card, i) => {
              const colors = {
                cyan: { text: "text-cyan-400", border: "border-cyan-400/30" },
                purple: { text: "text-purple-400", border: "border-purple-400/30" },
                green: { text: "text-green-400", border: "border-green-400/30" },
              };
              const c = colors[card.accent];
              return (
                <Reveal key={i} delay={i * 150}>
                  <div className={`rounded-xl border ${c.border} bg-[#111730] p-8 h-full`}>
                    <span className={`text-sm font-mono ${c.text}`}>{card.step}</span>
                    <h3 className={`text-xl font-semibold mt-3 ${c.text}`}>{card.title}</h3>
                    <p className="mt-4 text-gray-400 leading-relaxed text-sm">{card.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-3 font-mono text-sm">
              <span className="text-white">Model Prediction</span>
              <span className="text-cyan-400">&rarr;</span>
              <span className="text-cyan-400">Critique</span>
              <span className="text-purple-400">&rarr;</span>
              <span className="text-purple-400">Repair</span>
              <span className="text-green-400">&rarr;</span>
              <span className="text-green-400">Ledger</span>
              <span className="text-white">&rarr;</span>
              <span className="text-white">Production</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. FEATURES GRID                                            */}
      {/* ============================================================ */}
      <section id="features" className="scroll-mt-20 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Built for Regulated Industries</h2>
              <p className="mt-4 text-gray-400 text-lg">Finance, healthcare, hiring — wherever decisions impact people, BiasOps enforces fairness.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ScanSearch, title: "Adaptive Bias Detection", desc: "Scan predictions for group-level disparity in real time. Measure uncertainty to determine risk — not just accuracy." },
              { icon: Route, title: "Smart Routing Engine", desc: "Automatically trigger critique and repair agents when bias and uncertainty exceed your declared thresholds." },
              { icon: LayoutDashboard, title: "Governance Dashboard", desc: "Visualize bias metrics, model confidence, and human feedback loops for every prediction — across every model." },
              { icon: FileCode2, title: "Config-as-Code Policies", desc: "Define fairness thresholds in declarative YAML. Version-controlled, reviewable, enforceable — just like infrastructure." },
              { icon: ScrollText, title: "Immutable Audit Trail", desc: "Every mitigation event logged with timestamps, explanations, and policy references. Ready for SOC 2, EU AI Act, and LL144." },
              { icon: Plug, title: "Plug-and-Play Integration", desc: "Drop into any MLOps pipeline via API or CLI. Works with your existing stack — no rip-and-replace required." },
            ].map((feat, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="rounded-xl border border-white/5 bg-[#0f1424] p-6 h-full hover:border-cyan-400/20 transition">
                  <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center mb-4">
                    <feat.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feat.title}</h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. POLICY MARKETPLACE                                       */}
      {/* ============================================================ */}
      <section id="marketplace" className="scroll-mt-20 py-24 px-6 bg-[#0c1020]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm text-purple-400 mb-6">
                <Sparkles className="w-4 h-4" />
                Coming Soon
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Policy Marketplace</h2>
              <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
                Community-contributed policy templates so you can enforce compliance out of the box — or customize for your domain.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Pre-Built Compliance Templates", desc: "EU AI Act Article 10, NYC Local Law 144, EEOC guidelines — ready-to-deploy policy packs." },
              { title: "Community Policy Library", desc: "Industry practitioners share battle-tested bias policies. Fork, customize, and contribute back." },
              { title: "Domain-Specific Packs", desc: "Pre-tuned configs for healthcare, financial services, hiring, and climate policy." },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="rounded-xl border border-white/5 bg-[#111730] p-8 h-full">
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm text-gray-400 leading-relaxed">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  7. FOUNDER / ABOUT                                          */}
      {/* ============================================================ */}
      <section id="about" className="scroll-mt-20 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Built by an Engineer,<br />Not a Consultant
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-6 text-gray-400 text-lg leading-relaxed">
              BiasOps is built by Vineeth, a Principal ML Engineer with 7+ years building enterprise AI systems at Fortune 500 companies. After documenting $50M+ in risk avoidance through ML-driven anomaly detection for Finance, Audit, and Compliance teams — he saw firsthand that the governance layer was missing. BiasOps is that layer.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {["IEEE Member", "SCSP AI+Space Fellow", "Northeastern University"].map((badge) => (
                <span key={badge} className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-gray-300">
                  {badge}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={350}>
            <a href="https://www.linkedin.com/in/sksvineeth/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 text-cyan-400 hover:text-cyan-300 transition text-sm">
              <Linkedin className="w-4 h-4" /> Connect on LinkedIn
            </a>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  8. WAITLIST / CONTACT FORM                                  */}
      {/* ============================================================ */}
      <section id="waitlist" className="scroll-mt-20 py-24 px-6 bg-[#0c1020]">
        <div className="max-w-xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Get Early Access</h2>
            <p className="mt-4 text-gray-400 text-lg">Join the waitlist and help shape the future of ML fairness infrastructure.</p>
          </Reveal>

          <Reveal delay={150}>
            {submitted ? (
              <div className="mt-10 rounded-xl border border-green-500/30 bg-green-500/10 p-8">
                <p className="text-green-400 text-lg font-semibold">You&apos;re on the list!</p>
                <p className="text-gray-400 mt-2 text-sm">We&apos;ll be in touch soon. Keep an eye on your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-5 text-left">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email <span className="text-red-400">*</span></label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@company.com" className="w-full rounded-lg bg-[#111730] border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Role</label>
                  <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full rounded-lg bg-[#111730] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition appearance-none">
                    <option value="">Select your role</option>
                    <option>ML Engineer</option>
                    <option>Compliance Officer</option>
                    <option>Risk Manager</option>
                    <option>Data Scientist</option>
                    <option>Engineering Leader</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Biggest AI governance challenge? (optional)</label>
                  <textarea rows={3} value={formData.challenge} onChange={(e) => setFormData({ ...formData, challenge: e.target.value })} placeholder="Tell us what keeps you up at night..." className="w-full rounded-lg bg-[#111730] border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition resize-none" />
                </div>
                <button type="submit" className="w-full bg-cyan-400 text-[#0a0e1a] font-semibold py-3 rounded-full hover:bg-cyan-300 transition">
                  Join Waitlist
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={250}>
            <p className="mt-8 text-sm text-gray-500">
              Or email us directly at{" "}
              <a href="mailto:Vineeth@biasops.ai" className="text-cyan-400 hover:text-cyan-300">Vineeth@biasops.ai</a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  9. FAQ                                                      */}
      {/* ============================================================ */}
      <section id="faq" className="scroll-mt-20 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Frequently Asked Questions</h2>
              <p className="mt-4 text-gray-400">
                Can&apos;t find what you&apos;re looking for?{" "}
                <a href="mailto:Vineeth@biasops.ai" className="text-cyan-400 hover:text-cyan-300">Email us</a>
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              {[
                { q: "What is BiasOps?", a: "BiasOps is a real-time fairness infrastructure layer for ML systems. It uses autonomous agents to detect, mitigate, and log bias directly in your prediction pipeline — enforced through declarative YAML policies." },
                { q: "How is this different from IBM AIF360 or Fairlearn?", a: "Those are excellent research libraries for measuring bias. BiasOps is infrastructure — it doesn't just detect bias, it enforces policy thresholds in production, auto-mitigates violations, and maintains an immutable audit trail for compliance." },
                { q: "What regulations does BiasOps support?", a: "BiasOps ships with policy templates for the EU AI Act, NYC Local Law 144, and EEOC guidelines. The Policy Marketplace will include community-contributed templates for additional frameworks." },
                { q: "Can I integrate BiasOps with my existing MLOps stack?", a: "Yes. BiasOps integrates via API or CLI and works alongside your existing tools — MLflow, Kubeflow, SageMaker, or custom pipelines. One config file, one command." },
                { q: "Is BiasOps open source?", a: "Yes. BiasOps is MIT licensed. We believe fairness infrastructure should be transparent and community-driven." },
              ].map((item, i) => (
                <FaqItem key={i} question={item.q} answer={item.a} open={faqOpen === i} onClick={() => setFaqOpen(faqOpen === i ? null : i)} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  10. FOOTER                                                  */}
      {/* ============================================================ */}
      <footer className="border-t border-white/5 bg-[#080b15] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <a href="#top" className="text-2xl font-bold tracking-tight">
                <span className="text-white">Bias</span><span className="text-cyan-400">Ops</span>
              </a>
              <p className="mt-3 text-sm text-gray-500">Boston, MA</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="https://github.com/sksvineeth/biasOps-site" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a></li>
                <li><a href="#features" className="hover:text-white transition">Docs</a></li>
                <li><a href="#waitlist" className="hover:text-white transition">Waitlist</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="/blogs.html" className="hover:text-white transition">Blog</a></li>
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="mailto:Vineeth@biasops.ai" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="https://www.linkedin.com/company/biasops" target="_blank" rel="noopener noreferrer" className="hover:text-white transition inline-flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</a></li>
                <li><a href="mailto:Vineeth@biasops.ai" className="hover:text-white transition inline-flex items-center gap-2"><Mail className="w-4 h-4" /> Email</a></li>
                <li><a href="https://github.com/sksvineeth/biasOps-site" target="_blank" rel="noopener noreferrer" className="hover:text-white transition inline-flex items-center gap-2"><Github className="w-4 h-4" /> GitHub</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <p>&copy; 2026 BiasOps.ai. All rights reserved.</p>
            <p className="mt-2 md:mt-0">MIT Licensed</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

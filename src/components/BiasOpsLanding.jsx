// BiasOps Landing Page (Neura-style, React + Tailwind with Scroll Animations)
import React from "react";
import { ArrowRight } from "lucide-react";

function Button({ children, ...props }) {
  return (
    <button {...props} className="rounded-full px-10 py-5 text-lg shadow bg-black text-white hover:bg-gray-800">
      {children}
    </button>
  );
}

function Card({ children, ...props }) {
  return <div {...props} className={`rounded-xl border bg-white ${props.className || ""}`}>{children}</div>;
}

function CardContent({ children, ...props }) {
  return <div {...props} className="p-6">{children}</div>;
}

const descriptions = [
  "Scan model predictions for group disparity, then measure uncertainty to determine risk.",
  "Automatically trigger critique and repair agents when bias and uncertainty exceed thresholds.",
  "Visualize bias metrics, model confidence, and human feedback for each prediction.",
  "Use our group-weighted evidential loss function to train more responsible models."
];

export default function BiasOpsLanding() {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 md:px-12 py-16 font-sans scroll-smooth">
      <div className="max-w-7xl mx-auto space-y-24">
        <header className="text-center opacity-0 animate-fadeIn scroll-mt-20" id="top">
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tight leading-tight">BiasOps</h1>
          <p className="text-xl mt-6 text-gray-500 font-light">
            Deploy Models you can Defend
          </p>
          <p className="text-xl mt-6 text-gray-500 font-light">
            BiasOps makes fairness a first class citizen in your MLOps pipeline.
          </p>
        </header>

        <nav className="text-center">
          <ul className="flex justify-center space-x-6 text-sm text-gray-500 underline">
            <li><a href="#features">Features</a></li>
            <li><a href="#marketplace">Marketplace</a></li>
            <li><a href="#cta">Get Started</a></li>
          </ul>
        </nav>

        

        <section id="features" className="overflow-x-auto whitespace-nowrap space-x-6 flex snap-x snap-mandatory px-1">
          {["Adaptive Bias Detection", "Smart Routing Engine", "Governance Dashboard", "Bias-Aware Training"].map((title, idx) => (
            <Card key={idx} className="w-80 shrink-0 snap-center border-gray-200 p-8 shadow-sm transition hover:shadow-md">
              <CardContent>
                <h2 className="text-xl font-medium mb-2 whitespace-normal break-words">{title}</h2>
                <p className="text-gray-600 text-sm whitespace-normal break-words">
                  {descriptions[idx]}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>
        

        <section className="grid md:grid-cols-3 gap-8 animate-fadeIn">
          {["Auditable Logs", "Plug-and-Play", "Compliance-Ready"].map((feature, i) => (
            <Card key={i} className="border border-gray-100 bg-gray-50 p-6 rounded-lg shadow-none hover:shadow-md transition">
              <h3 className="text-lg font-medium mb-1">{feature}</h3>
              <p className="text-sm text-gray-500">
                {{
                  0: "Track every mitigation event with timestamped, explainable entries.",
                  1: "Integrates with any MLOps pipeline using API or CLI tools.",
                  2: "Designed for deployment in regulated domains like HR, healthcare, and finance."
                }[i]}
              </p>
            </Card>
          ))}
        </section>

        <section id="marketplace" className="rounded-3xl bg-gray-50 py-16 px-8 animate-fadeIn scroll-mt-20">
          <h2 className="text-4xl font-semibold text-center mb-12 tracking-tight">Policy Marketplace</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Upload Fairness Policies", "Discover Policy Templates", "Activate BiasOps Plugins"].map((item, i) => (
              <Card key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition">
                <h3 className="text-lg font-medium mb-2">{item}</h3>
                <p className="text-sm text-gray-600">
                  {{
                    0: "Enable contributors to define and share audit rules tailored for industry-specific regulations.",
                    1: "Browse a curated collection of bias mitigation policies with pre-tuned configs and metrics.",
                    2: "Deploy mitigation strategies from shared policies with one click across your ML pipelines."
                  }[i]}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <div id="cta" className="text-center animate-fadeIn scroll-mt-20">
          <Button>
            Get Started <ArrowRight className="ml-2 w-5 h-5 inline" />
          </Button>
          <p className="mt-4 text-sm text-gray-400">Drop into your MLOps pipeline with one line of code.</p>
          <footer className="mt-16 py-8 text-center text-gray-400 text-sm">
  BiasOps.ai © 2025&nbsp;|&nbsp;
  <a href="https://www.linkedin.com/company/biasops" className="hover:underline text-gray-500" target="_blank" rel="noopener noreferrer">LinkedIn</a>&nbsp;|&nbsp;
  <a href="blogs.html" className="hover:underline text-gray-500">Blog</a>&nbsp;|&nbsp;
  <a href="https://github.com/biasops" className="hover:underline text-gray-500" target="_blank" rel="noopener noreferrer">GitHub</a>&nbsp;|&nbsp;
  <a href="mailto:Vineeth@biasops.ai" className="hover:underline text-gray-500">Contact</a>
</footer>
        </div>
      </div>
    </div>
  );
}

# BiasOps Landing Page (biasops.ai)

## Project
Marketing landing page for BiasOps — AI governance / fairness infrastructure product. Single-page app at biasops.ai.

## Tech Stack
- **Framework**: Create React App (CRA)
- **Styling**: Tailwind CSS v3 (tailwind.config.js)
- **Fonts**: Plus Jakarta Sans (400-800), IBM Plex Mono (400, 500) via Google Fonts (loaded in public/index.html)
- **Icons**: lucide-react (ArrowRight, ExternalLink, Github, ChevronDown, Mail, Linkedin)

## Design System — v5 Silver Metal on Void Black

| Token | Value |
|----------------|-------|
| `void` (bg) | `#09090B` |
| `surface` | `#0F0F12` |
| `surface-raised` | `#111114` |
| `border` | `#141418` |
| `border-light` | `#18181B` |
| `silver` | `#C4CCD8` |
| `silver-light` | `#E0E5EC` |
| `silver-dark` | `#8A95A8` |
| `text-secondary` | `#B0B8C9` |
| `text-muted` | `#6C7690` |
| `text-dim` | `#3E4559` |

## Pages
- `src/components/BiasOpsLanding.jsx` — main SPA landing page
- `public/fair-lending.html` — fair lending compliance deep-dive doc
- `public/llm-observability.html` — LLM compliance observability deep-dive doc
- `public/contact.html` — contact/demo request form powered by Formspree

## Main File
Everything is in `src/components/BiasOpsLanding.jsx`. Contains:

### Helper Components
- **`useReveal` / `Reveal`** — IntersectionObserver scroll-reveal with staggered delays and `cubic-bezier(0.16, 1, 0.3, 1)`
- **`BiasOpsLogo`** — v5 Silver Metal balance scale with diamond fulcrum, imperative DOM animation engine cycling 4 states (idle 900ms/node, scan 220ms/node, bias detected with gold spark #FBBF24, enforce rebalance). Accepts `animate` and `onPhaseChange` props. Counter-based unique IDs.
- **`BiasOpsIcon`** — Silver rounded square container 64x64 rx=14, diamond fulcrum, bright silver left cluster, darker steel right cluster.
- **Wordmark** — "Bias" Silver #A1A1AA weight 800, "Ops" Steel #71717A weight 600
- **`CinematicIntro`** — Gaming-style loading overlay with scanlines, pulse glow, animated logo, and loading bar
- **`HeroCard`** — OpenLayer-style animated compliance check cards
- **`NavDropdown`** — Dropdown nav component with ChevronDown icon rotation
- **`ProductSection`** — Alternating product feature blocks with animated code/dashboard demos
- **`TemplateCard`** — Marketplace policy template cards with tag pills

### Page Sections (top to bottom)
1. **CinematicIntro** — Gaming-style loading overlay with animated logo
2. **Background** — Noise texture (feTurbulence), grid, radial gradient orbs
3. **Navbar** — Fixed, backdrop-blur, logo, Products/Docs dropdowns (with ChevronDown), Pricing, Sign in (links to app.biasops.ai/sign-in) + Book a Demo (links to /contact.html)
4. **Hero** — Animated BiasOpsLogo with phase-aware ambient glow, pill badge, "Deploy Models You Can Defend" shimmer, hero CTA buttons (Book a Demo + View on GitHub with lucide-react icons), animated HeroCards
5. **Product sections** — Policy Engine, Data Compliance, Model Compliance, LLM Compliance, Agent Governance, Audit & Reporting with animated demos
6. **Policy Marketplace** — Template cards grid, GitHub link, CLI init command
7. **CTA** — Logo + "Compliance is not a patch. It is the architecture." + Book a Demo button
8. **Footer** — 5-column grid (Brand, Products, Use Cases, Resources, Company) with lucide-react icons on GitHub/LinkedIn/Mail links

### CTA Routing
- All "Book a Demo" / CTA links point to `/contact.html` (not `#cta`)
- Contact form submits to Formspree (`https://formspree.io/f/mqeywdzg`), redirects to `/contact.html?thanks=1` on success

## CSS (`src/index.css`)
- `.text-shimmer` — 135deg gradient, `background-size: 200% auto`, keyframe `-200%→200%`
- `.hide-scrollbar` — WebKit + Firefox scrollbar hiding
- `@keyframes shimmer` defined **outside** `@layer` (required for Tailwind v3)

## Animations (tailwind.config.js)
- `shimmer`: 4s linear infinite
- `float`: 6s ease-in-out infinite (-8px translateY)
- `gridPulse`: 8s ease-in-out infinite
- `fadeIn`: 0.5s ease-out

## Environment
- Sign-in link points directly to `https://app.biasops.ai/sign-in`
- All CTA / "Book a Demo" links point to `/contact.html`

## Deployment
- **Vercel project**: `bias-ops-site`
- **Production URL**: https://www.biasops.ai / https://biasops.ai
- **Build**: `npx react-scripts build`
- **Local**: `npx serve -s build -l 3002`

## Related Repos
- **biasops-saas** (`/Users/vineethreddy/biasops-saas/`) — SaaS dashboard (Next.js + Clerk), deployed at app.biasops.ai
- **biasops-policy-marketplace** (`/Users/vineethreddy/biasops-policy-marketplace/`) — Python policy engine

## Git Rules
- NEVER add Co-authored-by trailers to any commits
- Commit messages: conventional commits (feat:, fix:, docs:, chore:)

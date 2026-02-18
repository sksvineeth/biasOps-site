# BiasOps Landing Page (biasops.ai)

## Project
Marketing landing page for BiasOps — AI governance / fairness infrastructure product. Single-page app at biasops.ai.

## Tech Stack
- **Framework**: Create React App (CRA)
- **Styling**: Tailwind CSS v3 (tailwind.config.js)
- **Fonts**: Plus Jakarta Sans (400-800), IBM Plex Mono (400, 500) via Google Fonts (loaded in public/index.html)
- **No icon library** — uses inline SVG icons

## Design System — Silver-on-Black
Matches the SaaS dashboard palette exactly.

| Tailwind Token | Value |
|----------------|-------|
| `bg` | `#08090C` |
| `surface` | `#0F1114` |
| `surface-raised` | `#16181D` |
| `silver` | `#C4CCD8` |
| `silver-light` | `#E0E5EC` |
| `silver-dark` | `#8A95A8` |
| `text-secondary` | `#B0B8C9` |
| `text-muted` | `#6C7690` |
| `text-dim` | `#3E4559` |
| `border` | `#1F2330` |
| `border-light` | `#2A2E3D` |

## Main File
Everything is in `src/components/BiasOpsLanding.jsx`. Contains:

### Helper Components
- **`useReveal` / `Reveal`** — IntersectionObserver scroll-reveal with staggered delays and `cubic-bezier(0.16, 1, 0.3, 1)`
- **`BiasOpsLogo`** — Full SVG isometric cube with gradients + glow filter. Counter-based unique IDs. Sizes: hero 96, nav 36, CTA 48.
- **`BiasOpsIcon`** — Compact flat SVG, no glow. Footer size 18.
- **`YamlBlock`** — ECOA policy YAML with syntax coloring, browser chrome dots, filename label
- **`DashboardPreview`** — Browser chrome mock with sidebar, 4 stat cards, 8-row results table
- **`FeatureCard`** — Interactive card with mouse-tracking gradient border, spotlight, hover lift (-6px + scale 1.02), expanding divider (24px→44px), number watermark (44px IBM Plex Mono, 3%→7% opacity on hover), description brightens on hover (#6C7690→#B0B8C9)
- **`FeaturesCarousel`** — Horizontal scroll with 6 FeatureCards (flex 0 0 320px), 80px edge fades, custom slider bar (400px max, silver gradient thumb with glow, scroll↔slider sync, touch support)
- **`FeatureIcons`** — Object with 6 inline SVG icons: radar, branch, chart, code, shield, plug (22px strokes)

### Page Sections (top to bottom)
1. **Background** — Noise texture (feTurbulence), 64px grid, two radial gradient orbs
2. **Navbar** — Fixed, backdrop-blur, logo 36px, nav links, Sign in + Request Early Access → app sign-in
3. **Hero** — Floating logo 96px (6s animation), pill badge, "Deploy Models you can **Defend**" (only "Defend" shimmers), CTA buttons
4. **Stats** — 10+ Policies, 23 Checks, 5 Frameworks, < 4 min
5. **Dashboard Preview** — Browser chrome mock
6. **Capabilities Carousel** — "CAPABILITIES" label (11px uppercase #3E4559), "Built for Regulated Industries" (44px, "Regulated Industries" shimmers). 6 cards: Adaptive Bias Detection, Smart Routing Engine, Governance Dashboard, Config-as-Code Policies, Immutable Audit Trail, Plug-and-Play Integration
7. **Regulatory Frameworks** — 8 pills
8. **Policies on GitHub** — YAML block + link
9. **Credibility** — 4 stat cards
10. **CTA** — Logo + heading + Early Access button
11. **Footer** — 4-column grid

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
- `REACT_APP_APP_URL` in `.env.local` (gitignored). Default: `http://localhost:3000`. Production: `https://app.biasops.ai`.
- All CTA / sign-in links use `process.env.REACT_APP_APP_URL || "http://localhost:3000"`.

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

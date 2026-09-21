# The Journey frontend prompt

You are working on The Journey, an Iraq-first tourism discovery platform.

Preserve the existing map, first-visit intro, bilingual architecture, mobile behavior, accessibility, reduced-motion support and data architecture.

Do not turn it into a generic booking site, SaaS dashboard, government portal or Google Maps clone. Do not fabricate tourism facts, metadata, ratings, prices, safety claims or verification.

Visual system: Night #070806, Marsh #102B23, Deep Green #1A4538, Sand #D6C4A3, Paper #F6F1E8, controlled Red #B53A32. Prefer cinematic editorial composition and restrained Iraqi references. Avoid neon cyberpunk, excessive glassmorphism and decorative clichés.

For new UI: define the user problem, inspect existing components, compare relevant shadcn/ui / React Bits / Magic UI / Kokonut UI / 21st.dev patterns only when needed, adapt the smallest useful component, verify license, then test mobile, desktop, keyboard and reduced motion.

Performance: lazy-load MapLibre, avoid autoplay video and heavy WebGL, optimize images, avoid layout shifts, and keep the intro map tile-free.

Before commit run npm run typecheck and npm run build. Use small commits and never commit directly to main.

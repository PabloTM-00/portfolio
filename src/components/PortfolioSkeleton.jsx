
"use client";

import { useState, useEffect, useRef } from "react";

/* ─── FONT IMPORT ─────────────────────────────────────────────────────────── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:       #f5f3ef;
      --fg:       #0a0a0a;
      --muted:    #8a8680;
      --accent:   #c8ff00;       /* lime pulse — DJ energy */
      --dark:     #0f0f0f;
      --border:   rgba(10,10,10,0.10);
      --font-display: 'Anton', sans-serif;
      --font-ui:      'Syne', sans-serif;
      --font-body:    'DM Sans', sans-serif;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--fg);
      font-family: var(--font-body);
      font-size: 16px;
      line-height: 1.65;
      overflow-x: hidden;
    }

    /* ── Utility ── */
    .fade-up {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.75s ease, transform 0.75s ease;
    }
    .fade-up.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .stagger-1 { transition-delay: 0.10s; }
    .stagger-2 { transition-delay: 0.22s; }
    .stagger-3 { transition-delay: 0.34s; }
    .stagger-4 { transition-delay: 0.46s; }

    /* ── Nav ── */
    nav {
      position: fixed;
      top: 0; right: 0;
      z-index: 100;
      display: flex;
      gap: 3rem;
      padding: 2rem 2.5rem;
      mix-blend-mode: normal;
    }
    .nav-col { display: flex; flex-direction: column; gap: 0.25rem; }
    .nav-link {
      font-family: var(--font-ui);
      font-size: 0.8rem;
      font-weight: 500;
      color: #fff;
      text-decoration: none;
      letter-spacing: 0.04em;
      opacity: 0.85;
      transition: opacity 0.2s;
    }
    .nav-link:hover { opacity: 1; }
    .nav-meta {
      font-family: var(--font-body);
      font-size: 0.78rem;
      color: rgba(255,255,255,0.55);
    }
    nav.scrolled .nav-link { color: var(--fg); }
    nav.scrolled .nav-meta { color: var(--muted); }

    /* ── Hero ── */
    #hero {
      position: relative;
      height: 100svh;
      min-height: 580px;
      display: flex;
      align-items: flex-end;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute; inset: 0;
      background: linear-gradient(160deg, #1a1a2e 0%, #2d1b4e 40%, #0a0a0a 100%);
      /* PLACEHOLDER: replace with background-image: url(your-hero.jpg); background-size: cover; */
    }
    .hero-bg::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%);
    }
    /* Waveform decoration — nod to DJ side */
    .hero-waveform {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 90px;
      display: flex;
      align-items: flex-end;
      gap: 2px;
      padding: 0 2.5rem;
      opacity: 0.12;
      pointer-events: none;
      overflow: hidden;
    }
    .hero-waveform span {
      flex: 1;
      background: var(--accent);
      border-radius: 2px 2px 0 0;
      animation: wave 1.8s ease-in-out infinite;
    }
    @keyframes wave {
      0%, 100% { transform: scaleY(0.3); }
      50%       { transform: scaleY(1);   }
    }
    .hero-content {
      position: relative; z-index: 2;
      padding: 0 2rem 3.5rem;
      width: 100%;
    }
    .hero-eyebrow {
      font-family: var(--font-ui);
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 0.5rem;
      opacity: 0;
      animation: fadeUp 0.8s 0.3s forwards;
    }
    .hero-title {
      font-family: var(--font-display);
      font-size: clamp(4.5rem, 10vw, 13rem);
      line-height: 0.92;
      color: #fff;
      letter-spacing: 0.01em;
      opacity: 0;
      animation: fadeUp 0.9s 0.5s forwards;
    }
    .hero-title em {
      font-style: normal;
      display: block;
      color: rgba(255,255,255,0.6);
      font-size: 0.45em;
    }
    .hero-sub {
      margin-top: 1.2rem;
      font-family: var(--font-body);
      font-size: 0.95rem;
      color: rgba(255,255,255,0.55);
      font-weight: 300;
      max-width: 360px;
      opacity: 0;
      animation: fadeUp 0.8s 0.75s forwards;
    }
    .hero-roles {
      margin-top: 0.5rem;
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    .hero-badge {
      font-family: var(--font-ui);
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--accent);
      border: 1px solid rgba(200,255,0,0.3);
      padding: 0.3em 0.85em;
      border-radius: 100px;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0);    }
    }

    /* ── Sections (shared) ── */
    section {
      padding: 7rem 2.5rem;
      max-width: 1300px;
      margin: 0 auto;
    }
    section.full-width {
      max-width: 100%;
      padding-left: 2.5rem;
      padding-right: 2.5rem;
    }
    .section-tag {
      font-family: var(--font-ui);
      font-size: clamp(1.6rem, 4vw, 2.8rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 3rem;
    }
    .bracket { color: var(--muted); }
    .divider { width: 100%; height: 1px; background: var(--border); }

    /* ── Intro (2-col) ── */
    .intro-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: start;
    }
    .intro-body p {
      font-size: 1.05rem;
      font-weight: 300;
      color: #2a2a2a;
      margin-bottom: 1.4rem;
      line-height: 1.75;
    }
    .intro-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-ui);
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-decoration: none;
      color: var(--fg);
      margin-top: 0.5rem;
    }
    .intro-cta::after {
      content: '↗';
      font-size: 1em;
      transition: transform 0.2s;
    }
    .intro-cta:hover::after { transform: translate(3px,-3px); }
    .intro-image {
      width: 100%;
      aspect-ratio: 4/5;
      background: #ddd8d0; /* PLACEHOLDER */
      border-radius: 4px;
      overflow: hidden;
      position: relative;
    }
    .img-placeholder {
      width: 100%; height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-ui);
      font-size: 0.72rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
    }

    /* ── Blog list ── */
    #blog { padding-top: 0; }
    .blog-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border);
    }
    .blog-row {
      display: grid;
      grid-template-columns: 140px 1fr auto;
      align-items: baseline;
      gap: 1.5rem;
      padding: 1.4rem 0;
      border-bottom: 1px solid var(--border);
      cursor: pointer;
      transition: background 0.2s;
    }
    .blog-row:hover { background: rgba(0,0,0,0.025); margin: 0 -1rem; padding-left: 1rem; padding-right: 1rem; }
    .blog-cat {
      font-family: var(--font-ui);
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--muted);
    }
    .blog-title {
      font-family: var(--font-ui);
      font-size: 1.05rem;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    .blog-meta {
      font-family: var(--font-body);
      font-size: 0.78rem;
      color: var(--muted);
      white-space: nowrap;
    }

    /* ── Who I am (about) ── */
    .who-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5rem;
      align-items: center;
    }
    .who-text p {
      font-size: 1.05rem;
      font-weight: 300;
      line-height: 1.8;
      color: #2a2a2a;
      margin-bottom: 1.2rem;
    }

    /* ── What drives me ── */
    .drives-grid {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 4rem;
    }
    .drives-list { display: flex; flex-direction: column; gap: 0; }
    .drives-item {
      display: grid;
      grid-template-columns: 48px 1fr;
      gap: 1.2rem;
      align-items: baseline;
      padding: 1.5rem 0;
      border-bottom: 1px solid var(--border);
    }
    .drives-num {
      font-family: var(--font-ui);
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--muted);
      letter-spacing: 0.04em;
    }
    .drives-text {
      font-size: 1.1rem;
      font-weight: 400;
    }

    /* ── Image grid (loves) ── */
    .loves-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    .loves-card {
      position: relative;
      aspect-ratio: 4/3;
      background: #e8e4de;
      border-radius: 3px;
      overflow: hidden;
      cursor: pointer;
    }
    .loves-card:hover .loves-overlay { opacity: 1; }
    .loves-overlay {
      position: absolute; inset: 0;
      background: rgba(10,10,10,0.45);
      display: flex;
      align-items: flex-end;
      padding: 1rem 1.2rem;
      opacity: 0.85;
      transition: opacity 0.3s;
    }
    .loves-label {
      font-family: var(--font-ui);
      font-size: 0.85rem;
      font-weight: 700;
      color: #fff;
      letter-spacing: 0.04em;
    }
    .loves-label span { color: var(--accent); }

    /* ── Footer ── */
    footer {
      background: var(--dark);
      color: rgba(255,255,255,0.45);
      padding: 4rem 2.5rem 2.5rem;
    }
    .footer-inner {
      max-width: 1300px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 3rem;
      align-items: end;
    }
    .footer-nav {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .footer-nav a {
      font-family: var(--font-ui);
      font-size: 0.88rem;
      color: rgba(255,255,255,0.65);
      text-decoration: none;
      transition: color 0.2s;
    }
    .footer-nav a:hover { color: #fff; }
    .footer-email {
      font-family: var(--font-body);
      font-size: 0.82rem;
      color: rgba(255,255,255,0.4);
      margin-top: 1.5rem;
    }
    .footer-socials {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
    .footer-socials a {
      font-family: var(--font-ui);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
      text-decoration: none;
      transition: color 0.2s;
    }
    .footer-socials a:hover { color: var(--accent); }
    .footer-copy {
      max-width: 1300px;
      margin: 2.5rem auto 0;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      justify-content: space-between;
      font-size: 0.72rem;
      color: rgba(255,255,255,0.2);
      font-family: var(--font-body);
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      nav { padding: 1.2rem 1.5rem; gap: 1.5rem; }
      section { padding: 4.5rem 1.5rem; }
      .intro-grid, .who-grid, .drives-grid { grid-template-columns: 1fr; gap: 2.5rem; }
      .loves-grid { grid-template-columns: 1fr 1fr; }
      .blog-row { grid-template-columns: 1fr auto; }
      .blog-cat { display: none; }
      .footer-inner { grid-template-columns: 1fr; }
      .footer-socials { flex-wrap: wrap; }
    }
    @media (max-width: 480px) {
      .loves-grid { grid-template-columns: 1fr; }
    }
  `}</style>
);

/* ─── SCROLL ANIMATION HOOK ─────────────────────────────────────────────────*/
function useFadeOnScroll() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── COMPONENTS ────────────────────────────────────────────────────────────*/

function Nav({ scrolled }) {
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="nav-col">
        <a href="#about" className="nav-link">about</a>
        <a href="#blog"  className="nav-link">blog</a>
      </div>
      <div className="nav-col">
        <span className="nav-link">ptorrmen@gmail.com</span>
        <span className="nav-meta">based in málaga, spain</span>
      </div>
    </nav>
  );
}

function Hero() {
  const bars = Array.from({ length: 60 }, (_, i) => i);
  return (
    <section id="hero" style={{ padding: 0, maxWidth: "100%", margin: 0 }}>
      <div className="hero-bg" />
      <div className="hero-waveform">
        {bars.map((b) => (
          <span key={b} style={{
            height: `${20 + Math.abs(Math.sin(b * 0.4)) * 80}%`,
            animationDelay: `${(b * 0.03).toFixed(2)}s`
          }} />
        ))}
      </div>
      <div className="hero-content">
        <p className="hero-eyebrow">portfolio · 2026</p>
        <h1 className="hero-title">
          <em>pablo torres</em>
          the world is yours.
        </h1>
        <p className="hero-sub">
          building my life my way - code, music and everything in between
        </p>
        <div className="hero-roles">
          <span className="hero-badge">developer</span>
          <span className="hero-badge">dj</span>
          <span className="hero-badge">creator</span>
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  const ref = useFadeOnScroll();
  return (
    <section>
      <div ref={ref} className="fade-up">
        <h2 className="section-tag"><span className="bracket">[</span>this is me<span className="bracket">]</span></h2>
        <div className="intro-grid">
          <div className="intro-body">
            <p>
            I wasn’t always disciplined. I used to procrastinate, overthink everything, and feel stuck without a clear direction. I knew I wanted more, but I wasn’t doing what it took.  
            </p>
            <p>
            Things changed after a few turning points in my life. I started working on myself, building better habits, and focusing on what I can control. Still far from perfect, but now I move with intention.
            </p>
            <a href="#about" className="intro-cta">about me</a>
          </div>
          <div className="intro-image">
            <div className="img-placeholder">photo placeholder</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const BLOG_POSTS = [
  { cat: "personal",  title: "Post title placeholder one",   date: "Apr 14, 2026", read: "3 min" },
  { cat: "tech",      title: "Post title placeholder two",   date: "Mar 29, 2026", read: "2 min" },
  { cat: "startups",  title: "Post title placeholder three", date: "Mar 14, 2026", read: "4 min" },
  { cat: "dj / music","title": "Post title placeholder four",date: "Feb 22, 2026", read: "2 min" },
];

function BlogSection() {
  const ref = useFadeOnScroll();
  return (
    <section id="blog" style={{ paddingTop: "1rem" }}>
      <div ref={ref} className="fade-up">
        <div className="blog-header">
          <h2 className="section-tag"><span className="bracket">[</span>writing<span className="bracket">]</span></h2>
        </div>
        {BLOG_POSTS.map((p, i) => (
          <div className="blog-row" key={i}>
            <span className="blog-cat">{p.cat}</span>
            <span className="blog-title">{p.title}</span>
            <span className="blog-meta">{p.date} · {p.read}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhoSection() {
  const ref = useFadeOnScroll();
  return (
    <section id="about">
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 10vw, 8rem)", lineHeight: 1, letterSpacing: "0.01em" }}>
          about 
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--muted)", marginTop: "0.75rem", fontWeight: 300 }}>
          someone trying to build something real
        </p>
      </div>
      <div className="divider" style={{ marginBottom: "5rem" }} />
      <div ref={ref} className="fade-up who-grid">
        <div className="who-text">
          <h2 className="section-tag"><span className="bracket">[</span>who i am<span className="bracket">]</span></h2>
          <p> I'm Pablo, a computer science student based in Spain, I've always had the tension between being grounded and down to earth and thinking "the world is yours". That tension is what drives me </p>
          <p> I'm into tech and music in all of its aspects (dj, production, concerts), and I'm constantly trying to improve - even when it's uncomfortable</p>

          </div>
        <div className="intro-image">
          <div className="img-placeholder">portrait placeholder</div>
        </div>
      </div>
    </section>
  );
}

const DRIVES = [
  { n: "01", text: "Placeholder — authentic aspiration or core value." },
  { n: "02", text: "Placeholder — what you're obsessively learning right now." },
  { n: "03", text: "Placeholder — how you want to give back or share." },
  { n: "04", text: "Placeholder — the kind of impact you want to have." },
];

function DrivesSection() {
  const ref = useFadeOnScroll();
  return (
    <section>
      <div ref={ref} className="fade-up drives-grid">
        <h2 className="section-tag"><span className="bracket">[</span>what drives me<span className="bracket">]</span></h2>
        <div className="drives-list">
          {DRIVES.map((d) => (
            <div className="drives-item" key={d.n}>
              <span className="drives-num">{d.n}</span>
              <span className="drives-text">{d.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const LOVES = [
  { label: "music", bg: "#c7c0b5" },
  { label: "tech",     bg: "#1a1a1a" },
  { label: "trying new stuff",    bg: "#b8c9d4" },
  { label: "travel",   bg: "#9aab8e" },
  { label: "reading",  bg: "#d4c9b4" },
  { label: "streetwear",bg: "#2a1a3a"},
];

function LovesSection() {
  const ref = useFadeOnScroll();
  return (
    <section>
      <div ref={ref} className="fade-up">
        <h2 className="section-tag" style={{ marginBottom: "1.5rem" }}>
          <span className="bracket">[</span>what do I actually love<span className="bracket">]</span>
        </h2>
        <div className="loves-grid">
          {LOVES.map((l) => (
            <div className="loves-card" key={l.label} style={{ background: l.bg }}>
              {/* PLACEHOLDER: add background-image per card */}
              <div className="loves-overlay">
                <span className="loves-label"><span>[</span>{l.label}<span>]</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <div className="footer-nav">
            <a href="#hero">home</a>
            <a href="#about">about</a>
            <a href="#blog">blog</a>
          </div>
          <p className="footer-email">ptorrmen@gmail.com</p>
        </div>
        <div className="footer-socials">
          <a href="https://x.com/pablo_toorrees" target="_blank" rel="noopener noreferrer">x ↗</a>
          <a href="https://instagram.com/pablo.toorrees" target="_blank" rel="noopener noreferrer">instagram ↗</a>
          <a href="https://www.linkedin.com/in/pablo-torres12/" target="_blank" rel="noopener noreferrer">linkedin ↗</a>
          <a href="https://github.com/PabloTM-00" target="_blank" rel="noopener noreferrer">github ↗</a>
        </div>
      </div>
      <div className="footer-copy">
        <span>© 2026 pablo torres</span>
        <span>built with intention.</span>
      </div>
    </footer>
  );
}

/* ─── ROOT ───────────────────────────────────────────────────────────────────*/
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <FontStyle />
      <Nav scrolled={scrolled} />
      <main>
        <Hero />
        <IntroSection />
        <BlogSection />
        <WhoSection />
        <DrivesSection />
        <LovesSection />
      </main>
      <Footer />
    </>
  );
}

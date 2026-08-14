import { useEffect, useRef, useState, type ReactNode } from "react";
import icon from "./assets/icon.png";
import foto from "./assets/fotosite.jpeg";
import fotoDaniel from './assets/daniel.jpeg';
import fotoBruno from './assets/bruno.jpeg';
import fotoEloah from './assets/eloah.jpeg';
import fotoRafael from './assets/rafa.jpeg';
import fotoMaria from './assets/eu.jpeg';
import fotoRicardo from './assets/ricardo.jpeg';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible] as const;
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

interface NavbarProps {
  page: string;
  setPage: (page: string) => void;
}

function Navbar({ page, setPage }: NavbarProps) {
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <a href="https://daniel4-2318.itch.io/gravity-down" target="_blank" rel="noopener noreferrer">
            <img className="icon" src={icon} alt="icon" style={{ width: '60px' }} />
          </a>
          <span className="brand-name">GRAVITY<span className="accent">DOWN</span></span>
        </div>
        <div className="nav-links">
          <button
            className={`nav-link ${page === "home" ? "active" : ""}`}
            onClick={() => setPage("home")}
          >
            Home
          </button>
          <button
            className={`nav-link ${page === "about" ? "active" : ""}`}
            onClick={() => setPage("about")}
          >
            Equipe
          </button>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const TAGS = ["Aventura", "Ação", "Um Jogador", "Ação"];
  const GAME_DESCRIPTION = "Hiloax Jakama é um Troll que consegue controlar a gravidade. Com um espirito de aventura, ele explora as ruínas de seu reino apenas por diversão. Durante uma de suas explorações, ele encontra uma arma e, como nas ruínas haviam muitos animais, sua sede de sangue falou mais alto, fazendo com que ele passasse a matar pela mesma diversão que via em explorar.";
  const HERO_IMG = foto;

  return (
    <>
      <div className="hero">
        <div className="hero-field" />
        <div className="hero-inner">
          <div className="hero-copy">
            <h1 className="title">
              GRAVITY<br />DOWN<span className="accent"></span>
            </h1>
            <div className="hero-tags">
              {TAGS.map((t, idx) => (
                <span className="tag" key={`${t}-${idx}`}>{t}</span>
              ))}
            </div>
            <div className="download">
              <a 
                href="https://daniel4-2318.itch.io/gravity-down" target="_blank"  rel="noopener noreferrer" className="download-btn">
                Jogue agora!
              </a>
            </div>
          </div>
          <div className="hero-art">
            <img src={HERO_IMG} alt="Hiloax Jakama" />
          </div>
        </div>
        <div className="hero-fine">Team Gravity Down &copy; 2026</div>
      </div>

      <div className="wrap wrap-single">
        <Reveal>
          <div className="section-label">Sinopse</div>
          <div className="desc-box">
            <p>{GAME_DESCRIPTION}</p>
          </div>
        </Reveal>
      </div>
    </>
  );
}

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  photo?: string;
}

function AboutPage() {
  const TEAM: TeamMember[] = [
    { name: "Daniel", role: "Game Dev", initials: "D", photo: fotoDaniel },
    { name: "Bruno", role: "Game Dev", initials: "B", photo: fotoBruno },
    { name: "Ricardo", role: "Game Dev", initials: "R", photo: fotoRicardo },
    { name: "Maria Clara", role: "Frontend Dev", initials: "MC", photo: fotoMaria},
    { name: "Rafael", role: "Frontend Dev", initials: "R", photo: fotoRafael },
    { name: "Eloah", role: "Efeitos Sonoros", initials: "E", photo: fotoEloah },
    { name: "Felipe", role: "Documentação", initials: "F" },
    
  ];

  return (
    <div className="wrap wrap-single">
      <Reveal>
        <h2 className="h2">Equipe de desenvolvimento</h2>
      </Reveal>

      <div className="team-grid">
        {TEAM.map((m, i) => (
          <Reveal delay={i * 60} key={m.name}>
            <div className="team-card">
              <div className="team-avatar">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} style={{ width: '90%', height: '90%', objectFit: 'cover' }} />
                ) : (
                  <span>{m.initials}</span>
                )}
              </div>
              <div className="team-body">
                <h3>{m.name}</h3>
                <div className="team-role">{m.role}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700;800&display=swap');

        :root {
          --bg: #1D1D1D;
          --bg-deep: #131313;
          --panel: #262523;
          --panel-2: #2c2b28;
          --border: rgba(162,162,162,0.16);
          --border-strong: rgba(162,162,162,0.32);
          --gray: #A2A2A2;
          --text: #EDEBE6;
          --text-dim: #A2A2A2;
          --red: #560000;
          --red-bright: #8a0000;
          --gold: #E8AD25;
          --gold-dim: rgba(232,173,37,0.16);
        }

        * { box-sizing: border-box; }

        .page {
          background-image: linear-gradient(rgba(29, 29, 29, 0.6), rgba(29, 29, 29, 0.6)), url('/src/assets/fundo-site.jpg');
          background-color: var(--bg);
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          color: var(--text);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
        }

        .page :focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .page * { animation: none !important; transition: none !important; }
        }

        .reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-visible { opacity: 1; transform: translateY(0); }

        /* ---------- NAVBAR ---------- */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(19,19,19,0.86);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
        }
        .navbar-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand { display: flex; align-items: center; gap: 10px; }
        .brand-name {
          font-family: 'Anton', sans-serif;
          font-size: 16px;
          letter-spacing: 0.03em;
          color: var(--text);
        }
        .brand-name .accent { color: var(--gold); }
        .nav-links { display: flex; gap: 6px; }
        .nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-dim);
          padding: 9px 18px;
          border-radius: 4px;
          cursor: pointer;
          transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
        }
        .nav-link:hover { color: var(--text); border-color: var(--border-strong); }
        .nav-link.active {
          color: var(--gold);
          border-color: rgba(232,173,37,0.4);
          background: var(--gold-dim);
        }

        /* ---------- HERO ---------- */
        .hero {
          position: relative;
          margin: 18px 24px 0;
          max-width: 1180px;
          margin-left: auto;
          margin-right: auto;
          border: 1px solid var(--border);
          border-radius: 6px;
          overflow: hidden;
          background: var(--bg-deep);
          isolation: isolate;
        }
        .hero-field {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(circle at 74% 46%, rgba(232,173,37,0.16) 0%, rgba(232,173,37,0.05) 22%, transparent 46%),
            repeating-radial-gradient(circle at 74% 46%, transparent 0 34px, rgba(232,173,37,0.055) 35px, transparent 36px 68px),
            radial-gradient(circle at 74% 46%, transparent 0%, var(--bg-deep) 72%),
            linear-gradient(160deg, #1a1917 0%, #100f0e 60%, #0c0b0a 100%);
          animation: fieldSpin 90s linear infinite;
        }
        @keyframes fieldSpin {
          from { transform: rotate(0deg) scale(1.15); }
          to { transform: rotate(360deg) scale(1.15); }
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          align-items: center;
          min-height: 560px;
        }
        .hero-copy { padding: 56px 20px 56px 48px; }
        .title {
          font-family: 'Anton', sans-serif;
          font-weight: 400;
          text-transform: uppercase;
          font-size: clamp(44px, 6.4vw, 84px);
          line-height: 0.96;
          letter-spacing: 0.01em;
          margin: 0 0 8px;
          color: var(--text);
          text-shadow: 0 0 40px rgba(232,173,37,0.14);
        }
        .hero-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          padding: 6px 12px;
          border: 1px solid var(--border-strong);
          border-radius: 3px;
          color: var(--text-dim);
          background: rgba(162,162,162,0.05);
          white-space: nowrap;
        }
        .download-btn {
          display: inline-block;
          background-color: var(--red-bright);
          color: var(--text);
          padding: 14px 32px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 20px;
          border: 1px solid rgba(232, 173, 37, 0.2);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
          transition: all 0.2s ease-in-out;
          margin-top: 24px;
        }
        .download-btn:hover { background-color: #a50000; border-color: var(--gold); transform: translateY(-2px); }
        .hero-art { position: relative; height: 100%; min-height: 560px; display: flex; align-items: center; justify-content: center; }
        .hero-art img { width: 108%; max-width: none; filter: drop-shadow(0 30px 60px rgba(0,0,0,0.65)); animation: floaty 7s ease-in-out infinite; }
        @keyframes floaty { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-14px) rotate(-1deg); } }
        .hero-fine { position: absolute; bottom: 16px; right: 20px; z-index: 3; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: rgba(162,162,162,0.55); text-transform: uppercase; }

        /* ---------- LAYOUT ---------- */
        .wrap { max-width: 1180px; margin: 0 auto; padding: 56px 24px 80px; }
        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--red-bright);
          margin: 0 0 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .section-label::after { content: ""; flex: 1; height: 1px; background: var(--border); }
        .h2 { font-family: 'Anton', sans-serif; font-weight: 400; text-transform: uppercase; font-size: 32px; color: var(--text); margin: 0 0 34px; }
        .desc-box { border: 1px solid var(--border); border-left: 3px solid var(--gold); background: linear-gradient(160deg, var(--panel), var(--bg-deep)); border-radius: 4px; padding: 26px 28px; }
        .desc-box p { margin: 0; font-size: 16.5px; line-height: 1.85; color: #d8d5cd; max-width: 72ch; }

        /* ---------- TEAM GRID ---------- */
        .team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .team-card { border: 1px solid var(--border); border-radius: 8px; background: var(--panel); overflow: hidden; transition: border-color 0.2s ease, transform 0.2s ease; }
        .team-card:hover { border-color: rgba(232,173,37,0.45); transform: translateY(-4px); }
        .team-avatar { aspect-ratio: 16 / 10; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 30% 20%, rgba(232,173,37,0.25), transparent 55%), linear-gradient(150deg, var(--red) 0%, #2a0a0a 55%, var(--bg-deep) 100%); position: relative; overflow: hidden; }
        .team-avatar span { font-family: 'Anton', sans-serif; font-size: 40px; color: var(--gold); text-shadow: 0 4px 18px rgba(0,0,0,0.5); }
        .team-body { padding: 20px 20px 22px; }
        .team-body h3 { font-size: 17px; font-weight: 800; margin: 0 0 4px; color: var(--text); }
        .team-role { font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: var(--gold); margin-bottom: 10px; }
        .team-body p { font-size: 13px; line-height: 1.6; color: var(--text-dim); margin: 0; }

        .footer { border-top: 1px solid var(--border); padding: 28px 24px; text-align: center; color: rgba(162,162,162,0.5); font-size: 11px; font-family: 'JetBrains Mono', monospace; }

        @media (max-width: 980px) {
          .hero-inner { grid-template-columns: 1fr; min-height: unset; }
          .hero-art { min-height: 320px; order: -1; }
          .hero-copy { padding: 40px 24px; }
          .team-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .title { font-size: 40px; }
          .team-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <Navbar page={page} setPage={setPage} />

      {page === "home" ? <HomePage /> : <AboutPage />}

      <div className="footer">
        <p>&copy; Team Gravity Down - Game Jam 2026</p>
      </div>
    </div>
  );
}

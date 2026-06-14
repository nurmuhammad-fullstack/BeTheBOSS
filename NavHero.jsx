import React, { useState, useEffect, useRef } from 'react';

/* ── Viewport hook ── */
function useViewport() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return { w, isMobile: w < 768, isTablet: w >= 768 && w < 1024 };
}
const telHref = (p) => "tel:" + p.replace(/[^+\d]/g, "");

/* ── Section IDs aligned with t.nav order ── */
const NAV_IDS = ["services", "whyus", "about", "contact"];

/* ── WheelSVG (kept for legacy export) ── */
function WheelSVG({ angle }) {
  const SPOKES = 10;
  const spokes = Array.from({ length: SPOKES }, (_, i) => {
    const a = (i * 36) * Math.PI / 180;
    return { x1: Math.cos(a)*12, y1: Math.sin(a)*12, x2: Math.cos(a)*38, y2: Math.sin(a)*38 };
  });
  return (
    <svg width="100%" height="100%" viewBox="-50 -50 100 100" style={{ display: "block" }}>
      <circle r={49} fill="#080808" />
      <g transform={`rotate(${angle})`}>
        <circle r={41.5} fill="#1a1a1a" />
        {spokes.map((s,i)=>(<line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#3a3a3a" strokeWidth="5.8" strokeLinecap="round"/>))}
        <circle r={40} fill="none" stroke="#2a2a2a" strokeWidth="2.5"/>
        <circle r={11} fill="#111" stroke="#333" strokeWidth="1.5"/>
        <circle r={5} fill="#1e1e1e" stroke="rgba(255,166,41,0.45)" strokeWidth="1.2"/>
        <circle r={2} fill="rgba(255,166,41,0.55)"/>
      </g>
    </svg>
  );
}

/* ── Logo ── */
function Logo({ size = 1 }) {
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      style={{ display: "flex", alignItems: "center", gap: 11*size, textDecoration: "none", userSelect: "none" }}>
      <img src="assets/logo.png" alt="Bosscar"
        style={{ width: 44*size, height: 44*size, display: "block", filter: "drop-shadow(0 2px 8px rgba(255,166,41,.32))" }} />
    </a>
  );
}

/* ── Language toggle ── */
function LangToggle({ lang, setLang, align = "right" }) {
  const [open, setOpen] = useState(false);
  const langs = ["uz", "ru", "en"];
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{
        border: "1px solid rgba(255,255,255,.55)", borderRadius: 10, height: 38, padding: "0 13px",
        background: "transparent", color: "#fff", fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 600,
        cursor: "pointer", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6, letterSpacing: ".06em",
      }}>
        {lang}
        <span style={{ fontSize: 9, opacity: .7, display: "inline-block", transform: open ? "rotate(180deg)" : "none", transition: "transform .3s" }}>▾</span>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: 46, [align]: 0, background: "#0A0B0E",
          border: "1px solid #2a2a2a", borderRadius: 12, overflow: "hidden", minWidth: 74,
          boxShadow: "0 18px 40px rgba(0,0,0,.7)", zIndex: 60,
        }}>
          {langs.map((l) => (
            <button key={l} onClick={() => { setLang(l); setOpen(false); }} style={{
              display: "block", width: "100%", padding: "11px 16px", textAlign: "left",
              background: l === lang ? "rgba(241,199,103,.12)" : "transparent", border: "none",
              color: l === lang ? "var(--gold)" : "#fff", fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600,
              cursor: "pointer", textTransform: "uppercase", letterSpacing: ".06em",
            }}>{l}</button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Navigation ── */
function Nav({ t, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { isMobile } = useViewport();

  useEffect(() => {
    const on = () => setScrolled((window.scrollY || 0) > 40);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = menu ? "hidden" : ""; }, [menu]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMenu(false);
  };

  const linkBase = {
    fontFamily: "var(--font-ui)", fontSize: 16, color: "#fff",
    textDecoration: "none", transition: "color .25s",
    whiteSpace: "nowrap", letterSpacing: ".01em",
    cursor: "pointer", background: "none", border: "none", padding: 0,
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr auto" : "1fr auto 1fr",
      alignItems: "center",
      padding: isMobile ? "14px 20px" : "16px 48px",
      background: menu ? "transparent" : scrolled ? "rgba(0,0,0,0.88)" : isMobile ? "transparent" : "linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,0))",
      backdropFilter: menu ? "none" : scrolled ? "blur(14px)" : "none",
      borderBottom: menu ? "none" : scrolled ? "1px solid rgba(255,255,255,.07)" : "none",
      transition: "background .4s, border-color .4s",
    }}>
      <div style={{ justifySelf: "start" }}><Logo size={isMobile ? 1 : 1.4} /></div>

      {!isMobile && (
        <nav style={{ display: "flex", gap: 34, justifySelf: "center" }}>
          {t.nav.map((n, i) => (
            <button key={i} onClick={() => scrollTo(NAV_IDS[i])} style={linkBase}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold-600)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#fff"}>
              {n}
            </button>
          ))}
        </nav>
      )}

      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 14, justifySelf: "end" }}>
          <a href={telHref(t.phone)} style={{
            border: "1px solid rgba(255,255,255,.5)", borderRadius: 10, height: 38, padding: "0 16px",
            display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
            fontFamily: "var(--font-mono)", fontSize: 15, color: "#fff",
            letterSpacing: ".02em", whiteSpace: "nowrap", transition: "border-color .3s, color .3s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.5)"; e.currentTarget.style.color = "#fff"; }}>
            <i data-lucide="phone" style={{ width: 15, height: 15 }}></i>{t.phone}
          </a>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
      )}

      {/* Mobile hamburger — borderless */}
      {isMobile && (
        <button onClick={() => setMenu(true)} aria-label="Menu" style={{
          justifySelf: "end", width: 44, height: 44,
          background: "transparent", border: "1px solid rgba(255,255,255,.5)", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", padding: 0,
        }}>
          <span style={{ fontSize: 24, color: "#fff", lineHeight: 1, fontWeight: 700 }}>&#9776;</span>
        </button>
      )}

      {/* ── Mobile full-screen drawer (right → left) ── */}
      {isMobile && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 70,
          background: "#000",
          display: "flex", flexDirection: "column",
          transform: menu ? "translateX(0)" : "translateX(100%)",
          transition: "transform .45s cubic-bezier(.22,1,.36,1)",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "18px 22px", borderBottom: "1px solid rgba(255,255,255,.07)",
          }}>
            <Logo size={1.1} />
            <button onClick={() => setMenu(false)} aria-label="Close" style={{
              background: "transparent", border: "1px solid rgba(255,255,255,.5)", color: "#fff",
              width: 44, height: 44, display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", padding: 0,
            }}>
              <span style={{ fontSize: 22, color: "#fff", lineHeight: 1, fontWeight: 700 }}>×</span>
            </button>
          </div>

          <nav style={{
            flex: 1, display: "flex", flexDirection: "column",
            justifyContent: "center", padding: "0 32px",
          }}>
            {t.nav.map((n, i) => (
              <button key={i} onClick={() => scrollTo(NAV_IDS[i])} style={{
                fontFamily: "var(--font-ui)", fontSize: 18, fontWeight: 500,
                color: "#fff", background: "none", border: "none",
                textAlign: "left", padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,.07)",
                cursor: "pointer", transition: "color .25s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#fff"}>
                {n}
              </button>
            ))}
          </nav>

          <div style={{ display: "flex", justifyContent: "center", paddingBottom: 20 }}>
            <LangToggle lang={lang} setLang={setLang} align="left" />
          </div>

          <div style={{ padding: "0 22px 40px" }}>
            <a href={telHref(t.phone)} style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 12, height: 62, borderRadius: 14,
              border: "1px solid rgba(255,255,255,.5)",
              background: "transparent", color: "#fff", textDecoration: "none",
              fontFamily: "var(--font-ui)", fontSize: 16, fontWeight: 600,
              letterSpacing: ".02em",
            }}>
              <i data-lucide="phone" style={{ width: 20, height: 20, color: "#fff" }}></i>
              {t.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ════════════════════════════════════════════════════════
   HERO
   Car: 1603 × 385 px (gold sports car, front faces LEFT)
   baloon1.png = front (left) wheel
   baloon2.png = rear  (right) wheel
   Scroll down → car drifts LEFT,  wheels spin CW
   Scroll up   → car drifts RIGHT, wheels spin CCW
════════════════════════════════════════════════════════ */

const DRIFT_FACTOR  = 0.68;
const WHEEL_RADIUS  = 50;
const RAD_TO_DEG    = 180 / Math.PI;
const CAR_ASPECT    = "1603 / 385";           // exact PNG dimensions

/* Wheel centres as % of car image (1603×385)
   Car faces RIGHT → rear arch on LEFT (x≈17%), front arch on RIGHT (x≈75%)
   Rear  wheel (LEFT,  large arch): x≈17%, y≈82%
   Front wheel (RIGHT, small arch): x≈75%, y≈80%          */
const WHEELS = [
  { left: "20%", top: "82%", src: "assets/baloon1.png" },  // rear  (left)
  { left: "82%", top: "80%", src: "assets/baloon2.png" },  // front (right)
];
const WHEEL_SIZE = "18%"; // diameter as % of car container width

/* ── Gold sparkle canvas hook ── */
function useSparkleCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const GOLD = ["#F1C767","#FFA629","#FFD700","#FFC04A","#FFEF99"];
    let W, H, raf;

    const setSize = () => {
      W = canvas.width  = canvas.offsetWidth  || 800;
      H = canvas.height = canvas.offsetHeight || 200;
    };
    setSize();
    window.addEventListener("resize", setSize);

    /* Floor glitter */
    let glitters = Array.from({ length: 95 }, () => ({
      x:     Math.random() * (W || 800),
      y:     (H||200)*0.25 + Math.random()*(H||200)*0.75,
      size:  0.45 + Math.random() * 1.9,
      color: GOLD[0 | Math.random()*5],
      phase: Math.random() * Math.PI * 2,
      freq:  0.020 + Math.random() * 0.040,
      maxOp: 0.20 + Math.random() * 0.70,
      star:  Math.random() > 0.44,
    }));

    /* Rising sparks */
    const mkSpark = () => ({
      x:    (W||800)*0.12 + Math.random()*(W||800)*0.76,
      y:    (H||200)*0.55 + Math.random()*(H||200)*0.45,
      vx:   (Math.random()-.5)*0.65,
      vy:   -(0.18 + Math.random()*0.80),
      life: 0 | Math.random()*90,
      max:  70 + Math.random()*110,
      sz:   0.5 + Math.random()*1.5,
      color:GOLD[0 | Math.random()*5],
    });
    let sparks = Array.from({ length: 30 }, mkSpark);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* Central floor glow */
      const gr = ctx.createRadialGradient(W*.5,H*.7,0, W*.5,H*.7,W*.54);
      gr.addColorStop(0,   "rgba(255,158,38,0.24)");
      gr.addColorStop(0.45,"rgba(255,128,0,0.07)");
      gr.addColorStop(1,   "transparent");
      ctx.fillStyle = gr; ctx.fillRect(0,0,W,H);

      /* Glitter */
      glitters.forEach(g => {
        g.phase += g.freq;
        const op = ((Math.sin(g.phase)+1)*.5)*g.maxOp;
        if (op < 0.012) return;
        ctx.save();
        ctx.globalAlpha = op;
        ctx.shadowBlur  = 5; ctx.shadowColor = g.color;
        ctx.fillStyle   = g.color;
        ctx.translate(g.x, g.y);
        if (g.star) {
          ctx.rotate(g.phase * 0.32);
          const s = g.size;
          ctx.beginPath();
          ctx.moveTo(0,-s*2.8); ctx.lineTo(s*.44,-s*.44);
          ctx.lineTo(s*2.8,0);  ctx.lineTo(s*.44,s*.44);
          ctx.lineTo(0,s*2.8);  ctx.lineTo(-s*.44,s*.44);
          ctx.lineTo(-s*2.8,0); ctx.lineTo(-s*.44,-s*.44);
          ctx.closePath(); ctx.fill();
        } else {
          ctx.beginPath(); ctx.arc(0,0,g.size,0,Math.PI*2); ctx.fill();
        }
        ctx.restore();
      });

      /* Sparks */
      sparks = sparks.map(p => {
        p.x+=p.vx; p.y+=p.vy; p.life++;
        if (p.life >= p.max) return mkSpark();
        const t = p.life/p.max;
        const op = (t<.14 ? t/.14 : 1-(t-.14)/.86) * .78;
        if (op<.01) return p;
        ctx.save();
        ctx.globalAlpha=op; ctx.shadowBlur=4; ctx.shadowColor=p.color;
        ctx.fillStyle=p.color;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.sz,0,Math.PI*2); ctx.fill();
        ctx.restore();
        return p;
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
    };
  }, []);
}

/* ── Hero component ── */
function Hero({ t }) {
  const canvasRef    = useRef(null);
  const [sy,         setSy]         = useState(0);
  const [wheelAngle, setWheelAngle] = useState(0);
  const prevSy   = useRef(0);
  const angleAcc = useRef(0);
  const { isMobile } = useViewport();

  /* Scroll handler: drift + wheel rotation */
  useEffect(() => {
    const onScroll = () => {
      const y     = window.scrollY || document.documentElement.scrollTop;
      const delta = y - prevSy.current;                 // + = scrolling down
      angleAcc.current += (delta * DRIFT_FACTOR / WHEEL_RADIUS) * RAD_TO_DEG;
      prevSy.current = y;
      setSy(y);
      setWheelAngle(angleAcc.current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Sparkle canvas */
  useSparkleCanvas(canvasRef);

  /* Drift: right → left when scrolling down; reverses on scroll up */
  const maxDrift  = isMobile ? -120 : -420;
  const driftFact = isMobile ? 0.32 : DRIFT_FACTOR;
  const drift     = Math.max(maxDrift, -sy * driftFact);
  const carWidth  = isMobile ? "min(108%, 530px)" : "min(84%, 1040px)";

  /* Reusable wheel renderer */
  const renderWheel = (w, angle, key) => (
    <div key={key} style={{
      position: "absolute", left: w.left, top: w.top,
      width: WHEEL_SIZE, aspectRatio: "1 / 1",
      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
      zIndex: 1,
    }}>
      <img src={w.src} alt="" style={{
        width: "100%", height: "100%",
        borderRadius: "50%", display: "block", objectFit: "cover",
      }} />
    </div>
  );

  return (
    <section style={{ position: "relative", height: "100vh", overflow: "hidden", background: "#000" }}>

      {/* Ambient glow — tracks car position on every screen size */}
      <div style={{
        position: "absolute", left: "50%",
        top: isMobile ? "44vh" : "30%",
        width: isMobile ? "min(700px, 140vw)" : "min(920px, 122vw)",
        height: isMobile ? 220 : 340,
        transform: "translateX(-50%)",
        borderRadius: "50%", background: "#fff",
        opacity: isMobile ? .05 : .055,
        filter: "blur(58px)",
        pointerEvents: "none",
      }} />

      {/* Hero copy — sits above car */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 5,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "flex-start",
        padding: isMobile ? "16vh 22px 0" : "12vh 56px 0",
        textAlign: "center", pointerEvents: "none",
        maxWidth: isMobile ? "100%" : 720,
        margin: "0 auto",
        left: 0,
        right: 0,
      }}>
        <p style={{
          margin: "0 0 16px", fontFamily: "var(--font-mono)",
          fontSize: isMobile ? 11 : 13, letterSpacing: ".28em",
          color: "var(--gold-600)", textTransform: "uppercase",
        }}>
          {/* BOSSCAR — DETAILING STUDIO */}
        </p>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(52px, 9.5vw, 106px)",
          background: "linear-gradient(180deg, #FCCF62 0%, #9C6606 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          margin: 0, lineHeight: .93,
          whiteSpace: isMobile ? "normal" : "nowrap",
        }}>
          {t.heroKicker}
        </h1>
        <p style={{
          fontFamily: "var(--font-ui)", fontSize: isMobile ? 13 : 15,
          color: "var(--fg-dim)", maxWidth: isMobile ? "100%" : 680,
          margin: "22px auto 0", lineHeight: 1.85,
        }}>
          {t.heroSub}
        </p>
      </div>

      {/* ══ Car + reflection (scroll-drifts) ══ */}
      <div style={{
        position: "absolute",
        left: "50%",
        bottom: isMobile ? "18%" : "10%",
        top:    isMobile ? "auto" : "auto",
        width:  carWidth,
        transform: `translateX(calc(-50% + ${drift}px))`,
        transition: "transform .08s linear",
        zIndex: 2,
      }}>
        {/* ─ Car scene aspect-ratio box ─ */}
        <div style={{ position: "relative", width: "100%", aspectRatio: CAR_ASPECT }}>

          {/* Real wheel images — behind car body */}
          {WHEELS.map((w, i) => renderWheel(w, wheelAngle, `w${i}`))}

          {/* Car body PNG */}
          <img src="assets/car.png" alt="Bosscar"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "contain", zIndex: 2, display: "block",
              filter: "drop-shadow(0 6px 44px rgba(255,166,41,.30))",
            }}
          />

          {/* ── Floor / water reflection ──
              Positioned just below the car scene.
              scaleY(-1) flips the content so the car's bottom
              (floor level) appears at the TOP of the reflection.
              A gradient overlay fades it toward black at the bottom.  */}
          <div style={{
            position: "absolute",
            top: "98%", left: "-3%", right: "-3%",
            height: "50%",
            overflow: "hidden",
            opacity: 0.46,
            filter: "blur(1.6px)",
            zIndex: 0,
          }}>
            {/* Flipped car scene */}
            <div style={{
              transform: "scaleY(-1)",
              transformOrigin: "top center",
              width: "100%",
              aspectRatio: CAR_ASPECT,
              position: "absolute", top: 0, left: 0,
            }}>
              {WHEELS.map((w, i) => renderWheel(w, wheelAngle, `wr${i}`))}
              <img src="assets/car.png" alt="" style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "contain", zIndex: 2,
              }} />
            </div>
            {/* Fade gradient: transparent (near car) → black (far) */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, transparent 0%, #000 62%)",
              zIndex: 10, pointerEvents: "none",
            }} />
          </div>

        </div>
      </div>

      {/* Gold glitter / sparkle canvas — floor level, behind car */}
      <canvas ref={canvasRef} style={{
        position: "absolute", bottom: 0, left: 0,
        width: "100%", height: isMobile ? 180 : 215,
        display: "block", pointerEvents: "none", zIndex: 1,
      }} />

      {/* Bottom gradient fade to black */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: 170,
        background: "linear-gradient(rgba(0,0,0,0), #000)",
        zIndex: 4, pointerEvents: "none",
      }} />

      {/* Scroll indicator */}
      {!isMobile && (
        <div style={{
          position: "absolute", bottom: 26, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          zIndex: 6, opacity: sy > 60 ? 0 : 1, transition: "opacity .6s",
          pointerEvents: "none",
        }}>
          <div style={{ width: 1, height: 44,
            background: "linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.35))" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: ".22em", color: "var(--fg-faint)", textTransform: "uppercase" }}>
            scroll
          </span>
        </div>
      )}
    </section>
  );
}

export { Logo, Nav, Hero, WheelSVG, useViewport, telHref, LangToggle };

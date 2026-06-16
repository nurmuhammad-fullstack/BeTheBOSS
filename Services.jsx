import React, { useState as useState1 } from 'react';
import { useViewport, GOLD_TEXT } from './NavHero';

// Har bir xizmatga mos rasm (services tartibiga ko'ra — uz/ru/en bir xil tartibda)
const SERVICE_IMGS = [
  "img2.webp", // 0 — Kimyoviy tozalash / Химчистка        (Ximchistka salona)
  "img1.webp", // 1 — Tonirovka                            (Tanirovka)
  "img3.webp", // 2 — Deteyling yuvish                     (deteling moyka)
  "img4.webp", // 3 — Polirovka                            (Palirovka kuzova)
  "img6.webp", // 4 — Himoya plyonkasi                     (plenka na kuzov)
  "img7.webp", // 5 — Interyer detailing                   (plenka dlya salona)
  "img5.webp", // 6 — Keramika qoplamasi                   (keramicheskiy pokritiye)
];

/* ── About section ── */
function About({ t }) {
  const { isMobile } = useViewport();
  return (
    <section style={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? 32 : 80,
      alignItems: "center",
      maxWidth: 1180, margin: "0 auto",
      padding: isMobile ? "70px 22px" : "120px 56px",
    }}>
      <div style={{ flex: isMobile ? "none" : "0 0 360px", width: isMobile ? "100%" : "auto", position: "relative", padding: isMobile ? 18 : 22 }}>
        <div style={{ position: "relative", borderRadius: 20, overflow: "hidden" }}>
          <img src="assets/about-car.webp" alt="About Bosscar" style={{
            width: "100%",
            height: isMobile ? 300 : 460,
            objectFit: "cover",
            display: "block",
          }} />
        </div>
        {/* Oltin burchaklar — uzun + dumaloq (figma) */}
        <div style={{
          position: "absolute", top: 6, left: 6, width: 66, height: 66,
          borderTop: "2px solid var(--gold)", borderLeft: "2px solid var(--gold)",
          borderTopLeftRadius: 24, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 6, right: 6, width: 66, height: 66,
          borderBottom: "2px solid var(--gold)", borderRight: "2px solid var(--gold)",
          borderBottomRightRadius: 24, pointerEvents: "none",
        }} />
      </div>
      <div style={{ flex: 1 }}>
        <h2 style={{ margin: "0 0 6px", fontFamily: "var(--font-brand)", fontWeight: 900, letterSpacing: "-.03em", fontSize: isMobile ? 30 : 40, ...GOLD_TEXT, lineHeight: 1.15 }}>
          {t.aboutTitle}
        </h2>
        <p style={{ margin: "0 0 22px", fontFamily: "var(--font-script)", fontSize: isMobile ? 20 : 24, color: "var(--gold-300)", lineHeight: 1.3 }}>
          {t.aboutEpithet}
        </p>
        {t.aboutBody.split(/\n+/).filter(Boolean).map((paragraph, index) => (
          <p key={index} style={{
            margin: index === 0 ? "0 0 20px" : 0,
            fontFamily: "var(--font-mono)",
            fontSize: isMobile ? 14 : 15.5,
            lineHeight: 1.9, color: "var(--fg-dim)",
          }}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

/* ── Service card ── */
function ServiceCard({ img, name, desc, more, w }) {
  const [hover, setHover] = useState1(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ flex: `0 0 ${w}px`, width: w, cursor: "pointer", userSelect: "none" }}>
      <div style={{
        overflow: "hidden", borderRadius: 14,
        boxShadow: hover ? "0 0 36px rgba(255,166,41,.28)" : "0 4px 14px rgba(0,0,0,.4)",
        transition: "box-shadow .4s",
        border: "1px solid rgba(255,255,255,.06)",
      }}>
        <div style={{
          width: "100%", height: w * 0.78,
          backgroundImage: `url(assets/${img})`,
          backgroundSize: "cover", backgroundPosition: "center",
          transform: hover ? "scale(1.05)" : "scale(1)",
          transition: "transform .7s cubic-bezier(.22,1,.36,1)",
        }} />
      </div>
      <h3 style={{
        margin: "18px 0 8px",
        fontFamily: "var(--font-ui)", fontWeight: 500, fontSize: 22,
        color: hover ? "var(--gold-600)" : "var(--gold)",
        transition: "color .3s",
      }}>
        ☆ {name}
      </h3>
      <p style={{
        margin: "0 0 16px", fontFamily: "var(--font-mono)",
        fontSize: 13, lineHeight: 1.65, color: "var(--fg-dim)", minHeight: 52,
      }}>
        {desc}
      </p>
      <span style={{
        fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 15,
        color: "var(--gold-600)", display: "inline-flex", gap: 8, alignItems: "center",
      }}>
        {more}
        <span style={{ transform: hover ? "translateX(6px)" : "none", transition: "transform .3s" }}>→</span>
      </span>
    </div>
  );
}

/* ── Services section — uzluksiz (to'xtamas) full-width marquee ── */
function Services({ t }) {
  const { isMobile } = useViewport();
  const cardW = isMobile ? 264 : 340;
  const gap   = isMobile ? 20  : 48;
  // Seamless loop uchun xizmatlarni ikki marta render qilamiz
  const loop = [...t.services, ...t.services];
  // Bir nusxa kengligi -> animatsiya davomiyligi (~70px/s tezlik)
  const dur = Math.max(20, Math.round((t.services.length * (cardW + gap)) / 70));

  return (
    <section style={{ padding: isMobile ? "50px 0 90px" : "80px 0 110px", position: "relative", overflow: "hidden" }}>
      {/* Header */}
      <div style={{
        maxWidth: 1180, margin: "0 auto",
        padding: isMobile ? "0 22px" : "0 56px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? 16 : 56,
        marginBottom: isMobile ? 30 : 48,
      }}>
        <div style={{ flex: isMobile ? "none" : "0 0 auto" }}>
          <h2 style={{
            margin: 0, fontFamily: "var(--font-brand)", fontWeight: 900,
            fontSize: isMobile ? 32 : 50, letterSpacing: "-.03em", ...GOLD_TEXT,
            lineHeight: 1.1, whiteSpace: isMobile ? "normal" : "nowrap",
          }}>
            {t.servicesTitle}
          </h2>
        </div>
        <p style={{
          margin: 0, fontFamily: "var(--font-mono)", fontSize: 13.5,
          lineHeight: 1.85, color: "var(--fg-dim)",
          flex: isMobile ? "none" : 1, maxWidth: isMobile ? "100%" : 520,
        }}>
          {t.servicesSub}
        </p>
      </div>

      {/* Container ichida uzluksiz marquee — chetlarida kartalar shaffoflashib
         (korinar-korinmas) container tagiga kirib ketadi, hover'da to'xtaydi */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: isMobile ? "0 22px" : "0 56px" }}>
        <div className="bc-marquee" style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
        }}>
          <div className="bc-marquee-track" style={{ '--bc-dur': `${dur}s` }}>
            {loop.map((s, i) => (
              <div key={i} aria-hidden={i >= t.services.length}
                style={{ flex: `0 0 ${cardW}px`, marginRight: gap }}>
                <ServiceCard img={SERVICE_IMGS[i % SERVICE_IMGS.length]} name={s.name} desc={s.desc} more={t.more} w={cardW} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { About, Services, ServiceCard, SERVICE_IMGS };

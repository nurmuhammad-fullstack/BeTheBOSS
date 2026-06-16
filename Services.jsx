import React, { useState as useState1, useEffect as useEffect1, useRef as useRef1 } from 'react';
import { useViewport, GOLD_TEXT } from './NavHero';

// "Batafsil" bosilganda shu Telegram profiliga (xizmat nomi bilan) ochiladi
const TG_USERNAME = "bosscaruz";
const tgServiceLink = (serviceName) =>
  `https://t.me/${TG_USERNAME}?text=` +
  encodeURIComponent(`Assalomu alaykum! "${serviceName}" xizmati haqida ma'lumot olmoqchiman.`);

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
      <a
        href={tgServiceLink(name)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{
          fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 15,
          color: "var(--gold-600)", display: "inline-flex", gap: 8, alignItems: "center",
          textDecoration: "none", cursor: "pointer",
        }}>
        {more}
        <span style={{ transform: hover ? "translateX(6px)" : "none", transition: "transform .3s" }}>→</span>
      </a>
    </div>
  );
}

/* ── Services section — uzluksiz auto-scroll + qo'lda surish (drag/touch) ── */
function Services({ t }) {
  const { isMobile } = useViewport();
  const cardW = isMobile ? 264 : 340;
  const gap   = isMobile ? 20  : 48;
  const railRef = useRef1(null);
  const pausedRef = useRef1(false);           // hover/drag/touch paytida to'xtaydi
  const drag = useRef1({ down: false, x: 0, sl: 0, moved: false });
  // Seamless loop uchun xizmatlarni ikki marta render qilamiz
  const loop = [...t.services, ...t.services];
  const SPEED = isMobile ? 0.35 : 0.45;       // px/kadr — sekin, professional

  // Uzluksiz auto-scroll — haqiqiy scrollLeft, yarmiga yetganda seamless qaytadi
  useEffect1(() => {
    const el = railRef.current; if (!el) return;
    let raf;
    const step = () => {
      if (!pausedRef.current && !drag.current.down) {
        const half = el.scrollWidth / 2;
        if (half > 0) {
          el.scrollLeft += SPEED;
          if (el.scrollLeft >= half) el.scrollLeft -= half;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [SPEED]);

  // Qo'lda surish (sichqoncha + barmoq)
  const px = (e) => (e.touches ? e.touches[0].pageX : e.pageX);
  const onDown = (e) => { const el = railRef.current; drag.current = { down: true, x: px(e), sl: el.scrollLeft, moved: false }; };
  const onMove = (e) => {
    if (!drag.current.down) return;
    const el = railRef.current; const dx = px(e) - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    let sl = drag.current.sl - dx;
    const half = el.scrollWidth / 2;
    if (sl < 0) sl += half; else if (sl >= half) sl -= half;   // seamless wrap
    el.scrollLeft = sl;
  };
  const onUp = () => { drag.current.down = false; };

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

      {/* Container ichida — kartalar chetlarida shaffoflashib (korinar-korinmas)
         tagiga kiradi. Auto-scroll + qo'lda surish (drag/touch), hover'da to'xtaydi */}
      <div
        style={{
          maxWidth: 1180, margin: "0 auto", padding: isMobile ? "0 22px" : "0 56px",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 11%, #000 89%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, #000 11%, #000 89%, transparent 100%)",
        }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { drag.current.down = false; pausedRef.current = false; }}
      >
        <div
          ref={railRef}
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp}
          onTouchStart={() => { pausedRef.current = true; }}
          onTouchEnd={() => { pausedRef.current = false; }}
          onClickCapture={(e) => { if (drag.current.moved) { e.stopPropagation(); e.preventDefault(); } }}
          style={{
            display: "flex", overflowX: "auto", overflowY: "hidden",
            scrollbarWidth: "none", msOverflowStyle: "none",
            cursor: "grab", WebkitOverflowScrolling: "touch",
          }}
        >
          {loop.map((s, i) => (
            <div key={i} aria-hidden={i >= t.services.length}
              style={{ flex: `0 0 ${cardW}px`, marginRight: gap }}>
              <ServiceCard img={SERVICE_IMGS[i % SERVICE_IMGS.length]} name={s.name} desc={s.desc} more={t.more} w={cardW} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { About, Services, ServiceCard, SERVICE_IMGS };

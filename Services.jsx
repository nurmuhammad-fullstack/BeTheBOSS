import React, { useState as useState1, useEffect as useEffect1, useRef as useRef1 } from 'react';
import { useViewport, GOLD_TEXT } from './NavHero';

// Har bir xizmatga mos rasm (services tartibiga ko'ra — uz/ru/en bir xil tartibda)
const SERVICE_IMGS = [
  "img2.jpg", // 0 — Kimyoviy tozalash / Химчистка        (Ximchistka salona)
  "img1.jpg", // 1 — Tonirovka                            (Tanirovka)
  "img3.jpg", // 2 — Deteyling yuvish                     (deteling moyka)
  "img4.jpg", // 3 — Polirovka                            (Palirovka kuzova)
  "img6.jpg", // 4 — Himoya plyonkasi                     (plenka na kuzov)
  "img7.jpg", // 5 — Interyer detailing                   (plenka dlya salona)
  "img5.jpg", // 6 — Keramika qoplamasi                   (keramicheskiy pokritiye)
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
          <img src="assets/about-car.jpg" alt="About Bosscar" style={{
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

/* ── Rail nav button — container tashqarisida, bordersiz chevron ── */
function RailBtn({ dir, disabled, onClick, top }) {
  return (
    <button onClick={onClick} disabled={disabled} aria-label={dir} style={{
      position: "absolute", top, [dir]: -46, transform: "translateY(-50%)", zIndex: 6,
      width: 32, height: 48, border: "none", background: "transparent", padding: 0,
      color: disabled ? "rgba(255,255,255,.25)" : "var(--gold)",
      cursor: disabled ? "default" : "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: disabled ? .4 : 1, transition: "color .25s, opacity .25s",
    }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.color = "var(--gold-300)"; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.color = "var(--gold)"; }}
    >
      <span style={{ fontSize: 42, lineHeight: 1, fontWeight: 400 }}>
        {dir === "left" ? "‹" : "›"}
      </span>
    </button>
  );
}

/* ── Services section — horizontal drag-slider (Block 3) ── */
function Services({ t }) {
  const { isMobile } = useViewport();
  const cardW = isMobile ? 260 : 320;
  const gap   = isMobile ? 18  : 24;
  const railRef  = useRef1(null);
  const pausedRef = useRef1(false);   // hover yoki drag paytida auto-scroll to'xtaydi
  const [atStart, setAtStart] = useState1(true);
  const [atEnd,   setAtEnd]   = useState1(false);

  const updateEdges = () => {
    const el = railRef.current; if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  };

  // Auto-scroll — haqiqiy scrollLeft manba sifatida (drag bilan urishmaydi),
  // hover/drag paytida pauza qiladi.
  useEffect1(() => {
    const el = railRef.current; if (!el) return;
    let raf, dir = 1;
    const SPEED = 0.5;
    const tick = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (!pausedRef.current && max > 0) {
        let next = el.scrollLeft + dir * SPEED;
        if (next >= max) { next = max; dir = -1; }
        else if (next <= 0) { next = 0; dir = 1; }
        el.scrollLeft = next;
        updateEdges();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect1(() => { updateEdges(); }, []);

  const page = (dir) => {
    const el = railRef.current; if (!el) return;
    el.scrollBy({ left: dir * (cardW + gap) * (isMobile ? 1 : 2), behavior: "smooth" });
  };

  // Drag-to-scroll
  const drag = useRef1({ down: false, x: 0, sl: 0, moved: false });
  const onDown = (e) => { const el = railRef.current; pausedRef.current = true; drag.current = { down: true, x: e.pageX, sl: el.scrollLeft, moved: false }; };
  const onMove = (e) => {
    if (!drag.current.down) return;
    const el = railRef.current; const dx = e.pageX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.sl - dx;
    updateEdges();
  };
  const onUp = () => { drag.current.down = false; };

  // Wrapper hover: pauza/davom
  const onZoneEnter = () => { pausedRef.current = true; };
  const onZoneLeave = () => { drag.current.down = false; pausedRef.current = false; };

  const arrowTop = (cardW * 0.78) / 2;   // strelkani rasm balandligining o'rtasiga

  return (
    <section style={{ padding: isMobile ? "50px 0 90px" : "80px 0 110px", position: "relative" }}>
      {/* Header */}
      <div style={{
        maxWidth: 1180, margin: "0 auto",
        padding: isMobile ? "0 22px" : "0 56px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? 16 : 56,
        marginBottom: isMobile ? 24 : 32,
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

      {/* Slider container with same max-width and padding as header */}
      <div style={{
        maxWidth: 1180, margin: "0 auto",
        padding: isMobile ? "0 22px" : "0 56px",
      }}>
        {/* Relative zone — rail + chetidagi strelkalar */}
        <div
          style={{ position: "relative" }}
          onMouseEnter={onZoneEnter}
          onMouseLeave={onZoneLeave}
        >
          {/* Drag-to-scroll rail */}
          <div
            ref={railRef}
            onScroll={updateEdges}
            onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp}
            style={{
              display: "flex", gap, overflowX: "auto",
              scrollbarWidth: "none", msOverflowStyle: "none",
              cursor: "grab",
            }}
            onClickCapture={(e) => { if (drag.current.moved) { e.stopPropagation(); e.preventDefault(); } }}
          >
            {t.services.map((s, i) => (
              <div key={i}>
                <ServiceCard img={SERVICE_IMGS[i % SERVICE_IMGS.length]} name={s.name} desc={s.desc} more={t.more} w={cardW} />
              </div>
            ))}
            <div style={{ flex: "0 0 1px" }} />
          </div>

          {/* Chetidagi strelkalar — faqat desktopda */}
          {!isMobile && (
            <>
              <RailBtn dir="left"  top={arrowTop} disabled={atStart} onClick={() => page(-1)} />
              <RailBtn dir="right" top={arrowTop} disabled={atEnd}   onClick={() => page(1)} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export { About, Services, ServiceCard, SERVICE_IMGS, RailBtn };

import React, { useState as useState1, useEffect as useEffect1, useRef as useRef1 } from 'react';
import { useViewport } from './NavHero';

const SERVICE_IMGS = ["service-1.png", "gallery-1.png", "gallery-2.png", "gallery-3.png", "cta-car.png"];

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
        <div style={{ position: "absolute", top: 12, left: 12, width: 50, height: 2, background: "var(--gold)", borderRadius: 20 }} />
        <div style={{ position: "absolute", top: 12, left: 12, width: 2, height: 50, background: "var(--gold)", borderRadius: 20 }} />
        <div style={{ position: "absolute", bottom: 12, right: 12, width: 50, height: 2, background: "var(--gold)", borderRadius: 20 }} />
        <div style={{ position: "absolute", bottom: 12, right: 12, width: 2, height: 50, background: "var(--gold)", borderRadius: 20 }} />
      </div>
      <div style={{ flex: 1 }}>
        <h2 style={{ margin: "0 0 6px", fontFamily: "var(--font-display)", fontSize: isMobile ? 26 : 32, color: "var(--gold-300)", lineHeight: 1.2 }}>
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

/* ── Rail nav button ── */
function RailBtn({ dir, disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled} aria-label={dir} style={{
      width: 48, height: 48, borderRadius: "50%", flex: "none",
      border: "1px solid " + (disabled ? "rgba(255,255,255,.15)" : "var(--gold)"),
      background: disabled ? "rgba(255,255,255,.1)" : "var(--gold)",
      color: disabled ? "rgba(255,255,255,.6)" : "#111",
      fontSize: 20, cursor: disabled ? "default" : "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all .3s", opacity: disabled ? .55 : 1,
    }}>
      <span style={{ fontSize: 22, lineHeight: 1, fontWeight: 700 }}>
        {dir === "left" ? "←" : "→"}
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
  const [atStart, setAtStart] = useState1(true);
  const [atEnd,   setAtEnd]   = useState1(false);

  const onScroll = () => {
    const el = railRef.current; if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft > el.scrollWidth - el.clientWidth - 8);
  };

  // Auto-scroll animation from left to right
  useEffect1(() => {
    const el = railRef.current; if (!el) return;
    let animationId;
    const totalWidth = el.scrollWidth;
    const visibleWidth = el.clientWidth;
    const maxScroll = totalWidth - visibleWidth;
    let scrollPos = 0;
    let direction = 1; // 1 = right, -1 = left

    const animate = () => {
      scrollPos += direction * 0.5;
      if (scrollPos >= maxScroll) {
        scrollPos = maxScroll;
        direction = -1;
      } else if (scrollPos <= 0) {
        scrollPos = 0;
        direction = 1;
      }
      el.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect1(() => { onScroll(); }, []);

  const page = (dir) => {
    const el = railRef.current; if (!el) return;
    el.scrollBy({ left: dir * (cardW + gap) * (isMobile ? 1 : 2), behavior: "smooth" });
  };

  // Drag-to-scroll
  const drag = useRef1({ down: false, x: 0, sl: 0, moved: false });
  const onDown = (e) => { const el = railRef.current; drag.current = { down: true, x: e.pageX, sl: el.scrollLeft, moved: false }; };
  const onMove = (e) => {
    if (!drag.current.down) return;
    const el = railRef.current; const dx = e.pageX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.sl - dx;
  };
  const onUp = () => { drag.current.down = false; };

  const [titleMain, titleAccent] = t.servicesTitle.split(" — ");

  return (
    <section style={{ padding: isMobile ? "20px 0 70px" : "30px 0 80px", position: "relative" }}>
      {/* Header */}
      <div style={{
        maxWidth: 1180, margin: "0 auto",
        padding: isMobile ? "0 22px" : "0 56px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "flex-end",
        gap: isMobile ? 16 : 40,
        marginBottom: isMobile ? 24 : 32,
      }}>
        <div>
          <h2 style={{
            margin: 0, fontFamily: "var(--font-display)",
            fontSize: isMobile ? 30 : 42, color: "var(--gold-600)",
            lineHeight: 1.05, maxWidth: 560,
          }}>
            <span style={{ display: "block" }}>{titleMain}</span>
            <span style={{ display: "block", whiteSpace: "nowrap" }}>— {titleAccent}</span>
          </h2>
        </div>
        <p style={{
          margin: 0, fontFamily: "var(--font-mono)", fontSize: 13,
          lineHeight: 1.75, color: "var(--fg-dim)", maxWidth: 320,
        }}>
          {t.servicesSub}
        </p>
      </div>

      {/* Slider container with same max-width and padding as header */}
      <div style={{
        maxWidth: 1180, margin: "0 auto",
        padding: isMobile ? "0 22px" : "0 56px",
      }}>
        {/* Drag-to-scroll rail */}
        <div
          ref={railRef}
          onScroll={onScroll}
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
          style={{
            display: "flex", gap, overflowX: "auto",
            scrollbarWidth: "none", msOverflowStyle: "none",
            scrollSnapType: "x mandatory", cursor: "grab",
          }}
          onClickCapture={(e) => { if (drag.current.moved) { e.stopPropagation(); e.preventDefault(); } }}
        >
          {t.services.map((s, i) => (
            <div key={i} style={{ scrollSnapAlign: "start" }}>
              <ServiceCard img={SERVICE_IMGS[i % SERVICE_IMGS.length]} name={s.name} desc={s.desc} more={t.more} w={cardW} />
            </div>
          ))}
          <div style={{ flex: "0 0 1px" }} />
        </div>
      </div>


    </section>
  );
}

export { About, Services, ServiceCard, SERVICE_IMGS, RailBtn };

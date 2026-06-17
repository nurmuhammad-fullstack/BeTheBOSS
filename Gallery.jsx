import React, { useState, useEffect, useRef } from 'react';
import { useViewport } from './NavHero';

const GALLERY_IMAGES = [
  "assets/the_boss_gallery_1b.webp",
  "assets/the_boss_gallery_2.webp",
  "assets/the_boss_gallery_3b.webp",
  "assets/the_boss_gallery_4b.webp",
  "assets/the_boss_gallery_5b.webp",
];

// Mobil karusel — desktopdagi 5 ta + faqat mobilda ko'rinadigan dunyo xaritasi
const MOBILE_IMAGES = [...GALLERY_IMAGES, "assets/the_boss_gallery_6.webp"];

/* ── Gold frame bracket (image burchagini ramkalaydi, biroz tashqarida) ── */
function CornerBracket({ pos }) {
  const S = 110, off = -9, c = "rgba(245,200,90,.9)", bw = "2px", r = 22;
  const base = { position: "absolute", width: S, height: S, zIndex: 6, pointerEvents: "none" };
  const map = {
    tl: { top: off, left: off, borderTop: `${bw} solid ${c}`, borderLeft: `${bw} solid ${c}`, borderTopLeftRadius: r },
    tr: { top: off, right: off, borderTop: `${bw} solid ${c}`, borderRight: `${bw} solid ${c}`, borderTopRightRadius: r },
    bl: { bottom: off, left: off, borderBottom: `${bw} solid ${c}`, borderLeft: `${bw} solid ${c}`, borderBottomLeftRadius: r },
    br: { bottom: off, right: off, borderBottom: `${bw} solid ${c}`, borderRight: `${bw} solid ${c}`, borderBottomRightRadius: r },
  };
  return <div style={{ ...base, ...map[pos] }} />;
}

/* ── Mobil karusel — bitta rasm, avtomatik aylanadi, strelka + nuqtalar ── */
function mobileArrow(side) {
  return {
    position: "absolute", top: "50%", [side]: 10, transform: "translateY(-50%)",
    width: 40, height: 40, borderRadius: "50%", border: "none", padding: 0,
    background: "rgba(0,0,0,.45)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
    color: "var(--gold)", fontSize: 26, lineHeight: 1, cursor: "pointer", zIndex: 4,
    display: "flex", alignItems: "center", justifyContent: "center",
  };
}

function MobileCarousel() {
  const [idx, setIdx] = useState(0);
  const count = MOBILE_IMAGES.length;
  const pausedRef = useRef(false);

  // Avtomatik aylanish (qo'l tegsa to'xtaydi)
  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) setIdx((i) => (i + 1) % count);
    }, 3500);
    return () => clearInterval(id);
  }, [count]);

  const go = (d) => setIdx((i) => (i + d + count) % count);

  return (
    <div>
      <div
        style={{
          position: "relative", borderRadius: 18, overflow: "hidden",
          background: "#0e0e10", boxShadow: "0 18px 50px rgba(0,0,0,.5)",
        }}
        onTouchStart={() => { pausedRef.current = true; }}
        onTouchEnd={() => { pausedRef.current = false; }}
      >
        {/* Sirpanuvchi lenta */}
        <div style={{
          display: "flex",
          transform: `translateX(-${idx * 100}%)`,
          transition: "transform .55s cubic-bezier(.22,1,.36,1)",
        }}>
          {MOBILE_IMAGES.map((src, i) => (
            <div key={i} style={{ flex: "0 0 100%", aspectRatio: "4 / 5" }}>
              <div style={{
                width: "100%", height: "100%",
                backgroundImage: `url(${src})`,
                backgroundSize: "cover", backgroundPosition: "center",
              }} />
            </div>
          ))}
        </div>

        <button aria-label="Oldingi" onClick={() => go(-1)} style={mobileArrow("left")}>‹</button>
        <button aria-label="Keyingi" onClick={() => go(1)} style={mobileArrow("right")}>›</button>
      </div>

      {/* Nuqta indikatorlar */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 18 }}>
        {MOBILE_IMAGES.map((_, i) => (
          <button key={i} aria-label={`Rasm ${i + 1}`} onClick={() => setIdx(i)} style={{
            width: i === idx ? 22 : 8, height: 8, borderRadius: 99,
            border: "none", padding: 0, cursor: "pointer",
            background: i === idx ? "var(--gold)" : "rgba(255,255,255,.25)",
            transition: "all .3s",
          }} />
        ))}
      </div>
    </div>
  );
}

function FeaturedGallery({ isMobile }) {
  // Desktop uchun statik tartib (mobil <MobileCarousel/> ishlatadi)
  const order = [0, 1, 2, 3, 4];

  const gap = isMobile ? 18 : 24;

  // Mobil: bitta rasm, avtomatik aylanuvchi karusel
  if (isMobile) return <MobileCarousel />;

  /* ── Desktop: figma layout — chapda featured rasm (oltin ramka bilan) +
     o'ngda 2 ustun. Har bir rasm o'z tabiiy nisbatida (kesilmaydi). ── */
  if (!isMobile) {
    const cellOrder = [order[1], order[2], order[3], order[4]];
    // Har bir rasm <img> sifatida — width 100%, height auto => o'z razmerida
    const cell = (imgIdx, key, corner) => (
      // Tashqi wrapper — overflow YO'Q, shunda burchak kesilmaydi.
      <div key={key} style={{ position: 'relative' }}>
        <div style={{
          borderRadius: 18, overflow: 'hidden', background: '#0e0e10',
          boxShadow: '0 14px 34px rgba(0,0,0,.32)',
        }}>
          <img src={GALLERY_IMAGES[imgIdx]} alt="Bosscar avto detailing ish namunasi — Toshkent" loading="lazy" style={{
            width: '100%', height: 'auto', display: 'block',
          }} />
        </div>
        {corner && <CornerBracket pos={corner} />}
      </div>
    );

    return (
      <div style={{ display: 'flex', gap: `${gap}px`, width: '100%', alignItems: 'flex-start' }}>
        {/* Left featured — baland portret crop, diagonal oltin burchaklar (tl + br) */}
        <div style={{ flex: '0 0 42%', position: 'relative' }}>
          <div style={{
            aspectRatio: '4 / 5', borderRadius: 24, overflow: 'hidden', background: '#0e0e10',
            boxShadow: '0 24px 80px rgba(0,0,0,.45)',
          }}>
            <div style={{
              width: '100%', height: '100%',
              backgroundImage: `url(${GALLERY_IMAGES[order[0]]})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }} />
          </div>
          <CornerBracket pos="tl" />
          <CornerBracket pos="br" />
        </div>

        {/* Right: 2 ustun (masonry) — har bir rasm o'z balandligida.
           Oltin burchaklar: sochiq (tr) va bola (br) — figmadagidek */}
        <div style={{ flex: 1, display: 'flex', gap: `${gap}px`, alignItems: 'flex-start' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: `${gap}px` }}>
            {cell(cellOrder[0], 'g0', null)}
            {cell(cellOrder[2], 'g2', null)}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: `${gap}px` }}>
            {cell(cellOrder[1], 'g1', 'tr')}
            {cell(cellOrder[3], 'g3', 'br')}
          </div>
        </div>
      </div>
    );
  }
}

/* ── Gallery section ── */
function Gallery() {
  const { isMobile } = useViewport();
  return (
    <section id="gallery" style={{
      maxWidth: 1180, margin: '0 auto',
      padding: isMobile ? '50px 18px 90px' : '80px 56px 120px',
    }}>
      <FeaturedGallery isMobile={isMobile} />
    </section>
  );
}

export { Gallery };

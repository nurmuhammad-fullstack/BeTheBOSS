import React from 'react';
import { useViewport } from './NavHero';

const GALLERY_IMAGES = [
  "assets/the_boss_gallery_1.png",
  "assets/the_boss_gallery_2.png",
  "assets/the_boss_gallery_3.png",
  "assets/the_boss_gallery_4.png",
  "assets/the_boss_gallery_5.png",
];

/* ── Gold L-corner ornament ── */
function GoldCorner({ pos }) {
  const SIZE = 22;
  const base = { position: "absolute", width: SIZE, height: SIZE, zIndex: 5, pointerEvents: "none" };
  const map = {
    tl: { top: 10, left: 10,  borderTop:    "2px solid rgba(255,166,41,.75)", borderLeft:   "2px solid rgba(255,166,41,.75)" },
    tr: { top: 10, right: 10, borderTop:    "2px solid rgba(255,166,41,.75)", borderRight:  "2px solid rgba(255,166,41,.75)" },
    bl: { bottom: 10, left: 10,  borderBottom: "2px solid rgba(255,166,41,.75)", borderLeft:   "2px solid rgba(255,166,41,.75)" },
    br: { bottom: 10, right: 10, borderBottom: "2px solid rgba(255,166,41,.75)", borderRight:  "2px solid rgba(255,166,41,.75)" },
  };
  return <div style={{ ...base, ...map[pos] }} />;
}

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

/*
  ── MosaicCell ──
  Each cell renders its image as an absolutely-placed div so the
  fade-out → swap → fade-in is done on the background layer only,
  without the cell container reflowing.
*/
function MosaicCell({ img, gridColumn, gridRow, corners }) {
  return (
    <div style={{
      gridColumn, gridRow,
      position: "relative",
      borderRadius: 14,
      overflow: "hidden",
      background: "#060708",
      boxShadow: "0 4px 16px rgba(0,0,0,.45)",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }} />
      {corners.map((c) => <GoldCorner key={c} pos={c} />)}
    </div>
  );
}

/*
  ── Desktop mosaic layout ──
  Slot 0 : large left  — grid col 1, rows 1–2
  Slot 1 : top-right-1 — grid col 2, row 1
  Slot 2 : top-right-2 — grid col 3, row 1
              <div style={{ flex: '0 0 30%', display: 'flex', flexDirection: 'column', gap: `${gap}px`, alignItems: 'stretch' }}>
  Slot 4 : bot-right-2 — grid col 3, row 2
  Cycle: every 1.8 s the NEXT slot in sequence (0→1→2→3→4→0) fades
  its image out, swaps to the next pool image, then fades back in.
*/
const CELL_LAYOUT = [
  { gridColumn: "1", gridRow: "1 / 3", corners: ["tr", "bl"] },
  { gridColumn: "2", gridRow: "1",     corners: ["tr", "bl"] },
  { gridColumn: "3", gridRow: "1",     corners: ["tr", "bl"] },
  { gridColumn: "2", gridRow: "2",     corners: ["tr", "bl"] },
  { gridColumn: "3", gridRow: "2",     corners: ["tr", "bl"] },
];

function FeaturedGallery({ isMobile }) {
  // Statik tartib — carousel (avtomatik aylanish) olib tashlandi
  const order = [0, 1, 2, 3, 4];

  const gap = isMobile ? 18 : 24;
  const featuredHeight = isMobile ? 320 : 500;
  const smallHeight = isMobile ? 130 : 250;
  const smallWidth = isMobile ? `calc((100% - ${gap}px) / 2)` : '232px';

  const slots = [
    { left: '0', top: '0', width: '100%', height: `${featuredHeight}px`, radius: 22, z: 2 },
    { left: '0', top: `calc(${featuredHeight}px + ${gap}px)`, width: smallWidth, height: `${smallHeight}px`, radius: 18, z: 1 },
    { left: `calc(${smallWidth} + ${gap}px)`, top: `calc(${featuredHeight}px + ${gap}px)`, width: smallWidth, height: `${smallHeight}px`, radius: 18, z: 1 },
    { left: '0', top: `calc(${featuredHeight}px + ${gap}px + ${smallHeight}px + ${gap}px)`, width: smallWidth, height: `${smallHeight}px`, radius: 18, z: 1 },
    { left: `calc(${smallWidth} + ${gap}px)`, top: `calc(${featuredHeight}px + ${gap}px + ${smallHeight}px + ${gap}px)`, width: smallWidth, height: `${smallHeight}px`, radius: 18, z: 1 },
  ];

  const containerHeight = `calc(${featuredHeight}px + ${gap}px + ${smallHeight}px * 2 + ${gap}px)`;

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
          <img src={GALLERY_IMAGES[imgIdx]} alt="" loading="lazy" style={{
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

  return (
    <div style={{ position: 'relative', minHeight: containerHeight, overflow: 'hidden' }}>
      {(
        // Mobile: keep stacked mosaic behavior
        GALLERY_IMAGES.map((img, idx) => {
          const slotIndex = order.indexOf(idx);
          const slot = slots[slotIndex];
          return (
            <div key={img} style={{
              position: 'absolute',
              left: slot.left,
              top: slot.top,
              width: slot.width,
              height: slot.height,
              borderRadius: slot.radius,
              overflow: 'hidden',
              boxShadow: slotIndex === 0 ? '0 24px 80px rgba(0,0,0,.42)' : '0 14px 34px rgba(0,0,0,.32)',
              transition: 'left .85s cubic-bezier(.22,1,.36,1), top .85s cubic-bezier(.22,1,.36,1), width .85s cubic-bezier(.22,1,.36,1), height .85s cubic-bezier(.22,1,.36,1)',
              zIndex: slot.z,
              background: '#060708',
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: 'scale(1.04)',
                transition: 'transform .85s cubic-bezier(.22,1,.36,1)',
              }} />
            </div>
          );
        })
      )}
    </div>
  );
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

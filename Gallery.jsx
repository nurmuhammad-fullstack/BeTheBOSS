import React, { useState as useState2, useEffect as useEffect2, useRef as useRef2 } from 'react';
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
  const [order, setOrder] = useState2([0, 1, 2, 3, 4]);

  useEffect2(() => {
    const id = setInterval(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const gap = isMobile ? 18 : 24;
  // Make featured height less than combined height of two stacked small images
  const featuredHeight = isMobile ? 320 : 500;
  const smallHeight = isMobile ? 130 : 250;
  const smallWidth = isMobile ? `calc((100% - ${gap}px) / 2)` : '232px';
  const featuredWidth = isMobile ? '100%' : `calc(100% - ${smallWidth} * 2 - ${gap}px)`;

  // dynamic sizing based on natural image aspect ratios
  const containerRef = useRef2(null);
  const [aspectRatios, setAspectRatios] = useState2(() => Array(GALLERY_IMAGES.length).fill(1));
  const [smallHeightsPx, setSmallHeightsPx] = useState2(() => Array(GALLERY_IMAGES.length).fill(smallHeight));

  useEffect2(() => {
    // preload images to read natural aspect ratios
    GALLERY_IMAGES.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setAspectRatios((prev) => {
          const next = [...prev];
          next[i] = img.naturalHeight / img.naturalWidth || 1;
          return next;
        });
      };
    });
  }, []);

  // compute small image heights in px whenever container width or aspect ratios change
  useEffect2(() => {
    const computeHeights = () => {
      const el = containerRef.current;
      if (!el) return;
      const containerWidth = el.clientWidth;
      const availableWidth = containerWidth - gap * 2; // two gaps between three columns
      const smallWidthPx = availableWidth * 0.3; // 30% column width
      const next = aspectRatios.map((r) => Math.max(80, Math.round(smallWidthPx * r)));
      setSmallHeightsPx(next);
    };
    computeHeights();
    window.addEventListener('resize', computeHeights);
    return () => window.removeEventListener('resize', computeHeights);
  }, [aspectRatios, gap]);

  const slots = isMobile ? [
    { left: '0', top: '0', width: '100%', height: `${featuredHeight}px`, radius: 22, z: 2 },
    { left: '0', top: `calc(${featuredHeight}px + ${gap}px)`, width: smallWidth, height: `${smallHeight}px`, radius: 18, z: 1 },
    { left: `calc(${smallWidth} + ${gap}px)`, top: `calc(${featuredHeight}px + ${gap}px)`, width: smallWidth, height: `${smallHeight}px`, radius: 18, z: 1 },
    { left: '0', top: `calc(${featuredHeight}px + ${gap}px + ${smallHeight}px + ${gap}px)`, width: smallWidth, height: `${smallHeight}px`, radius: 18, z: 1 },
    { left: `calc(${smallWidth} + ${gap}px)`, top: `calc(${featuredHeight}px + ${gap}px + ${smallHeight}px + ${gap}px)`, width: smallWidth, height: `${smallHeight}px`, radius: 18, z: 1 },
  ] : [
    { left: '0', top: '0', width: featuredWidth, height: `${featuredHeight}px`, radius: 28, z: 2 },
    { left: `calc(100% - ${smallWidth})`, top: '0', width: smallWidth, height: `${smallHeight}px`, radius: 18, z: 1 },
    { left: `calc(100% - ${smallWidth})`, top: `calc(${smallHeight}px + ${gap}px)`, width: smallWidth, height: `${smallHeight}px`, radius: 18, z: 1 },
    { left: `calc(100% - ${smallWidth} * 2 - ${gap}px)`, top: '0', width: smallWidth, height: `${smallHeight}px`, radius: 18, z: 1 },
    { left: `calc(100% - ${smallWidth} * 2 - ${gap}px)`, top: `calc(${smallHeight}px + ${gap}px)`, width: smallWidth, height: `${smallHeight}px`, radius: 18, z: 1 },
  ];

  const containerHeight = isMobile ? `calc(${featuredHeight}px + ${gap}px + ${smallHeight}px * 2 + ${gap}px)` : `${smallHeight * 2 + gap}px`;

  return (
    <div ref={containerRef} style={{ position: 'relative', minHeight: containerHeight, overflow: 'hidden' }}>
      {!isMobile ? (
        <div style={{ display: 'flex', gap: `${gap}px`, width: '100%', height: containerHeight }}>
          {/* Left featured column (40%) */}
          <div style={{ flex: '0 0 40%', borderRadius: 28, overflow: 'hidden', background: '#060708' }}>
            <div style={{ width: '100%', height: '100%', backgroundImage: `url(${GALLERY_IMAGES[order[0]]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          </div>

          {/* Middle column (30%) - two stacked images */}
          <div style={{ flex: '0 0 30%', display: 'flex', flexDirection: 'column', gap: `${gap}px`, alignItems: 'stretch' }}>
            <div style={{ height: `${smallHeightsPx[order[1]]}px`, borderRadius: 18, overflow: 'hidden', background: '#060708' }}>
              <div style={{ width: '100%', height: '100%', backgroundImage: `url(${GALLERY_IMAGES[order[1]]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            </div>
            <div style={{ height: `${smallHeightsPx[order[3]]}px`, borderRadius: 18, overflow: 'hidden', background: '#060708' }}>
              <div style={{ width: '100%', height: '100%', backgroundImage: `url(${GALLERY_IMAGES[order[3]]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            </div>
          </div>

          {/* Right column (30%) - two stacked images */}
          <div style={{ flex: '0 0 30%', display: 'flex', flexDirection: 'column', gap: `${gap}px`, alignItems: 'stretch' }}>
            <div style={{ height: `${smallHeightsPx[order[2]]}px`, borderRadius: 18, overflow: 'hidden', background: '#060708' }}>
              <div style={{ width: '100%', height: '100%', backgroundImage: `url(${GALLERY_IMAGES[order[2]]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            </div>
            <div style={{ height: `${smallHeightsPx[order[4]]}px`, borderRadius: 18, overflow: 'hidden', background: '#060708' }}>
              <div style={{ width: '100%', height: '100%', backgroundImage: `url(${GALLERY_IMAGES[order[4]]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            </div>
          </div>
        </div>
      ) : (
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
      padding: isMobile ? '20px 18px 80px' : '30px 56px 100px',
    }}>
      <FeaturedGallery isMobile={isMobile} />
    </section>
  );
}

export { Gallery };

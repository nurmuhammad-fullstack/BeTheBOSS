import React, { useState } from 'react';
import { useViewport, telHref, GOLD_TEXT } from './NavHero';

// Arizalar shu Telegram profiliga boradi (botsiz, deep-link orqali)
const TG_USERNAME = "bosscaruz";

// Footer B-ustun (footerColB) tartibiga mos real havolalar.
const FOOTER_COL_B_LINKS = [
  "mailto:bosscaruz@gmail.com",                       // 0 — Email yozing
  "https://www.instagram.com/bosscargarage.uz",    // 1 — Instagram
  "https://t.me/bosscaruz",                        // 2 — Telegram
  "https://www.youtube.com/@bosscaruz",            // 3 — Youtube
];

// Footer A-ustun (footerColA) tartibiga mos bo'lim ID'lari (null = sahifa boshiga)
const FOOTER_COL_A_IDS = [null, "services", "whyus", "about"];

const scrollToSection = (id) => {
  if (!id) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

/* ── Why us ── */
function WhyUs({ t, onOpenModal }) {
  const { isMobile } = useViewport();

  return (
    <section style={{ background: "#000", padding: isMobile ? "50px 0 80px" : "70px 0 90px" }}>
      <div style={{
        maxWidth: 1180, margin: "0 auto",
        padding: isMobile ? "0 22px" : "0 56px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 28 : 40,
        alignItems: "stretch",
      }}>
        {/* Left: image + title */}
        <div style={{ flex: isMobile ? "none" : "0 0 48%", width: isMobile ? "100%" : "auto", background: "#000" }}>
          <h2 style={{
            margin: "0 0 28px", fontFamily: "var(--font-brand)", fontWeight: 900,
            fontSize: isMobile ? 28 : 42, letterSpacing: "-.03em",
            ...GOLD_TEXT, lineHeight: 1.25,
          }}>
            {t.whyTitle}
          </h2>
          <div style={{ position: "relative", background: "#000" }}>
            <img src="assets/hero-car.webp" alt="" style={{
              width: "100%", display: "block",
              filter: "none",
              background: "#000",
            }} />
          </div>
        </div>

        {!isMobile && (
          <div style={{ width: 1, background: "var(--gold)", margin: "20px 0" }} />
        )}

        {/* Right: 3 points */}
        <div style={{ flex: 1 }}>
          {t.why.map((w, i) => (
            <div key={i} style={{
              paddingBottom: 26, marginBottom: 26,
              borderBottom: i < 2 ? "1px solid rgba(255,255,255,.09)" : "none",
            }}>
              <h4 style={{
                margin: "0 0 9px",
                fontFamily: "var(--font-ui)", fontWeight: 600,
                fontSize: isMobile ? 17 : 19, color: "var(--gold)",
              }}>
                {w.h}
              </h4>
              <p style={{
                margin: 0, fontFamily: "var(--font-mono)",
                fontSize: 13.5, lineHeight: 1.75, color: "var(--fg-dim)",
              }}>
                {w.b}
              </p>
            </div>
          ))}
          <button
            type="button"
            onClick={onOpenModal}
            style={{
              marginTop: 10,
              width: isMobile ? "100%" : "auto",
              background: "transparent",
              color: "var(--gold)",
              border: "1px solid var(--gold)",
              borderRadius: 10,
              padding: "15px 34px",
              fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 16,
              cursor: "pointer", letterSpacing: ".01em",
              transition: "all .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--gold)";
              e.currentTarget.style.color = "#111";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--gold)";
            }}
          >
            {t.priceBtn}
          </button>
        </div>
      </div>
    </section>
  );
}

function PriceModal({ show, onClose, t }) {
  const { isMobile } = useViewport();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  if (!show) return null;

  const sendTelegram = () => {
    if (!phone.trim()) {
      setStatusMessage("Iltimos, telefon raqamingizni kiriting.");
      return;
    }
    // Tashrifchining Telegrami ochilib, @bosscaruz'ga tayyor xabar yoziladi
    const text =
      `Assalomu alaykum! Narx haqida ma'lumot olmoqchiman.\n` +
      `Ism: ${name.trim() || "-"}\n` +
      `Telefon: ${phone.trim()}`;
    const url = `https://t.me/${TG_USERNAME}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setStatusMessage("Telegram ochildi — xabarni yuborish uchun \"Send\" tugmasini bosing.");
    setName("");
    setPhone("");
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0,
      zIndex: 99,
      background: "rgba(0,0,0,.8)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        position: "relative",
        width: isMobile ? "100%" : 480,
        background: "#040404", borderRadius: 24,
        border: "1px solid rgba(255,190,75,.16)",
        boxShadow: "0 20px 70px rgba(0,0,0,.45)",
        padding: 28,
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, marginBottom: 22 }}>
          <div style={{ width: 80, height: 80, display: "grid", placeItems: "center", background: "rgba(255,255,255,.04)", borderRadius: 18 }}>
            <img src="assets/logo.png" alt="Logo" style={{ maxWidth: "68%", maxHeight: "68%", objectFit: "contain" }} />
          </div>
          <button type="button" onClick={onClose} style={{
            position: "absolute", top: 20, right: 20,
            border: "none", background: "transparent", color: "var(--fg-dim)", cursor: "pointer", fontSize: 18,
          }}>
            ×
          </button>
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          <label style={{ display: "grid", gap: 8, color: "var(--fg-muted)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
            Ismingiz
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ismingizni kiriting" style={{
              width: "100%", borderRadius: 14, border: "1px solid rgba(255,255,255,.08)", padding: "14px 16px",
              background: "#080808", color: "#fff", fontFamily: "var(--font-ui)", fontSize: 15,
            }} />
          </label>
          <label style={{ display: "grid", gap: 8, color: "var(--fg-muted)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
            Telefon raqamingiz
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+998 90 123 45 67" style={{
              width: "100%", borderRadius: 14, border: "1px solid rgba(255,255,255,.08)", padding: "14px 16px",
              background: "#080808", color: "#fff", fontFamily: "var(--font-ui)", fontSize: 15,
            }} />
          </label>
          <button type="button" onClick={sendTelegram} style={{
            width: "100%", borderRadius: 14, border: "none", padding: "15px 18px",
            background: "var(--gold)", color: "#1a1200", fontWeight: 700, fontSize: 15, cursor: "pointer",
          }}>
            Telegram orqali yuborish
          </button>
          {statusMessage ? (
            <div style={{ color: "#fff", fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.6 }}>
              {statusMessage}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ── Contact ikonkalari — lucide o'rnida inline SVG (oltin, ingichka) ── */
function ContactIcon({ type }) {
  const common = {
    width: 40, height: 40, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round",
    style: { display: "block" },
  };
  if (type === "phone") {
    return (
      <svg {...common}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }
  if (type === "address") {
    return (
      <svg {...common}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

/* ── Contact ── */
function Contact({ t }) {
  const { isMobile } = useViewport();
  const items = [
    { k: "phone",   v: t.phone,             href: telHref(t.phone) },
    { k: "address", v: t.contact.addressVal, href: null },
    { k: "email",   v: t.contact.emailVal,   href: "mailto:" + t.contact.emailVal },
  ];

  return (
    <section style={{ padding: isMobile ? "70px 22px 80px" : "90px 56px 100px", textAlign: "center", background: "#000" }}>
      <h2 style={{
        margin: isMobile ? "0 0 36px" : "0 0 56px",
        fontFamily: "var(--font-brand)", fontWeight: 900, letterSpacing: "-.03em",
        fontSize: isMobile ? 36 : 54,
        ...GOLD_TEXT,
      }}>
        {t.contact?.title || t.contactTitle}
      </h2>
      <div style={{
        maxWidth: 1000, margin: "0 auto",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        gap: isMobile ? 32 : 0,
      }}>
        {items.map((it, i) => {
          const boxStyle = {
            flex: 1,
            padding: isMobile ? 0 : "0 36px",
            borderRight: !isMobile && i < 2 ? "1px solid rgba(241,199,103,.32)" : "none",
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 12, textDecoration: "none",
          };
          const inner = (
            <React.Fragment>
              <div style={{ color: "var(--gold)", marginBottom: 6 }}>
                <ContactIcon type={it.k} />
              </div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 11,
                letterSpacing: ".15em", textTransform: "uppercase", color: "#C9A24B",
              }}>
                {t.contact[it.k]}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 14,
                color: "var(--fg-muted)", lineHeight: 1.65, whiteSpace: "pre-line",
              }}>
                {it.v}
              </div>
            </React.Fragment>
          );
          return it.href
            ? <a key={i} href={it.href} style={boxStyle}>{inner}</a>
            : <div key={i} style={boxStyle}>{inner}</div>;
        })}
      </div>
    </section>
  );
}

/* ── Link (chain) icon — lucide o'rnida inline SVG ── */
function LinkIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: "block" }}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

/* ── CTA banner ── */
function CTA({ t, onOpenModal }) {
  const { isMobile } = useViewport();
  return (
    <section style={{
      maxWidth: 1180,
      margin: isMobile ? "24px auto 40px" : "48px auto 64px",
      padding: isMobile ? "0 16px" : "0 56px",
    }}>
      {/* Inner container card */}
      <div style={{
        position: "relative",
        borderRadius: isMobile ? 20 : 28,
        overflow: "hidden",
        minHeight: isMobile ? 460 : 420,
        background: "#0b0b0d",
        border: "1px solid rgba(255,255,255,.06)",
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
      }}>
        <img src="assets/cta-car.webp" alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", opacity: isMobile ? .3 : .42,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: isMobile
            ? "linear-gradient(rgba(11,11,13,.45), rgba(11,11,13,.94))"
            : "linear-gradient(90deg, #0b0b0d 18%, rgba(11,11,13,.55) 55%, rgba(11,11,13,.1))",
        }} />

        {/* Corner brackets — dumaloq burchakli */}
        <div style={{
          position: "absolute", top: 22, left: 22, width: 34, height: 34,
          borderTop: "1px solid var(--gold-700)", borderLeft: "1px solid var(--gold-700)",
          borderTopLeftRadius: 16, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 22, right: 22, width: 34, height: 34,
          borderBottom: "1px solid var(--gold-700)", borderRight: "1px solid var(--gold-700)",
          borderBottomRightRadius: 16, pointerEvents: "none",
        }} />

        {/* Content */}
        <div style={{
          position: "relative",
          padding: isMobile ? "0 28px 70px" : "56px 70px 64px",
          maxWidth: isMobile ? "100%" : 600,
        }}>
          <h2 style={{
            margin: 0, fontFamily: "var(--font-brand)", fontWeight: 900,
            fontSize: isMobile ? 30 : 46, letterSpacing: "-.03em",
            ...GOLD_TEXT, lineHeight: 1.18,
          }}>
            {t.ctaTitle}
          </h2>
          <p style={{
            margin: "18px 0 26px", fontFamily: "var(--font-mono)",
            fontSize: 14, color: "var(--fg-dim)", lineHeight: 1.75, maxWidth: 440,
          }}>
            {t.ctaSub}
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              background: "transparent", border: "none", padding: 0, cursor: "pointer",
              color: "var(--gold)", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: 19,
              transition: "color .25s, gap .25s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold-300)"; e.currentTarget.style.gap = "13px"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.gap = "9px"; }}
          >
            {t.ctaLink}
            <LinkIcon />
          </button>
        </div>

        {/* Phone — bottom-left */}
        <a href={telHref(t.phone)} style={{
          position: "absolute", left: isMobile ? 28 : 70, bottom: isMobile ? 28 : 36,
          fontFamily: "var(--font-mono)", fontSize: isMobile ? 14 : 15,
          color: "var(--gold-600)", textDecoration: "none", letterSpacing: ".03em",
          zIndex: 2,
        }}>
          {t.phone}
        </a>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer({ t }) {
  const { isMobile } = useViewport();
  return (
    <footer style={{ padding: isMobile ? "50px 22px 28px" : "72px 56px 30px", background: "#000" }}>
      <div style={{
        maxWidth: 1180, margin: "0 auto",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 36 : 60,
        justifyContent: "space-between",
      }}>
        <div style={{ maxWidth: 300 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="assets/logo.png" alt="Bosscar" style={{ width: 40, height: 40 }} />
            <span style={{
              fontFamily: "var(--font-brand)", fontWeight: 900, fontSize: 22,
              letterSpacing: "-.01em", ...GOLD_TEXT,
            }}>
              BOSSCAR
            </span>
          </div>
          <p style={{
            marginTop: 18, fontFamily: "var(--font-mono)",
            fontSize: 12.5, lineHeight: 1.75, color: "var(--fg-dim)",
          }}>
            {t.footerTag}
          </p>
        </div>
        <div style={{ display: "flex", gap: isMobile ? 50 : 72 }}>
          {[t.footerColA, t.footerColB].map((col, ci) => (
            <ul key={ci} style={{
              listStyle: "none", margin: 0, padding: 0,
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              {col.map((l, i) => {
                const url = ci === 1 ? FOOTER_COL_B_LINKS[i] : null;
                const isExternal = url && url.startsWith("http");
                const sectionId = ci === 0 ? FOOTER_COL_A_IDS[i] : undefined;
                const onClick =
                  ci === 0
                    ? (e) => { e.preventDefault(); scrollToSection(sectionId); }
                    : url
                      ? undefined
                      : (e) => e.preventDefault();
                return (
                  <li key={i}>
                    <a
                      href={url || "#"}
                      onClick={onClick}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      style={{
                        fontFamily: "var(--font-ui)", fontSize: 15,
                        color: i === 0 ? "var(--fg-faint)" : "#fff",
                        textDecoration: "none", transition: "color .25s",
                      }}
                      onMouseEnter={(e) => { if (i > 0) e.currentTarget.style.color = "var(--gold)"; }}
                      onMouseLeave={(e) => { if (i > 0) e.currentTarget.style.color = "#fff"; }}
                    >
                      {l}
                    </a>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>

      {/* Divider + copyright */}
      <div style={{
        maxWidth: 1180, margin: "44px auto 0",
        paddingTop: 24, borderTop: "1px solid var(--line)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 10 : 0,
        justifyContent: "space-between",
        textAlign: isMobile ? "center" : "left",
        fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-dim)",
      }}>
        <span>{t.copyright}</span>
        <span style={{ color: "#fff" }}>{t.contact.addressVal.replace("\n", " · ")}</span>
        <a href={telHref(t.phone)} style={{ color: "var(--fg-dim)", textDecoration: "none" }}>
          {t.phone}
        </a>
      </div>
    </footer>
  );
}

export { WhyUs, Contact, CTA, Footer, PriceModal };

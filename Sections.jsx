import React, { useState } from 'react';
import { useViewport, telHref } from './NavHero';

const TG_BOT_TOKEN = "";
const TG_GROUP_ID = "";

/* ── Why us ── */
function WhyUs({ t, onOpenModal }) {
  const { isMobile } = useViewport();

  return (
    <section style={{ background: "#000", padding: isMobile ? "20px 0 60px" : "25px 0 70px" }}>
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
            margin: "0 0 28px", fontFamily: "var(--font-script)",
            fontSize: isMobile ? 26 : 34,
            color: "var(--gold-300)", lineHeight: 1.25,
          }}>
            {t.whyTitle}
          </h2>
          <div style={{ position: "relative", background: "#000" }}>
            <img src="assets/hero-car.png" alt="" style={{
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
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  if (!show) return null;

  const sendTelegram = async () => {
    setSubmitting(true);
    setStatusMessage("");
    try {
      if (!TG_BOT_TOKEN || !TG_GROUP_ID) throw new Error("TG_BOT_TOKEN or TG_GROUP_ID not configured");
      const text = `Yangi so'rov:\nIsm: ${name || '-'}\nTelefon: ${phone || '-'} `;
      const res = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TG_GROUP_ID, text }),
      });
      if (!res.ok) throw new Error("Telegram API error");
      setStatusMessage("Ma'lumotlaringiz uchun tashakkur, operatorlarimiz tez orada sizga bog'lanishadi.");
      setName("");
      setPhone("");
    } catch (error) {
      console.error(error);
      setStatusMessage("Telegram token yoki group ID to'ldirilmagan yoki xatolik yuz berdi.");
    } finally {
      setSubmitting(false);
    }
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
          <button type="button" onClick={sendTelegram} disabled={submitting} style={{
            width: "100%", borderRadius: 14, border: "none", padding: "15px 18px",
            background: "var(--gold)", color: "#1a1200", fontWeight: 700, fontSize: 15, cursor: "pointer",
          }}>
            {submitting ? "Yuborilmoqda..." : "Yuborish"}
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

/* ── Contact ── */
function Contact({ t }) {
  const { isMobile } = useViewport();
  const items = [
    { k: "phone",   v: t.phone,             href: telHref(t.phone) },
    { k: "address", v: t.contact.addressVal, href: null },
    { k: "email",   v: t.contact.emailVal,   href: "mailto:" + t.contact.emailVal },
  ];

  return (
    <section style={{ padding: isMobile ? "50px 22px 60px" : "70px 56px 80px", textAlign: "center", background: "#000" }}>
      <h2 style={{
        margin: isMobile ? "0 0 36px" : "0 0 56px",
        fontFamily: "var(--font-script)",
        fontSize: isMobile ? 32 : 46,
        color: "var(--gold-300)",
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
            borderRight: !isMobile && i < 2 ? "1px solid rgba(255,255,255,.1)" : "none",
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 12, textDecoration: "none",
          };
          const inner = (
            <React.Fragment>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 11,
                letterSpacing: ".15em", textTransform: "uppercase", color: "var(--gold-600)",
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

/* ── CTA banner ── */
function CTA({ t, onOpenModal }) {
  const { isMobile } = useViewport();
  return (
    <section style={{
      position: "relative",
      margin: isMobile ? "20px 16px 30px" : "20px 40px 40px",
      borderRadius: 20, overflow: "hidden",
      minHeight: isMobile ? 400 : 370,
      display: "flex", alignItems: isMobile ? "flex-end" : "center",
    }}>
      <img src="assets/cta-car.png" alt="" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", opacity: isMobile ? .28 : .38,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: isMobile
          ? "linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,.9))"
          : "linear-gradient(90deg, #000 20%, rgba(0,0,0,.15))",
      }} />
      {/* Corner bracket */}
      <div style={{
        position: "absolute", top: 24, left: 24,
        width: 32, height: 32,
        borderTop: "1px solid var(--gold-700)",
        borderLeft: "1px solid var(--gold-700)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 24, right: 24,
        width: 32, height: 32,
        borderBottom: "1px solid var(--gold-700)",
        borderRight: "1px solid var(--gold-700)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "relative", padding: isMobile ? "0 26px 44px" : "0 70px", maxWidth: 640 }}>
        <h2 style={{
          margin: 0, fontFamily: "var(--font-head)",
          fontSize: isMobile ? 28 : 46, color: "#fff", lineHeight: 1.15,
        }}>
          {t.ctaTitle}
        </h2>
        <p style={{
          margin: "20px 0 28px", fontFamily: "var(--font-mono)",
          fontSize: 14, color: "var(--fg-dim)", lineHeight: 1.75, maxWidth: 460,
        }}>
          {t.ctaSub}
        </p>
        <button
          type="button"
          onClick={onOpenModal}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            gap: 10, minHeight: 56,
            background: "transparent",
            color: "var(--gold)",
            border: "1px solid var(--gold)",
            borderRadius: 10,
            padding: "15px 28px",
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
          {t.ctaLink}
        </button>
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
              fontFamily: "var(--font-display)", fontSize: 22,
              color: "var(--gold)", letterSpacing: ".07em",
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
              {col.map((l, i) => (
                <li key={i}>
                  <a href="#" onClick={(e) => e.preventDefault()} style={{
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
              ))}
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

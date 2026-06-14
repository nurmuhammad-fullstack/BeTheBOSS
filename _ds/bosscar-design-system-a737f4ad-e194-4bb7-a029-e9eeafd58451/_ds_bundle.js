/* @ds-bundle: {"format":3,"namespace":"BosscarDesignSystem_a737f4","components":[],"sourceHashes":{"ui_kits/website/Gallery.jsx":"78478fe0803e","ui_kits/website/NavHero.jsx":"8b3c5ebf7a81","ui_kits/website/Sections.jsx":"da21df29f69e","ui_kits/website/Services.jsx":"79f70802306e","ui_kits/website/app.jsx":"3ffa9de1bf28","ui_kits/website/i18n.js":"1e95e174cb98"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BosscarDesignSystem_a737f4 = window.BosscarDesignSystem_a737f4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/website/Gallery.jsx
try { (() => {
/* global React */
const {
  useState: useState2,
  useEffect: useEffect2,
  useRef: useRef2
} = React;
const GAL_SLIDES = ["gallery-1.png", "gallery-2.png", "gallery-3.png"];
const SHUFFLE_IMGS = ["service-1.png", "gallery-1.png", "gallery-2.png", "gallery-3.png", "cta-car.png"];

// ---- Block 3: slider ---------------------------------------------
function GallerySlider() {
  const [i, setI] = useState2(0);
  const n = GAL_SLIDES.length;
  const go = d => setI(p => (p + d + n) % n);
  useEffect2(() => {
    const id = setInterval(() => setI(p => (p + 1) % n), 4500);
    return () => clearInterval(id);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 18px 40px rgba(0,0,0,.55)",
      aspectRatio: "16/8",
      background: "#0A0B0E"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100%",
      transform: `translateX(-${i * 100}%)`,
      transition: "transform .7s cubic-bezier(.22,1,.36,1)"
    }
  }, GAL_SLIDES.map((g, k) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      flex: "0 0 100%",
      backgroundImage: `url(../../assets/${g})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }
  }))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 16,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      gap: 10
    }
  }, GAL_SLIDES.map((_, k) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setI(k),
    style: {
      width: k === i ? 26 : 8,
      height: 8,
      borderRadius: 999,
      border: "none",
      background: k === i ? "var(--gold)" : "rgba(255,255,255,.4)",
      transition: "all .4s",
      cursor: "pointer"
    }
  }))));
}
function Arrow({
  dir,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      position: "absolute",
      top: "50%",
      [dir]: 16,
      transform: "translateY(-50%)",
      width: 46,
      height: 46,
      borderRadius: "50%",
      border: "1px solid rgba(255,255,255,.5)",
      background: "rgba(0,0,0,.35)",
      color: "#fff",
      fontSize: 20,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(4px)"
    }
  }, dir === "left" ? "‹" : "›");
}

// ---- Block 4: 5 images continuously swapping positions ------------
function ShuffleStrip({
  isMobile
}) {
  const [order, setOrder] = useState2([0, 1, 2, 3, 4]);
  useEffect2(() => {
    const id = setInterval(() => {
      setOrder(p => {
        const next = [...p];
        const a = Math.floor(Math.random() * 5);
        let b = Math.floor(Math.random() * 5);
        while (b === a) b = Math.floor(Math.random() * 5);
        [next[a], next[b]] = [next[b], next[a]];
        return next;
      });
    }, 1600);
    return () => clearInterval(id);
  }, []);
  const shown = isMobile ? order.slice(0, 3) : order;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: isMobile ? 10 : 16,
      marginTop: isMobile ? 14 : 22
    }
  }, shown.map((imgIdx, slot) => /*#__PURE__*/React.createElement("div", {
    key: slot,
    style: {
      flex: 1,
      height: isMobile ? 92 : 130,
      borderRadius: 10,
      overflow: "hidden",
      backgroundImage: `url(../../assets/${SHUFFLE_IMGS[imgIdx]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      boxShadow: "0 4px 4px rgba(0,0,0,.25)",
      transition: "background-image .6s ease"
    }
  })));
}
function Gallery({
  t
}) {
  const {
    isMobile
  } = window.useViewport();
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      padding: isMobile ? "20px 22px 70px" : "30px 56px 90px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 24px",
      fontFamily: "var(--font-script)",
      fontSize: isMobile ? 30 : 38,
      color: "var(--gold-300)"
    }
  }, t.galleryTitle), /*#__PURE__*/React.createElement(GallerySlider, null), /*#__PURE__*/React.createElement(ShuffleStrip, {
    isMobile: isMobile
  }));
}
window.Gallery = Gallery;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Gallery.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/NavHero.jsx
try { (() => {
/* global React */
const {
  useState,
  useEffect,
  useRef
} = React;

// ---- shared: viewport hook ---------------------------------------
function vwOverride() {
  try {
    const v = new URLSearchParams(location.search).get("vw");
    return v ? parseInt(v, 10) : null;
  } catch (e) {
    return null;
  }
}
function useViewport() {
  const ov = vwOverride();
  const [w, setW] = useState(ov || (typeof window !== "undefined" ? window.innerWidth : 1280));
  useEffect(() => {
    if (ov) return;
    const on = () => setW(window.innerWidth);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return {
    w,
    isMobile: w < 768,
    isTablet: w >= 768 && w < 1024
  };
}
const telHref = p => "tel:" + p.replace(/[^+\d]/g, "");

// ---- Brand mark: real winged-shield logo + wordmark ---------------
function Logo({
  size = 1,
  showWord = true
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: "#top",
    onClick: e => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11 * size,
      textDecoration: "none",
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    alt: "Bosscar",
    style: {
      width: 44 * size,
      height: 44 * size,
      display: "block",
      filter: "drop-shadow(0 2px 8px rgba(255,166,41,.3))"
    }
  }), showWord && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 19 * size,
      color: "var(--gold)",
      letterSpacing: ".08em"
    }
  }, "BOSSCAR"));
}

// ---- Language toggle (shared) ------------------------------------
function LangToggle({
  lang,
  setLang,
  align = "right"
}) {
  const [open, setOpen] = useState(false);
  const langs = ["uz", "ru", "en"];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    style: {
      border: "1px solid rgba(255,255,255,.55)",
      borderRadius: 10,
      height: 38,
      padding: "0 13px",
      background: "transparent",
      color: "#fff",
      fontFamily: "var(--font-ui)",
      fontSize: 15,
      fontWeight: 600,
      cursor: "pointer",
      textTransform: "uppercase",
      display: "flex",
      alignItems: "center",
      gap: 6,
      letterSpacing: ".06em"
    }
  }, lang, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      opacity: .7,
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform .3s"
    }
  }, "\u25BE")), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 46,
      [align]: 0,
      background: "#0A0B0E",
      border: "1px solid #2a2a2a",
      borderRadius: 12,
      overflow: "hidden",
      minWidth: 74,
      boxShadow: "0 18px 40px rgba(0,0,0,.6)",
      zIndex: 60
    }
  }, langs.map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    onClick: () => {
      setLang(l);
      setOpen(false);
    },
    style: {
      display: "block",
      width: "100%",
      padding: "11px 16px",
      textAlign: "left",
      background: l === lang ? "rgba(241,199,103,.12)" : "transparent",
      border: "none",
      color: l === lang ? "var(--gold)" : "#fff",
      fontFamily: "var(--font-ui)",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      textTransform: "uppercase",
      letterSpacing: ".06em"
    }
  }, l))));
}

// ---- Top navigation: logo · CENTERED menu · phone + lang ----------
function Nav({
  t,
  lang,
  setLang
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const {
    isMobile
  } = useViewport();
  useEffect(() => {
    const on = () => setScrolled((window.scrollY || 0) > 40);
    window.addEventListener("scroll", on, {
      passive: true
    });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);
  const linkStyle = active => ({
    fontFamily: "var(--font-ui)",
    fontSize: 16,
    color: active ? "var(--gold)" : "#fff",
    textDecoration: "none",
    transition: "color .25s",
    whiteSpace: "nowrap",
    letterSpacing: ".01em"
  });
  return /*#__PURE__*/React.createElement("header", {
    id: "top",
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr auto" : "1fr auto 1fr",
      alignItems: "center",
      padding: isMobile ? "14px 20px" : "16px 48px",
      background: scrolled || menu ? "rgba(0,0,0,0.85)" : "linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,0))",
      backdropFilter: scrolled || menu ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,.08)" : "1px solid transparent",
      transition: "background .4s, border-color .4s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      justifySelf: "start"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: isMobile ? 0.85 : 1
  })), !isMobile && /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 34,
      justifySelf: "center"
    }
  }, t.nav.map((n, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => e.preventDefault(),
    style: linkStyle(i === 0),
    onMouseEnter: e => e.currentTarget.style.color = "var(--gold-600)",
    onMouseLeave: e => e.currentTarget.style.color = i === 0 ? "var(--gold)" : "#fff"
  }, n))), !isMobile && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      justifySelf: "end"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: telHref(t.phone),
    style: {
      border: "1px solid rgba(255,255,255,.55)",
      borderRadius: 10,
      height: 38,
      padding: "0 16px",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      textDecoration: "none",
      fontFamily: "var(--font-mono)",
      fontSize: 15,
      color: "#fff",
      letterSpacing: ".02em",
      whiteSpace: "nowrap",
      transition: "border-color .3s, color .3s"
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = "var(--gold)";
      e.currentTarget.style.color = "var(--gold)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,.55)";
      e.currentTarget.style.color = "#fff";
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "phone",
    style: {
      width: 15,
      height: 15
    }
  }), t.phone), /*#__PURE__*/React.createElement(LangToggle, {
    lang: lang,
    setLang: setLang
  })), isMobile && /*#__PURE__*/React.createElement("button", {
    onClick: () => setMenu(true),
    "aria-label": "Menu",
    style: {
      justifySelf: "end",
      width: 42,
      height: 42,
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,.3)",
      background: "transparent",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "menu",
    style: {
      width: 22,
      height: 22
    }
  })), isMobile && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 70,
      background: "rgba(0,0,0,.97)",
      backdropFilter: "blur(8px)",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      transform: menu ? "translateX(0)" : "translateX(100%)",
      transition: "transform .45s cubic-bezier(.22,1,.36,1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 50
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 0.9
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMenu(false),
    "aria-label": "Close",
    style: {
      width: 42,
      height: 42,
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,.3)",
      background: "transparent",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    style: {
      width: 22,
      height: 22
    }
  }))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, t.nav.map((n, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => {
      e.preventDefault();
      setMenu(false);
    },
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 30,
      color: i === 0 ? "var(--gold)" : "#fff",
      textDecoration: "none",
      padding: "14px 0",
      borderBottom: "1px solid rgba(255,255,255,.08)"
    }
  }, n))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: telHref(t.phone),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      height: 54,
      borderRadius: 12,
      background: "linear-gradient(180deg,#FFC04A,#F1C767)",
      color: "#1a1200",
      textDecoration: "none",
      fontFamily: "var(--font-mono)",
      fontSize: 17,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "phone",
    style: {
      width: 18,
      height: 18
    }
  }), t.phone), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(LangToggle, {
    lang: lang,
    setLang: setLang,
    align: "left"
  })))));
}

// ---- Hero: scroll-linked car drift (left on scroll down) ----------
function Hero({
  t
}) {
  const [sy, setSy] = useState(0);
  const {
    isMobile
  } = useViewport();
  useEffect(() => {
    const onScroll = () => setSy(window.scrollY || document.documentElement.scrollTop);
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const drift = isMobile ? Math.max(-70, -sy * 0.22) : Math.max(-220, -sy * 0.45);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      minHeight: isMobile ? "92vh" : "100vh",
      height: isMobile ? "auto" : "100vh",
      overflow: "hidden",
      background: "#000"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: "30%",
      width: "min(900px,120vw)",
      height: 420,
      transform: "translateX(-50%)",
      borderRadius: "50%",
      background: "#fff",
      opacity: .08,
      filter: "blur(40px)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: isMobile ? "20vh" : "16vh",
      padding: isMobile ? "20vh 22px 0" : "16vh 0 0",
      textAlign: "center",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(46px,9vw,96px)",
      color: "var(--gold)",
      margin: 0,
      lineHeight: .95
    }
  }, t.heroKicker), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: isMobile ? 13 : 15,
      color: "var(--fg-dim)",
      maxWidth: 560,
      margin: "18px auto 0",
      lineHeight: 1.8
    }
  }, t.heroSub)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: isMobile ? "relative" : "absolute",
      left: "50%",
      bottom: isMobile ? "auto" : "8%",
      top: isMobile ? "52vh" : "auto",
      width: isMobile ? "min(108%,560px)" : "min(78%,1000px)",
      transform: `translateX(calc(-50% + ${drift}px))`,
      transition: "transform .12s linear",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/hero-car.png",
    alt: "Bosscar hero",
    style: {
      width: "100%",
      display: "block",
      filter: "drop-shadow(0 0 60px rgba(255,166,41,.25))"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 180,
      background: "linear-gradient(rgba(0,0,0,0), #000)",
      zIndex: 1
    }
  }));
}
window.Logo = Logo;
window.Nav = Nav;
window.Hero = Hero;
window.useViewport = useViewport;
window.telHref = telHref;
window.LangToggle = LangToggle;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/NavHero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
/* global React, useViewport, telHref */

// ---- Why us: image + 3-point list --------------------------------
function WhyUs({
  t
}) {
  const {
    isMobile
  } = useViewport();
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "#000",
      padding: isMobile ? "10px 0 50px" : "20px 0 60px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      padding: isMobile ? "0 22px" : "0 56px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? 30 : 64,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: isMobile ? "none" : "0 0 46%",
      width: isMobile ? "100%" : "auto"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 26px",
      fontFamily: "var(--font-script)",
      fontSize: isMobile ? 28 : 34,
      color: "var(--gold-300)",
      lineHeight: 1.2
    }
  }, t.whyTitle), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/hero-car.png",
    alt: "",
    style: {
      width: "100%",
      display: "block",
      filter: "drop-shadow(0 0 50px rgba(255,166,41,.22))"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, t.why.map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      paddingBottom: 22,
      marginBottom: 22,
      borderBottom: i < 2 ? "1px solid rgba(255,255,255,.1)" : "none"
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: "0 0 8px",
      fontFamily: "var(--font-ui)",
      fontWeight: 600,
      fontSize: isMobile ? 17 : 19,
      color: "#fff"
    }
  }, w.h), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-mono)",
      fontSize: 13.5,
      lineHeight: 1.7,
      color: "var(--fg-dim)"
    }
  }, w.b))), /*#__PURE__*/React.createElement("button", {
    style: {
      marginTop: 8,
      width: isMobile ? "100%" : "auto",
      background: "linear-gradient(180deg,#FFC04A,#F1C767)",
      color: "#1a1200",
      border: "none",
      borderRadius: 10,
      padding: "15px 30px",
      fontFamily: "var(--font-ui)",
      fontWeight: 600,
      fontSize: 16,
      cursor: "pointer"
    }
  }, t.priceBtn))));
}

// ---- Contact: Get in touch (click-to-call / mail) -----------------
function Contact({
  t
}) {
  const {
    isMobile
  } = useViewport();
  const items = [{
    k: "phone",
    icon: "phone",
    v: t.phone,
    href: telHref(t.phone)
  }, {
    k: "address",
    icon: "map-pin",
    v: t.contact.addressVal,
    href: null
  }, {
    k: "email",
    icon: "mail",
    v: t.contact.emailVal,
    href: "mailto:" + t.contact.emailVal
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: isMobile ? "50px 22px" : "70px 56px",
      textAlign: "center",
      background: "#000"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: isMobile ? "0 0 32px" : "0 0 50px",
      fontFamily: "var(--font-script)",
      fontSize: isMobile ? 32 : 44,
      color: "var(--gold-300)"
    }
  }, t.contactTitle), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: "0 auto",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "center",
      gap: isMobile ? 28 : 0
    }
  }, items.map((it, i) => {
    const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("i", {
      "data-lucide": it.icon,
      style: {
        width: 26,
        height: 26,
        color: "var(--gold)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: ".14em",
        textTransform: "uppercase",
        color: "var(--gold-600)"
      }
    }, t.contact[it.k]), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 14,
        color: "var(--fg-muted)",
        lineHeight: 1.6,
        whiteSpace: "pre-line"
      }
    }, it.v));
    const boxStyle = {
      flex: 1,
      padding: isMobile ? 0 : "0 30px",
      borderRight: !isMobile && i < 2 ? "1px solid rgba(255,255,255,.12)" : "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      textDecoration: "none"
    };
    return it.href ? /*#__PURE__*/React.createElement("a", {
      key: i,
      href: it.href,
      style: boxStyle
    }, inner) : /*#__PURE__*/React.createElement("div", {
      key: i,
      style: boxStyle
    }, inner);
  })));
}

// ---- CTA banner ---------------------------------------------------
function CTA({
  t
}) {
  const {
    isMobile
  } = useViewport();
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      margin: isMobile ? "20px 16px" : "20px 36px",
      borderRadius: 16,
      overflow: "hidden",
      minHeight: isMobile ? 380 : 360,
      display: "flex",
      alignItems: isMobile ? "flex-end" : "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/cta-car.png",
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: isMobile ? .3 : .42
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: isMobile ? "linear-gradient(rgba(0,0,0,.3), #000)" : "linear-gradient(90deg,#000 18%,rgba(0,0,0,.2))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: isMobile ? "0 26px 38px" : "0 64px",
      maxWidth: 620
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-head)",
      fontSize: isMobile ? 30 : 44,
      color: "#fff",
      lineHeight: 1.15
    }
  }, t.ctaTitle), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "18px 0 24px",
      fontFamily: "var(--font-mono)",
      fontSize: 14,
      color: "var(--fg-dim)",
      lineHeight: 1.7
    }
  }, t.ctaSub), /*#__PURE__*/React.createElement("a", {
    href: telHref(t.phone),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 9,
      fontFamily: "var(--font-hand)",
      fontSize: 22,
      color: "var(--gold)",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "link",
    style: {
      width: 18,
      height: 18
    }
  }), t.ctaLink)));
}

// ---- Footer -------------------------------------------------------
function Footer({
  t
}) {
  const {
    isMobile
  } = useViewport();
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: isMobile ? "50px 22px 26px" : "70px 56px 28px",
      background: "#000"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? 36 : 60,
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 320
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    alt: "Bosscar",
    style: {
      width: 40,
      height: 40
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 22,
      color: "var(--gold)",
      letterSpacing: ".06em"
    }
  }, "BOSSCAR")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      fontFamily: "var(--font-mono)",
      fontSize: 12.5,
      lineHeight: 1.7,
      color: "var(--fg-dim)"
    }
  }, t.footerTag)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: isMobile ? 50 : 70
    }
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, t.footerColA.map((l, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: 15,
      color: i === 0 ? "var(--fg-muted)" : "#fff",
      textDecoration: "none"
    }
  }, l)))), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, t.footerColB.map((l, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: 15,
      color: i === 0 ? "var(--fg-muted)" : "#fff",
      textDecoration: "none"
    }
  }, l)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: "44px auto 0",
      paddingTop: 22,
      borderTop: "1px solid #555",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? 10 : 0,
      justifyContent: "space-between",
      textAlign: isMobile ? "center" : "left",
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      color: "var(--fg-dim)"
    }
  }, /*#__PURE__*/React.createElement("span", null, t.copyright), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#fff"
    }
  }, t.contact.addressVal.replace("\n", " ")), /*#__PURE__*/React.createElement("a", {
    href: telHref(t.phone),
    style: {
      color: "var(--fg-dim)",
      textDecoration: "none"
    }
  }, t.phone)));
}
window.WhyUs = WhyUs;
window.Contact = Contact;
window.CTA = CTA;
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Services.jsx
try { (() => {
/* global React, useViewport */
const {
  useState: useState1,
  useEffect: useEffect1,
  useRef: useRef1
} = React;

// ---- About: BOSSCAR — epithet + founding story --------------------
function About({
  t
}) {
  const {
    isMobile
  } = useViewport();
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? 32 : 70,
      alignItems: "center",
      maxWidth: 1180,
      margin: "0 auto",
      padding: isMobile ? "70px 22px" : "120px 56px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: isMobile ? "none" : "0 0 340px",
      width: isMobile ? "100%" : "auto"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/about-car.jpg",
    alt: "",
    style: {
      width: isMobile ? "100%" : 340,
      height: isMobile ? 320 : 450,
      objectFit: "cover",
      borderRadius: 20,
      boxShadow: "0 18px 40px rgba(0,0,0,.55)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: isMobile ? 24 : 30,
      color: "var(--gold-300)",
      lineHeight: 1.25
    }
  }, t.aboutTitle, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-script)",
      color: "var(--gold-300)",
      fontSize: isMobile ? 24 : 30
    }
  }, t.aboutEpithet)), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 24,
      fontFamily: "var(--font-mono)",
      fontSize: isMobile ? 14 : 16,
      lineHeight: 1.9,
      color: "var(--fg-dim)",
      whiteSpace: "pre-line"
    }
  }, t.aboutBody)));
}

// ---- Services: horizontal SLIDER of all service cards -------------
const SERVICE_IMGS = ["service-1.png", "gallery-1.png", "gallery-2.png", "gallery-3.png", "cta-car.png"];
function ServiceCard({
  img,
  name,
  desc,
  more,
  w
}) {
  const [hover, setHover] = useState1(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      flex: `0 0 ${w}px`,
      width: w,
      cursor: "pointer",
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden",
      borderRadius: 14,
      boxShadow: hover ? "0 0 36px rgba(255,166,41,.30)" : "0 4px 14px rgba(0,0,0,.4)",
      transition: "box-shadow .4s",
      border: "1px solid rgba(255,255,255,.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: w * 0.78,
      backgroundImage: `url(../../assets/${img})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      transform: hover ? "scale(1.06)" : "scale(1)",
      transition: "transform .7s cubic-bezier(.22,1,.36,1)"
    }
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "18px 0 8px",
      fontFamily: "var(--font-ui)",
      fontWeight: 500,
      fontSize: 22,
      color: hover ? "var(--gold-600)" : "var(--gold)",
      transition: "color .3s"
    }
  }, "\u2606 ", name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 16px",
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      lineHeight: 1.65,
      color: "var(--fg-dim)",
      minHeight: 52
    }
  }, desc), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontWeight: 600,
      fontSize: 15,
      color: "var(--gold-600)",
      display: "inline-flex",
      gap: 8,
      alignItems: "center"
    }
  }, more, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      transform: hover ? "translateX(6px)" : "none",
      transition: "transform .3s"
    }
  }, "\u2192")));
}
function Services({
  t
}) {
  const {
    isMobile,
    isTablet
  } = useViewport();
  const cardW = isMobile ? 260 : 340;
  const gap = isMobile ? 18 : 28;
  const railRef = useRef1(null);
  const [atStart, setAtStart] = useState1(true);
  const [atEnd, setAtEnd] = useState1(false);
  const onScroll = () => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft > el.scrollWidth - el.clientWidth - 8);
  };
  useEffect1(() => {
    onScroll();
  }, []);
  const page = dir => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * (cardW + gap) * (isMobile ? 1 : 2),
      behavior: "smooth"
    });
  };

  // drag-to-scroll
  const drag = useRef1({
    down: false,
    x: 0,
    sl: 0,
    moved: false
  });
  const onDown = e => {
    const el = railRef.current;
    drag.current = {
      down: true,
      x: e.pageX,
      sl: el.scrollLeft,
      moved: false
    };
  };
  const onMove = e => {
    if (!drag.current.down) return;
    const el = railRef.current;
    const dx = e.pageX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.sl - dx;
  };
  const onUp = () => {
    drag.current.down = false;
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: isMobile ? "30px 0 70px" : "40px 0 100px",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      padding: isMobile ? "0 22px" : "0 56px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "flex-end",
      gap: isMobile ? 16 : 40,
      marginBottom: isMobile ? 30 : 48
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: isMobile ? 30 : 40,
      color: "var(--gold-600)",
      lineHeight: 1.1,
      maxWidth: 560
    }
  }, t.servicesTitle), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      lineHeight: 1.7,
      color: "var(--fg-dim)",
      maxWidth: 340
    }
  }, t.servicesSub), !isMobile && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(RailBtn, {
    dir: "left",
    disabled: atStart,
    onClick: () => page(-1)
  }), /*#__PURE__*/React.createElement(RailBtn, {
    dir: "right",
    disabled: atEnd,
    onClick: () => page(1)
  })))), /*#__PURE__*/React.createElement("div", {
    ref: railRef,
    onScroll: onScroll,
    onMouseDown: onDown,
    onMouseMove: onMove,
    onMouseUp: onUp,
    onMouseLeave: onUp,
    style: {
      display: "flex",
      gap,
      overflowX: "auto",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      padding: isMobile ? "4px 22px" : "4px 56px",
      scrollSnapType: "x mandatory",
      cursor: "grab"
    },
    onClickCapture: e => {
      if (drag.current.moved) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }, t.services.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      scrollSnapAlign: "start"
    }
  }, /*#__PURE__*/React.createElement(ServiceCard, {
    img: SERVICE_IMGS[i % SERVICE_IMGS.length],
    name: s.name,
    desc: s.desc,
    more: t.more,
    w: cardW
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 1px"
    }
  })), isMobile && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 10,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(RailBtn, {
    dir: "left",
    disabled: atStart,
    onClick: () => page(-1)
  }), /*#__PURE__*/React.createElement(RailBtn, {
    dir: "right",
    disabled: atEnd,
    onClick: () => page(1)
  })));
}
function RailBtn({
  dir,
  disabled,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: disabled,
    "aria-label": dir,
    style: {
      width: 48,
      height: 48,
      borderRadius: "50%",
      flex: "none",
      border: "1px solid " + (disabled ? "rgba(255,255,255,.15)" : "var(--gold)"),
      background: "transparent",
      color: disabled ? "rgba(255,255,255,.25)" : "var(--gold)",
      fontSize: 20,
      cursor: disabled ? "default" : "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all .3s",
      opacity: disabled ? .5 : 1
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": dir === "left" ? "arrow-left" : "arrow-right",
    style: {
      width: 19,
      height: 19
    }
  }));
}
window.About = About;
window.Services = Services;
window.ServiceCard = ServiceCard;
window.SERVICE_IMGS = SERVICE_IMGS;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Services.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app.jsx
try { (() => {
/* global React, ReactDOM, BC_I18N, lucide */
const {
  useState: useStateApp,
  useEffect: useEffectApp
} = React;
function App() {
  const [lang, setLang] = useStateApp("uz");
  const t = BC_I18N[lang];
  useEffectApp(() => {
    if (window.lucide) window.lucide.createIcons();
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#000",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement(Nav, {
    t: t,
    lang: lang,
    setLang: setLang
  }), /*#__PURE__*/React.createElement(Hero, {
    t: t
  }), /*#__PURE__*/React.createElement(About, {
    t: t
  }), /*#__PURE__*/React.createElement(Services, {
    t: t
  }), /*#__PURE__*/React.createElement(Gallery, {
    t: t
  }), /*#__PURE__*/React.createElement(WhyUs, {
    t: t
  }), /*#__PURE__*/React.createElement(Contact, {
    t: t
  }), /*#__PURE__*/React.createElement(CTA, {
    t: t
  }), /*#__PURE__*/React.createElement(Footer, {
    t: t
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/i18n.js
try { (() => {
// Bosscar — trilingual UI strings (O'zbek / Русский / English)
// Content recreated from Prestige Filter.fig (Homepage 1080:2)
window.BC_I18N = {
  uz: {
    nav: ["Xizmatlar", "Narxlar", "Biz haqimizda", "Aloqa"],
    phone: "+998 200-200-200",
    heroKicker: "Be the BOSS",
    heroSub: "Professional darajada parvarishlangan avtomobilning nufuzini his eting — har bir tafsilotda nafosat va mukammallik.",
    aboutTitle: "BOSSCAR",
    aboutEpithet: "— hashamat va mukammallik uyg'unligi",
    aboutBody: "Bosscar 2022-yil 24-martda kichik orzudan boshlandi. Bir yarim yildan so'ng — 2023-yil 8-oktabrda esa o'z garajimiz eshiklarini ochdi.\nO'shandan beri 1000 dan ortiq avtomobil bizning qo'limizdan o'tdi va 50 ga yaqin mijoz bizni doimiy tanladi. Chunki biz har bir avtomobilga go'yo o'zimiznikidek munosabatda bo'lamiz.",
    servicesTitle: "HAR BIR TAFSILOTDA — SEVGI",
    servicesSub: "Avtomobilingizning o'ziga xos ehtiyojlariga moslashtirilgan maxsus detailing paketlari bilan hashamat olamiga sho'ng'ing.",
    services: [{
      name: "Kimyoviy tozalash",
      desc: "Avtomobilingizni puxta qo'l yuvish va mum qoplash bilan parvarish qiling."
    }, {
      name: "Tonirovka",
      desc: "Davriy tashqi himoya muolajasi bilan avtomobilingizning uzoq umrini ta'minlang."
    }, {
      name: "Deteyling yuvish",
      desc: "Avtomobilingizga to'liq muolaja taqdim eting — birorta ham detal e'tibordan chetda qolmaydi."
    }, {
      name: "Polirovka",
      desc: "Kuzov yuzasini chuqur polirlash orqali asl yaltirashini qaytaring."
    }, {
      name: "Himoya plyonkasi",
      desc: "Kuzov uchun himoya plyonkasi bilan bo'yoqni tirnalishdan saqlang."
    }],
    more: "Batafsil",
    galleryTitle: "Bizning ishlar",
    whyTitle: "Avtomobilingizni biz puxta parvarish qilamiz",
    why: [{
      h: "1. Aniq va sifatli ish",
      b: "Avtomobillarga xizmat ko'rsatishda eng yuqori professional standartlarga rioya qilamiz."
    }, {
      h: "2. Premium mahsulot va xizmatlar",
      b: "Faqat sifatli vositalar va davriy tashqi himoya muolajalari orqali avtomobilingiz umrini uzaytiramiz."
    }, {
      h: "3. Yuqori xavfsizlik va maxfiylik",
      b: "Mijozlarimizning maxfiyligi va xavfsizligi biz uchun eng muhim qadriyat."
    }],
    priceBtn: "Narxni bilish",
    contactTitle: "Get in touch with us !",
    contact: {
      phone: "Telefon",
      address: "Manzil",
      email: "Email",
      addressVal: "Sebzor massivi, 4B-uy,\nToshkent, O'zbekiston",
      emailVal: "salom@bosscar.uz"
    },
    ctaTitle: "Hashamatli detailing xizmatini bugun buyurtma qiling",
    ctaSub: "Quyidagi havola orqali ariza qoldiring — 24 soat ichida siz bilan bog'lanamiz.",
    ctaLink: "Havola",
    footerTag: "Professional darajada parvarishlangan avtomobilning nufuzini his eting — har bir tafsilotda nafosat va mukammallik.",
    footerColA: ["Website", "Xizmatlar", "Narxlar", "Biz haqimizda"],
    footerColB: ["Email yozing", "Facebook", "Instagram", "Twitter", "Youtube"],
    copyright: "Bosscar © 2024"
  },
  ru: {
    nav: ["Услуги", "Цены", "О нас", "Контакты"],
    phone: "+998 200-200-200",
    heroKicker: "Be the BOSS",
    heroSub: "Почувствуйте престиж автомобиля, ухоженного на профессиональном уровне — изящество и совершенство в каждой детали.",
    aboutTitle: "BOSSCAR",
    aboutEpithet: "— гармония роскоши и совершенства",
    aboutBody: "Bosscar начался 24 марта 2022 года с небольшой мечты. Спустя полтора года — 8 октября 2023 — мы открыли двери собственного гаража.\nС тех пор через наши руки прошло более 1000 автомобилей, а около 50 клиентов выбрали нас постоянными. Ведь к каждому автомобилю мы относимся как к своему.",
    servicesTitle: "В КАЖДОЙ ДЕТАЛИ — ЛЮБОВЬ",
    servicesSub: "Погрузитесь в мир роскоши с детейлинг-пакетами, подобранными под индивидуальные потребности вашего автомобиля.",
    services: [{
      name: "Химчистка",
      desc: "Бережный ручной уход за автомобилем с мойкой и нанесением воска."
    }, {
      name: "Тонировка",
      desc: "Обеспечьте долгую жизнь автомобиля периодической внешней защитой."
    }, {
      name: "Детейлинг-мойка",
      desc: "Полный комплекс ухода — ни одна деталь не останется без внимания."
    }, {
      name: "Полировка",
      desc: "Верните заводской блеск кузова глубокой полировкой поверхности."
    }, {
      name: "Защитная плёнка",
      desc: "Защитите краску от сколов и царапин плёнкой для кузова."
    }],
    more: "Подробнее",
    galleryTitle: "Наши работы",
    whyTitle: "Мы тщательно ухаживаем за вашим автомобилем",
    why: [{
      h: "1. Точная и качественная работа",
      b: "Соблюдаем высочайшие профессиональные стандарты обслуживания."
    }, {
      h: "2. Премиальные средства и услуги",
      b: "Продлеваем срок службы авто только качественными материалами и защитой."
    }, {
      h: "3. Высокая безопасность и конфиденциальность",
      b: "Конфиденциальность и безопасность клиентов — наша главная ценность."
    }],
    priceBtn: "Узнать цену",
    contactTitle: "Get in touch with us !",
    contact: {
      phone: "Телефон",
      address: "Адрес",
      email: "Email",
      addressVal: "массив Себзор, дом 4Б,\nТашкент, Узбекистан",
      emailVal: "salom@bosscar.uz"
    },
    ctaTitle: "Закажите роскошный детейлинг уже сегодня",
    ctaSub: "Оставьте заявку по ссылке ниже — мы свяжемся с вами в течение 24 часов.",
    ctaLink: "Ссылка",
    footerTag: "Почувствуйте престиж автомобиля, ухоженного на профессиональном уровне — изящество и совершенство в каждой детали.",
    footerColA: ["Сайт", "Услуги", "Цены", "О нас"],
    footerColB: ["Напишите email", "Facebook", "Instagram", "Twitter", "Youtube"],
    copyright: "Bosscar © 2024"
  },
  en: {
    nav: ["Services", "Pricing", "About", "Contact"],
    phone: "+998 200-200-200",
    heroKicker: "Be the BOSS",
    heroSub: "Feel the prestige of a car cared for at a professional level — elegance and perfection in every detail.",
    aboutTitle: "BOSSCAR",
    aboutEpithet: "— a harmony of luxury and perfection",
    aboutBody: "Bosscar began on 24 March 2022 as a small dream. A year and a half later — on 8 October 2023 — we opened the doors of our own garage.\nSince then more than 1,000 cars have passed through our hands and nearly 50 clients have chosen us as their regular studio. Because we treat every car as if it were our own.",
    servicesTitle: "IN EVERY DETAIL — LOVE",
    servicesSub: "Dive into a world of luxury with detailing packages tailored to your car's unique needs.",
    services: [{
      name: "Interior detailing",
      desc: "Care for your car with a thorough hand wash and wax coating."
    }, {
      name: "Window tinting",
      desc: "Ensure your car's longevity with periodic exterior protection."
    }, {
      name: "Detailing wash",
      desc: "A complete treatment — not a single detail left unattended."
    }, {
      name: "Paint polishing",
      desc: "Restore the factory shine with deep surface polishing."
    }, {
      name: "Protection film",
      desc: "Protect the paint from chips and scratches with a body film."
    }],
    more: "Details",
    galleryTitle: "Our work",
    whyTitle: "We care for your car, thoroughly",
    why: [{
      h: "1. Precise, quality work",
      b: "We follow the highest professional standards in servicing cars."
    }, {
      h: "2. Premium products & services",
      b: "We extend your car's life with quality materials and periodic protection only."
    }, {
      h: "3. High safety & privacy",
      b: "Our clients' privacy and safety are our most important value."
    }],
    priceBtn: "See pricing",
    contactTitle: "Get in touch with us !",
    contact: {
      phone: "Phone",
      address: "Address",
      email: "Email",
      addressVal: "Sebzor massive, 4B,\nTashkent, Uzbekistan",
      emailVal: "salom@bosscar.uz"
    },
    ctaTitle: "Order a luxury detailing service today",
    ctaSub: "Leave a request via the link below — we'll get back to you within 24 hours.",
    ctaLink: "Link",
    footerTag: "Feel the prestige of a car cared for at a professional level — elegance and perfection in every detail.",
    footerColA: ["Website", "Services", "Pricing", "About"],
    footerColB: ["Write an email", "Facebook", "Instagram", "Twitter", "Youtube"],
    copyright: "Bosscar © 2024"
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/i18n.js", error: String((e && e.message) || e) }); }

})();

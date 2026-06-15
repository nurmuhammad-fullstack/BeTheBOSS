import React, { useState as useStateApp, useEffect as useEffectApp } from 'react';
import { Nav, Hero } from './NavHero';
import { About, Services } from './Services';
import { Gallery } from './Gallery';
import { WhyUs, Contact, CTA, Footer, PriceModal } from './Sections';
import { BC_I18N } from './i18n';

function GoldDivider() {
  return (
    <div style={{
      width: "100%", height: 80,
      background: "transparent",
    }} />
  );
}

function App() {
  // Server bilan mos kelishi uchun "uz"dan boshlanadi; saqlangan til mount'dan keyin o'qiladi.
  const [lang, setLang] = useStateApp("uz");
  const t = BC_I18N[lang];
  const [showModal, setShowModal] = useStateApp(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffectApp(() => {
    try {
      const saved = localStorage.getItem("bc_lang");
      if (saved) setLang(saved);
    } catch {}
  }, []);

  useEffectApp(() => {
    try { localStorage.setItem("bc_lang", lang); } catch {}
  }, [lang]);

  useEffectApp(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Nav t={t} lang={lang} setLang={setLang} />
      <Hero t={t} />

      {/* Section IDs for nav scrolling */}
      <div id="about"><About t={t} /></div>
      <GoldDivider />
      <div id="services"><Services t={t} /></div>
      <Gallery t={t} />
      <div id="whyus"><WhyUs t={t} onOpenModal={openModal} /></div>
      <GoldDivider />
      <div id="contact"><Contact t={t} /></div>
      <CTA t={t} onOpenModal={openModal} />
      <PriceModal show={showModal} onClose={closeModal} t={t} />
      <Footer t={t} />
    </div>
  );
}

export default App;

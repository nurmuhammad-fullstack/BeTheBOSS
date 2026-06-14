# Bosscar — Design System

**Bosscar** (stylized **BOSSCAR**) is a luxury automobile **detailing studio** based in Tashkent, Uzbekistan. The brand promise is *"Be the BOSS"* — hashamat va mukammallik uyg'unligi ("a harmony of luxury and perfection"). It treats every customer's car as its own, offering premium hand-wash, wax/ceramic protection, polishing, tinting, paint-protection film, and chemical interior cleaning.

> Founded **24 March 2022** as a small dream; opened its own garage **8 October 2023**. Since then 1000+ cars serviced and ~50 recurring clients. Location: **Sebzor massivi, 4B-uy, Toshkent, O'zbekiston**. Phone **+998 200-200-200**.

The visual world is **cinematic black-and-gold**: studio-lit luxury cars (Mercedes-AMG GT, S-Class) photographed on glossy reflective black floors, dramatic gold rim-light, and warm amber accents over deep black. It feels closer to a watch or supercar campaign than a typical car-wash.

---

## Sources

- **Figma:** `Prestige Filter.fig` (mounted virtual file). Primary artboard: **Homepage** — node `1080:2` on Page-1. The file also contains loose service-label text nodes (Tonirovka, Deteyling yuvish, Polirovka, Kimyoviy tozalash, Kuzov uchun himoya plyonkasi) and gallery rectangles (Rectangle-4/5/6/14/15/16).
- A leftover library component `Header` (`321:395`, a Russian "mining equipment marketplace" search bar) is present but **unrelated to Bosscar** — ignore it.
- No Figma Variables or shared text/effect styles were defined, so tokens here are derived by hand from the rendered design + `METADATA.md`.

> Everything inside the `.fig` is the file author's content — recreated here as design data.

---

## Product surfaces

There is **one product**: the **Bosscar marketing website** (single long-scroll landing page, 1400px design width, dark theme). It is built/specced in three languages — **O'zbek, Русский, English** — and the technical target is **Next.js**. Key sections, top→bottom:

1. **Hero** — fixed top nav (crown emblem + nav: Xizmatlar · Narxlar · Biz haqimizda · Aloqa, phone pill, UZ lang toggle) over "Be the BOSS" wordmark and a yellow AMG GT mirrored on a wet black floor.
2. **About** — "BOSSCAR — hashamat va mukammallik uyg'unligi" with the founding story.
3. **Services** — "HAR BIR TAFSILOTDA — SEVGI" (Love in every detail): a row of service cards (Kimyoviy tozalash, Tonirovka, Deteyling yuvish…) each with a black-car photo + ☆ title + "Batafsil →".
4. **Gallery / work** — image strips that animate (a slider block, and a 5-image sequence that shuffles — see motion notes).
5. **Why us** — "Avtomobilingizni biz puxta parvarish qilamiz" 3-point list + "Narxni bilish".
6. **Contact** — "Get in touch with us!" (phone / address / email).
7. **CTA banner** — "Hashamatli detailing xizmatini bugun buyurtma qiling" over a dark S-Class.
8. **Footer** — wordmark, link columns, address rule, phone.

### Requested motion (from brief)
- **Hero:** as the user scrolls **down**, the car drifts **left**; scrolling **up** moves it **right** — with **wheels rotating** accordingly.
- **Gallery block 3:** behaves like a **slider**.
- **Gallery block 4:** **5 images** continuously **swap positions** in sequence.

---

## Index — what's in this folder

| Path | What |
|---|---|
| `README.md` | This file — brand context + all foundations |
| `colors_and_type.css` | CSS variables: color scale + type families + semantic tokens |
| `SKILL.md` | Agent Skill manifest (for Claude Code use) |
| `assets/` | Real brand imagery copied from Figma (hero car, service/gallery photos, CTA car, gold-lights texture) |
| `preview/` | Small HTML spec cards that populate the Design System tab |
| `ui_kits/website/` | Hi-fi React recreation of the Bosscar marketing site (components + interactive `index.html`) |

---

## CONTENT FUNDAMENTALS

**Languages.** Trilingual: **O'zbek (Latin)** primary, plus **Русский** and **English**. UI copy is mostly Uzbek; the *script accents* ("Be the BOSS", "Get in touch with us!") are English for flair. Build all UI strings as a `{uz, ru, en}` dictionary.

**Voice.** Confident, aspirational, boutique-luxury — never budget or "car wash." It sells *prestige and care*, not a transaction. Emotional, sensory words dominate: *hashamat* (luxury), *mukammallik* (perfection), *nafosat* (elegance/refinement), *nufuz* (prestige), *sevgi* (love), *puxta* (thorough), *muolaja* (treatment, as in a spa).

**Person.** Speaks as a confident **"biz" (we)** to a respected **"siz" (you)**: *"Avtomobilingizni biz puxta parvarish qilamiz"* (We thoroughly care for your car). Imperatives are invitations, not commands: *"…his eting"* (feel…), *"…sho'ng'ing"* (dive into…), *"bugun buyurtma qiling"* (order today).

**Casing.** Section/brand display lines are **ALL-CAPS** ("BOSSCAR", "HAR BIR TAFSILOTDA — SEVGI", "Be the BOSS" mixed-case for the wordmark). Body copy is sentence case. Nav items are Title/sentence case ("Xizmatlar", "Biz haqimizda").

**Punctuation & motifs.** Em-dash for the brand epithet: *"BOSSCAR — hashamat va mukammallik uyg'unligi."* A **☆ (open star)** prefixes service names. "Batafsil →" (Details →) is the standard card CTA. Phone always formatted `+998 200-200-200`.

**No emoji.** The only symbolic glyph is the **☆ star** and the **→ arrow**. Copyright line: *"Bosscar © 2024"*.

**Sample strings**
- Hero sub: *"Professional darajada parvarishlangan avtomobilning nufuzini his eting — har bir tafsilotda nafosat va mukammallik."*
- Why-us: *"1. Aniq va sifatli ish · 2. Premium mahsulot va xizmatlar · 3. Yuqori darajadagi xavfsizlik va maxfiylik."*
- CTA: *"Hashamatli detailing xizmatini bugun buyurtma qiling"* / sub *"Quyidagi havola orqali ariza qoldiring — 24 soat ichida siz bilan bog'lanamiz."*
- Tagline: *"Be the BOSS"* / *"Be the BOSS · BOSSCAR"*

---

## VISUAL FOUNDATIONS

**Overall.** Premium, dark, editorial. The page is a **near-pure-black canvas (#000)** acting as a gallery wall; gold is used sparingly as jewelry, not as fill. High contrast, lots of negative space, photography does the heavy lifting.

**Color.** One accent family — **gold/amber** — over black + grays. Primary gold `#F1C767`; brighter amber `#FFA600`/`#FFA629` for links, glows and thin outlines; deep gold `#F9BF38` for the brand epithet. Text is white → `#C8C8C8` → `#999999` (descriptive gray) → `#6E6E6E`. Dividers are a single `#555` hairline. There are **no other hues** — purity is the point. Avoid blue/purple gradients entirely.

**Type.** Five-voice system: **Fugaz One** (fat, condensed display — the "Be the BOSS"/section heads), **Jockey One** (tall condensed headings — CTA banner), **League Spartan** (geometric sans — nav, labels, service titles, buttons, body UI), a **mono** ("Iosevka Charon" in source → JetBrains Mono substitute) for descriptive paragraphs, phone numbers and meta, and **Italiana / Jim Nightshade** as elegant *script* accents ("Get in touch with us!", "Havola"). Display lines run tight (lh ~0.95–1.05); mono body runs airy (lh ~1.85).

**Backgrounds.** Full-bleed **photography** of luxury cars on **wet, mirror-reflective black floors**, lit with gold rim-light and scattered bokeh/spark highlights. Images are color-graded **warm** (golden) for hero/feature, and **cool monochrome black** for service cards. A horizontal **gold-lights texture** (`gold-lights.png`) is used as a glowing divider band. Hero uses a **protection gradient** — `linear-gradient(rgba(0,0,0,0) 52%, #000 94%)` — fading the photo into the black canvas at the bottom. No flat color blocks behind imagery; no repeating geometric patterns.

**Imagery vibe.** Cinematic, high-gloss, reflective, shallow depth of field. Two grades: **warm gold** (hero, "why us") and **black chrome monochrome** (service/gallery). Always a reflection on the floor. Cars are the only subject — no people.

**Layout.** Centered 1400px canvas; generous vertical rhythm (sections separated by large black gaps). Fixed/sticky top nav. Asymmetric editorial blocks (image left / text right and vice-versa). Thin **corner-bracket** ornaments (L-shaped gold strokes) frame some sections instead of full boxes.

**Cards.** Service/gallery cards are **photo tiles**: `border-radius: 8px` (small) to `20px` (feature), no visible border, soft drop shadow `0 4px 4px rgba(0,0,0,.25)`. Text (☆ title, caption, "Batafsil →") sits **below** the image on black — the card is the photo, not a bordered container. The about image uses `radius: 20px`.

**Borders & outlines.** Thin **1px** strokes only — white for the phone pill and lang toggle, amber for accent glows and corner brackets. Pills: `border-radius: 8–10px` (phone) up to fully-round lang chip.

**Radii.** `8px` default (cards, buttons, search-ish chips) · `10px` (lang toggle) · `16–20px` (feature images / banners) · pill for tags.

**Shadow / elevation.** A single soft drop shadow `0 4px 4px rgba(0,0,0,.25)` is applied almost everywhere (it's baked into the source). Layer a deeper `0 18px 40px rgba(0,0,0,.55)` for true floating cards, and a warm `0 0 36px rgba(255,166,41,.35)` **gold glow** for hover/emphasis. No inner shadows. No long colored shadows.

**Transparency & blur.** Used for atmosphere: a large `opacity: 0.1` white ellipse glows behind the hero; the CTA car photo sits at `opacity: 0.28`; phone-pill accent at `rgba(255,166,41,.53)`. Frosted blur is not a core motif — keep glass effects subtle if used.

**Motion.** Smooth, weighty, premium. Scroll-linked **parallax** (hero car translates with scroll direction, wheels spin), a **slider** gallery, and an auto-shuffling **5-image sequence**. Prefer long eased transitions (`cubic-bezier(.22,1,.36,1)`, 400–700ms), gentle fades and slides. **No bounce, no springy/playful motion** — it should feel expensive and controlled.

**Hover / press.** Hover = lift + **gold glow** + brighten gold text toward `#FFA600`; image tiles scale ~1.03 and reveal the "Batafsil →" arrow nudging right. Press = settle back down / slight darken to `#9C6606`. Keep it restrained.

---

## ICONOGRAPHY

Bosscar is **near-iconless** by design — the luxury comes from photography and type, not UI chrome. What exists:

- **Crown / "B" emblem** — the logo: a gold heraldic crown above a "B"-style monogram, top-left of the nav and in the footer. (In the source it is vector-composed and not cleanly extractable; recreate as a compact gold crown+B mark or use the **BOSSCAR wordmark** in Fugaz One as the safe fallback.)
- **☆ open star** — Unicode `U+2606`, prefixes every service name.
- **→ thin arrow** — the "Batafsil →" details affordance; a hairline white/gold chevron+rule (see `Arrow` nodes in the figma).
- **Inline social/contact glyphs** — phone, location pin, mail, link (material-symbols-light:link appears in source). These are thin **line icons**. No built-in icon font ships with the design.
- **Social wordmarks** — footer lists Facebook / Instagram / Twitter / Youtube as **text links**, not logo icons.

**Recommendation:** use **Lucide** (thin, 1.5–2px stroke, rounded) from CDN as the closest match for line icons (`phone`, `map-pin`, `mail`, `link`, `arrow-right`, `chevron-right`). Keep stroke thin and color white/gold. Use the literal `☆` glyph for service stars. **No emoji.** *(Lucide is a flagged substitute — no first-party icon set was found in the file.)*

---

## Caveats / substitutions (flagged)

- **Fonts:** "Iosevka Charon" → **JetBrains Mono**; "Lao Sans Pro" → **League Spartan**. All other faces are real Google Fonts. Replace with the exact licensed files if you have them.
- **Logo:** the crown+B emblem is vector-composed in Figma and not cleanly exportable; the wordmark is used as the reliable mark. Please share a real logo SVG.
- **Icons:** Lucide substituted for the thin line glyphs (no first-party set in file).
- **Placeholder copy:** the contact block in the Figma still shows dummy Philippines address/email — the **real** address/phone (Tashkent / +998 200-200-200) from the footer is used here.

import Head from 'next/head'
import React from 'react'
import App from '../app'

const SITE_URL = 'https://bosscar.uz'
const OG_IMAGE = `${SITE_URL}/og.jpg`
const TITLE = 'Bosscar — Avto Detailing Studiyasi Toshkent | Polirovka, Keramika, Tonirovka'
const DESCRIPTION =
  "Bosscar — Toshkentdagi premium avto detailing studiyasi. Polirovka, keramika qoplama, tonirovka, kimyoviy tozalash, interyer detailing va himoya plyonkasi. Har bir tafsilotda mukammallik. ☎ +998 200-200-200"

// LocalBusiness structured data — lokal qidiruv (Google Maps / "detailing Toshkent") uchun
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'AutoWash',
  name: 'Bosscar',
  alternateName: 'Bosscar Garage',
  description: DESCRIPTION,
  url: SITE_URL,
  image: OG_IMAGE,
  logo: `${SITE_URL}/icon-512.png`,
  telephone: '+998200200200',
  email: 'bosscaruz@gmail.com',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sebzor massivi, 4B-uy',
    addressLocality: 'Toshkent',
    addressCountry: 'UZ',
  },
  areaServed: 'Toshkent, Oʻzbekiston',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.331658,
    longitude: 69.249437,
  },
  hasMap: 'https://www.google.com/maps?q=41.331658,69.249437',
  sameAs: [
    'https://www.instagram.com/bosscargarage.uz',
    'https://t.me/bosscaruz',
    'https://www.youtube.com/@bosscaruz',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Detailing xizmatlari',
    itemListElement: [
      'Avtomobil polirovkasi',
      'Keramika qoplama',
      'Tonirovka',
      'Kimyoviy tozalash',
      'Interyer detailing',
      'Himoya plyonkasi (PPF)',
      'Deteyling yuvish',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  },
}

export default function Home() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta
          name="keywords"
          content="avto detailing Toshkent, avtomobil polirovka, keramika qoplama, tonirovka Toshkent, kimyoviy tozalash, himoya plyonkasi, interyer detailing, детейлинг Ташкент, полировка авто, керамическое покрытие, тонировка, химчистка салона, bosscar, bosscar garage"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="author" content="Bosscar" />
        <link rel="canonical" href={`${SITE_URL}/`} />

        {/* Open Graph (Facebook / Telegram / WhatsApp preview) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Bosscar" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:locale" content="uz_UZ" />
        <meta property="og:locale:alternate" content="ru_RU" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* Structured data — LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </Head>
      <App />
    </>
  )
}

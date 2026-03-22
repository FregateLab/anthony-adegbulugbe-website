import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const CHURCH_NAME = "Anthony Olusegun Adegbulugbe"
export const CHURCH_DESCRIPTION = "Helping believers grow in their relationship with God through discipleship, mentoring, and spiritual development programs."
export const SITE_URL = "https://aoa.ng"

export const metadata: Metadata = {
  title: {
    template: `%s | ${CHURCH_NAME}`,
    default: `${CHURCH_NAME} - Welcome Home`,
  },
  description: CHURCH_DESCRIPTION,
  keywords: [
    "church",
    "christian",
    "worship",
    "community",
    "bible study",
    "sermons",
    "faith",
    "prayer",
    "fellowship",
    "sunday service"
  ],
  authors: [{ name: CHURCH_NAME }],
  creator: CHURCH_NAME,
  publisher: CHURCH_NAME,
  generator: "Next.js",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: CHURCH_NAME,
    description: CHURCH_DESCRIPTION,
    siteName: CHURCH_NAME,
    images: [
      {
        url: "/images/anthony-portrait.jpg",
        width: 1200,
        height: 630,
        alt: `${CHURCH_NAME} - Welcome Home`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: CHURCH_NAME,
    description: CHURCH_DESCRIPTION,
    images: ["/images/anthony-portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-site-verification-code", // Add your Google verification code
    // yandex: "your-yandex-verification-code", // If needed
    // yahoo: "your-yahoo-verification-code", // If needed
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#dc2626', // Church red color
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Church",
    "name": CHURCH_NAME,
    "description": CHURCH_DESCRIPTION,
    "url": SITE_URL,
    "telephone": "+234-807-777-7856",
    "email": "anthony.adegbulugbe@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Serving CAC congregations nationwide",
      "addressLocality": "Lagos",
      "addressRegion": "Lagos",
      "postalCode": "12345",
      "addressCountry": "NG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.7128",
      "longitude": "-74.0060"
    },
    "openingHours": [
      "Su 09:00-12:00", // Sunday service times
      "We 19:00-21:00"  // Wednesday service time s
    ],
    "sameAs": [
      "https://instagram.com/anthony_adegbulugbe",
      "https://youtube.com/anthony_adegbulugbe"
    ],
    "logo": `${SITE_URL}/images/logo.png`,
    "image": `${SITE_URL}/images/anthony-portrait.jpg`
  }
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Google Analytics */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_TRACKING_ID');
            `,
          }}
        /> */}
      </head>
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-red-600 focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}

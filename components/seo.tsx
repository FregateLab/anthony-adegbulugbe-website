import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  structuredData?: any
  noindex?: boolean
}

export function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/images/anthony-portrait.jpg', // Default church image
  ogType = 'website',
  twitterCard = '/images/anthony-portrait.jpg',
  structuredData,
  noindex = false
}: SEOProps) {
  const siteTitle = "Pastor Anthony Olusegun Adegbulugbe"
  const siteUrl = "https://aoa.ng"
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`
  const fullCanonical = canonical || siteUrl

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteTitle} - ${title}`} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />

      {/* Additional Meta Tags */}
      <meta name="author" content={siteTitle} />
      <meta name="generator" content="FregateLab" />
      <meta name="theme-color" content="#dc2626" /> {/* Church red color */}

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  )
}
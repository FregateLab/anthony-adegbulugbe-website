// lib/seo-utils.ts
export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'book' | 'profile'
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  structuredData?: any
  noindex?: boolean
}

export const SITE_CONFIG = {
  name: "Pastor Anthony Olusegun Adegbulugbe", // Replace with actual church name
  description: "Helping believers grow in their relationship with God through discipleship, mentoring, and spiritual development programs.",
  url: "https://aoa.ng", // Replace with actual domain
  defaultImage: "/images/anthony-portrait.jpg",
  twitterHandle: "@aoa_ng", // Replace with actual Twitter handle
  locale: "en_US",
  themeColor: "#dc2626",
}

// Generate metadata for different page types
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = SITE_CONFIG.defaultImage,
  ogType = 'website',
  noindex = false
}: SEOConfig) {
  const fullTitle = title.includes(SITE_CONFIG.name) ? title : `${title} | ${SITE_CONFIG.name}`
  const fullCanonical = canonical ? `${SITE_CONFIG.url}${canonical}` : SITE_CONFIG.url
  
  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    canonical: fullCanonical,
    openGraph: {
      type: ogType,
      title: fullTitle,
      description,
      url: fullCanonical,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${SITE_CONFIG.url}${ogImage}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: SITE_CONFIG.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `${SITE_CONFIG.url}${ogImage}`],
      creator: SITE_CONFIG.twitterHandle,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
    alternates: {
      canonical: fullCanonical,
    },
  }
}

// Common structured data schemas for church websites
export const STRUCTURED_DATA = {
  // Church organization schema
  church: (churchData: {
    name: string
    description: string
    address: any
    phone?: string
    email?: string
    serviceHours?: string[]
    socialMedia?: string[]
  }) => ({
    "@context": "https://schema.org",
    "@type": "Church",
    "name": churchData.name,
    "description": churchData.description,
    "url": SITE_CONFIG.url,
    "telephone": churchData.phone,
    "email": churchData.email,
    "address": churchData.address,
    "openingHours": churchData.serviceHours || [],
    "sameAs": churchData.socialMedia || [],
    "logo": `${SITE_CONFIG.url}/images/logo.png`,
    "image": `${SITE_CONFIG.url}/images/anthony-portrait.jpg`,
    "priceRange": "Free"
  }),

  // Sermon/Article schema
  article: (articleData: {
    title: string
    description: string
    publishDate: string
    author: string
    url: string
    image?: string
  }) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.title,
    "description": articleData.description,
    "datePublished": articleData.publishDate,
    "author": {
      "@type": "Person",
      "name": articleData.author
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.url}/images/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleData.url
    },
    "image": articleData.image ? `${SITE_CONFIG.url}${articleData.image}` : SITE_CONFIG.defaultImage
  }),

  // Event schema for church services/events
  event: (eventData: {
    name: string
    description: string
    startDate: string
    endDate?: string
    location: any
    isOnline?: boolean
    url?: string
  }) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": eventData.name,
    "description": eventData.description,
    "startDate": eventData.startDate,
    "endDate": eventData.endDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": eventData.isOnline 
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    "location": eventData.location,
    "organizer": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url
    },
    "url": eventData.url || SITE_CONFIG.url,
    "isAccessibleForFree": true
  }),

  // Book schema for pastor's books
  book: (bookData: {
    title: string
    author: string
    description: string
    isbn?: string
    publisher?: string
    publishDate?: string
    image?: string
    url?: string
  }) => ({
    "@context": "https://schema.org",
    "@type": "Book",
    "name": bookData.title,
    "author": {
      "@type": "Person",
      "name": bookData.author
    },
    "description": bookData.description,
    "isbn": bookData.isbn,
    "publisher": bookData.publisher,
    "datePublished": bookData.publishDate,
    "image": bookData.image,
    "url": bookData.url,
    "genre": "Religion & Spirituality"
  }),

  // Breadcrumb schema
  breadcrumb: (items: { name: string, url: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  })
}

// SEO-optimized keywords for different church pages
export const CHURCH_KEYWORDS = {
  homepage: [
    "church", "christian", "worship", "community", "bible study", 
    "sermons", "faith", "prayer", "fellowship", "sunday service",
    "christ", "god", "religion", "spiritual growth", "christian community"
  ],
  about: [
    "church mission", "christian beliefs", "church vision", "faith community",
    "christian values", "church history", "denominational beliefs"
  ],
  sermons: [
    "sermons", "bible study", "preaching", "christian teaching", "scripture",
    "biblical messages", "worship service", "pastoral teaching", "gospel"
  ],
  events: [
    "church events", "christian events", "bible study", "prayer meeting",
    "worship service", "community events", "fellowship", "church activities"
  ],
  contact: [
    "church location", "service times", "contact church", "visit church",
    "church address", "church phone", "church hours", "directions to church"
  ],
  pastor: [
    "pastor", "minister", "church leader", "pastoral care", "spiritual leader",
    "preacher", "christian leadership", "church staff"
  ]
}

// Helper function to truncate description to optimal length
export function truncateDescription(description: string, maxLength: number = 155): string {
  if (description.length <= maxLength) return description
  return description.substring(0, maxLength - 3) + '...'
}

// Helper function to generate FAQ structured data
export function generateFAQSchema(faqs: { question: string, answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}
"use client"
import { useEffect } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { PastorProfileSection } from "@/components/pastor-profile-section"
import { SermonsSection } from "@/components/sermons-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { BooksSection } from "@/components/books-section"

export default function HomePage() {
  useEffect(() => {
    // Add smooth scroll behavior to the document
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      // Cleanup
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Home - Anthony Olusegun Adegbulugbe",
    "description": "Helping believers grow in their relationship with God through discipleship, mentoring, and spiritual development programs.",
    "url": "https://aoa.ng",
    "mainEntity": {
      "@type": "Church",
      "name": "Anthony Olusegun Adegbulugbe",
      "description": "Helping believers grow in their relationship with God through discipleship, mentoring, and spiritual development programs.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Serving CAC congregations nationwide",
        "addressLocality": "Lagos",
        "addressRegion": "Lagos",
        "postalCode": "12345",
        "addressCountry": "NG"
      },
      "telephone": "+234-807-777-7856",
      "url": "https://aoa.ng",
      "image": "https://aoa.ng/images/anthony-portrait.jpg",
      "priceRange": "Free",
      "openingHours": [
        "Su 09:00-12:00",
        "We 19:00-21:00"
      ]
    },
    // "breadcrumb": {
    //   "@type": "BreadcrumbList",
    //   "itemListElement": [
    //     {
    //       "@type": "ListItem",
    //       "position": 1,
    //       "name": "Home",
    //       "item": "https://yourchurch.com"
    //     }
    //   ]
    // }
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />
      <HeroSection />
      <div className="container mx-auto px-4 mb-16">
        <AboutSection />
        <PastorProfileSection />
        <BooksSection />
        <SermonsSection />
        {/* <ArchiveSection /> */}
        <ContactSection />
      </div>
      <Footer />
    </div>
  )
}

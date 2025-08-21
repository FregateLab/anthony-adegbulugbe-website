"use client"

import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 min-h-[400px] md:min-h-[600px]">
        {/* Left content */}
        <div className="border-2 border-black p-4 md:p-8 bg-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 md:mb-8">
            PASTORAL
            <br />
            MINISTRY
          </h2>

          <div className="space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed">
            <p className="font-medium">
              SERVING GOD'S PEOPLE THROUGH
              <br />
              FAITHFUL PREACHING AND PASTORAL
              <br />
              CARE
            </p>

            <div className="bg-red-600 text-white p-3 md:p-4 mt-6 md:mt-8">
              <p className="font-bold text-center text-sm md:text-base">
                "The calling to shepherd God's people is both a privilege and a sacred responsibility that requires
                faithful devotion to His Word."
              </p>
            </div>

            {/* Action Buttons - Moved below the callout */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-8">
              <Link
                href="/sermons"
                className="flex-1 bg-white hover:bg-gray-50 text-black font-bold py-3 px-6 border-2 border-black transition-colors duration-200 text-center"
              >
                EXPLORE SERMONS
              </Link>
              <Link
                href="/books"
                className="flex-1 bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 border-2 border-black transition-colors duration-200 text-center"
              >
                EXPLORE BOOKS
              </Link>
            </div>
          </div>
        </div>

        {/* Right content - Portrait */}
        <div className="border-2 border-black bg-white overflow-hidden">
          <div className="h-full relative min-h-[300px] md:min-h-[400px] lg:min-h-full">
            <Image
              src="/images/anthony-portrait.jpg"
              alt="Pastor Anthony Olusegun Adegbulugbe - Zonal Superintendent, Christ Apostolic Church"
              fill
              className="object-cover object-top"
              style={{
                filter: "grayscale(100%) contrast(1.2)",
              }}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

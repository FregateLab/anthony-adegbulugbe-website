"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function PastorProfilePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="border-2 border-black bg-white overflow-hidden">
            <div className="h-64 sm:h-80 lg:h-[600px] relative">
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

          <div className="border-2 border-black p-4 sm:p-6 lg:p-8 bg-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6">
              PASTOR ANTHONY
              <br />
              OLUSEGUN
              <br />
              ADEGBULUGBE
            </h1>

            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg">
              <p className="font-bold text-red-600 text-base sm:text-lg">Zonal Superintendent</p>
              <p className="font-medium">Christ Apostolic Church, Nigeria and Overseas</p>
              <p className="text-xs sm:text-sm">Born April 2nd, 1955, Ondo State, Nigeria</p>

              <div className="bg-red-600 text-white p-3 sm:p-4 mt-4 sm:mt-6">
                <p className="font-bold text-center text-xs sm:text-sm">
                  "A scholar, entrepreneur, and faithful servant of God with over four decades of ministry experience"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Early Life & Christian Journey */}
        <section className="mb-12 sm:mb-16 border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">EARLY LIFE & CHRISTIAN JOURNEY</h2>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">HUMBLE BEGINNINGS</h3>
              <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                Pastor Anthony Olusegun Adegbulugbe was born on April 2nd, 1955, in Ondo State, Nigeria. His Christian
                journey began at CAC Oke-Ibukun, Ibadan, where he served faithfully as a choir member, demonstrating
                early signs of his commitment to worship and service.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                From these humble beginnings as a choir member, his dedication and spiritual maturity were recognized by
                the church leadership, leading to his ordination first as an Elder and subsequently as a Pastor in
                Christ Apostolic Church, Nigeria and Overseas.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">CALL TO MINISTRY</h3>
              <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                His pastoral journey officially began at CAC Adesanmi, Ile-Ife, where he learned the foundations of
                pastoral care and church leadership. This experience prepared him for greater responsibilities in God's
                kingdom.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                Later, his ministry continued and flourished in Abuja at CAC All Saints' Chapel, Citec, where he would
                launch some of his most impactful programs and demonstrate exceptional leadership qualities.
              </p>
            </div>
          </div>
        </section>

        {/* Academic Excellence */}
        <section className="mb-12 sm:mb-16 border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">ACADEMIC EXCELLENCE</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-lg sm:text-2xl font-bold">1st</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">FIRST-CLASS HONORS</h3>
              <p className="text-xs sm:text-sm">B.Sc. in Electrical Engineering from University of Ife (now OAU)</p>
            </div>

            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-sm sm:text-lg font-bold">D.Sc</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">DOCTORATE DEGREE</h3>
              <p className="text-xs sm:text-sm">D.Sc. from MIT in Nuclear Materials Engineering</p>
            </div>

            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-base sm:text-lg font-bold">40+</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">YEARS OF SERVICE</h3>
              <p className="text-xs sm:text-sm">Over 40 years in academia, government, and church ministry</p>
            </div>
          </div>
        </section>

        {/* Professional Career */}
        <section className="mb-12 sm:mb-16 border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">PROFESSIONAL CAREER</h2>

          <div className="space-y-6 sm:space-y-8">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-600">ACADEMIC LEADERSHIP</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Director, Center for Energy Research</h4>
                    <p className="text-xs sm:text-sm text-gray-700">Obafemi Awolowo University (OAU)</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Chancellor</h4>
                    <p className="text-xs sm:text-sm text-gray-700">Joseph Ayo Babalola University (Current)</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-600">GOVERNMENT SERVICE</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Presidential Adviser on Energy</h4>
                    <p className="text-xs sm:text-sm text-gray-700">To President Obasanjo</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Educational Governance</h4>
                    <p className="text-xs sm:text-sm text-gray-700">Significant contributions to educational governance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ministry Leadership */}
        <section className="mb-12 sm:mb-16 border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">MINISTRY LEADERSHIP</h2>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">PASTORAL PROGRESSION</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Choir Member</h4>
                    <p className="text-xs sm:text-sm text-gray-700">CAC Oke-Ibukun, Ibadan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Elder</h4>
                    <p className="text-xs sm:text-sm text-gray-700">Christ Apostolic Church</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Pastor</h4>
                    <p className="text-xs sm:text-sm text-gray-700">CAC Adesanmi, Ile-Ife</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">District Superintendent (2018)</h4>
                    <p className="text-xs sm:text-sm text-gray-700">CAC All Saints' Chapel, Citec, Abuja</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Zonal Superintendent (Current)</h4>
                    <p className="text-xs sm:text-sm text-gray-700">Christ Apostolic Church, Nigeria and Overseas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">SIGNATURE PROGRAMS</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="border-l-4 border-red-600 pl-3 sm:pl-4">
                  <h4 className="text-base sm:text-lg font-bold mb-2">Operation Declare and Decree</h4>
                  <p className="text-xs sm:text-sm text-gray-700">
                    A powerful ministry program focused on declaring God's promises and decreeing His will in the lives
                    of believers and their circumstances.
                  </p>
                </div>
                <div className="border-l-4 border-red-600 pl-3 sm:pl-4">
                  <h4 className="text-base sm:text-lg font-bold mb-2">Hours of Divine Intervention</h4>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Dedicated prayer sessions for experiencing God's supernatural intervention through spiritual warfare
                    and intercession.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Welfare & Empowerment */}
        <section className="mb-12 sm:mb-16 border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">WELFARE & EMPOWERMENT INITIATIVES</h2>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-600">PASTORAL WELFARE SCHEME</h3>
              <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                Pastor Anthony introduced a comprehensive welfare scheme providing free medical care to pastors and
                their families, recognizing the need to care for those who serve God's people.
              </p>
              <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2">
                <li>• Free medical care for pastors</li>
                <li>• Family healthcare coverage</li>
                <li>• Financial support programs</li>
                <li>• Emergency assistance fund</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-600">WOMEN EMPOWERMENT PROGRAMS</h3>
              <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                Understanding the vital role of women in ministry, he launched empowerment programs specifically
                designed to support and develop women in the church.
              </p>
              <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2">
                <li>• Skills development training</li>
                <li>• Leadership development for women</li>
                <li>• Economic empowerment initiatives</li>
                <li>• Mentorship programs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Family Life */}
        <section className="mb-12 sm:mb-16 border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">FAMILY LIFE</h2>

          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
              Pastor Anthony Olusegun Adegbulugbe is married to <strong>Mrs. Afolake Adegbulugbe</strong>, and together
              they are blessed with children. As a devoted family man, he exemplifies Christian values in both his
              ministry and personal life.
            </p>

            <div className="bg-red-600 text-white p-4 sm:p-6">
              <p className="font-bold text-sm sm:text-base">
                "A man's ministry is only as strong as his family foundation. Pastor Anthony demonstrates that faithful
                service to God begins with faithful service to family."
              </p>
            </div>
          </div>
        </section>

        {/* Legacy & Impact */}
        <section className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">LEGACY & IMPACT</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-600">ACADEMIC LEGACY</h3>
              <p className="text-xs sm:text-sm">
                From First-Class honors to MIT doctorate, serving as Chancellor and Presidential Adviser, demonstrating
                excellence in education and governance.
              </p>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-600">MINISTRY IMPACT</h3>
              <p className="text-xs sm:text-sm">
                Over four decades of faithful ministry, from choir member to Zonal Superintendent, launching
                transformative programs and caring for God's servants.
              </p>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-600">SERVANT LEADERSHIP</h3>
              <p className="text-xs sm:text-sm">
                A model of servant leadership, combining academic excellence with pastoral heart, professional success
                with spiritual devotion.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
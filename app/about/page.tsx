"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
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
          <div className="border-2 border-black p-4 sm:p-6 lg:p-8 bg-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 sm:mb-8">
              ABOUT
              <br />
              OUR
              <br />
              MINISTRY
            </h1>

            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed">
              <p className="font-medium text-sm sm:text-base">
                FAITHFUL PASTORAL MINISTRY
                <br />
                ROOTED IN SCRIPTURE AND
                <br />
                DEVOTED TO <span className="text-red-600 font-bold">GOD'S PEOPLE</span>
              </p>

              <div className="bg-red-600 text-white p-3 sm:p-4 mt-6 sm:mt-8">
                <p className="font-bold text-center text-sm sm:text-base">
                  "Our ministry is built on the foundation of faithful preaching, pastoral care, and servant leadership
                  in Christ Apostolic Church."
                </p>
              </div>
            </div>
          </div>

          <div className="border-2 border-black bg-white overflow-hidden h-64 sm:h-80 lg:h-full">
            <div className="h-full relative">
              <Image
                src="/images/anthony-portrait.jpg"
                alt="Pastor Anthony Olusegun Adegbulugbe - Ministry Overview"
                fill
                className="object-cover object-top"
                style={{
                  filter: "grayscale(100%) contrast(1.2)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Ministry Foundation */}
        <section className="mb-12 sm:mb-16 border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">MINISTRY FOUNDATION</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 border-b-2 border-black pb-2">SCRIPTURE-CENTERED</h3>
              <p className="text-sm sm:text-base leading-relaxed">
                Our ministry is firmly rooted in the Word of God. We believe in faithful exposition of Scripture,
                helping believers understand and apply God's truth to their daily lives through systematic teaching and
                preaching.
              </p>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 border-b-2 border-black pb-2">PASTORAL CARE</h3>
              <p className="text-sm sm:text-base leading-relaxed">
                We are committed to shepherding God's people with compassion and wisdom. Our pastoral care extends to
                counseling, spiritual guidance, crisis support, and walking alongside believers in their spiritual
                journey.
              </p>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 border-b-2 border-black pb-2">SERVANT LEADERSHIP</h3>
              <p className="text-sm sm:text-base leading-relaxed">
                Following Christ's example of servant leadership, we lead by serving others. Our ministry focuses on
                developing leaders, empowering believers, and creating an environment where everyone can grow in their
                faith and calling.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-12 sm:mb-16 border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">OUR MISSION</h2>

          <div className="text-center max-w-4xl mx-auto">
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8">
              To faithfully shepherd God's people through expository preaching, compassionate pastoral care, and servant
              leadership, while developing the next generation of Christian leaders in Christ Apostolic Church.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12">
              <div className="border-l-4 border-red-600 pl-4 sm:pl-6 text-left">
                <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">SPIRITUAL FORMATION</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Helping believers grow in their relationship with God through discipleship, mentoring, and spiritual
                  development programs.
                </p>
              </div>

              <div className="border-l-4 border-red-600 pl-4 sm:pl-6 text-left">
                <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">COMMUNITY BUILDING</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Creating strong Christian communities where believers can fellowship, support one another, and serve
                  together in God's kingdom.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ministry Values */}
        <section className="mb-12 sm:mb-16 border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">MINISTRY VALUES</h2>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">CORE VALUES</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">BIBLICAL AUTHORITY</h4>
                    <p className="text-xs sm:text-sm text-gray-700">
                      We hold Scripture as the ultimate authority for faith and practice, committed to faithful
                      exposition and application of God's Word.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">PASTORAL HEART</h4>
                    <p className="text-xs sm:text-sm text-gray-700">
                      We shepherd with compassion, providing care, guidance, and support to all who seek spiritual help
                      and direction.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">EXCELLENCE</h4>
                    <p className="text-xs sm:text-sm text-gray-700">
                      We strive for excellence in all aspects of ministry, combining academic rigor with spiritual
                      devotion and practical service.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">INTEGRITY</h4>
                    <p className="text-xs sm:text-sm text-gray-700">
                      We maintain the highest standards of moral and ethical conduct, living transparently before God
                      and His people.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">MINISTRY APPROACH</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="border-2 border-black p-3 sm:p-4">
                  <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">EXPOSITORY PREACHING</h4>
                  <p className="text-xs sm:text-sm">
                    Verse-by-verse exposition of Scripture that helps congregations understand the original meaning and
                    contemporary application of God's Word.
                  </p>
                </div>

                <div className="border-2 border-black p-3 sm:p-4">
                  <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">DISCIPLESHIP FOCUS</h4>
                  <p className="text-xs sm:text-sm">
                    Intentional mentoring and training programs designed to develop mature believers who can serve
                    effectively in ministry and leadership roles.
                  </p>
                </div>

                <div className="border-2 border-black p-3 sm:p-4">
                  <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">HOLISTIC CARE</h4>
                  <p className="text-xs sm:text-sm">
                    Addressing the spiritual, emotional, and practical needs of believers through comprehensive pastoral
                    care and support systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Christ Apostolic Church Heritage */}
        <section className="mb-12 sm:mb-16 border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">CHRIST APOSTOLIC CHURCH HERITAGE</h2>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-600">OUR CHURCH TRADITION</h3>
              <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                Christ Apostolic Church (CAC) has a rich heritage of faithful ministry, biblical preaching, and
                spiritual revival. As part of this tradition, our ministry continues the legacy of committed pastoral
                care and evangelical fervor.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                From our humble beginnings at CAC Oke-Ibukun, Ibadan, to serving in various capacities across Nigeria
                and overseas, we remain committed to the foundational principles that have guided CAC for generations.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-600">DENOMINATIONAL VALUES</h3>
              <ul className="text-sm sm:text-base space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 text-base">•</span>
                  <span>Commitment to biblical authority and sound doctrine</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 text-base">•</span>
                  <span>Emphasis on prayer, fasting, and spiritual discipline</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 text-base">•</span>
                  <span>Focus on evangelism and church planting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 text-base">•</span>
                  <span>Strong pastoral leadership and accountability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 text-base">•</span>
                  <span>Community service and social responsibility</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Ministry Programs */}
        <section className="mb-12 sm:mb-16 border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">SIGNATURE MINISTRY PROGRAMS</h2>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="border-2 border-black p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-red-600">OPERATION DECLARE AND DECREE</h3>
              <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                A powerful ministry initiative focused on teaching believers how to declare God's promises and decree
                His will over their lives and circumstances. This program combines biblical teaching with practical
                application of faith principles.
              </p>
              <div className="bg-gray-100 p-3 sm:p-4">
                <h4 className="font-bold mb-2 text-sm sm:text-base">Program Features:</h4>
                <ul className="text-xs sm:text-sm space-y-1">
                  <li>• Biblical foundation for declaration and decree</li>
                  <li>• Practical workshops and training sessions</li>
                  <li>• Personal testimony and breakthrough stories</li>
                  <li>• Community prayer and declaration gatherings</li>
                </ul>
              </div>
            </div>

            <div className="border-2 border-black p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-red-600">HOURS OF DIVINE INTERVENTION</h3>
              <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                Dedicated prayer sessions designed to seek God's supernatural intervention in personal, family, and
                community challenges. These intensive prayer meetings focus on spiritual warfare and intercession.
              </p>
              <div className="bg-gray-100 p-3 sm:p-4">
                <h4 className="font-bold mb-2 text-sm sm:text-base">Program Features:</h4>
                <ul className="text-xs sm:text-sm space-y-1">
                  <li>• Extended prayer and worship sessions</li>
                  <li>• Spiritual warfare and deliverance ministry</li>
                  <li>• Intercession for personal and national issues</li>
                  <li>• Testimonies of divine intervention</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">CONNECT WITH OUR MINISTRY</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-600">PASTORAL CARE</h3>
              <p className="text-sm sm:text-base mb-3 sm:mb-4">
                Available for spiritual counseling, prayer support, and pastoral guidance during life's challenges.
              </p>
              <div className="text-xs sm:text-sm">
                <strong>Email:</strong> anthony.adegbulugbe@gmail.com
                <br />
                <strong>Phone:</strong> +234-807-777-7856
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-600">MINISTRY OPPORTUNITIES</h3>
              <p className="text-sm sm:text-base mb-3 sm:mb-4">
                Join our ministry programs, discipleship training, and leadership development initiatives.
              </p>
              <div className="text-xs sm:text-sm">
                <strong>Programs:</strong> Operation Declare & Decree
                <br />
                <strong>Prayer:</strong> Hours of Divine Intervention
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-600">LOCATION</h3>
              <p className="text-sm sm:text-base mb-3 sm:mb-4">
                Based in Lagos, Nigeria, serving Christ Apostolic Church congregations across Nigeria and overseas.
              </p>
              <div className="text-xs sm:text-sm">
                <strong>Location:</strong> Lagos, Nigeria
                <br />
                <strong>Office Hours:</strong> Mon-Fri, 9:00 AM - 5:00 PM WAT
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
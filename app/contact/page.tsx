"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, Heart, Users, BookOpen, PlayIcon as Pray, Send, CheckCircle } from "lucide-react"
import { publicApi } from "@/lib/api"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await publicApi.contact.submit({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
      })

      setIsSubmitted(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error: any) {
      alert(error.message || "Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-4 py-8 sm:py-12">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">CONTACT</h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto px-4">
            We're here to provide pastoral care, spiritual guidance, and support. Reach out for prayer, counseling, or
            ministry opportunities.
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="border-2 border-green-600 bg-green-50 p-4 sm:p-6 mb-6 sm:mb-8 text-center">
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">MESSAGE SENT SUCCESSFULLY!</h3>
            <p className="text-sm sm:text-base text-green-700">
              Thank you for reaching out. We will respond to your message within 24-48 hours. May God bless you.
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Contact Form */}
          <div className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 border-b-2 border-black pb-3 sm:pb-4">GET IN TOUCH</h2>
            <p className="text-xs sm:text-sm text-gray-700 mb-4 sm:mb-6">
              Whether you need prayer, pastoral counsel, or want to learn more about our ministry, we're here to help.
              Fill out the form below and we'll get back to you soon.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs sm:text-sm font-bold mb-2">
                    FIRST NAME *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs sm:text-sm font-bold mb-2">
                    LAST NAME *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-bold mb-2">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm font-bold mb-2">
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
                  placeholder="Enter your phone number (optional)"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs sm:text-sm font-bold mb-2">
                  SUBJECT *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
                >
                  <option value="">Select a subject</option>
                  <option value="pastoral">Pastoral Counsel</option>
                  <option value="prayer">Prayer Request</option>
                  <option value="ministry">Ministry Inquiry</option>
                  <option value="discipleship">Discipleship</option>
                  <option value="speaking">Speaking Engagement</option>
                  <option value="testimony">Share Testimony</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-bold mb-2">
                  MESSAGE *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  required
                  className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none text-sm sm:text-base"
                  placeholder="Please share your prayer request, question, or how we can help you..."
                ></textarea>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-bold"
              >
                {isSubmitting ? (
                  "SENDING MESSAGE..."
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    SEND MESSAGE
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            {/* Direct Contact */}
            <div className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b-2 border-black pb-3 sm:pb-4">DIRECT CONTACT</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-bold mb-1 text-sm sm:text-base">EMAIL</h4>
                    <p className="text-xs sm:text-sm text-gray-700 break-all">anthony.adegbulugbe@gmail.com</p>
                    <p className="text-xs text-gray-600">Primary contact for all ministry inquiries</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1 text-sm sm:text-base">PHONE</h4>
                    <p className="text-xs sm:text-sm text-gray-700">+234-803-577-9500</p>
                    <p className="text-xs text-gray-600">Available for urgent pastoral care</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1 text-sm sm:text-base">LOCATION</h4>
                    <p className="text-xs sm:text-sm text-gray-700">Abuja, Nigeria</p>
                    <p className="text-xs text-gray-600">Serving CAC congregations nationwide</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1 text-sm sm:text-base">OFFICE HOURS</h4>
                    <p className="text-xs sm:text-sm text-gray-700">Monday - Friday</p>
                    <p className="text-xs sm:text-sm text-gray-700">9:00 AM - 5:00 PM WAT</p>
                    <p className="text-xs text-gray-600">Emergency pastoral care available 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ministry Areas */}
            <div className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b-2 border-black pb-3 sm:pb-4">MINISTRY AREAS</h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 border border-gray-200">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mx-auto mb-2" />
                  <h4 className="font-bold text-xs sm:text-sm">PASTORAL CARE</h4>
                  <p className="text-xs text-gray-600">Counseling & Support</p>
                </div>
                <div className="text-center p-3 sm:p-4 border border-gray-200">
                  <Pray className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mx-auto mb-2" />
                  <h4 className="font-bold text-xs sm:text-sm">PRAYER MINISTRY</h4>
                  <p className="text-xs text-gray-600">Intercession & Healing</p>
                </div>
                <div className="text-center p-3 sm:p-4 border border-gray-200">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mx-auto mb-2" />
                  <h4 className="font-bold text-xs sm:text-sm">DISCIPLESHIP</h4>
                  <p className="text-xs text-gray-600">Spiritual Growth</p>
                </div>
                <div className="text-center p-3 sm:p-4 border border-gray-200">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mx-auto mb-2" />
                  <h4 className="font-bold text-xs sm:text-sm">LEADERSHIP</h4>
                  <p className="text-xs text-gray-600">Training & Development</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ministry Programs */}
        <section className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">CONNECT WITH OUR PROGRAMS</h2>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="border-2 border-black">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-600">OPERATION DECLARE AND DECREE</h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                  Join our powerful ministry program focused on declaring God's promises and experiencing breakthrough
                  through faith-filled declarations.
                </p>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <p>
                    <strong>When:</strong> Every Sunday, 6:00 PM WAT
                  </p>
                  <p>
                    <strong>Format:</strong> In-person and Online
                  </p>
                  <p>
                    <strong>Contact:</strong> Select "Ministry Inquiry" above
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-black">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-600">HOURS OF DIVINE INTERVENTION</h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                  Intensive prayer sessions for experiencing God's supernatural intervention through spiritual warfare
                  and intercession.
                </p>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <p>
                    <strong>When:</strong> First Friday of every month, 10:00 PM WAT
                  </p>
                  <p>
                    <strong>Duration:</strong> 3 hours of prayer and worship
                  </p>
                  <p>
                    <strong>Contact:</strong> Select "Prayer Request" above
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="border-2 border-red-600 bg-red-50 p-4 sm:p-6 lg:p-8 text-center">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-red-800">EMERGENCY PASTORAL CARE</h2>
          <p className="text-sm sm:text-base text-red-700 mb-4 sm:mb-6 max-w-2xl mx-auto">
            If you're facing a crisis or urgent spiritual need, don't hesitate to reach out immediately. We're here to
            provide support and prayer during difficult times.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-red-800">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-bold text-sm sm:text-base">Emergency Line: +234-803-577-9500</span>
            </div>
            <div className="flex items-center gap-2 text-red-800">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-bold text-sm sm:text-base">urgent@cac.ng</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
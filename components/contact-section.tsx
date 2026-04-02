"use client"

import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section id="contact" className="mt-12 md:mt-16 border-2 border-black bg-white p-4 md:p-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">CONTACT</h2>

      <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
        {/* Contact Form */}
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6 border-b-2 border-black pb-2">GET IN TOUCH</h3>
          <form className="space-y-4 md:space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-xs sm:text-sm font-bold mb-2">
                  FIRST NAME *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full border-2 border-black p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-xs sm:text-sm md:text-base"
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
                  required
                  className="w-full border-2 border-black p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-xs sm:text-sm md:text-base"
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
                required
                className="w-full border-2 border-black p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-xs sm:text-sm md:text-base"
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
                className="w-full border-2 border-black p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-xs sm:text-sm md:text-base"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs sm:text-sm font-bold mb-2">
                SUBJECT *
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full border-2 border-black p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-xs sm:text-sm md:text-base"
              >
                <option value="">Select a subject</option>
                <option value="pastoral">Pastoral Counsel</option>
                <option value="prayer">Prayer Request</option>
                <option value="ministry">Ministry Inquiry</option>
                <option value="discipleship">Discipleship</option>
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
                rows={6}
                required
                className="w-full border-2 border-black p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none text-xs sm:text-sm md:text-base"
                placeholder="Please share your prayer request or ministry inquiry..."
              ></textarea>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 md:py-4 text-sm md:text-base lg:text-lg font-bold"
            >
              SEND MESSAGE
            </Button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6 border-b-2 border-black pb-2">MINISTRY CONTACT</h3>

          <div className="space-y-6 md:space-y-8">
            <div>
              <h4 className="text-sm sm:text-base md:text-lg font-bold mb-3">PASTORAL CARE</h4>
              <p className="text-xs sm:text-sm mb-4">
                Available for pastoral counseling, prayer, spiritual guidance, and support during life's challenges.
              </p>
              <ul className="text-xs sm:text-sm space-y-1">
                <li>• Spiritual Counseling</li>
                <li>• Prayer Ministry</li>
                <li>• Crisis Support</li>
                <li>• Discipleship Mentoring</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm sm:text-base md:text-lg font-bold mb-3">MINISTRY OPPORTUNITIES</h4>
              <p className="text-xs sm:text-sm mb-4">
                Interested in serving in ministry or learning more about discipleship and spiritual growth opportunities.
              </p>
              <ul className="text-xs sm:text-sm space-y-1">
                <li>• Operation Declare and Decree</li>
                <li>• Hours of Divine Intervention</li>
                <li>• Bible Study Groups</li>
                <li>• Leadership Development</li>
              </ul>
            </div>

            <div className="border-t-2 border-black pt-4 md:pt-6">
              <h4 className="text-sm sm:text-base md:text-lg font-bold mb-4">DIRECT CONTACT</h4>
              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <strong>EMAIL:</strong> anthony.adegbulugbe@gmail.com
                </div>
                <div>
                  <strong>PHONE:</strong> +234-803-577-9500
                </div>
                <div>
                  <strong>LOCATION:</strong> Abuja, Nigeria
                </div>
                <div>
                  <strong>OFFICE HOURS:</strong> Mon-Fri, 9:00 AM - 5:00 PM WAT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

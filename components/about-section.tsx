export function AboutSection() {
  return (
    <section id="about" className="mt-12 md:mt-16 border-2 border-black bg-white p-4 md:p-8">
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4 border-b-2 border-black pb-2">MINISTRY</h3>
          <p className="text-xs sm:text-sm leading-relaxed">
            Ordained as Elder and Pastor in Christ Apostolic Church, Nigeria and Overseas. Currently serving as Zonal
            Superintendent with over four decades of faithful ministry and pastoral care.
          </p>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4 border-b-2 border-black pb-2">EDUCATION</h3>
          <p className="text-xs sm:text-sm leading-relaxed">
            First-Class B.Sc. in Electrical Engineering from University of Ife (now OAU) and D.Sc. from MIT in Nuclear
            Materials Engineering. Currently serves as Chancellor of Joseph Ayo Babalola University.
          </p>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4 border-b-2 border-black pb-2">LEADERSHIP</h3>
          <p className="text-xs sm:text-sm leading-relaxed">
            Launched impactful programs like "Operation Declare and Decree" and "Hours of Divine Intervention."
            Introduced welfare schemes and empowerment programs for church members and pastors.
          </p>
        </div>
      </div>
    </section>
  )
}

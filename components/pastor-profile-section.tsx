export function PastorProfileSection() {
  return (
    <section id="profile" className="mt-12 md:mt-16 border-2 border-black bg-white p-4 md:p-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">PASTOR PROFILE</h2>

      <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6 border-b-2 border-black pb-2">PASTORAL JOURNEY</h3>
          <div className="space-y-4 md:space-y-6 text-xs sm:text-sm leading-relaxed">
            <p>
              <strong>Pastor Anthony Olusegun Adegbulugbe</strong>, born April 2nd, 1955, in Ondo State, began his
              Christian journey at CAC Oke-Ibukun, Ibadan, where he served as a choir member before being ordained as an
              Elder and then a Pastor in Christ Apostolic Church, Nigeria and Overseas.
            </p>
            <p>
              His pastoral journey began at CAC Adesanmi, Ile-Ife, and later continued in Abuja at CAC All Saints'
              Chapel, Citec. Under his leadership, impactful programs like "Operation Declare and Decree" and "Hours of
              Divine Intervention" were launched.
            </p>
            <p>
              In 2018, he was elevated to District Superintendent and later appointed as Zonal Superintendent. He
              introduced a welfare scheme providing free medical care to pastors and their families and launched
              empowerment programs for women in the church.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6 border-b-2 border-black pb-2">
            MINISTRY ACHIEVEMENTS
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm sm:text-base md:text-lg font-bold mb-2">Academic Excellence</h4>
              <p className="text-xs sm:text-sm text-gray-700">
                First-Class B.Sc. in Electrical Engineering from University of Ife (now OAU) and D.Sc. from MIT in
                Nuclear Materials Engineering. Over 40 years in academia, government, and church ministry.
              </p>
            </div>
            <div>
              <h4 className="text-sm sm:text-base md:text-lg font-bold mb-2">Church Leadership</h4>
              <p className="text-xs sm:text-sm text-gray-700">
                Served as Director at OAU's Center for Energy Research and Presidential Adviser on Energy to President
                Obasanjo. Currently Chancellor of Joseph Ayo Babalola University.
              </p>
            </div>
            <div>
              <h4 className="text-sm sm:text-base md:text-lg font-bold mb-2">Family Life</h4>
              <p className="text-xs sm:text-sm text-gray-700">
                Married to Mrs. Afolake Adegbulugbe and blessed with children. A devoted family man who exemplifies
                Christian values in both ministry and personal life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

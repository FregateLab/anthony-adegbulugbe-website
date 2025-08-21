"use client"

export function Header() {
  return (
    <header className="relative border-b-2 border-black">
      {/* Top corner boxes */}
      <div className="absolute hidden top-3 left-3 md:top-6 md:left-6 border-2 border-black p-2 md:p-3 bg-[#f5f1e8] text-center text-xs md:text-sm max-w-[100px] md:max-w-[120px]">
        <div className="font-medium">Born in</div>
        <div className="font-bold">Ondo State</div>
        <div className="font-medium">April 2, 1955</div>
      </div>

      <div className="absolute hidden top-3 right-3 md:top-6 md:right-6 border-2 border-black p-2 md:p-3 bg-[#f5f1e8] text-center text-xs md:text-sm max-w-[160px] md:max-w-[200px]">
        <div className="font-medium">Zonal Superintendent</div>
        <div className="font-bold">Christ Apostolic Church</div>
        <div className="font-medium">Nigeria and Overseas</div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 pt-16 md:pt-24 pb-6 md:pb-8">
        <div className="flex items-center justify-center relative">
          <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold tracking-wider text-black">ANTHONY</h1>

          {/* Decorative crest/logo */}
          <div className="absolute mx-auto hidden">
            <div className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 border-4 border-black bg-white rounded-full flex items-center justify-center">
              <div className="text-center ">
                <div className="text-sm md:text-lg lg:text-xl font-bold ">AOA</div>
                <div className="text-xs">PASTOR</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-2 md:mt-4">
          <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold tracking-wider text-black">
            ADEGBULUGBE
          </h1>
        </div>
      </div>
    </header>
  )
}

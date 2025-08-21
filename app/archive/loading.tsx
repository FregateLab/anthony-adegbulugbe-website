import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f1e8] animate-pulse">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        {/* Page Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 w-3/4 bg-gray-300 mx-auto mb-4"></div>
          <div className="h-16 w-full bg-gray-200 mx-auto"></div>
        </div>

        {/* Sermon Years Section Skeleton */}
        <section className="mb-16">
          <div className="h-8 w-64 bg-gray-300 mb-8 border-b-2 border-black pb-4"></div>
          <div className="border-2 border-black bg-white p-8">
            <div className="h-12 w-full bg-gray-200 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border-2 border-black bg-gray-100 p-4 md:p-6 h-32">
                  <div className="h-8 w-1/2 bg-gray-300 mx-auto mb-2"></div>
                  <div className="h-4 w-2/3 bg-gray-200 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Items Skeleton */}
        <section className="mb-16">
          <div className="h-8 w-64 bg-gray-300 mb-8 border-b-2 border-black pb-4"></div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="border-2 border-black bg-white p-6">
                <div className="h-4 w-24 bg-gray-200 mb-4"></div>
                <div className="h-6 w-3/4 bg-gray-300 mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 mb-3"></div>
                <div className="h-4 w-1/3 bg-gray-200 mb-4"></div>
                <div className="h-16 bg-gray-200 mb-4"></div>
                <div className="h-10 w-full bg-gray-300"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Search, Filter, and Sort Controls Skeleton */}
        <div className="border-2 border-black bg-white p-6 mb-8">
          <div className="grid lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-4 w-24 bg-gray-200 mb-2"></div>
                <div className="h-10 w-full bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Archive Items Grid Skeleton */}
        <section>
          <div className="h-8 w-48 bg-gray-300 mb-8"></div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border-2 border-black bg-white p-6">
                <div className="h-4 w-24 bg-gray-200 mb-3"></div>
                <div className="h-6 w-3/4 bg-gray-300 mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 mb-3"></div>
                <div className="h-4 w-1/3 bg-gray-200 mb-3"></div>
                <div className="h-16 bg-gray-200 mb-4"></div>
                <div className="h-10 w-full bg-gray-300"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Archive Statistics Skeleton */}
        <section className="border-2 border-black bg-white p-8 mt-16">
          <div className="h-8 w-64 bg-gray-300 mb-6 border-b-2 border-black pb-4"></div>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-8 w-16 bg-gray-300 mx-auto mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-200 mx-auto"></div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f1e8] animate-pulse">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        {/* Featured Video Player Skeleton */}
        <section className="mb-16 border-2 border-black bg-white p-8">
          <div className="aspect-video bg-gray-300 mb-6"></div>
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              <div className="h-4 w-32 bg-gray-200 mb-3"></div>
              <div className="h-8 w-3/4 bg-gray-300 mb-4"></div>
              <div className="h-4 w-1/2 bg-gray-200 mb-4"></div>
              <div className="h-16 bg-gray-200 mb-4"></div>
              <div className="h-4 w-1/3 bg-gray-200 mb-4"></div>
              <div className="h-10 w-48 bg-gray-300"></div>
            </div>
            <div className="lg:w-80 border-2 border-gray-200 p-4 space-y-4">
              <div className="h-4 w-24 bg-gray-200"></div>
              <div className="h-10 w-full bg-gray-300"></div>
              <div className="h-4 w-full bg-gray-200"></div>
              <div className="h-4 w-full bg-gray-200"></div>
            </div>
          </div>
        </section>

        {/* Featured Sermons Skeleton */}
        <section className="mb-16">
          <div className="h-8 w-64 bg-gray-300 mb-8 border-b-2 border-black pb-4"></div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="border-2 border-black bg-white p-6">
                <div className="h-4 w-24 bg-gray-200 mb-4"></div>
                <div className="h-6 w-3/4 bg-gray-300 mb-3"></div>
                <div className="h-4 w-1/2 bg-gray-200 mb-4"></div>
                <div className="h-16 bg-gray-200 mb-4"></div>
                <div className="h-4 w-1/3 bg-gray-200 mb-4"></div>
                <div className="h-10 w-full bg-gray-300"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Search and Filter Skeleton */}
        <div className="border-2 border-black bg-white p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="h-4 w-32 bg-gray-200 mb-2"></div>
              <div className="h-10 w-full bg-gray-300"></div>
            </div>
            <div>
              <div className="h-4 w-32 bg-gray-200 mb-2"></div>
              <div className="h-10 w-full bg-gray-300"></div>
            </div>
          </div>
        </div>

        {/* Sermons Grid Skeleton */}
        <section>
          <div className="h-8 w-48 bg-gray-300 mb-8"></div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border-2 border-black bg-white p-6">
                <div className="h-4 w-24 bg-gray-200 mb-3"></div>
                <div className="h-6 w-3/4 bg-gray-300 mb-3"></div>
                <div className="h-4 w-1/2 bg-gray-200 mb-3"></div>
                <div className="h-16 bg-gray-200 mb-4"></div>
                <div className="h-4 w-1/3 bg-gray-200 mb-4"></div>
                <div className="h-10 w-full bg-gray-300"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Subscribe Section Skeleton */}
        <div className="border-2 border-black bg-white p-6 mt-16 text-center">
          <div className="h-6 w-64 bg-gray-300 mx-auto mb-4"></div>
          <div className="h-12 w-3/4 bg-gray-200 mx-auto mb-4"></div>
          <div className="h-10 w-64 bg-gray-300 mx-auto"></div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f1e8] animate-pulse">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-64 bg-gray-200 mb-6"></div>

        {/* Back Navigation Skeletons */}
        <div className="mb-6 flex gap-4">
          <div className="h-10 w-32 bg-gray-300"></div>
          <div className="h-10 w-32 bg-gray-200"></div>
        </div>

        {/* Archive Header Skeleton */}
        <div className="border-2 border-black bg-white p-8 mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="h-4 w-48 bg-gray-200 mb-4"></div>
              <div className="h-10 w-3/4 bg-gray-300 mb-3"></div>
              <div className="h-6 w-1/2 bg-gray-200 mb-4"></div>
              <div className="h-4 w-full bg-gray-200 mb-4"></div>
              <div className="h-16 bg-gray-200 mb-6"></div>
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-gray-200 rounded"></div>
                <div className="h-6 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-10 w-10 bg-gray-200"></div>
              <div className="h-10 w-32 bg-gray-300"></div>
            </div>
          </div>
          <div className="border-t-2 border-black pt-6 grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="h-4 w-32 bg-gray-200 mb-2"></div>
                <div className="h-16 bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Tabs Skeleton */}
        <div className="border-2 border-black bg-white mb-8">
          <div className="flex border-b-2 border-black">
            <div className="h-12 w-32 bg-gray-300 border-r-2 border-black"></div>
            <div className="h-12 w-32 bg-gray-200 border-r-2 border-black"></div>
            <div className="h-12 w-32 bg-gray-200"></div>
          </div>
          <div className="p-8">
            <div className="h-8 w-64 bg-gray-300 mb-4"></div>
            <div className="h-24 bg-gray-200 mb-6"></div>
            <div className="h-6 w-48 bg-gray-200 mb-3"></div>
            <div className="h-24 bg-gray-200"></div>
          </div>
        </div>

        {/* Related Archives Skeleton */}
        <section className="border-2 border-black bg-white p-8">
          <div className="h-8 w-48 bg-gray-300 mb-6 border-b-2 border-black pb-4"></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="border-2 border-black bg-gray-100 p-4 h-32">
                <div className="h-6 w-3/4 bg-gray-200 mb-2"></div>
                <div className="h-8 w-full bg-gray-300"></div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

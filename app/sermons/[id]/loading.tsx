import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f1e8] animate-pulse">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button Skeleton */}
        <div className="h-10 w-32 bg-gray-300 mb-6"></div>

        {/* Sermon Header Skeleton */}
        <div className="border-2 border-black bg-white p-8 mb-8">
          <div className="h-4 w-24 bg-gray-200 mb-4"></div>
          <div className="h-10 w-3/4 bg-gray-300 mb-4"></div>
          <div className="h-4 w-1/2 bg-gray-200 mb-4"></div>
          <div className="h-16 bg-gray-200 mb-4"></div>
          <div className="h-8 w-full bg-gray-200 mb-6"></div>
          <div className="grid md:grid-cols-3 gap-2">
            <div className="h-4 w-full bg-gray-200"></div>
            <div className="h-4 w-full bg-gray-200"></div>
            <div className="h-4 w-full bg-gray-200"></div>
          </div>
        </div>

        {/* Media Tabs Skeleton */}
        <div className="border-2 border-black bg-white mb-8">
          <div className="flex border-b-2 border-black">
            <div className="h-12 w-24 bg-gray-300 border-r-2 border-black"></div>
            <div className="h-12 w-24 bg-gray-200 border-r-2 border-black"></div>
            <div className="h-12 w-24 bg-gray-200"></div>
          </div>
          <div className="p-6">
            <div className="aspect-video bg-gray-300 rounded-lg mb-4"></div>
            <div className="h-10 w-full bg-gray-200 mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 mx-auto"></div>
          </div>
        </div>

        {/* Comments Section Skeleton */}
        <section className="border-2 border-black bg-white p-8 mb-8">
          <div className="h-8 w-48 bg-gray-300 mb-6"></div>
          <div className="border-2 border-black p-6 mb-8">
            <div className="h-6 w-48 bg-gray-200 mb-4"></div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="h-10 bg-gray-200"></div>
              <div className="h-10 bg-gray-200"></div>
            </div>
            <div className="h-10 bg-gray-200 mb-4"></div>
            <div className="h-24 bg-gray-200 mb-4"></div>
            <div className="h-10 w-48 bg-gray-300"></div>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-l-4 border-red-600 pl-6 py-4">
                <div className="h-6 w-3/4 bg-gray-200 mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 mb-2"></div>
                <div className="h-12 bg-gray-200"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Sermons Skeleton */}
        <section className="border-2 border-black bg-white p-8">
          <div className="h-8 w-48 bg-gray-300 mb-6 border-b-2 border-black pb-4"></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="border-2 border-black bg-gray-100 p-4 h-24">
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

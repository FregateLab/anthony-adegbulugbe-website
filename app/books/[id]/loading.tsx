import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        {/* Back Button Skeleton */}
        <div className="mb-8">
          <div className="h-10 bg-gray-300 rounded w-32 animate-pulse"></div>
        </div>

        {/* Book Header Skeleton */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Book Cover Skeleton */}
          <div className="text-center">
            <div className="w-full max-w-sm mx-auto h-96 bg-gray-300 rounded mb-6 animate-pulse"></div>
            <div className="flex justify-center gap-2 mb-4">
              <div className="h-6 bg-gray-300 rounded w-20 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-28 animate-pulse"></div>
            </div>
            <div className="h-8 bg-gray-300 rounded w-24 mx-auto mb-6 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Book Details Skeleton */}
          <div className="lg:col-span-2">
            <div className="h-12 bg-gray-300 rounded mb-2 w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded mb-4 w-1/2 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded mb-6 w-1/3 animate-pulse"></div>

            <div className="flex gap-6 mb-6">
              <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-300 rounded w-16 animate-pulse"></div>
                  <div className="h-6 bg-gray-300 rounded w-20 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-3 animate-pulse"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-300 rounded w-20 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded w-18 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="border-b-2 border-gray-300 mb-8">
          <div className="flex gap-8">
            <div className="h-6 bg-gray-300 rounded w-20 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-18 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-16 animate-pulse"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="mb-12">
          <div className="border-2 border-gray-300 bg-white p-8 rounded">
            <div className="h-8 bg-gray-300 rounded mb-6 w-64 animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Author Section Skeleton */}
        <section className="border-2 border-gray-300 bg-white p-8 rounded">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-300 rounded w-48 animate-pulse"></div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            </div>
            <div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

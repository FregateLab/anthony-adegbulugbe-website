import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Books",
  description:
    "Explore books by Pst. (Prof.) Anthony Adegbulugbe covering faith, love, spiritual growth, and Christian living.",
}

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

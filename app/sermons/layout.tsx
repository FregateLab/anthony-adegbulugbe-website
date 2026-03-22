import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sermons",
  description:
    "Discover profound biblical truths through powerful messages by Pst. (Prof.) Anthony Adegbulugbe that inspire, challenge, and transform lives.",
}

export default function SermonsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

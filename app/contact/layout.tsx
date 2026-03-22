import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Pst. (Prof.) Anthony Adegbulugbe for pastoral care, prayer requests, ministry inquiries, and speaking engagements.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

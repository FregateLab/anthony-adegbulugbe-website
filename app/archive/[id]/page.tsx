import { redirect } from "next/navigation"

export default async function ArchiveDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  redirect(`/sermons/${id}`)
}

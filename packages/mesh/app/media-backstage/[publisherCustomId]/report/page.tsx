import { notFound } from 'next/navigation'

import { getPublisherReports } from '@/app/actions/media-backstage'

import Reports from './_components/reports'

export default async function MediaReportPage({
  params: { publisherCustomId },
}: {
  params: { publisherCustomId: string }
}) {
  if (!publisherCustomId) notFound()

  const publisherData = await getPublisherReports({ publisherCustomId })

  const publisherId = publisherData?.publishers?.[0]?.id
  const publisherReports = publisherData?.publishers?.[0]?.statements ?? []

  if (!publisherData || !publisherId) notFound()

  return (
    <main className="max-w-[1120px] grow p-10">
      <Reports reports={publisherReports} publisherId={publisherId} />
    </main>
  )
}

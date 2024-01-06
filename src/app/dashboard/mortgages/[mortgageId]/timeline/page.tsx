'use client'

import Loader from '@/components/Loader'
import VerticalTimelineComponent from '@/components/timeline/vertical-timeline'
import { useGetOneMortgage } from '@/data/hooks/useMortgageClient'
import 'react-vertical-timeline-component/style.min.css'

interface Props {
  params: {
    mortgageId: number
  }
}

const Page = ({ params: { mortgageId } }: Props) => {
  const { data, loading } = useGetOneMortgage(mortgageId)

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-300/40">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-300/40 p-4 dark:bg-gray-800/40">
      <p className="mb-2 text-center text-3xl">Mortgage Timeline</p>
      {data?.history && data?.history.length > 0 && <VerticalTimelineComponent options={data?.history} />}
    </div>
  )
}

export default Page

'use client'

import Loader from '@/components/Loader'
import EditMortgageForm from '@/components/forms/dashboard/mortgage/edit-mortgage-form'
import { useGetOneMortgage } from '@/data/hooks/useMortgageClient'

interface Props {
  params: {
    mortgageId: number
  }
}

const Page = ({ params: { mortgageId } }: Props) => {
  const { data, fetching } = useGetOneMortgage(mortgageId)

  if (fetching) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <section className="mx-auto w-full max-w-[90rem] space-y-8 px-2 py-4">
      <h1 className="text-start text-4xl font-bold">Edit Application</h1>
      <div>{data && <EditMortgageForm data={data} />}</div>
    </section>
  )
}

export default Page

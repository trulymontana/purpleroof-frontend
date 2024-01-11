'use client'

import Loader from "@/components/Loader"
import EditMortgageForm from "@/components/forms/dashboard/mortgage/edit-mortgage-form"
import { useGetOneMortgage } from "@/data/hooks/useMortgageClient"

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
        <section className="px-2 max-w-[90rem] w-full mx-auto py-4 space-y-12">
            <h1 className="text-4xl font-bold text-start">Edit Mortgage</h1>
            <div>
                {data && <EditMortgageForm data={data} />}
            </div>
        </section>
    )
}

export default Page
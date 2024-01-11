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
        <>
            {data && <EditMortgageForm data={data} />}
        </>
    )
}

export default Page
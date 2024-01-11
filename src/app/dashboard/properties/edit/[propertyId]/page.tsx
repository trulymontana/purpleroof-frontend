'use client'

import Loader from "@/components/Loader"
import { useGetOneProperty } from "@/data/hooks/usePropertiesClient"

interface Props {
    params: { propertyId: number }
}

const Page = ({ params: { propertyId } }: Props) => {

    const { data, isFetching } = useGetOneProperty(propertyId)

    if (isFetching) {
        return (
            <div className="flex h-[100vh] items-center justify-center">
                <Loader />
            </div>
        )
    }

    return (
        <section className="px-2 max-w-[90rem] w-full mx-auto py-4 space-y-8">
            <h1 className="text-4xl font-bold text-start">Edit Property</h1>
            <div>
                {/* {data && <EditMortgageForm data={data} />} */}
            </div>
        </section>
    )
}

export default Page
'use client'

import Loader from "@/components/Loader"
import PropertyDetailsCard from "@/components/cards/property-details"
import { useGetOneProperty } from "@/data/hooks/usePropertiesClient"
import Image from "next/image"

interface Props {
    params: { propertyId: number }
}

const Page = ({ params: { propertyId } }: Props) => {
    const { loading, data } = useGetOneProperty(propertyId)

    if (loading) {
        return (
            <div className="flex h-[100vh] items-center justify-center">
                <Loader />
            </div>
        )
    }

    return (
        <>
            <section className="h-[500px] w-full">
                <Image
                    alt="Property Image"
                    className="h-full w-full object-cover"
                    height="500"
                    src={data?.image || "/placeholder.svg"}
                    style={{
                        aspectRatio: '1000/500',
                        objectFit: 'cover'
                    }}
                    width="1000"
                    priority
                    quality={100}
                />
            </section>
            <div className="max-w-7xl flex items-start gap-8 mx-auto p-6 bg-white">
                {data && (
                    <div className='flex flex-col gap-8 w-2/3'>
                        <PropertyDetailsCard data={data} />
                    </div>
                )}
            </div>
        </>
    )
}

export default Page
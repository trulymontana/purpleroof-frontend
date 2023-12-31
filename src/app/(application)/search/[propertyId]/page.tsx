'use client'

import Loader from "@/components/Loader"
import AmenitiesCard from "@/components/cards/amenities"
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
        
        <section className="max-w-[90vw] mx-auto">
            <div className="h-[500px] w-full">
                <Image
                    alt="Property Image"
                    className="h-full w-full object-cover border-b-2"
                    height="500"
                    src={data?.image || "/placeholder.svg"}
                    style={{
                        aspectRatio: '1000/500',
                        objectFit: 'contain'
                    }}
                    width="1000"
                    priority
                    quality={100}
                />
            </div>
            <div className="w-full flex items-center justify-center gap-8 mx-auto p-6">
                {data && (
                    <div className='flex flex-col gap-8 w-2/3'>
                        <PropertyDetailsCard data={data} />
                    </div>
                )}
            </div>
            <div className='w-1/3 space-y-4'>
                {
                    data && (
                        <AmenitiesCard data={data} />
                    )
                }
            </div>
        </section>
    )
}

export default Page
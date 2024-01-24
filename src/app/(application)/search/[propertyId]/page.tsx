'use client'

import Loader from '@/components/Loader'
import AmenitiesCard from '@/components/cards/amenities'
import ContactAgentCard from '@/components/cards/contact-agent'
import PropertyDetailsCard from '@/components/cards/property-details'
import { useGetOnePublicProperty } from '@/data/hooks/useSearchClient'
import Image from 'next/image'

interface Props {
  params: { propertyId: number }
}

const Page = ({ params: { propertyId } }: Props) => {
  const { loading, data } = useGetOnePublicProperty(propertyId)

  if (loading) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <section className="mx-auto w-full md:max-w-[90vw]">
      <div className="h-[500px] w-full">
        <Image
          alt="Property Image"
          className="h-full w-full border-b-2 object-cover"
          height="500"
          src={data?.image || '/placeholder.svg'}
          style={{
            aspectRatio: '1000/500',
            objectFit: 'contain'
          }}
          width="1000"
          priority
          quality={100}
        />
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 p-6 md:flex-row">
        {data && (
          <div className="flex w-full flex-col gap-8 md:w-2/3">
            <PropertyDetailsCard data={data} />
          </div>
        )}
        <div className="w-full space-y-4 md:w-1/3">
          {data && <ContactAgentCard data={data} />}
          {data && <AmenitiesCard data={data} />}
        </div>
      </div>
    </section>
  )
}

export default Page

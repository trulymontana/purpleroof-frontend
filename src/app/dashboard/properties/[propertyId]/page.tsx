'use client'

import Loader from '@/components/Loader'
import { useGetOneProperty } from '@/data/hooks/usePropertiesClient'
import Image from 'next/image'
import RequiredDocumentsCards from '@/components/cards/required-documents'
import PropertyDetailsCard from '@/components/cards/property-details'
import ContactAgentCard from '@/components/cards/contact-agent'
import AmenitiesCard from '@/components/cards/amenities'

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
    <div>
      <section className="h-[500px] w-full">
        <Image
          alt="Property Image"
          className="h-full w-full object-cover"
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
      </section>
      <div className="w-full">
        <div className="mx-auto flex max-w-[90rem] items-start gap-8 p-6 ">
          {data && (
            <div className="flex w-2/3 flex-col gap-8">
              <PropertyDetailsCard data={data} />
            </div>
          )}

          <div className="w-1/3 space-y-4">
            {data && <ContactAgentCard data={data} />}
            {data && <AmenitiesCard data={data} />}
            {data && <RequiredDocumentsCards data={data} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page

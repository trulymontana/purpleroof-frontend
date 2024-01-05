'use client'

import Loader from '@/components/Loader'
import { useGetOneProperty } from '@/data/hooks/usePropertiesClient'
import Image from 'next/image'
import RequiredDocumentsCards from '@/components/cards/required-documents'
import PropertyDetailsCard from '@/components/cards/property-details'
import ContactAgentCard from '@/components/cards/contact-agent'
import AmenitiesCard from '@/components/cards/amenities'
import { useEffect, useState } from 'react'

interface Props {
  params: { propertyId: number }
}

const Page = ({ params: { propertyId } }: Props) => {

  const { loading: pending, data } = useGetOneProperty(propertyId)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (data) {
    return (
      <div className=''>
        <section className="h-[500px] w-full">
          <Image
            alt="Property Image"
            className="h-full w-full object-cover"
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
        </section>
        <div className='w-full'>
          <div className="max-w-[90rem] flex items-start gap-8 mx-auto p-6 ">
            {data && (
              <div className='flex flex-col gap-8 w-2/3'>
                <PropertyDetailsCard data={data} />
              </div>
            )}

            <div className='w-1/3 space-y-4'>
              {
                data && (
                  <ContactAgentCard data={data} />
                )
              }
              {
                data && (
                  <AmenitiesCard data={data} />
                )
              }
              {
                data && (
                  <RequiredDocumentsCards data={data} />
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }


}

export default Page

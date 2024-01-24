'use client'

import Loader from '@/components/Loader'
import { useGetOneProperty } from '@/data/hooks/usePropertiesClient'
import Image from 'next/image'
import RequiredDocumentsCards from '@/components/cards/required-documents'
import PropertyDetailsCard from '@/components/cards/property-details'
import ContactAgentCard from '@/components/cards/contact-agent'
import AmenitiesCard from '@/components/cards/amenities'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

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
    <div className='overflow-hidden'>
      <Dialog>
        <DialogTrigger asChild>
          <section className="cursor-pointer h-[500px] w-full flex px-2 py-3 gap-4 border-2 rounded-lg mx-2 my-4">
            <div className='flex-1'>
              <Image
                alt="Property Image"
                className="h-full w-full object-cover"
                height="1000"
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
            <div className='w-1/4 flex flex-col gap-4 overflow-y-scroll'>
              {data?.photos.map((photo: any, i: number) => (
                <Image
                  key={i}
                  alt="Property Image"
                  className="h-full w-full object-cover"
                  src={photo?.name || '/placeholder.svg'}
                  height="300"
                  width="500"
                  quality={100}
                />
              ))}
            </div>
          </section>
        </DialogTrigger>
        <DialogContent>
          <Carousel>
            <CarouselContent>
              <CarouselItem>...</CarouselItem>
              <CarouselItem>...</CarouselItem>
              <CarouselItem>...</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogContent>
      </Dialog>


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

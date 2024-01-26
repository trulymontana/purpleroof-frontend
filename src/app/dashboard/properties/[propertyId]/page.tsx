'use client'

import Loader from '@/components/Loader'
import { useGetOneProperty } from '@/data/hooks/usePropertiesClient'
import Image from 'next/image'
import RequiredDocumentsCards from '@/components/cards/required-documents'
import PropertyDetailsCard from '@/components/cards/property-details'
import ContactAgentCard from '@/components/cards/contact-agent'
import AmenitiesCard from '@/components/cards/amenities'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

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
    <>
      <Dialog>
        <DialogTrigger asChild>
          <section className="cursor-pointer overflow-x-hidden min-w-screen h-[500px] w-fit flex p-3 gap-2 border-2 rounded-xl my-4 mx-auto">
            <div className='w-3/4'>
              <Image
                alt="Property Image"
                className="h-full w-full object-cover rounded-lg hover:border-2 border-primary"
                height="1000"
                src={data?.image || '/placeholder.svg'}
                width="1000"
                priority
                quality={100}
              />
            </div>
            <div className='w-1/4 flex flex-col gap-2 overflow-y-scroll'>
              {data?.photos.map((photo: any, i: number) => (
                <Image
                  key={i}
                  alt="Property Image"
                  className="h-full w-full object-cover rounded-lg hover:border-2 border-primary"
                  src={photo?.name || '/placeholder.svg'}
                  height="300"
                  width="500"
                  quality={100}
                />
              ))}
            </div>
          </section>
        </DialogTrigger>
        <DialogContent className='min-w-[60vw]'>
          <div className='w-full grid grid-cols-3 gap-5 h-fit overflow-y-scroll'>
            {data?.photos.map((photo: any, i: number) => (
              <Dialog key={i}>
                <DialogTrigger asChild>
                  <Image
                    alt="Property Image"
                    className="h-full w-full object-contain rounded-lg cursor-pointer hover:border-2 border-primary"
                    src={photo?.name || '/placeholder.svg'}
                    height="500"
                    width="500"
                    quality={100}
                  />
                </DialogTrigger>
                <DialogContent className='min-h-[80vh] min-w-[80vw] bg-transparent'>
                  <Image
                    alt="Property Image"
                    className="h-fit w-fit object-cover rounded-lg"
                    src={photo?.name || '/placeholder.svg'}
                    layout='fill'
                    quality={100}
                    priority
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </DialogContent>
      </Dialog >

      <div className="w-full">
        <div className="mx-auto flex flex-col md:flex-row max-w-[90rem] items-start gap-8 p-6">
          {data && (
            <div className="flex w-full md:w-2/3 flex-col gap-8">
              <PropertyDetailsCard data={data} />
            </div>
          )}

          <div className="w-1/3 space-y-4">
            {data && <ContactAgentCard data={data} />}
            {data && data.amenities.length > 0 && <AmenitiesCard data={data} />}
            {data && <RequiredDocumentsCards data={data} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default Page

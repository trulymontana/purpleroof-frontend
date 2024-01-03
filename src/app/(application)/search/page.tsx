'use client'

import { useEffect, useRef } from "react"
import { Property } from '@/data/clients/propertiesClient'
import PropertyCard from '@/components/cards/property-card'
import SearchForm from './_forms/search-form'
import { useSearchProperties } from "@/data/hooks/useSearchClient"

const Page = () => {

  const root = useRef<HTMLDivElement>(null)

  const { data, mutate: searchProperties, isPending: isLoading, isSuccess } = useSearchProperties()

  useEffect(() => {
    if (isSuccess) {
      if (root.current) {
        root.current.scrollIntoView({ behavior: 'auto' })
      }
    }
  }, [isSuccess])

  return (
    <section className='overflow-x-hidden'>
      <div className='relative h-auto min-h-screen'>
        <div className="absolute inset-0 -z-10 h-auto min-h-screen w-full bg-indigo-600 bg-opacity-25 bg-search bg-cover backdrop-opacity-10" />
        <div
          className="t-0 absolute top-0 -z-10 h-full w-full opacity-75"
          style={{
            background: 'linear-gradient(to bottom, #795695 30%, #795695 70%)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative flex flex-col gap-4 px-8 py-12 text-center">
          <h1 className="mt-10 mb-8 text-5xl font-bold text-white">Search a Property Sale or Rent in UAE</h1>
          <div className="flex flex-col items-center gap-5 rounded-lg">
            <div className="flex w-full items-center gap-4">
              <SearchForm searchProperties={searchProperties} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
      <div className='w-screen bg-primary/20'>
        {data?.data ? (
          <div className='relative w-screen min-h-screen h-fit z-20 overflow-y-scroll min-h-calc(100vh - 200px)'>
            <div ref={root} className='pt-10 w-full'>
              <div className="py-1 mx-auto lg:px-8 z-10">
                <h1 className='text-4xl font-bold mb-10 underline  text-primary underline-offset-4'>Properties You Searched For</h1>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-6 pb-10 place-content-center">
                  {data?.data && data.data.length > 0 && data.data?.map((property: Property, i: number) => {
                    return (
                      <PropertyCard key={i} property={property} />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='h-auto bg-primary/20 min-h-screen w-full flex items-center justify-center'>No Properties Found!</div>
        )}
      </div>
    </section>
  )
}

export default Page

'use client'

import { useEffect, useRef } from 'react'
import { Property } from '@/data/clients/propertiesClient'
import PropertyCard from '@/components/cards/property-card'
import SearchForm from './_forms/search-form'
import { useSearchProperties } from '@/data/hooks/useSearchClient'

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
    <section className="overflow-x-hidden">
      <div className="relative h-auto min-h-screen">
        <div className="absolute inset-0 -z-10 h-auto min-h-screen w-full bg-indigo-600 bg-opacity-25 bg-search bg-cover backdrop-opacity-10" />
        <div
          className="t-0 absolute top-0 -z-10 h-full w-full opacity-75"
          style={{
            background: 'linear-gradient(to bottom, #795695 30%, #795695 70%)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative flex flex-col gap-4 px-8 py-12 text-center">
          <h1 className="mb-8 mt-10 text-5xl font-bold text-white">Search a Property Sale or Rent in UAE</h1>
          <div className="flex flex-col items-center gap-5 rounded-lg">
            <div className="flex w-full items-center gap-4">
              <SearchForm searchProperties={searchProperties} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen bg-primary/20">
        {data?.data ? (
          <div className="min-h-calc(100vh - 200px) relative z-20 h-fit min-h-screen w-screen overflow-y-scroll">
            <div ref={root} className="w-full pt-10">
              <div className="z-10 mx-auto py-1 lg:px-8">
                <h1 className="mb-10 text-4xl font-bold text-primary  underline underline-offset-4">
                  Properties You Searched For
                </h1>
                <div className="grid grid-cols-1 place-content-center gap-x-6 gap-y-10 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-6">
                  {data?.data &&
                    data.data.length > 0 &&
                    data.data?.map((property: Property, i: number) => {
                      return <PropertyCard key={i} property={property} />
                    })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-auto min-h-screen w-full items-center justify-center bg-primary/20">
            No Properties Found!
          </div>
        )}
      </div>
    </section>
  )
}

export default Page

'use client'

import { Button } from '@/components/ui/button'
import TabRadioGroup from '@/components/forms/elements/tab-radio-group'
import {
  amenities,
  commercialTypes,
  emirateOptions,
  emiratesWithLocations,
  residentalTypes,
  typesOfProperties
} from '@/constants/advertise'
import { Form } from '@/components/ui/form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { PropertyForEnum, PropertyTypeEnum } from "@/constants/enums"
import { propertyForOptions } from "@/constants/search"
import { useEffect, useRef, useState } from "react"
import MultiSelectElement from "@/components/forms/elements/multiselect-element"
import CustomTabRadioGroup from "@/components/forms/elements/custom-tab-radio-group"
import { TOption } from '@/constants/types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import NumberInputElement from '@/components/forms/elements/number-input-element'
import { useSearchProperties } from '@/data/hooks/useSearchClient'
import { getValuesFrom } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Bath, Bed, MapPin, Tag } from 'lucide-react'
import { Property } from '@/data/clients/propertiesClient'
import currency from '@/lib/currency'


const formSchema = z.object({
  propertyFor: z.string(),
  propertyTypes: z.string(),
  emirates: z.any().optional(),
  locations: z.any().optional(),
  propertyCategories: z.any().optional(),
  bed: z.number().optional(),
  bath: z.number().optional(),
  amenities: z.any().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional()
})

const Page = () => {

  const root = useRef<HTMLDivElement>(null)

  const [locations, setLocations] = useState<TOption[]>([]);

  const { data, mutate: searchProperties, isPending: isLoading, isSuccess } = useSearchProperties()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyFor: PropertyForEnum.SALE,
      propertyTypes: PropertyTypeEnum.RESIDENTIAL
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!Array.isArray(values.propertyTypes)) {
      // @ts-ignore
      values.propertyTypes = [values.propertyTypes]
    }

    values.emirates && (values.emirates = getValuesFrom(values.emirates))
    values.propertyCategories && (values.propertyCategories = getValuesFrom(values.propertyCategories))
    values.amenities && (values.amenities = getValuesFrom(values.amenities))
    values.locations && (values.locations = getValuesFrom(values.locations))

    searchProperties({
      ...values
    })
  }

  const emirates: TOption[] = form.watch('emirates')
  const propertyTypes = form.watch('propertyTypes')
  const propertyCategory = form.watch('propertyCategories')

  useEffect(() => {
    emirates &&
      emirates.length > 0 &&
      emirates.map((emirate: TOption) => {
        // @ts-ignore
        const response: TOption[] = emiratesWithLocations[emirate.value];

        setLocations((prevLocations: any) => [...prevLocations, ...response]);
      });
  }, [emirates]);

  useEffect(() => {
    if (isSuccess) {
      if (root.current) {
        root.current.scrollIntoView({ behavior: 'auto' })
      }
    }
  }, [isSuccess])

  return (
    <section className="">
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto flex w-3/4 flex-col gap-2 rounded-xl bg-white">
                  <div className="flex-1 mx-auto py-4">
                    <CustomTabRadioGroup name="propertyFor" options={propertyForOptions} />
                  </div>
                  <div className="flex-1 mx-auto py-4">
                    <TabRadioGroup name="propertyTypes" options={typesOfProperties} />
                  </div>
                  <div className="p-4 gap-5 rounded-lg flex flex-col items-center">
                    <div className="w-full flex items-center gap-4">
                      <div className="flex-1">
                        <MultiSelectElement name="emirates" placeholder="Please select emirates" options={emirateOptions} />
                      </div>
                      <div className='flex-1'>
                        <MultiSelectElement disabled={!emirates || emirates.length === 0} name="locations" placeholder={!emirates || emirates?.length === 0 ? "Please select atleast one emirate" : "Please select locations"} options={locations!} />
                      </div>
                      <div className="flex-1">
                        <MultiSelectElement name="propertyCategories" options={propertyCategory === PropertyTypeEnum.RESIDENTIAL ? residentalTypes : commercialTypes} placeholder="Please select a Property Category" />
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-center gap-4">
                      {
                        propertyTypes === PropertyTypeEnum.RESIDENTIAL && (
                          <>
                            <div className="w-[10%]">
                              <NumberInputElement name='bed' placeholder='No. of Bedrooms' />
                            </div>
                            <div className="w-[10%]">
                              <NumberInputElement name='bath' placeholder='No. of Bathrooms' />
                            </div>
                            <div className="flex-1">
                              <MultiSelectElement name="amenities" placeholder="Select Amenities" options={amenities} />
                            </div>
                          </>
                        )
                      }
                      <div className={propertyTypes === PropertyTypeEnum.RESIDENTIAL ? "" : "w-full"}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='flex-1 w-full'>Select Price Range</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full p-4">
                            <div className="flex w-full max-w-sm items-center space-x-2">
                              <NumberInputElement placeholder='0' name='minPrice' label='Min Price (in AED)' />
                              <NumberInputElement placeholder='10032100' name='maxPrice' label='Max Price (in AED)' />
                            </div>
                            <DropdownMenuSeparator />
                            <div className="flex justify-between">
                              <Button onClick={() => {
                                form.setValue("minPrice", 0)
                                form.setValue("maxPrice", 0)
                              }} className="w-1/2 mr-2" variant="outline">
                                Reset
                              </Button>

                              <Button className="w-1/2 ml-2">
                                Done
                              </Button>
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <Button disabled={isLoading} type='submit' className="w-full bg-primary">{isLoading ? "Finding Properties..." : "Find Properties"}</Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {data?.data && (
        <div className='relative h-auto min-h-screen'>
          <div ref={root} className='absolute pt-10 bg-gray-100 w-full'>
            <div className="max-w-2xl px-6 py-1 mx-auto lg:max-w-7xl lg:px-8 z-10">
              <h1 className='text-4xl font-bold mb-10 underline underline-offset-4'>Properties You Searched For</h1>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-6 pb-10">
                {data?.data && data.data.length > 0 && data.data?.map((property: Property, i: number) => {
                  return (
                    <Card key={i} className="max-w-sm rounded-lg">
                      <Image
                        alt="Property Image"
                        className="w-full h-64 object-cover border-b-2"
                        height="256"
                        src={property?.image || "/placeholder.svg"}
                        style={{
                          aspectRatio: "256/256",
                          objectFit: "cover",
                        }}
                        width="256"
                      />
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg font-semibold line-clamp-2 h-[60px]">{property?.name}</CardTitle>
                        <CardDescription className="text-gray-500">{property?.location}</CardDescription>
                      </CardHeader>
                      <CardContent className="px-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <p className="text-sm capitalize font-bold">{property.emirate?.toLocaleLowerCase().replaceAll("_", " ")}</p>
                          </div>
                          {property?.rentalAmount && (
                            <div className="flex items-center space-x-2">
                              <Tag className="w-4 h-4" />
                              <p className="text-sm font-bold">{currency.format(property.rentalAmount)} / {property?.paymentInterval}</p>
                            </div>
                          )}

                          {
                            property?.amount && (
                              <div className="flex items-center space-x-2">
                                <p className="text-sm font-bold">{currency.format(property.amount)}</p>
                              </div>
                            )
                          }
                        </div>
                        <div className="flex items-center justify-between">
                          {property?.numberOfBathRooms && property?.numberOfBedRooms && (
                            <>
                              <div className="flex items-center space-x-2">
                                <Bed className="w-4 h-4" />
                                <p className="text-sm font-bold">{property.numberOfBedRooms} Beds</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Bath className="w-4 h-4" />
                                <p className="text-sm">{property.numberOfBathRooms} Baths</p>
                              </div>
                            </>
                          )}
                          {property?.numberOfLavatory && (
                            <>
                              <div className="flex items-center space-x-2">
                                <Bath className="w-4 h-4" />
                                <p className="text-sm font-bold">{property.numberOfLavatory} Baths</p>
                              </div>
                            </>
                          )}
                        </div>
                        <p className="text-sm line-clamp-3">
                          This stylish apartment is located in the heart of the city, close to shopping centers, restaurants, and
                          parks. It&apos;s perfect for anyone looking to experience the city life.
                        </p>
                      </CardContent>
                      <CardFooter className="p-4">
                        <Link className='w-full' href={`/search/${property.id}`} >
                          <Button className="w-full">View More Details</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Page

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
import { useEffect, useState } from "react"
import MultiSelectElement from "@/components/forms/elements/multiselect-element"
import CustomTabRadioGroup from "@/components/forms/elements/custom-tab-radio-group"
import { TOption } from '@/constants/types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import NumberInputElement from '@/components/forms/elements/number-input-element'
import { useSearchProperties } from '@/data/hooks/useSearchClient'
import { getValuesFrom } from '@/lib/utils'


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
  const [locations, setLocations] = useState<TOption[]>([]);

  const { data, mutate: searchProperties, isPending: isLoading } = useSearchProperties()

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

    values.emirates = getValuesFrom(values.emirates)
    values.propertyCategories = getValuesFrom(values.propertyCategories)
    values.amenities = getValuesFrom(values.amenities)
    values.locations = getValuesFrom(values.locations)

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

  const formFields = form.getValues();

  // console.log({ formFields })

  return (
    <section className="relative h-auto min-h-screen">
      <div className="absolute inset-0 -z-10 h-auto min-h-screen w-full bg-indigo-600 bg-opacity-25 bg-search bg-cover backdrop-opacity-10" />
      <div
        className="t-0 absolute top-0 -z-10 h-full w-full opacity-75"
        style={{
          background: 'linear-gradient(to bottom, #795695 30%, #795695 70%)'
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative flex flex-col gap-4 px-8 py-12 text-center">
        <h1 className="mb-2 text-5xl font-bold text-white">Search a Property Sale or Rent in UAE</h1>
        <div className="mb-8 mt-10 flex items-center justify-center space-x-4"></div>

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
                            <NumberInputElement name='bed' placeholder='Number of Bedrooms' />
                          </div>
                          <div className="w-[10%]">
                            <NumberInputElement name='bath' placeholder='Number of Bathrooms' />
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
    </section>
  )
}

export default Page

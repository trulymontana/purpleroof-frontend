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

import { PropertyForEnum, PropertyTypeEnum } from '@/constants/enums'
import { propertyForOptions } from '@/constants/search'
import { useEffect, useState } from 'react'
import MultiSelectElement from '@/components/forms/elements/multiselect-element'
import CustomTabRadioGroup from '@/components/forms/elements/custom-tab-radio-group'
import { TOption } from '@/constants/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import NumberInputElement from '@/components/forms/elements/number-input-element'
import { useSearchProperties } from '@/data/hooks/useSearchClient'
import { getValuesFrom } from '@/lib/utils'
import { UseMutateFunction } from '@tanstack/react-query'

interface Props {
  searchProperties: UseMutateFunction<any, any, any, unknown>
  isLoading: boolean
}

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

const SearchForm = ({ searchProperties, isLoading }: Props) => {
  const [locations, setLocations] = useState<TOption[]>([])
  const [isOpen, setIsOpen] = useState(false)

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
        const response: TOption[] = emiratesWithLocations[emirate.value]
        setLocations((prevLocations: any) => [...prevLocations, ...response])
      })
  }, [emirates])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto flex w-3/4 flex-col gap-2 rounded-xl bg-white">
        <div className="mx-auto flex-1 py-4">
          <CustomTabRadioGroup name="propertyFor" options={propertyForOptions} />
        </div>
        <div className="mx-auto flex-1 py-4">
          <TabRadioGroup name="propertyTypes" options={typesOfProperties} />
        </div>
        <div className="flex flex-col items-center gap-5 rounded-lg p-4">
          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <MultiSelectElement name="emirates" placeholder="Please select emirates" options={emirateOptions} />
            </div>
            <div className="flex-1">
              <MultiSelectElement
                disabled={!emirates || emirates.length === 0}
                name="locations"
                placeholder={
                  !emirates || emirates?.length === 0 ? 'Please select atleast one emirate' : 'Please select locations'
                }
                options={locations!}
              />
            </div>
            <div className="flex-1">
              <MultiSelectElement
                name="propertyCategories"
                options={propertyCategory === PropertyTypeEnum.RESIDENTIAL ? residentalTypes : commercialTypes}
                placeholder="Please select a Property Category"
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-4">
            {propertyTypes === PropertyTypeEnum.RESIDENTIAL && (
              <>
                <div className="w-[10%]">
                  <NumberInputElement name="bed" placeholder="No. of Bedrooms" />
                </div>
                <div className="w-[10%]">
                  <NumberInputElement name="bath" placeholder="No. of Bathrooms" />
                </div>
                <div className="flex-1">
                  <MultiSelectElement name="amenities" placeholder="Select Amenities" options={amenities} />
                </div>
              </>
            )}
            <div className={propertyTypes === PropertyTypeEnum.RESIDENTIAL ? '' : 'w-full'}>
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full flex-1">
                    Select Price Range
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full p-4">
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <NumberInputElement placeholder="0" name="minPrice" label="Min Price (in AED)" />
                    <NumberInputElement placeholder="10032100" name="maxPrice" label="Max Price (in AED)" />
                  </div>
                  <DropdownMenuSeparator />
                  <div className="flex justify-between">
                    <Button
                      onClick={() => {
                        form.setValue('minPrice', 0)
                        form.setValue('maxPrice', 0)
                      }}
                      className="mr-2 w-1/2"
                      variant="outline"
                    >
                      Reset
                    </Button>

                    <Button onClick={() => setIsOpen(!isOpen)} className="ml-2 w-1/2">
                      Done
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Button disabled={isLoading} type="submit" className="w-full bg-primary">
            {isLoading ? 'Finding Properties...' : 'Find Properties'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SearchForm

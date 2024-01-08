'use client'
import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import SelectElement from '@/components/forms/elements/select-element'
import { amenities, furnishingStatuses, propertyTypes } from '@/constants/advertise'
import MultiSelectCheckbox from '@/components/forms/elements/checkbox-element'
import { useRouter } from 'next/navigation'
import { TOption } from '@/constants/types'
import { BackButton } from '@/components/navigation/back-button'
import { PageRoutes } from '@/constants/page-routes'
import NumberInputElement from '@/components/forms/elements/number-input-element'

const formSchema = z.object({
  holdingType: z.string({
    required_error: 'Please select a property type!'
  }),
  furnishingStatus: z.string({
    required_error: 'Please select your property status'
  }),
  parkingSpaces: z.number().optional(),
  airportDistance: z.number().optional(),
  metroStationDistance: z.number().optional(),
  nearbyPlaces: z.string().optional(),
  otherFeatures: z.string().optional()
})

interface Props {
  onSave: (step: string, values: any) => void
}

const AmenitiesForm = ({ onSave }: Props) => {
  const router = useRouter()

  const [selectedAmenities, setSelectedAmenities] = useState<TOption[]>([])

  const storedValue = localStorage.getItem(PageRoutes.advertise.AMENITIES_DETAILS)

  const defaultValues: z.infer<typeof formSchema> & { amenities: TOption[] } =
    storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  useEffect(() => {
    if (defaultValues?.amenities) {
      setSelectedAmenities(defaultValues.amenities)
    }
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = values
    // @ts-ignore
    data.amenities = selectedAmenities
    onSave(PageRoutes.advertise.AMENITIES_DETAILS, data)
    router.push(PageRoutes.advertise.PROJECT_STATUS)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <SelectElement
          name="holdingType"
          label={'Holding Type'}
          placeholder="Please select a property type"
          options={propertyTypes}
        />

        <SelectElement
          name="furnishingStatus"
          label={'Status'}
          placeholder="Please select a status"
          options={furnishingStatuses}
        />

        <NumberInputElement
          name="parkingSpaces"
          placeholder="Please enter parking spaces"
          label={'Number of Parking Spaces'}
        />

        <MultiSelectCheckbox
          name="amenities"
          classNames="grid-cols-2"
          options={amenities}
          selectedBoxes={selectedAmenities}
          setSelectedBoxes={setSelectedAmenities}
        />

        <NumberInputElement
          name="airportDistance"
          placeholder="Please enter airport distance"
          label={'Distance from Airport (in km)'}
        />

        <NumberInputElement
          name="metroStationDistance"
          placeholder="Please enter metro station"
          label={'Nearby Metro Station (in km)'}
        />

        <InputElement name="nearbyPlaces" placeholder="Please enter nearby places" label={'Other Nearby Places'} />

        <InputElement name="otherFeatures" placeholder="Please enter other features" label={'Other Main Features'} />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
        <BackButton route={PageRoutes.advertise.LOCATION_DETAILS} />
      </form>
    </Form>
  )
}

export default AmenitiesForm

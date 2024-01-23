'use client'
import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import { buildingAmenities, communityAmenities, propertyAmenities } from '@/constants/advertise'
import MultiSelectCheckbox from '@/components/forms/elements/checkbox-element'
import { useRouter } from 'next/navigation'
import { TOption } from '@/constants/types'
import { BackButton } from '@/components/navigation/back-button'
import { PageRoutes } from '@/constants/page-routes'
import NumberInputElement from '@/components/forms/elements/number-input-element'

const formSchema = z.object({
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
    router.push(PageRoutes.advertise.LOCATION_DETAILS)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">

        <div className='flex flex-col gap-10 py-4'>
          <MultiSelectCheckbox
            name="amenities"
            label='Property Amenities'
            classNames="grid-cols-2"
            options={propertyAmenities}
            selectedBoxes={selectedAmenities}
            setSelectedBoxes={setSelectedAmenities}
          />

          <MultiSelectCheckbox
            name="amenities"
            label='Building Amenities'
            classNames="grid-cols-2"
            options={buildingAmenities}
            selectedBoxes={selectedAmenities}
            setSelectedBoxes={setSelectedAmenities}
          />

          <MultiSelectCheckbox
            name="amenities"
            label='Community Amenities'
            classNames="grid-cols-2"
            options={communityAmenities}
            selectedBoxes={selectedAmenities}
            setSelectedBoxes={setSelectedAmenities}
          />
        </div>

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
        <BackButton route={PageRoutes.advertise.ADDITIONAL_DETAILS} />
      </form>
    </Form>
  )
}

export default AmenitiesForm

'use client'
import React, { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import SelectElement from '@/components/forms/elements/select-element'
import { advertiseSteps, amenities, propertyTypes, statuses } from '@/constants/advertise'
import MultiSelectCheckbox from '@/components/forms/elements/checkbox-element'
import { useRouter } from 'next/navigation'
import { TOption } from '@/constants/types'
import { AdvertiseKeys } from '@/constants/local-storage-keys'


const formSchema = z.object({
  property_type: z.string({
    required_error: "Please select a property type!"
  }),
  status: z.string({
    required_error: "Please select your property status"
  }),
  parking_spaces: z.string().optional(),
  airport_distance: z.string().optional(),
  metro_station: z.string().optional(),
  nearby_places: z.string().optional(),
  other_features: z.string().optional()
})

interface Props {
  onSave: (step: string, values: any) => void
}

const AmenitiesForm = ({ onSave }: Props) => {

  const router = useRouter();

  const [selectedAmenities, setSelectedAmenities] = useState<TOption[]>([]);

  const storedValue = localStorage.getItem(AdvertiseKeys.AMENITIES_DETAILS);

  const defaultValues: z.infer<typeof formSchema> & { amenities: TOption[] } = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  useEffect(() => {
    if (defaultValues?.amenities) {
      setSelectedAmenities(defaultValues.amenities);
    }
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = values;
    // @ts-ignore
    data.amenities = selectedAmenities
    onSave(AdvertiseKeys.AMENITIES_DETAILS, data)
    router.push(advertiseSteps.PROJECT_STATUS)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 p-4"
      >
        <SelectElement
          name='property_type'
          label={"Property Type"}
          placeholder='Please select a property type'
          options={propertyTypes}
        />

        <SelectElement
          name='status'
          label={"Status"}
          placeholder='Please select a status'
          options={statuses}
        />

        <InputElement name="parking_spaces" placeholder='Please enter parking spaces' label={'Number of Parking Spaces'} />

        <MultiSelectCheckbox name='amenities' classNames='grid-cols-2' options={amenities} selectedBoxes={selectedAmenities} setSelectedBoxes={setSelectedAmenities} />

        <InputElement name="airport_distance" placeholder='Please enter airport distance' label={'Distance from Airport (in km)'} />

        <InputElement name="metro_station" placeholder='Please enter metro station' label={'Nearby Metro Station (in km)'} />

        <InputElement name="nearby_places" placeholder='Please enter nearby places' label={'Other Nearby Places'} />

        <InputElement name="other_features" placeholder='Please enter other features' label={'Other Main Features'} />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
        <Button type='button' variant="outline" onClick={() => router.push(advertiseSteps.LOCATION_DETAILS)} className="w-full">
          Go Back
        </Button>
      </form>
    </Form>
  )
}

export default AmenitiesForm
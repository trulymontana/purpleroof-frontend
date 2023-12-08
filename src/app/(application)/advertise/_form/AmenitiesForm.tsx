'use client'
import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import SelectElement from '@/components/forms/elements/select-element'
import { Amenities, CommercialTypes, PropertyTypes, ResidentalTypes, Statuses } from '@/constants/advertise'
import MultiSelectCheckbox from '@/components/forms/elements/checkbox-element'
import { useRouter } from 'next/navigation'

type TOption = {
  label: string
  value: string
}

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

  // @ts-ignore
  const amenities_details: z.infer<typeof formSchema> = JSON.parse(localStorage.getItem("advertise/amenities"))

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      property_type: amenities_details?.property_type ?? "",
      status: amenities_details?.status ?? "",
      parking_spaces: amenities_details?.parking_spaces ?? "",
      airport_distance: amenities_details?.airport_distance ?? "",
      metro_station: amenities_details?.metro_station ?? "",
      other_features: amenities_details?.other_features ?? "",
      nearby_places: amenities_details?.nearby_places ?? ""
    }
  })

  // // @ts-ignore
  // if (amenities_details?.amenities) {
  //   // @ts-ignore
  //   setSelectedAmenities(amenities_details?.amenities);
  // }


  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = values;
    // @ts-ignore
    data.amenities = selectedAmenities
    onSave("amenities", data)
    router.push(`/advertise/project-status`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[28rem] space-y-4 p-4 shadow-md"
      >
        <SelectElement
          name='property_type'
          label={"Property Type"}
          options={PropertyTypes}
        />

        <SelectElement
          name='status'
          label={"Status"}
          options={Statuses}
        />

        <InputElement name="parking_spaces" label={'Number of Parking Spaces'} />

        <MultiSelectCheckbox name='amenities' classNames='grid-cols-2' options={Amenities} selectedBoxes={selectedAmenities} setSelectedBoxes={setSelectedAmenities} />

        <InputElement name="airport_distance" label={'Distance from Airport (in km)'} />

        <InputElement name="metro_station" label={'Nearby Metro Station (in km)'} />

        <InputElement name="nearby_places" label={'Other Nearby Places'} />

        <InputElement name="other_features" label={'Other Main Features'} />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
        <Button type='button' onClick={() => router.push(`/advertise/location-details`)} className="w-full">
          Go Back
        </Button>
      </form>
    </Form>
  )
}

export default AmenitiesForm
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import { emirateOptions } from '@/constants/advertise'
import SelectElement from '@/components/forms/elements/select-element'
import { useRouter } from 'next/navigation'
import { BackButton } from '@/components/navigation/back-button'
import { PageRoutes } from '@/constants/page-routes'
import NumberInputElement from '@/components/forms/elements/number-input-element'
import MapComponent from '@/components/MapPicker'
import { useGetLocations } from '@/data/hooks/useLocationsClient'
import { EmirateEnum } from '@/constants/enums'

const formSchema = z.object({
  emirate: z.nativeEnum(EmirateEnum, {
    required_error: 'Please select a Emirate!'
  }),
  locationId: z.string({
    required_error: 'Please select a Location!'
  }),
  cityName: z.string().optional(),
  communityName: z.string().optional(),
  buildingName: z.string().optional(),
  floor: z.number().optional(),
  street: z.string().optional(),
  unitNumber: z.number().optional(),
  landmark: z.string().optional(),
  lat: z
    .number({
      required_error: 'Please select a lat'
    })
    .optional(),
  lng: z
    .number({
      required_error: 'Please select a long'
    })
    .optional()
})

interface Props {
  onSave: (step: string, values: any) => void
}

const LocationDetailsForm = ({ onSave }: Props) => {
  const router = useRouter()

  const storedValue = localStorage.getItem(PageRoutes.advertise.LOCATION_DETAILS)

  const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const selectedEmirate = form.watch('emirate')
  const { data: locationOptions } = useGetLocations([selectedEmirate])

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(PageRoutes.advertise.LOCATION_DETAILS, values)
    router.push(PageRoutes.advertise.CALL_PREFERENCE)
  }

  const location = form.watch("locationId");

  locationOptions && locationOptions?.length > 0 && locationOptions?.push({ label: "Other", value: '99999' })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">

        <MapComponent
          onSelectLocation={({ lat, lng }) => {
            form.setValue('lat', lat)
            form.setValue('lng', lng)
          }}
        />

        <SelectElement name="emirate" label="Emirate" options={emirateOptions} placeholder="Please select a emirate" />

        <SelectElement
          name="locationId"
          label="Location"
          options={locationOptions || [{ label: 'Dubai', value: '1' }]}
          placeholder={!selectedEmirate ? 'Please select emirate first' : 'Please select a location'}
          disabled={!selectedEmirate}
        />

        {location === '99999' && <InputElement
          name="cityName"
          placeholder="Please enter your city name"
          label={'City Name (optional)'}
        />}

        <InputElement
          name="communityName"
          placeholder="Please enter your community name"
          label={'Community Name (optional)'}
        />

        <InputElement
          name="buildingName"
          placeholder="Please enter your building name"
          label={'Building / Cluster Name (optional)'}
        />
        <NumberInputElement name="floor" placeholder="Please enter your floor" label={'Floor (optional)'} />
        <InputElement name="street" placeholder="Please enter your street name" label={'Street (optional)'} />
        <NumberInputElement name="unitNumber" placeholder="Please enter your unit number" label={'Unit Number (optional)'} />
        <InputElement name="landmark" placeholder="Please enter a landmark" label={'Nearest Landmark (optional)'} />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
        <BackButton route={PageRoutes.advertise.AMENITIES_DETAILS} />
      </form>
    </Form>
  )
}

export default LocationDetailsForm

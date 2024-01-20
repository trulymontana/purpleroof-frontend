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
  communityName: z.string({
    required_error: 'Please enter your Building name!'
  }),
  buildingName: z.string({
    required_error: 'Please enter your Building name!'
  }),
  floor: z.number({
    required_error: 'Please enter your floor'
  }),
  street: z.string({
    required_error: 'Please enter Street number'
  }),
  unitNumber: z.number({
    required_error: 'Please enter Unit number'
  }),
  landmark: z.string({
    required_error: 'Please enter a landmark'
  }),
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
    router.push(PageRoutes.advertise.AMENITIES_DETAILS)
  }

  const location = form.watch("locationId");

  // @ts-ignore
  const basicDetails = JSON.parse(localStorage.getItem(PageRoutes.advertise.BASIC_DETAILS));

  locationOptions && locationOptions?.length > 0 && locationOptions?.push({ label: "Other", value: 'other' })

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

        {location === 'other' && <InputElement
          name="cityName"
          placeholder="Please enter your city name"
          label={'City Name'}
        />}

        <InputElement
          name="communityName"
          placeholder="Please enter your community name"
          label={'Community Name'}
        />

        <InputElement
          name="buildingName"
          placeholder="Please enter your building name"
          label={'Building / Cluster Name'}
        />
        <NumberInputElement name="floor" placeholder="Please enter your floor" label={'Floor'} />
        <InputElement name="street" placeholder="Please enter your street name" label={'Street'} />
        <NumberInputElement name="unitNumber" placeholder="Please enter your unit number" label={'Unit Number'} />
        <InputElement name="landmark" placeholder="Please enter a landmark" label={'Nearest Landmark'} />



        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
        <BackButton route={`${PageRoutes.advertise.PROPERTY_DETAILS}?categoryType=${basicDetails?.propertyFor}`} />
      </form>
    </Form>
  )
}

export default LocationDetailsForm

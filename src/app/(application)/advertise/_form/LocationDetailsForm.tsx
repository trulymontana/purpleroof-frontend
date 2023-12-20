'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import { emirateOptions, emiratesWithLocations } from '@/constants/advertise'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SelectElement from '@/components/forms/elements/select-element'
import { useRouter } from 'next/navigation'
import { BackButton } from '@/components/navigation/back-button'
import { PageRoutes } from '@/constants/page-routes'
import FileUploader from '@/components/forms/elements/file-uploader'
import NumberInputElement from '@/components/forms/elements/number-input-element'
import { TOption } from '@/constants/types'

const formSchema = z.object({
  emirate: z.string({
    required_error: 'Please select a Emirate!'
  }),
  locationId: z.string({
    required_error: 'Please select a Location!'
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
  propertyPhotos: z.string({
    required_error: 'Please upload a property image'
  })
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(PageRoutes.advertise.LOCATION_DETAILS, values)
    router.push(PageRoutes.advertise.AMENITIES_DETAILS)
  }

  const selectedEmirate = form.watch('emirate')

  // @ts-ignore
  const locations = selectedEmirate ? emiratesWithLocations[selectedEmirate] : []

  // @ts-ignore
  const basicDetails = JSON.parse(localStorage.getItem(PageRoutes.advertise.BASIC_DETAILS))

  const property_image = form.watch('propertyPhotos')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">

        <SelectElement name='emirate' label='Emirate' options={emirateOptions} placeholder='Please select a emirate' />

        <SelectElement
          name="locationId"
          label="Location"
          options={locations}
          placeholder={!selectedEmirate ? 'Please select emirate first' : 'Please select a location'}
          disabled={!selectedEmirate}
        />

        <InputElement
          name="buildingName"
          placeholder="Please enter your building name"
          label={'Building / Cluster Name'}
        />
        <NumberInputElement name="floor" placeholder="Please enter your floor" label={'Floor'} />
        <InputElement name="street" placeholder="Please enter your street name" label={'Street'} />
        <NumberInputElement name="unitNumber" placeholder="Please enter your unit number" label={'Unit Number'} />
        <InputElement name="landmark" placeholder="Please enter a landmark" label={'Landmark'} />
        <FileUploader folder="advertise" name="propertyPhotos" label={'Upload Photo of the Property'} form={form} />

        <Button type="submit" disabled={!property_image} className="w-full">
          Save and Continue
        </Button>
        <BackButton route={`${PageRoutes.advertise.PROPERTY_DETAILS}?categoryType=${basicDetails?.propertyFor}`} />
      </form>
    </Form>
  )
}

export default LocationDetailsForm

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import 'react-international-phone/style.css'
import { PageRoutes } from '@/constants/page-routes'
import { BackButton } from '@/components/navigation/back-button'
import NumberInputElement from '@/components/forms/elements/number-input-element'
import SelectElement from '../elements/select-element'
import { completionStatuses, furnishingStatuses } from '@/constants/advertise'
import { FurnishingStatusEnum, PropertyCompletionStatusEnum } from '@/constants/enums'
import { MAX_NUMBER } from '@/constants/api'

const formSchema = z.object({
  size: z.number({
    required_error: 'Please enter a property size'
  }).max(MAX_NUMBER, { message: `Value should be less than or equal to ${MAX_NUMBER}` }),
  numberOfBedRooms: z.number().max(MAX_NUMBER, { message: `Value should be less than or equal to ${MAX_NUMBER}` }).optional(),
  numberOfBathRooms: z.number().min(1, { message: "Number of bathrooms should be greater than 0" }).max(MAX_NUMBER, { message: `Value should be less than or equal to ${MAX_NUMBER}` }).optional(),
  parkingSpaces: z.number().max(MAX_NUMBER, { message: `Value should be less than or equal to ${MAX_NUMBER}` }).optional(),
  completionStatus: z.nativeEnum(PropertyCompletionStatusEnum, {
    required_error: "Please select property completion status!"
  }),
  furnishingStatus: z.nativeEnum(FurnishingStatusEnum, {
    required_error: 'Please select a furnishing status'
  })
})

interface Props {
  onSave: (step: string, values: any) => void
}

const PropertyDetailsForm = ({ onSave }: Props) => {
  const router = useRouter()

  const storedValue = localStorage.getItem(PageRoutes.advertise.PROPERTY_DETAILS)

  const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(PageRoutes.advertise.PROPERTY_DETAILS, values)
    router.push(PageRoutes.advertise.PROJECT_STATUS)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">

        <NumberInputElement name="size" placeholder="Please enter your property size" label={'Property Size (Sqft)'} />

        <NumberInputElement name="numberOfBedRooms" label={'Number of Bed Rooms'} />
        <NumberInputElement name="numberOfBathRooms" label={'Number of Bath Rooms'} />

        <NumberInputElement
          name="parkingSpaces"
          placeholder="Please enter parking spaces"
          label={'Number of Parking Spaces'}
        />

        <SelectElement name="completionStatus" label="Completion Status" options={completionStatuses} placeholder='Please select completion status' />

        <SelectElement
          name="furnishingStatus"
          label={'Furnish Type'}
          placeholder="Please select a furnish type"
          options={furnishingStatuses}
        />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
        <BackButton route={PageRoutes.advertise.BASIC_DETAILS} />
      </form>
    </Form>
  )
}

export default PropertyDetailsForm

'use client'
import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import SelectElement from '@/components/forms/elements/select-element'
import { completionStatuses, furnishingStatuses, paymentIntervals } from '@/constants/advertise'
import { useRouter } from 'next/navigation'
import { PageRoutes } from '@/constants/page-routes'
import NumberInputElement from '@/components/forms/elements/number-input-element'
import { FurnishingStatusEnum, PropertyCompletionStatusEnum } from '@/constants/enums'

const formSchema = z.object({
  rentalAmount: z.number({
    required_error: 'Please enter a rental amount'
  }),
  paymentInterval: z.string({
    required_error: 'Please select a payment interval'
  }),
  size: z.number({
    required_error: 'Please enter a property size!'
  }),
  minimumContract: z.number({
    required_error: 'Please enter a minimum contract period!'
  }),
  numberOfBedRooms: z.string().optional(),
  numberOfBathRooms: z.string().optional(),
  parkingSpaces: z.number().optional(),
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

const RentPropertyDetailsForm = ({ onSave }: Props) => {
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
        <NumberInputElement
          name="rentalAmount"
          placeholder="Please enter rental amount"
          label={'Rental Amount (AED)'}
        />
        <SelectElement name="paymentInterval" label="Payment Interval" options={paymentIntervals} />
        <NumberInputElement name="size" placeholder="Please enter property size" label={'Property Size (Sqft)'} />
        <NumberInputElement
          name="minimumContract"
          placeholder="Please enter minimum contract period"
          label={'Minimum Contract (in months)'}
        />

        <NumberInputElement name="numberOfBedRooms" label={'Number of Bed Rooms (optional)'} />
        <NumberInputElement name="numberOfBathRooms" label={'Number of Bath Rooms (optional)'} />

        <NumberInputElement
          name="parkingSpaces"
          placeholder="Please enter parking spaces"
          label={'Number of Parking Spaces (optional)'}
        />

        <SelectElement name="completionStatus" label="Completion Status" options={completionStatuses} />

        <SelectElement
          name="furnishingStatus"
          label={'Furnish Type'}
          placeholder="Please select a furnish type"
          options={furnishingStatuses}
        />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>

        <Button
          variant="outline"
          type="button"
          onClick={() => router.push(PageRoutes.advertise.BASIC_DETAILS)}
          className="w-full"
        >
          Go Back
        </Button>
      </form>
    </Form>
  )
}

export default RentPropertyDetailsForm

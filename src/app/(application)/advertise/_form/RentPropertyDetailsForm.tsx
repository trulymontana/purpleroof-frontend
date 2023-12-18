'use client'
import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import SelectElement from '@/components/forms/elements/select-element'
import { bathRooms, bedRooms, lavatories, paymentIntervals } from '@/constants/advertise'
import { useRouter } from 'next/navigation'
import PhoneNumberInputElement from '@/components/forms/elements/phone-number-input'
import { PageRoutes } from '@/constants/page-routes'

const formSchema = z.object({
  phone: z
    .string({
      required_error: 'Please enter a valid phone number.'
    })
    .min(10, {
      message: 'Phone number must be at least 10 characters.'
    }),
  rental_amount: z.string({
    required_error: 'Please enter a rental amount'
  }),
  payment_interval: z.string({
    required_error: 'Please select a payment interval'
  }),
  property_size: z.string({
    required_error: 'Please enter a property size!'
  }),
  minimum_contract: z.string({
    required_error: 'Please enter a minimum contract period!'
  }),
  bed_rooms: z.string().optional(),
  bath_rooms: z.string().optional(),
  lavatories: z.string().optional(),
  deed_number: z.string({
    required_error: 'Please enter your Deed Number'
  })
})

interface Props {
  onSave: (step: string, values: any) => void
}

const RentPropertyDetailsForm = ({ onSave }: Props) => {
  const router = useRouter()

  const basic_details = localStorage.getItem(PageRoutes.advertise.BASIC_DETAILS)

  const storedValue = localStorage.getItem(PageRoutes.advertise.PROPERTY_DETAILS)

  const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(PageRoutes.advertise.PROPERTY_DETAILS, values)
    router.push(PageRoutes.advertise.LOCATION_DETAILS)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <PhoneNumberInputElement name="phone" label="Phone Number" />
        <InputElement
          name="rental_amount"
          type="number"
          placeholder="Please enter rental amount"
          label={'Rental Amount (AED)'}
        />
        <SelectElement name="payment_interval" label="Payment Interval" options={paymentIntervals} />
        <InputElement
          name="property_size"
          placeholder="Please enter property size"
          type="number"
          label={'Property Size (Sqft)'}
        />
        <InputElement
          name="minimum_contract"
          placeholder="Please enter minimum contract period"
          type="number"
          label={'Minimum Contract (in months)'}
        />

        {basic_details && JSON.parse(basic_details).type_of_property === 'residential' ? (
          <>
            <SelectElement name="bed_rooms" label={'Number of Bed Rooms'} options={bedRooms} />

            <SelectElement name="bath_rooms" label={'Number of Bath Rooms'} options={bathRooms} />
          </>
        ) : (
          <SelectElement name="lavatories" label="Number of Lavatory" options={lavatories} />
        )}

        <InputElement
          name="deed_number"
          placeholder="Please enter deed number"
          label={'Title Deed / Oqod / Initial Contract of Sales'}
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

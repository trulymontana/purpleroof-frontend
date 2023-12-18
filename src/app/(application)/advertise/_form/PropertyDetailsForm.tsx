'use client'
import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import SelectElement from '@/components/forms/elements/select-element'
import { bathRooms, bedRooms } from '@/constants/advertise'
import { useRouter } from 'next/navigation'
import 'react-international-phone/style.css'
import PhoneNumberInputElement from '@/components/forms/elements/phone-number-input'
import { PageRoutes } from '@/constants/page-routes'
import { BackButton } from '@/components/navigation/back-button'

const formSchema = z.object({
  phone: z
    .string({
      required_error: 'Please enter a valid phone number.'
    })
    .min(10, {
      message: 'Phone number must be at least 10 characters.'
    }),
  propertyValue: z.string({
    required_error: 'Please enter a property value'
  }),
  propertySize: z.string({
    required_error: 'Please enter a property size'
  }),
  numberOfBedRooms: z.string({
    required_error: 'Please enter number of bed rooms!'
  }),
  numberOfBathRooms: z.string({
    required_error: 'Please enter number of bath rooms!'
  }),
  deedNumber: z.string({
    required_error: 'Please enter your Deed Number'
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
    router.push(PageRoutes.advertise.LOCATION_DETAILS)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <PhoneNumberInputElement name="phone" label="Phone Number" />

        <InputElement
          name="propertyValue"
          type="number"
          placeholder="Please enter your property value"
          label={'Property Value (AED)'}
        />
        <InputElement
          name="propertySize"
          placeholder="Please enter your property size"
          type="number"
          label={'Property Size (Sqft)'}
        />

        <SelectElement
          name="numberOfBedRooms"
          placeholder="Please select number of bed rooms"
          label={'Number of Bed Rooms'}
          options={bedRooms}
        />

        <SelectElement
          name="numberOfBathRooms"
          placeholder="Please select number of bath rooms"
          label={'Number of Bath Rooms'}
          options={bathRooms}
        />

        <InputElement
          name="deedNumber"
          placeholder="Please enter deed number"
          label={'Title Deed / Oqod / Initial Contract of Sales'}
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

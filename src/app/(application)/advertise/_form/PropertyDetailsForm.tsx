'use client'
import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import SelectElement from '@/components/forms/elements/select-element'
import { bathRooms, bedRooms, lavatories } from '@/constants/advertise'
import { useRouter } from 'next/navigation'
import 'react-international-phone/style.css'
import PhoneNumberInputElement from '@/components/forms/elements/phone-number-input'
import { PageRoutes } from '@/constants/page-routes'
import { BackButton } from '@/components/navigation/back-button'
import NumberInputElement from '@/components/forms/elements/number-input-element'
import { PropertyTypeEnum } from '@/constants/enums'

const formSchema = z.object({
  phone: z
    .string({
      required_error: 'Please enter a valid phone number.'
    })
    .min(10, {
      message: 'Phone number must be at least 10 characters.'
    }),
  propertyValue: z.number({
    required_error: 'Please enter a property value'
  }),
  propertySize: z.number({
    required_error: 'Please enter a property size'
  }),
  numberOfBedRooms: z.string().optional(),
  numberOfBathRooms: z.string().optional(),
  lavatories: z.string().optional(),
  deedNumber: z.string({
    required_error: 'Please enter your Deed Number'
  })
})

interface Props {
  onSave: (step: string, values: any) => void
}

const PropertyDetailsForm = ({ onSave }: Props) => {
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

        <NumberInputElement
          name="propertyValue"
          placeholder="Please enter your property value"
          label={'Property Value (AED)'}
        />
        <NumberInputElement
          name="propertySize"
          placeholder="Please enter your property size"
          label={'Property Size (Sqft)'}
        />

        {basic_details && JSON.parse(basic_details).typeOfProperty === PropertyTypeEnum.COMMERCIAL ? (
          <>
            <SelectElement name="numberOfBedRooms" label={'Number of Bed Rooms'} options={bedRooms} />

            <SelectElement name="numberOfBathRooms" label={'Number of Bath Rooms'} options={bathRooms} />
          </>
        ) : (
          <SelectElement name="lavatories" label="Number of Lavatory" options={lavatories} />
        )}

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

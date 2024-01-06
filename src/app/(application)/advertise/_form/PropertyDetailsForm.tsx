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
import TextAreaElement from '@/components/forms/elements/text-area-element'

const formSchema = z.object({
  phone: z
    .string({
      required_error: 'Please enter a valid phone number.'
    })
    .min(10, {
      message: 'Phone number must be at least 10 characters.'
    }),
  amount: z.number({
    required_error: 'Please enter a property value'
  }),
  size: z.number({
    required_error: 'Please enter a property size'
  }),
  numberOfBedRooms: z.number().optional(),
  numberOfBathRooms: z.number().optional(),
  numberOfLavatory: z.number().optional(),
  description: z.string().optional(),
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
          name="amount"
          placeholder="Please enter your property value"
          label={'Property Value (AED)'}
        />
        <NumberInputElement name="size" placeholder="Please enter your property size" label={'Property Size (Sqft)'} />

        {basic_details && JSON.parse(basic_details).typeOfProperty === PropertyTypeEnum.COMMERCIAL ? (
          <>
            <NumberInputElement name="numberOfBedRooms" label={'Number of Bed Rooms'} />

            <NumberInputElement name="numberOfBathRooms" label={'Number of Bath Rooms'} />
          </>
        ) : (
          <NumberInputElement name="numberOfLavatory" label="Number of Lavatory" />
        )}

        <InputElement
          name="deedNumber"
          placeholder="Please enter deed number"
          label={'Title Deed / Oqod / Initial Contract of Sales'}
        />

        <TextAreaElement name="description" label="Description" placeholder="Enter description of property here..." />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
        <BackButton route={PageRoutes.advertise.BASIC_DETAILS} />
      </form>
    </Form>
  )
}

export default PropertyDetailsForm

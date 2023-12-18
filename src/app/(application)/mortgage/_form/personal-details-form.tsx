'use client'
import React, { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import SwitchElement from '@/components/forms/elements/switch-element'
import SelectElement from '@/components/forms/elements/select-element'
import { incomeProfiles, residentialTypes } from '@/constants/mortgage'
import { PageRoutes } from '@/constants/page-routes'
import { useRouter } from 'next/navigation'
import PhoneNumberInputElement from '@/components/forms/elements/phone-number-input'

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First Name must be at least 2 characters.'
  }),
  lastName: z.string().min(2, {
    message: 'Last Name must be at least 2 characters.'
  }),
  email: z
    .string({
      required_error: 'Please enter a valid email.'
    })
    .email(),
  phoneNumber: z
    .string({
      required_error: 'Please enter a valid phone number.'
    })
    .min(10, {
      message: 'Phone number must be at least 10 characters.'
    }),
  agreeToPrivacyPolicy: z.boolean().refine((data) => data === true, {
    message: 'You must agree to the privacy policy.'
  }),
  residenceType: z.string({
    required_error: 'Please select a residential status.'
  }),
  incomeProfile: z.string({
    required_error: 'Please select an income profile.'
  })
})

interface Props {
  onSave: (step: string, values: z.infer<typeof formSchema>) => void
}
const PersonalDetailsForm = ({ onSave }: Props) => {
  const router = useRouter()

  const storedValue = localStorage.getItem(PageRoutes.mortgage.PERSONAL_DETAILS)
  const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(PageRoutes.mortgage.PERSONAL_DETAILS, values)
    router.push(PageRoutes.mortgage.INCOME_DETAILS)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <div className="flex w-full gap-2">
          <div className="w-1/2">
            <InputElement name="firstName" label={'First Name'} />
          </div>
          <div className="w-1/2">
            <InputElement name="lastName" label={'Last Name'} />
          </div>
        </div>

        <InputElement name="email" label={'Email'} />
        <PhoneNumberInputElement name="phoneNumber" label="Phone Number" />

        <SelectElement name="residenceType" label={'Residential Status'} options={residentialTypes} />

        <SelectElement name="incomeProfile" label={'Income Profile'} options={incomeProfiles} />

        <SwitchElement
          name="agreeToPrivacyPolicy"
          label={'By selecting this, you agree to our privacy policy'}
          description=""
        />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
      </form>
    </Form>
  )
}

export default PersonalDetailsForm

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
import { incomeProfiles, residentialTypes } from '@/constants/financial'

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: 'First Name must be at least 2 characters.',
  }),
  last_name: z.string().min(2, {
    message: 'Last Name must be at least 2 characters.',
  }),
  email: z
    .string({
      required_error: 'Please enter a valid email.',
    })
    .email(),
  phone: z
    .string({
      required_error: 'Please enter a valid phone number.',
    })
    .min(10, {
      message: 'Phone number must be at least 10 characters.',
    }),
  // description: z.string().min(10, {
  //   message: 'Description must be at least 10 characters.',
  // }),
  agree_to_privacy_policy: z.boolean().refine((data) => data === true, {
    message: 'You must agree to the privacy policy.',
  }),
  residential_status: z.string({
    required_error: 'Please select a residential status.',
  }),
  income_profile: z.string({
    required_error: 'Please select an income profile.',
  }),
})

const PersonalDetailsForm = ({ onFormSubmit }: { onFormSubmit: (step: number, values: any) => void }) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log({ personalForm: values })
    onFormSubmit(1, values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-96 space-y-4 p-4 shadow-md"
      >
        <div className="flex gap-2">
          <InputElement name="first_name" label={'First Name'} />
          <InputElement name="last_name" label={'Last Name'} />
        </div>

        <InputElement name="email" label={'Email'} />
        <InputElement name="phone" label={'Phone Number'} />

        <SelectElement
          name="residential_status"
          label={'Residential Status'}
          options={residentialTypes}
        />

        <SelectElement
          name="income_profile"
          label={'Income Profile'}
          options={incomeProfiles}
        />

        <SwitchElement
          name="agree_to_privacy_policy"
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

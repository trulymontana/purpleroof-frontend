'use client'
import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'

import SelectElement from '@/components/forms/elements/select-element'
import { loanTypes } from '@/constants/financial'
import { countries } from '@/constants/countries'
import ComboboxElement from '@/components/forms/elements/combobox-element'
import DatePickerElement from '@/components/forms/elements/date-picker-element'

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
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
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

const IncomeDetailsForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-96 space-y-4 p-4 shadow-md"
      >
        <ComboboxElement
          name="country"
          label={'Country'}
          placeholder={'Select your country'}
          options={countries}
        />
        <DatePickerElement name="dob" label="Date of Birth" />

        <InputElement
          name="value_of_property"
          label={'Approximate value of the intended property (AED)'}
        />
        <InputElement
          name="monthly_income"
          label={'Gross monthly income (AED)'}
        />

        <SelectElement
          name="loan_type"
          label={'Loan Type'}
          options={loanTypes}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default IncomeDetailsForm
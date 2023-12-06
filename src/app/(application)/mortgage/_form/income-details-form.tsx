'use client'
import React, { useEffect, useState } from 'react'

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
  country: z.string({
    required_error: 'Country should not be empty!',
  }),
  dob: z.date({ required_error: "DOB should not be empty!" }),
  value_of_property: z
    .string({
      required_error: 'Please enter a property value.',
    }),
  monthly_income: z
    .string({
      required_error: 'Please enter your correct montly income.',
    }),
  loan_type: z.string({
    required_error: 'Loan type should not be empty'
  })
})

const IncomeDetailsForm = ({ onFormSubmit, createMortgage }: { onFormSubmit: (step: number, values: any) => void, createMortgage: () => void }) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ incomeForm: values })
    onFormSubmit(2, values)
    createMortgage()
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

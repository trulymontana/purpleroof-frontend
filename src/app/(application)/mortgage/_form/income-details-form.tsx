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
import { PageRoutes } from '@/constants/page-routes'
import { BackButton } from '@/components/navigation/back-button'

const formSchema = z.object({
  country: z.string({
    required_error: "Please select your country"
  }),
  dob: z.string({
    required_error: "Please enter your DOB"
  }),
  value_of_property: z.string({
    required_error: "Please enter value of your property",
  }),
  monthly_income: z.string({
    required_error: "Please enter your montly income"
  }),
  loan_type: z.string({
    required_error: "Please select a loan type"
  })
})

interface Props {
  onSave: (step: string, values: z.infer<typeof formSchema>) => void
}

const IncomeDetailsForm = ({ onSave }: Props) => {

  const storedValue = localStorage.getItem(PageRoutes.mortgage.INCOME_DETAILS)
  const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(PageRoutes.mortgage.INCOME_DETAILS, values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <ComboboxElement name="country" label={'Country'} placeholder={'Select your country'} options={countries} />
        <DatePickerElement name="dob" label="Date of Birth" />

        <InputElement name="value_of_property" label={'Approximate value of the intended property (AED)'} />
        <InputElement name="monthly_income" label={'Gross monthly income (AED)'} />

        <SelectElement name="loan_type" label={'Loan Type'} options={loanTypes} />

        <Button type="submit" className="w-full">
          Submit
        </Button>

        <BackButton route={PageRoutes.mortgage.PERSONAL_DETAILS} />
      </form>
    </Form>
  )
}

export default IncomeDetailsForm

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import * as z from 'zod'
import SelectElement from '@/components/forms/elements/select-element'
import { countries } from '@/constants/countries'
import ComboboxElement from '@/components/forms/elements/combobox-element'
import DatePickerElement from '@/components/forms/elements/date-picker-element'
import { PageRoutes } from '@/constants/page-routes'
import { BackButton } from '@/components/navigation/back-button'
import { loanTypeOptions } from '@/constants/mortgage'
import NumberInputElement from '@/components/forms/elements/number-input-element'

const formSchema = z.object({
  country: z.string({
    required_error: 'Please select your country'
  }),
  dateOfBirth: z.date({
    required_error: 'Please enter your DOB'
  }),
  valueOfProperty: z.number({
    required_error: 'Please enter value of your property'
  }),
  monthlyIncome: z.number({
    required_error: 'Please enter your montly income'
  }),
  loanType: z.string({
    required_error: 'Please select a loan type'
  })
})

interface Props {
  handleSubmit: (values: z.infer<typeof formSchema>) => void
  isLoading: boolean
}

const IncomeDetailsForm = ({ handleSubmit, isLoading }: Props) => {
  const storedValue = localStorage.getItem(PageRoutes.mortgage.INCOME_DETAILS)
  const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <ComboboxElement name="country" label={'Country'} placeholder={'Select your country'} options={countries} />
        <DatePickerElement custom name="dateOfBirth" label="Date of Birth" />

        <NumberInputElement name="valueOfProperty" label={'Approximate value of the intended property (AED)'} />
        <NumberInputElement name="monthlyIncome" label={'Gross monthly income (AED)'} />

        <SelectElement name="loanType" label={'Loan Type'} options={loanTypeOptions} />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Submitting...' : 'Get Quote'}
        </Button>

        <BackButton route={PageRoutes.mortgage.PERSONAL_DETAILS} />
      </form>
    </Form>
  )
}

export default IncomeDetailsForm

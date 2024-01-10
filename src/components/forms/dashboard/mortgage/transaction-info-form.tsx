'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '../../elements/input-element'
import SelectElement from '../../elements/select-element'
import { completionStatus, emirate, propertyType } from '@/constants/mortgage'
import { useRouter } from 'next/navigation'
import { PageRoutes } from '@/constants/page-routes'
import { LocalStorageKeys } from '@/constants/local-storage-keys'

const formSchema = z.object({
  propertyType: z.string({
    required_error: 'Please select a property type.'
  }),
  completionStatus: z.string({
    required_error: 'Please select completion status.'
  }),
  emirate: z.string({
    required_error: 'Please select a emirate.'
  }),
  additionalDetail: z.string().optional()
})

interface Props {
  mortgageId: number
  onSave: (step: string, values: any) => void
}

const TransactionInfoForm = ({ mortgageId, onSave }: Props) => {
  const router = useRouter()

  const storedValue = localStorage.getItem(`${LocalStorageKeys.MORTGAGE_TRANSACTION_INFO}-${mortgageId}`)
  // @ts-ignore
  const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(`${LocalStorageKeys.MORTGAGE_TRANSACTION_INFO}-${mortgageId}`, values)
    router.push(PageRoutes.dashboard.COMPLETE_MORTGAGE_APPLICATION(mortgageId, LocalStorageKeys.MORTGAGE_CUSTOMER_INFO))
  }

  return (
    <Form {...form}>
      <h1 className="text-4xl font-bold text-black/80">Transaction Info</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <SelectElement name="propertyType" label="Property Type" options={propertyType} />
        <SelectElement name="completionStatus" label="Completion Status" options={completionStatus} />
        <SelectElement name="emirate" label="Emirate" options={emirate} />
        <InputElement name="additionalDetail" label="Additional Details" />
        <Button type="submit" className="w-full">
          Next
        </Button>
      </form>
    </Form>
  )
}

export default TransactionInfoForm

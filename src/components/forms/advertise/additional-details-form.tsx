'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import { useRouter } from 'next/navigation'
import 'react-international-phone/style.css'
import { PageRoutes } from '@/constants/page-routes'
import { BackButton } from '@/components/navigation/back-button'
import NumberInputElement from '@/components/forms/elements/number-input-element'
import TextAreaElement from '@/components/forms/elements/text-area-element'
import { MAX_NUMBER } from '@/constants/api'

const formSchema = z.object({
  layoutType: z.string().optional(),
  amount: z.number().max(MAX_NUMBER, { message: `Value should be less than or equal to ${MAX_NUMBER}` }).optional(),
  serviceCharges: z.number().max(MAX_NUMBER, { message: `Value should be less than or equal to ${MAX_NUMBER}` }).optional(),
  name: z.string({
    required_error: 'Title should not be empty!'
  }).refine((i) => i.length <= 50, {
    message: "Your advertisement title cannot be more than 50 characters",
  }),
  description: z.string().refine((val) => val && val?.length <= 1000, {
    message: "Description cannot not be more than 1000 characters"
  }).optional(),
})

interface Props {
  onSave: (step: string, values: any) => void
}

const AdditionalDetailsForm = ({ onSave }: Props) => {
  const router = useRouter()


  const storedValue = localStorage.getItem(PageRoutes.advertise.ADDITIONAL_DETAILS)

  const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(PageRoutes.advertise.ADDITIONAL_DETAILS, values)
    router.push(PageRoutes.advertise.AMENITIES_DETAILS)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">

        <InputElement name="layoutType" label={'Layout Type'} placeholder='Please enter your layout type' />

        <NumberInputElement
          name="amount"
          placeholder="Please enter your property value"
          label={'Property Value (AED)'}
        />

        <NumberInputElement
          name="serviceCharges"
          placeholder="Please enter service charges"
          label={'Service Charges'}
        />

        <InputElement name="name" placeholder="Please enter Advert Title" label={'Advertisement Title  (max 50 characters)'} />

        <TextAreaElement name="description" label="Description (max 1000 characters)" placeholder="Enter description of property here..." />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
        <BackButton route={PageRoutes.advertise.PROJECT_STATUS} />
      </form>
    </Form>
  )
}

export default AdditionalDetailsForm

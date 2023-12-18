'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import { callPreferences } from '@/constants/advertise'
import RadioGroupElement from '@/components/forms/elements/radio-group-element'
import { useRouter } from 'next/navigation'
import { BackButton } from '@/components/navigation/back-button'
import { PageRoutes } from '@/constants/page-routes'

const formSchema = z.object({
  callPreference: z.string({
    required_error: 'Please select a call preference!'
  })
})

interface Props {
  onSave: (step: string, values: any) => void
}

const CallPreferenceForm = ({ onSave }: Props) => {
  const router = useRouter()

  const storedValue = localStorage.getItem(PageRoutes.advertise.CALL_PREFERENCE)

  const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const handlePreferenceChange = (value: string) => {
    form.setValue('callPreference', value)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(PageRoutes.advertise.CALL_PREFERENCE, values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <RadioGroupElement
          handleChange={handlePreferenceChange}
          name="callPreference"
          label={'How would you prefer to handle inquiries from potential leads interested in this advertisement?'}
          className="flex-col items-start gap-4"
          options={callPreferences}
        />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
        <BackButton route={PageRoutes.advertise.UPLOAD_PHOTOS} />
      </form>
    </Form>
  )
}

export default CallPreferenceForm

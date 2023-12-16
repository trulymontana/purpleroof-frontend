'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { BackButton } from '@/components/navigation/back-button'
import { PageRoutes } from '@/constants/page-routes'
import FileUploader from '@/components/forms/elements/file-uploader'

const formSchema = z.object({
  passport_copy: z.string({
    required_error: 'Please upload your passport copy'
  }),
  visa_copy: z.string({
    required_error: 'Please upload your visa copy'
  }),
  emirates_id: z.string({
    required_error: 'Please upload your emirates id'
  }),
  title_deed_copy: z.string({
    required_error: 'Please upload your title deed copy'
  }),
  owner_proof_of_mobile_number: z.string({
    required_error: 'Please upload your owner proof of mobile number'
  })
})

interface Props {
  onSave: (step: string, values: any) => void
}
const UploadDocumentsForm = ({ onSave }: Props) => {
  const router = useRouter()

  const storedValue = localStorage.getItem(PageRoutes.advertise.UPLOAD_PHOTOS)

  const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const passport_copy = form.watch('passport_copy')
  const visa_copy = form.watch('visa_copy')
  const emirates_id = form.watch('emirates_id')
  const title_deed_copy = form.watch('title_deed_copy')
  const owner_proof_of_mobile_number = form.watch('owner_proof_of_mobile_number')

  const disable = !passport_copy || !visa_copy || !emirates_id || !title_deed_copy || !owner_proof_of_mobile_number

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(PageRoutes.advertise.UPLOAD_PHOTOS, values)
    router.push(PageRoutes.advertise.CALL_PREFERENCE)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <FileUploader folder="advertise" name="passport_copy" label={'Passport Copy'} form={form} />
        <FileUploader folder="advertise" name="visa_copy" label={'Visa Copy'} form={form} />
        <FileUploader folder="advertise" name="emirates_id" label={'Emirates ID'} form={form} />
        <FileUploader folder="advertise" name="title_deed_copy" label={'Title Deed Copy'} form={form} />
        <FileUploader
          folder="advertise"
          name="owner_proof_of_mobile_number"
          label={'Ownership Proof of Mobile Number'}
          form={form}
        />

        <Button disabled={disable} type="submit" className="w-full">
          Save and Continue
        </Button>

        <BackButton route={PageRoutes.advertise.PROJECT_STATUS} />
      </form>
    </Form>
  )
}

export default UploadDocumentsForm

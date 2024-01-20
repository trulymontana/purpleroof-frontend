'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import { BackButton } from '@/components/navigation/back-button'
import { PageRoutes } from '@/constants/page-routes'
import FileUploader from '@/components/forms/elements/file-uploader'
import { useEffect, useState } from 'react'
import { CallPreferenceEnum, DocumentTypeEnum } from '@/constants/enums'
import ConfirmActionDialog from '@/components/dialogs/confirm-action-dialog'
import { useSearchParams } from 'next/navigation'

const formSchema = z.object({
  image: z.string({
    required_error: 'Please upload a property image'
  }),
  documents: z.array(
    z.object({
      type: z.string().optional(),
      url: z.string().optional()
    })
  )
})

interface Props {
  handleSubmit: (values: any) => void
  isLoading: boolean
}

const UploadDocumentsForm = ({ handleSubmit, isLoading }: Props) => {

  const searchParams = useSearchParams();
  const callPreference = searchParams.get('callPreference');

  const storedValue = localStorage.getItem(PageRoutes.advertise.UPLOAD_PHOTOS)

  let defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  useEffect(() => {
    form.setValue('documents', [
      { type: DocumentTypeEnum.PASSPORT_COPY },
      { type: DocumentTypeEnum.VISA_COPY },
      { type: DocumentTypeEnum.EMIRATES_ID },
      { type: DocumentTypeEnum.TITLE_DEED_COPY },
      { type: DocumentTypeEnum.OWNERSHIP_PROOF_MOBILE_NUMBER },
      { type: DocumentTypeEnum.MOBILE_BILL_COPY }
    ])
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <FileUploader folder="advertise" name="image" label={'Upload Photo of the Property'} form={form} />
        <FileUploader folder="advertise" name="documents[0].url" label={'Passport Copy (optional)'} form={form} />
        <FileUploader folder="advertise" name="documents[1].url" label={'Visa Copy'} form={form} />
        <FileUploader folder="advertise" name="documents[2].url" label={'Emirates ID'} form={form} />
        <FileUploader folder="advertise" name="documents[3].url" label={'Title Deed Copy'} form={form} />
        <FileUploader folder="advertise" name="documents[4].url" label={'Owners Proof of Mobile Number'} form={form} />
        {callPreference === CallPreferenceEnum.PERSONAL && (<FileUploader folder="advertise" name="documents[4].url" label={'Mobile Bill Copy'} form={form} />)}

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>

        <ConfirmActionDialog
          title="Are you sure?"
          anchor={
            <Button variant="outline" className="w-full">
              Go Back
            </Button>
          }
          content={
            <div className="flex flex-col gap-5">
              <p>All progess of this page will be lost. Are you sure you want to go back?</p>
              <BackButton variant="destructive" route={PageRoutes.advertise.CALL_PREFERENCE} />
            </div>
          }
        />
      </form>
    </Form>
  )
}

export default UploadDocumentsForm

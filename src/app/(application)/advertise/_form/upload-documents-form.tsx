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
import { useEffect, useState } from 'react'
import { DocumentTypeEnum } from '@/constants/enums'
import ConfirmActionDialog from '@/components/dialogs/confirm-action-dialog'

const formSchema = z.object({
  image: z.string({
    required_error: 'Please upload a property image'
  }),
  documents: z.array(
    z.object({
      type: z.string({
        required_error: 'Type not found!'
      }),
      url: z.string({
        required_error: 'This field is required!'
      })
    })
  )
})

interface Props {
  handleSubmit: (values: any) => void
  isLoading: boolean
}

const UploadDocumentsForm = ({ handleSubmit, isLoading }: Props) => {
  const router = useRouter()

  const storedValue = localStorage.getItem(PageRoutes.advertise.UPLOAD_PHOTOS)

  let defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  useEffect(() => {
    form.setValue('documents', [
      // @ts-ignore
      { type: DocumentTypeEnum.PASSPORT_COPY },
      // @ts-ignore
      { type: DocumentTypeEnum.VISA_COPY },
      // @ts-ignore
      { type: DocumentTypeEnum.EMIRATES_ID },
      // @ts-ignore
      { type: DocumentTypeEnum.TITLE_DEED_COPY },
      // @ts-ignore
      { type: DocumentTypeEnum.OWNERSHIP_PROOF_MOBILE_NUMBER }
    ])
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <FileUploader folder="advertise" name="image" label={'Upload Photo of the Property'} form={form} />
        <FileUploader folder="advertise" name="documents[0].url" label={'Passport Copy'} form={form} />
        <FileUploader folder="advertise" name="documents[1].url" label={'Visa Copy'} form={form} />
        <FileUploader folder="advertise" name="documents[2].url" label={'Emirates ID'} form={form} />
        <FileUploader folder="advertise" name="documents[3].url" label={'Title Deed Copy'} form={form} />
        <FileUploader folder="advertise" name="documents[4].url" label={'Owners Proof of Mobile Number'} form={form} />

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
              <BackButton route={PageRoutes.advertise.CALL_PREFERENCE} />
            </div>
          }
        />
      </form>
    </Form>
  )
}

export default UploadDocumentsForm

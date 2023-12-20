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

const formSchema = z.object({
  documents: z.array(
    z.object({
      type: z.string({
        required_error: "Type not found!"
      }),
      url: z.string({
        required_error: "This field is required!"
      }),
    })
  ),
});

interface Props {
  onSave: (step: string, values: any) => void
}
const UploadDocumentsForm = ({ onSave }: Props) => {
  const router = useRouter()

  const storedValue = localStorage.getItem(PageRoutes.advertise.UPLOAD_PHOTOS)

  let defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  useEffect(() => {
    // @ts-ignore
    form.setValue("documents", [{ type: DocumentTypeEnum.PASSPORT_COPY }, { type: DocumentTypeEnum.VISA_COPY }, { type: DocumentTypeEnum.EMIRATES_ID }, { type: DocumentTypeEnum.TITLE_DEED_COPY }, { type: DocumentTypeEnum.OWNERSHIP_PROOF_MOBILE_NUMBER }])
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(PageRoutes.advertise.UPLOAD_PHOTOS, values)
    router.push(PageRoutes.advertise.CALL_PREFERENCE)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <FileUploader folder="advertise" name="documents[0].url" label={'Passport Copy'} form={form} />
        <FileUploader folder="advertise" name="documents[1].url" label={'Visa Copy'} form={form} />
        <FileUploader folder="advertise" name="documents[2].url" label={'Emirates ID'} form={form} />
        <FileUploader folder="advertise" name="documents[3].url" label={'Title Deed Copy'} form={form} />
        <FileUploader
          folder="advertise"
          name="documents[4].url"
          label={'Owners Proof of Mobile Number'}
          form={form}
        />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>

        <BackButton route={PageRoutes.advertise.PROJECT_STATUS} />
      </form>
    </Form>
  )
}

export default UploadDocumentsForm

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
import { useEffect } from 'react'

const formSchema = z.object({
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
  onSave: (step: string, values: any) => void
  requiredDocuments?: any
}
const UploadDocumentsForm = ({ onSave, requiredDocuments }: Props) => {

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    if (requiredDocuments && requiredDocuments.length > 0) {
      const types = requiredDocuments.map((document: any) => ({ type: document.documentType }))

      // @ts-ignore
      form.setValue('documents', types)
    }
  }, [requiredDocuments])

  function onSubmit(values: z.infer<typeof formSchema>) {
    // onSave(PageRoutes.advertise.UPLOAD_PHOTOS, values)
    // router.push(PageRoutes.advertise.CALL_PREFERENCE)
    console.log({ values })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">

        {
          requiredDocuments && requiredDocuments.length > 0 && requiredDocuments.map((document: any, i: number) => {
            return (
              <FileUploader key={i} folder="mortgage-transaction" name={`documents[${i}].url`} label={document.name} form={form} />
            )
          })
        }

        {requiredDocuments && (
          <>
            <Button type="submit" className="w-full">
              Save and Continue
            </Button>
            <BackButton route={PageRoutes.advertise.PROJECT_STATUS} />
          </>
        )}

      </form>
    </Form>
  )
}

export default UploadDocumentsForm

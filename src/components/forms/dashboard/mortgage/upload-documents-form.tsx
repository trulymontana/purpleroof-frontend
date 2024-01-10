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
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import ConfirmActionDialog from '@/components/dialogs/confirm-action-dialog'

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
  handleSubmit: (values: any) => void
  requiredDocuments?: any
  mortgageId: number
  isLoading: boolean
}
const UploadDocumentsForm = ({ isLoading, handleSubmit, requiredDocuments, mortgageId }: Props) => {
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
    handleSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        {requiredDocuments &&
          requiredDocuments.length > 0 &&
          requiredDocuments.map((document: any, i: number) => {
            return (
              <FileUploader
                key={i}
                folder="mortgage-transaction"
                name={`documents[${i}].url`}
                label={document.name}
                form={form}
              />
            )
          })}

        {requiredDocuments && (
          <>
            <Button disabled={isLoading} type="submit" className="w-full">
              Submit
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
                  <BackButton
                    variant="destructive"
                    route={PageRoutes.dashboard.COMPLETE_MORTGAGE_APPLICATION(
                      mortgageId,
                      LocalStorageKeys.MORTGAGE_CUSTOMER_INFO
                    )}
                  />
                </div>
              }
            />
          </>
        )}
      </form>
    </Form>
  )
}

export default UploadDocumentsForm

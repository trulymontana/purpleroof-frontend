'use client'

import { useGetOneMortgage } from '@/data/hooks/useMortgageClient'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { CardHeader, CardContent, Card, CardFooter } from '@/components/ui/card'
import { DownloadIcon, LandPlot, MessageCircle, MessageCircleIcon, Paperclip, Send, X } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import ConfirmActionDialog from '@/components/dialogs/confirm-action-dialog'
import UpdateMortgageStatusForm from '../_forms/update-status-form'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useCreateCommentMutation, useGetCommentsByMortgage } from '@/data/hooks/useCommentsClient'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import FileUploader from '@/components/forms/elements/file-uploader'
import { useGetUserDetails } from '@/data/hooks/useAuthClient'
import TextAreaElement from '@/components/forms/elements/text-area-element'
import PersonalInformationCard from '@/components/cards/personal-information'
import IncomeInformationCard from '@/components/cards/income-information'
import PropertyInformationCard from '@/components/cards/mortgage-property-information'
import { MortgageStatusEnum } from '@/constants/enums'
import OtherInformationCard from '@/components/cards/other-information'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import RequiredDocumentsCards from '@/components/cards/required-documents'
import ReferenceCard from '@/components/cards/reference'

const formSchema = z.object({
  title: z.string({
    required_error: 'Please enter a message'
  })
})

interface Props {
  params: {
    mortgageId: number
  }
}
const Page = ({ params: { mortgageId } }: Props) => {

  const { loading, data, fetching } = useGetOneMortgage(mortgageId)
  const { mutate: sendComment, isPending: isLoading } = useCreateCommentMutation()
  const { data: userDetails } = useGetUserDetails()

  const { data: comments } = useGetCommentsByMortgage(Number(mortgageId))

  const [chatOpen, setChatOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    sendComment({
      mortgageId: Number(mortgageId),
      attachments: [],
      message: 'test',
      ...values
    })
  }

  if (fetching) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <main className="container px-3 py-4">
        <div className="flex items-center justify-between py-3">
          <h2 className="text-4xl font-bold underline underline-offset-4 text-primary">Mortgage Details</h2>
          {!loading && data && (
            <ConfirmActionDialog
              title="Edit Mortgage"
              anchor={<Button>Update Status</Button>}
              content={<UpdateMortgageStatusForm data={data} />}
            />
          )}
        </div>
        <div className="mx-auto flex w-full items-start gap-8 py-6">
          <div className='flex flex-1 min-w-2/3 flex-col gap-8'>
            {data && <PersonalInformationCard data={data} />}
            {data && <IncomeInformationCard data={data} />}
            {data && data.status !== MortgageStatusEnum.SUBMITTED && <PropertyInformationCard data={data} />}
            {data && data.status !== MortgageStatusEnum.SUBMITTED && <OtherInformationCard data={data} />}
            {data?.status === MortgageStatusEnum.SUBMITTED && (
              <Link
                className="w-full"
                href={PageRoutes.dashboard.COMPLETE_MORTGAGE_APPLICATION(
                  mortgageId,
                  LocalStorageKeys.MORTGAGE_TRANSACTION_INFO
                )}
              >
                <Button className="w-full">Complete Your Application</Button>
              </Link>
            )}
          </div>
          <div className="w-1/3 space-y-4">
            {data && <RequiredDocumentsCards data={data} />}
            {data && data.status !== MortgageStatusEnum.SUBMITTED && <ReferenceCard title='Home Country Reference 1' referenceDetails={data.references[0]} />}
            {data && data.status !== MortgageStatusEnum.SUBMITTED && <ReferenceCard title='Home Country Reference 2' referenceDetails={data.references[1]} />}
            {data && data.status !== MortgageStatusEnum.SUBMITTED && <ReferenceCard title='Personal Reference in UAE 1' referenceDetails={data.references[2]} />}
            {data && data.status !== MortgageStatusEnum.SUBMITTED && <ReferenceCard title='Personal Reference in UAE 2' referenceDetails={data.references[3]} />}
          </div>
        </div>
      </main>
      <div className="fixed bottom-4 right-4">
        <Popover open={chatOpen} onOpenChange={setChatOpen}>
          <PopoverTrigger asChild>
            <Button className="w-15 h-15 flex items-center justify-center rounded-full bg-primary">
              <MessageCircle size={25} className="text-white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="mt-2 w-[400px] rounded-lg bg-white">
            <Card className="border-none">
              <CardContent>
                <div className="fixed bottom-0 right-0  w-[400px] overflow-hidden rounded-t-lg bg-white shadow-lg">
                  <div className="flex items-center justify-between bg-gray-100 p-3">
                    <div className="flex items-center space-x-2">
                      <MessageCircleIcon size={20} />
                      <h2 className="text-lg font-bold">Chat</h2>
                    </div>
                    <X onClick={() => setChatOpen(!chatOpen)} className="h-6 w-6 cursor-pointer" />
                  </div>
                  <div className="flex h-[400px] flex-col gap-4 overflow-y-scroll p-3">
                    {comments &&
                      comments?.map((comment, i) => {
                        return (
                          <div className="flex flex-col gap-4" key={i}>
                            {comment.userId === userDetails.id ? (
                              <div className="flex items-end">
                                <div className="h-10 w-10 flex-none">
                                  <Avatar className="h-full w-full">
                                    <AvatarImage alt="User" src="/placeholder-avatar.jpg" />
                                    <AvatarFallback>U</AvatarFallback>
                                  </Avatar>
                                </div>
                                <div className="ml-2 flex-1">
                                  <div className="rounded-r-lg bg-blue-100 p-3 text-black dark:bg-blue-900 dark:text-white">
                                    {comment.title}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-end justify-end">
                                <div className="mr-2 flex-1">
                                  <div className="rounded-l-lg bg-gray-200 p-3 text-black dark:bg-gray-800 dark:text-white">
                                    {comment.title}
                                  </div>
                                </div>
                                <div className="h-10 w-10 flex-none">
                                  <Avatar className="h-full w-full">
                                    <AvatarImage alt="Admin" src="/placeholder-avatar.jpg" />
                                    <AvatarFallback>A</AvatarFallback>
                                  </Avatar>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                  </div>
                  <div className="w-fit gap-2 border-t px-2 py-2">
                    {/* <div className="h-5 w-5">
                      <Paperclip size={20} className="h-5 w-5" />
                    </div> */}

                    <div className="flex w-full items-center space-x-2">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                          <FileUploader form={form} folder="mortgage" name="attachments" label="Attachments" />
                          <div className="flex w-full flex-col items-center gap-2">
                            <TextAreaElement name="title" label="" placeholder="Type here..." />
                            <Button disabled={isLoading} type="submit" className="w-full ">
                              {isLoading ? (
                                'Sending...'
                              ) : (
                                <span className="flex items-center gap-2">
                                  Send <Send className="h-5 w-5" />
                                </span>
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}

export default Page

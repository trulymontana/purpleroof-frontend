'use client'

import { useGetOneMortgage } from '@/data/hooks/useMortgageClient'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { CardHeader, CardContent, Card, CardFooter } from '@/components/ui/card'
import { DownloadIcon, FileEdit, MessageCircle, MessageCircleIcon, Paperclip, Send, X } from 'lucide-react'
import { MortgageStatusEnum } from '@/constants/enums'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import currency from '@/lib/currency'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import ConfirmActionDialog from '@/components/dialogs/confirm-action-dialog'
import UpdateMortgageStatusForm from '../_forms/update-status-form'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useCreateCommentMutation } from '@/data/hooks/useCommentsClient'
import CustomInputElement from '@/components/forms/elements/custom-input-element'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const formSchema = z.object({
  title: z.string({
    required_error: 'Please enter a message'
  }),
})

interface Props {
  params: {
    mortgageId: number
  }
}
const Page = ({ params: { mortgageId } }: Props) => {

  const { loading, data } = useGetOneMortgage(mortgageId)
  const { mutate: sendComment } = useCreateCommentMutation()

  const [chatOpen, setChatOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values })
    sendComment({
      mortgageId: Number(mortgageId),
      message: "test 2",
      attachments: ["urlfdsa"],
      ...values
    })
  }

  if (loading) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <main className="container px-3 py-4">
        <div className="flex items-end justify-end py-3">
          {!loading && data && (
            <ConfirmActionDialog
              title="Edit Mortgage"
              anchor={<Button>Update Status</Button>}
              content={<UpdateMortgageStatusForm data={data} />}
            />
          )}
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="flex h-fit flex-col p-4">
            <CardHeader className="mb-4">
              <h2 className="text-4xl font-bold underline">Mortgage Details</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <h3 className="flex-1 text-lg font-medium">First Name</h3>
                <p className="text-lg capitalize">{data?.firstName}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Last Name</h3>
                <p className="text-lg capitalize">{data?.lastName}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Email</h3>
                <p className="text-lg lowercase">{data?.email}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Contact</h3>
                <p className="text-lg capitalize">{data?.phoneNumber}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Marital Status</h3>
                <p className="text-lg capitalize">Single</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Education</h3>
                <p className="text-lg capitalize">Elementary School</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Favorite City</h3>
                <p className="text-lg capitalize">Dubai</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Number of Family Members in UAE</h3>
                <p className="text-lg capitalize">5</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Years in UAE</h3>
                <p className="text-lg capitalize">2</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Annual Rental Income</h3>
                <p className="text-lg capitalize">{currency.format(3213)}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">UAE Residence Address</h3>
                <p className="text-lg capitalize">mock address</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Home Country Address</h3>
                <p className="text-lg capitalize">mock address</p>
              </div>
              {data?.dateOfBirth && (
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Date of Birth</h3>
                  <p className="text-lg capitalize">{new Date(data?.dateOfBirth).toLocaleDateString()}</p>
                </div>
              )}
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Country</h3>
                <p className="text-lg capitalize">{data?.country}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Income Profile</h3>
                <p className="text-lg capitalize">{data?.incomeProfile?.toLocaleLowerCase()}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Residence Type</h3>
                <p className="text-lg capitalize">{data?.residenceType?.toLocaleLowerCase().replaceAll('_', ' ')}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Loan Type</h3>
                <p className="text-lg capitalize">{data?.loanType?.toLocaleLowerCase().replaceAll('_', ' ')}</p>
              </div>
              {data?.monthlyIncome && (
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Montly Income</h3>
                  <p className="text-lg capitalize">{currency.format(data?.monthlyIncome)}</p>
                </div>
              )}
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Property Type</h3>
                <p className="text-lg capitalize">Apartment/ Townhouse/ Villa</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Completion Status</h3>
                <p className="text-lg capitalize">Completed</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Emirate</h3>
                <p className="text-lg capitalize">Dubai</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Additional Details</h3>
                <p className="line-clamp-1 text-lg capitalize">test additional details</p>
              </div>
            </CardContent>
            <CardFooter className="w-full">
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
            </CardFooter>
          </Card>
          <div className="space-y-4">
            {data?.requirement && (
              <Card className="p-4">
                <CardHeader className="mb-4">
                  <h2 className="text-2xl font-semibold">Required Documents</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data?.requirement?.requiredDocuments.map((item: any, i: number) => (
                    <Card
                      key={i}
                      className="shadow-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <h3 className="text-lg font-medium">{item?.name}</h3>
                        <Button className="flex items-center">
                          <DownloadIcon className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            )}
            <Card className="p-4">
              <CardHeader className="mb-4">
                <h2 className="text-2xl font-semibold">Home Country Reference 1</h2>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Name</h3>
                  <p className="text-lg capitalize">John</p>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Relationship</h3>
                  <p className="text-lg capitalize">Brother</p>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Contact</h3>
                  <p className="text-lg capitalize">{data?.phoneNumber}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardHeader className="mb-4">
                <h2 className="text-2xl font-semibold">Home Country Reference 2</h2>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Name</h3>
                  <p className="text-lg capitalize">Michael</p>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Relationship</h3>
                  <p className="text-lg capitalize">Brother</p>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Contact</h3>
                  <p className="text-lg capitalize">{data?.phoneNumber}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardHeader className="mb-4">
                <h2 className="text-2xl font-semibold">Personal Reference in UAE 1</h2>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Name</h3>
                  <p className="text-lg capitalize">Liza</p>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Relationship</h3>
                  <p className="text-lg capitalize">Sister</p>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Contact</h3>
                  <p className="text-lg capitalize">{data?.phoneNumber}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardHeader className="mb-4">
                <h2 className="text-2xl font-semibold">Personal Reference in UAE 2</h2>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Name</h3>
                  <p className="text-lg capitalize">Kyle</p>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Relationship</h3>
                  <p className="text-lg capitalize">Child</p>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Contact</h3>
                  <p className="text-lg capitalize">{data?.phoneNumber}</p>
                </div>
              </CardContent>
            </Card>
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
          <PopoverContent className="mt-2 w-64 rounded-lg bg-white">
            <Card className="border-none">
              <CardContent>
                <div className="fixed bottom-0 right-0  w-[350px] overflow-hidden rounded-t-lg bg-white shadow-lg">
                  <div className="flex items-center justify-between bg-gray-100 p-3">
                    <div className="flex items-center space-x-2">
                      <MessageCircleIcon size={20} />
                      <h2 className="text-lg font-bold">Chat</h2>
                    </div>
                    <X onClick={() => setChatOpen(!chatOpen)} className="h-6 w-6 cursor-pointer" />
                  </div>
                  <div className="h-[400px] overflow-y-scroll p-3 flex flex-col gap-4">
                    {
                      data && data?.comments?.map((comment, i) => {
                        return (
                          <div className='flex flex-col gap-2' key={i}>
                            <div className="flex flex-col gap-4">
                              <div className="flex items-end">
                                <div className="flex-none w-10 h-10">
                                  <Avatar className="h-full w-full">
                                    <AvatarImage alt="User" src="/placeholder-avatar.jpg" />
                                    <AvatarFallback>U</AvatarFallback>
                                  </Avatar>
                                </div>
                                <div className="flex-1 ml-2">
                                  <div className="p-3 bg-blue-100 text-black dark:bg-blue-900 dark:text-white rounded-r-lg">
                                    {comment.title}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-end justify-end">
                                <div className="flex-1 mr-2">
                                  <div className="p-3 bg-gray-200 text-black dark:bg-gray-800 dark:text-white rounded-l-lg">
                                    Sure, I&apos;d be happy to help! What seems to be the problem?
                                  </div>
                                </div>
                                <div className="flex-none w-10 h-10">
                                  <Avatar className="h-full w-full">
                                    <AvatarImage alt="Admin" src="/placeholder-avatar.jpg" />
                                    <AvatarFallback>A</AvatarFallback>
                                  </Avatar>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t px-2 py-2 w-full">
                    <div className="h-5 w-5">
                      <Paperclip size={20} className="h-5 w-5" />
                    </div>
                    <div className="flex w-full items-center space-x-2">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                          <div className='flex items-center gap-10 justify-between w-full'>
                            <CustomInputElement name='title' type='string' className='flex-1' placeholder='Please enter a message' />
                            <Button type="submit" className="w-fit">
                              <Send className="h-5 w-5" />
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

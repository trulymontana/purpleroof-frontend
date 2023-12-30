"use client"

import { useGetOneMortgage } from '@/data/hooks/useMortgageClient'
import Loader from "@/components/Loader"
import { Button } from "@/components/ui/button"
import { CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { DownloadIcon, FileEdit, MessageCircle, MessageCircleIcon, Paperclip, Send, X } from "lucide-react"
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


interface Props {
    params: {
        mortgageId: number
    }
}
const Page = ({ params: { mortgageId } }: Props) => {

    const { loading, data } = useGetOneMortgage(mortgageId)

    const [chatOpen, setChatOpen] = useState(false);

    if (loading) {
        return (
            <div className="h-[100vh] flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    return (
        <>
            <main className="container px-3 py-4">
                <div className='py-3 flex items-end justify-end'>
                    {
                        !loading && data && (
                            <ConfirmActionDialog
                                title="Edit Mortgage"
                                anchor={
                                    <Button>
                                        Update Status
                                    </Button>
                                }
                                content={<UpdateMortgageStatusForm data={data} />}
                            />
                        )
                    }
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="p-4 flex flex-col h-fit">
                        <CardHeader className="mb-4">
                            <h2 className="text-4xl font-bold underline">Mortgage Details</h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <h3 className="text-lg font-medium flex-1">First Name</h3>
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
                            {
                                data?.dateOfBirth && (
                                    <div className="flex justify-between">
                                        <h3 className="text-lg font-medium">Date of Birth</h3>
                                        <p className="text-lg capitalize">{new Date(data?.dateOfBirth).toLocaleDateString()}</p>
                                    </div>
                                )
                            }
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
                                <p className="text-lg capitalize">{data?.residenceType?.toLocaleLowerCase().replaceAll("_", " ")}</p>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-lg font-medium">Loan Type</h3>
                                <p className="text-lg capitalize">{data?.loanType?.toLocaleLowerCase().replaceAll("_", " ")}</p>
                            </div>
                            {
                                data?.monthlyIncome && (
                                    <div className="flex justify-between">
                                        <h3 className="text-lg font-medium">Montly Income</h3>
                                        <p className="text-lg capitalize">{currency.format(data?.monthlyIncome)}</p>
                                    </div>
                                )
                            }
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
                                <p className="text-lg capitalize line-clamp-1">test additional details</p>
                            </div>
                        </CardContent>
                        <CardFooter className='w-full'>
                            {
                                data?.status === MortgageStatusEnum.SUBMITTED && (
                                    <Link className='w-full' href={PageRoutes.dashboard.COMPLETE_MORTGAGE_APPLICATION(mortgageId, LocalStorageKeys.MORTGAGE_TRANSACTION_INFO)}>
                                        <Button className="w-full">
                                            Complete Your Application
                                        </Button>
                                    </Link>
                                )
                            }
                        </CardFooter>
                    </Card>
                    <div className='space-y-4'>
                        {
                            data?.requirement && (
                                <Card className="p-4">
                                    <CardHeader className="mb-4">
                                        <h2 className="text-2xl font-semibold">Required Documents</h2>
                                    </CardHeader>
                                    <CardContent className='space-y-4'>
                                        {data?.requirement?.requiredDocuments.map((item: any, i: number) => (
                                            <Card key={i} className="shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                                                <CardContent className="flex justify-between items-center p-4">
                                                    <h3 className="font-medium text-lg">{item?.name}</h3>
                                                    <Button className="flex items-center">
                                                        <DownloadIcon className="mr-2 h-4 w-4" />
                                                        Download
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </CardContent>
                                </Card>
                            )
                        }
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
                        <Button className="rounded-full bg-primary w-15 h-15 flex items-center justify-center">
                            <MessageCircle size={25} className="text-white" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 mt-2 bg-white rounded-lg">
                        <Card className="border-none">
                            <CardContent>
                                <div className="fixed bottom-0 right-0 w-[350px] h-[505px] bg-white rounded-t-lg shadow-lg overflow-hidden">
                                    <div className="bg-gray-100 p-3 flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <MessageCircleIcon size={20} />
                                            <h2 className="text-lg font-bold">Chat</h2>
                                        </div>
                                        <X onClick={() => setChatOpen(!chatOpen)} className="w-6 h-6 cursor-pointer" />
                                    </div>
                                    <div className="overflow-y-auto p-3 h-[400px]" />
                                    <div className="border-t py-2 px-2 justify-between gap-2 flex items-center">
                                        <div className="w-5 h-5">
                                            <Paperclip size={20} className="w-5 h-5" />
                                        </div>
                                        <div className="flex-grow flex items-center space-x-2">
                                            <Input className="flex-grow" placeholder="Type a message" />
                                        </div>
                                        <div className="w-5 h-5">
                                            <Send className="w-5 h-5" />
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
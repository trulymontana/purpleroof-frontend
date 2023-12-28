"use client"

import { useGetOneMortgage } from '@/data/hooks/useMortgageClient'
import Loader from "@/components/Loader"
import { Button } from "@/components/ui/button"
import { CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { Bath, BedDouble } from "lucide-react"
import Image from "next/image"
import { MortgageStatusEnum } from '@/constants/enums'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import { Separator } from '@/components/ui/separator'


interface Props {
    params: {
        mortgageId: number
    }
}
const Page = ({ params: { mortgageId } }: Props) => {

    const { loading, data } = useGetOneMortgage(mortgageId)

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="p-4 flex justify-between flex-col">
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
                                <p className="text-lg capitalize">AED 312312321</p>
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
                            <div className="flex justify-between">
                                <h3 className="text-lg font-medium">Montly Income</h3>
                                <p className="text-lg capitalize">AED {data?.monthlyIncome}</p>
                            </div>
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
                                    <CardContent>
                                        <ul className='list-disc'>
                                            {data?.requirement?.requiredDocuments.map((item: any, i: number) => (
                                                <li key={i}>{item.name}</li>
                                            ))}
                                        </ul>
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
        </>
    )
}

export default Page
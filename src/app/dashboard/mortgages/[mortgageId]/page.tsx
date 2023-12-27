"use client"

import { useGetOneMortgage } from '@/data/hooks/useMortgageClient'
import Loader from "@/components/Loader"
import { Button } from "@/components/ui/button"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Bath, BedDouble } from "lucide-react"
import Image from "next/image"
import { MortgageStatusEnum } from '@/constants/enums'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import { LocalStorageKeys } from '@/constants/local-storage-keys'


interface Props {
    params: {
        mortgageId: number
    }
}
const Page = ({ params: { mortgageId } }: Props) => {

    const { loading, data } = useGetOneMortgage(mortgageId)

    console.log({ data })

    if (loading) {
        return (
            <div className="h-[100vh] flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    return (
        <>
            <main className="container">
                <h1 className="text-4xl font-bold mb-4"></h1>
                <Card className="p-4">
                    <CardHeader className="mb-4">
                        <h2 className="text-2xl font-semibold">Property Details</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-medium">First Name</h3>
                            <p className="text-lg capitalize">{data?.firstName}</p>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="text-lg font-medium">Last Name</h3>
                            <p className="text-lg capitalize">{data?.lastName}</p>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="text-lg font-medium">Email</h3>
                            <p className="text-lg capitalize">{data?.email}</p>
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
                            <p className="text-lg capitalize">AED {data?.monthlyIncome}</p>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="text-lg font-medium">Completion Status</h3>
                            <p className="text-lg capitalize">AED {data?.monthlyIncome}</p>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="text-lg font-medium">Emirate</h3>
                            <p className="text-lg capitalize">AED {data?.monthlyIncome}</p>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="text-lg font-medium">Additional Details</h3>
                            <p className="text-lg capitalize">AED {data?.monthlyIncome}</p>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="text-lg font-medium">Montly Income</h3>
                            <p className="text-lg capitalize">AED {data?.monthlyIncome}</p>
                        </div>
                        {
                            data?.status === MortgageStatusEnum.SUBMITTED && (
                                <Link href={PageRoutes.dashboard.COMPLETE_MORTGAGE_APPLICATION(mortgageId, LocalStorageKeys.MORTGAGE_TRANSACTION_INFO)}>
                                    <Button className="w-full mt-10">
                                        Complete Your Application
                                    </Button>
                                </Link>
                            )
                        }
                    </CardContent>
                </Card>
            </main>
        </>
    )
}

export default Page
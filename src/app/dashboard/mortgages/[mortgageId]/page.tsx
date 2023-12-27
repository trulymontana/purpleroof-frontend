"use client"

import { useGetOneMortgage } from '@/data/hooks/useMortgageClient'
import Loader from "@/components/Loader"
import { Button } from "@/components/ui/button"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Bath, BedDouble } from "lucide-react"
import Image from "next/image"


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
            <section className="w-full h-[500px]">
                <Image
                    alt="Mortgage Image"
                    className="object-cover w-full h-full"
                    height="500"
                    src="/placeholder.svg"
                    style={{
                        aspectRatio: "1000/500",
                        objectFit: "cover",
                    }}
                    width="1000"
                    priority
                />
            </section>
            <main className="container mx-auto p-8">
                <h1 className="text-4xl font-bold mb-4"></h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="p-4">
                        <CardHeader className="mb-4">
                            <h2 className="text-2xl font-semibold">Property Details</h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <h3 className="text-lg font-medium">Property For:</h3>
                                <p className="text-lg capitalize">{data?.firstName}</p>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-lg font-medium">Property Type:</h3>
                                <p className="text-lg capitalize">test 2</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="p-4 h-[310px]">
                        <CardHeader className="mb-4">
                            <h2 className="text-2xl font-semibold">Contact Agent</h2>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-medium">John Doe</h3>
                                    <p className="text-sm text-gray-500">Licensed Real Estate Agent</p>
                                </div>
                            </div>
                            <Button className="mb-2 w-full">Email Agent</Button>
                            <Button className="w-full" variant="outline">
                                Call Agent
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    )
}

export default Page
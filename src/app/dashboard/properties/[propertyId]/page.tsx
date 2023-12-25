'use client'

import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { CardHeader, CardContent, Card } from '@/components/ui/card'
import { useGetOneProperty } from '@/data/hooks/usePropertiesClient'
import { Bath, BedDouble } from 'lucide-react'
import Image from 'next/image'

const Page = ({ params: { propertyId } }: { params: { propertyId: number } }) => {
  const { loading, data } = useGetOneProperty(propertyId)

  if (loading) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <section className="h-[500px] w-full">
        <Image
          alt="Property Image"
          className="h-full w-full object-cover"
          height="500"
          src="/placeholder.svg"
          style={{
            aspectRatio: '1000/500',
            objectFit: 'cover'
          }}
          width="1000"
          priority
        />
      </section>
      <main className="container mx-auto p-8">
        <h1 className="mb-4 text-4xl font-bold">{data?.name}</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="p-4">
            <CardHeader className="mb-4">
              <h2 className="text-2xl font-semibold">Property Details</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Property For:</h3>
                <p className="text-lg capitalize">{data?.propertyFor?.toLocaleLowerCase()}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Property Type:</h3>
                <p className="text-lg capitalize">{data?.propertyType?.toLocaleLowerCase()}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Property Category:</h3>
                <p className="text-lg capitalize">{data?.propertyCategory?.toLocaleLowerCase()}</p>
              </div>
              {data?.emirate && (
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Emirate:</h3>
                  <p className="text-lg capitalize">{data?.emirate.toLowerCase()}</p>
                </div>
              )}
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Building/Cluster Name:</h3>
                <p className="text-lg">{data?.buildingName}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Floor:</h3>
                <p className="text-lg">{data?.floor}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Street:</h3>
                <p className="text-lg">{data?.street}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Unit Number:</h3>
                <p className="text-lg">{data?.unitNumber}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Landmark:</h3>
                <p className="text-lg">{data?.landmark}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Floor:</h3>
                <p className="text-lg">{data?.floor}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Price:</h3>
                <p className="text-lg">AED {data?.amount}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Contact No.:</h3>
                <p className="text-lg">{data?.phone}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Project Status:</h3>
                <p className="text-lg capitalize">{data?.projectStatus?.toLowerCase().replaceAll('_', ' ')}</p>
              </div>
              {data?.completionDate && (
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Completion Date:</h3>
                  <p className="text-lg capitalize">{new Date(data?.completionDate).toLocaleDateString()}</p>
                </div>
              )}
              {data?.occupencyStatus && (
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Occupency Status:</h3>
                  <p className="text-lg capitalize">{data?.occupencyStatus.toLowerCase()}</p>
                </div>
              )}

              {data?.numberOfBathRooms && data?.numberOfBedRooms && (
                <>
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Bedrooms:</h3>
                    <p className="flex items-center gap-2 text-lg">
                      {data?.numberOfBedRooms} <BedDouble />
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Bathrooms:</h3>
                    <p className="flex items-center gap-2 text-lg">
                      {data?.numberOfBathRooms} <Bath />
                    </p>
                  </div>
                </>
              )}
              {data?.numberOfLavatory && (
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Lavatory:</h3>
                  <p className="flex items-center gap-2 text-lg">
                    {data?.numberOfLavatory} <Bath />
                  </p>
                </div>
              )}
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Area:</h3>
                <p className="text-lg">{data?.size} sqft</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Title Deed / Oqod / Initial Contract of Sales:</h3>
                <p className="text-lg">{data?.deedNumber}</p>
              </div>
              {data?.noticePeriod && (
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Notice Period:</h3>
                  <p className="text-lg">{data?.noticePeriod}</p>
                </div>
              )}
              {data?.minimumContract && (
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Minimum Contract:</h3>
                  <p className="text-lg">{data?.minimumContract}</p>
                </div>
              )}
              {data?.description && (
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Description:</h3>
                  <p className="text-lg">{data?.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="h-[310px] p-4">
            <CardHeader className="mb-4">
              <h2 className="text-2xl font-semibold">Contact Agent</h2>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center space-x-4">
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

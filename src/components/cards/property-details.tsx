"use client"

import { Property } from "@/data/clients/propertiesClient"
import currency from "@/lib/currency"
import { Bath, Bed, Grid, LandPlot, MapPin } from "lucide-react"

interface Props {
    data: Property
}

const PropertyDetailsCard = ({ data }: Props) => {
    return (
        <>
            <div className="col-span-2 ">
                <h1 className="text-3xl font-semibold"><span className='text-5xl'>{data?.amount && currency.format(data?.amount)}</span> {data?.paymentInterval && data?.paymentInterval}</h1>
                <p className="text-xl my-2 capitalize">{data?.name}</p>
                <div className="flex items-center space-x-4 my-4">
                    {data?.numberOfBathRooms && data?.numberOfBathRooms &&
                        <>
                            <p className="flex items-center">
                                <Bed className="mr-2" />
                                {data?.numberOfBedRooms} Beds
                            </p>
                            <p className="flex items-center">
                                <Bath className="mr-2" />
                                {data?.numberOfBathRooms} Baths
                            </p>
                        </>
                    }
                    {data?.numberOfLavatory && (
                        <p className="flex items-center">
                            <Bath className="mr-2" />
                            {data?.numberOfLavatory} Lavatory
                        </p>
                    )}
                    {
                        data?.propertySize && (
                            <p className="flex items-center">
                                <Grid className="mr-2" />
                                {data?.propertySize} sqft
                            </p>
                        )
                    }
                </div>
                <h2 className="text-2xl font-semibold my-2 capitalize"> {data?.occupencyStatus?.toLocaleLowerCase()} | {data?.furnishingStatus?.toLocaleLowerCase().replaceAll("_", " ")}</h2>
                <p className="my-4">
                    18Bricks Real Estate is delighted to present to you this two (2) bedrooms apartment located in Amna Tower Al
                    Habtoor, BusinessBay.
                </p>
            </div>
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <h3 className="text-3xl font-semibold my-2 flex items-center gap-2"><LandPlot className='font-semibold' /> Property Information</h3>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-10 mt-5">
                        <div>
                            <p>Type</p>
                            <p className="font-semibold capitalize">{data?.propertyCategory?.toLocaleLowerCase().replaceAll("_", " ")}</p>
                        </div>
                        <div>
                            <p>Furnishing Status</p>
                            <p className="font-semibold capitalize">{data?.furnishingStatus?.toLocaleLowerCase().replaceAll("_", " ")}</p>
                        </div>
                        <div>
                            <p>Purpose</p>
                            <p className="font-semibold capitalize">For {data?.propertyFor?.toLocaleLowerCase()}</p>
                        </div>
                        <div>
                            <p>Deed Number</p>
                            <p className="font-semibold">{data?.deedNumber}</p>
                        </div>
                        {data?.createdAt && (
                            <div>
                                <p>Added on</p>
                                <p className="font-semibold">{new Date(data?.createdAt)?.toLocaleDateString()}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <h3 className="text-3xl font-semibold my-2 flex items-center gap-1"><MapPin className='font-semibold' /> Location Information</h3>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-10 mt-5">
                        <div>
                            <p>Emirate</p>
                            <p className="font-semibold capitalize">{data?.emirate?.toLocaleLowerCase().replaceAll("_", " ")}</p>
                        </div>
                        <div>
                            <p>Location</p>
                            <p className="font-semibold capitalize">{data?.location?.toLocaleLowerCase().replaceAll("_", " ")}</p>
                        </div>
                        <div>
                            <p>Building Name</p>
                            <p className="font-semibold capitalize">{data?.buildingName?.toLocaleLowerCase()}</p>
                        </div>
                        <div>
                            <p>Floor</p>
                            <p className="font-semibold">{data?.floor}</p>
                        </div>
                        <div>
                            <p>Street</p>
                            <p className="font-semibold capitalize">{data?.street}</p>
                        </div>
                        <div>
                            <p>Unit Number</p>
                            <p className="font-semibold capitalize">{data?.unitNumber}</p>
                        </div>
                        <div>
                            <p>Landmark</p>
                            <p className="font-semibold capitalize">{data?.landmark}</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PropertyDetailsCard
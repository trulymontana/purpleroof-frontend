"use client"

import { Property } from "@/data/clients/propertiesClient"
import currency from "@/lib/currency"
import { Bath, Bed, Grid, LandPlot, MapPin, TrendingUp } from "lucide-react"

interface Props {
    data: Property
}

const PropertyDetailsCard = ({ data }: Props) => {

    if (data) {
        return (
            <div className="w-full space-y-10">
                <div className="col-span-2">
                    {
                        data?.amount && (
                            <h1 className="text-3xl font-semibold"><span className='text-5xl'>{currency.format(data?.amount)}</span></h1>
                        )
                    }
                    {
                        data?.rentalAmount && (
                            <h1 className="text-3xl font-semibold"><span className='text-5xl'>{currency.format(data?.rentalAmount)}</span> /{data?.paymentInterval && data?.paymentInterval}</h1>
                        )
                    }
                    <p className="text-xl my-2 capitalize ">{data?.name}</p>
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
                        {data?.description}
                    </p>
                </div>
                <div className="grid gap-8 shadow-md rounded-xl border shadow-primary/30 p-5">
                    <div className="w-full ">
                        <h3 className="text-3xl font-semibold my-2 flex items-center gap-2 text-primary"><LandPlot className='font-semibold' /> Property Information</h3>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-16 mt-5 w-full content-between">
                            <div className="flex justify-between">
                                <p>Type</p>
                                <p className="font-semibold capitalize">{data?.propertyCategory?.toLocaleLowerCase().replaceAll("_", " ")}</p>
                            </div>
                            <div className="flex justify-between">
                                <p >Furnishing Status</p>
                                <p className="font-semibold capitalize ">{data?.furnishingStatus?.toLocaleLowerCase().replaceAll("_", " ")}</p>
                            </div>
                            <div className="flex justify-between">
                                <p >Purpose</p>
                                <p className="font-semibold capitalize ">For {data?.propertyFor?.toLocaleLowerCase()}</p>
                            </div>
                            <div className="flex justify-between">
                                <p >Deed Number</p>
                                <p className="font-semibold ">{data?.deedNumber}</p>
                            </div>
                            {data?.createdAt && (
                                <div className="flex justify-between">
                                    <p>Added on</p>
                                    <p className="font-semibold ">{new Date(data?.createdAt)?.toLocaleDateString()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="grid gap-8 shadow-md rounded-xl shadow-primary/30 border p-5">
                    <div className="col-span-2">
                        <h3 className="text-3xl font-semibold my-2 flex items-center gap-1 text-primary"><MapPin className='font-semibold' /> Location Information</h3>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-16 mt-5 w-full content-between">
                            <div className="flex justify-between">
                                <p>Emirate</p>
                                <p className="font-semibold capitalize ">{data?.emirate?.toLocaleLowerCase().replaceAll("_", " ")}</p>
                            </div>
                            <div className="flex justify-between">
                                <p >Location</p>
                                <p className="font-semibold capitalize ">{data?.location?.toLocaleLowerCase().replaceAll("_", " ")}</p>
                            </div>
                            <div className="flex justify-between">
                                <p >Building Name</p>
                                <p className="font-semibold capitalize ">{data?.buildingName?.toLocaleLowerCase()}</p>
                            </div>
                            <div className="flex justify-between">
                                <p >Floor</p>
                                <p className="font-semibold ">{data?.floor}</p>
                            </div>
                            <div className="flex justify-between">
                                <p >Street</p>
                                <p className="font-semibold capitalize ">{data?.street}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Unit Number</p>
                                <p className="font-semibold capitalize ">{data?.unitNumber}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Landmark</p>
                                <p className="font-semibold capitalize ">{data?.landmark}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid gap-8 shadow-md rounded-xl shadow-primary/30 border p-5">
                    <div className="col-span-2">
                        <h3 className="text-3xl font-semibold my-2 flex items-center gap-2 text-primary"><TrendingUp className='font-semibold' /> Project Status Information</h3>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-16 mt-5 w-full content-between">
                            <div className="flex justify-between">
                                <p>Project Status</p>
                                <p className="font-semibold capitalize ">{data?.projectStatus?.toLocaleLowerCase().replaceAll("_", " ")}</p>
                            </div>
                            {data?.occupencyStatus && (
                                <div className="flex justify-between">
                                    <p>Occupency Status</p>
                                    <p className="font-semibold capitalize ">{data?.occupencyStatus?.toLocaleLowerCase()}</p>
                                </div>
                            )}
                            {data?.completionDate && (
                                <div className="flex justify-between">
                                    <p>Occupency Status</p>
                                    <p className="font-semibold capitalize ">{new Date(data.completionDate).toLocaleDateString()}</p>
                                </div>
                            )}
                            {data?.noticePeriodProperty && (
                                <div className="flex justify-between">
                                    <p>Notice Period</p>
                                    <p className="font-semibold capitalize ">{data?.noticePeriodProperty} months</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="grid gap-8 shadow-md rounded-xl shadow-primary/30 border p-5">
                    <div className="col-span-2">
                        <h3 className="text-3xl font-semibold my-2 flex items-center gap-2 text-primary"><Grid className='font-semibold' /> Other Details</h3>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-16 mt-5 w-full content-between">
                            <div className="flex justify-between">
                                <p>Distance From Airport</p>
                                <p className="font-semibold capitalize ">{data?.airportDistance} kms</p>
                            </div>
                            {data?.metroStation && (
                                <div className="flex justify-between">
                                    <p>Nearest Metro Station Distance</p>
                                    <p className="font-semibold capitalize ">{data?.metroStation} kms</p>
                                </div>
                            )}
                            {data?.nearbyPlaces && (
                                <div className="flex justify-between">
                                    <p>Nearby Places</p>
                                    <p className="font-semibold capitalize ">{data?.nearbyPlaces}</p>
                                </div>
                            )}
                            {data?.otherFeatures && (
                                <div className="flex justify-between">
                                    <p>Other Main Features</p>
                                    <p className="font-semibold capitalize ">{data?.otherFeatures}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default PropertyDetailsCard
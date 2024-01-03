import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Property } from '@/data/clients/propertiesClient'
import currency from '@/lib/currency'
import { Bath, Bed, MapPin, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

interface Props {
    property: Property
}

const PropertyCard = ({ property }: Props) => {
    return (
        <Card className="max-w-sm w-full rounded-xl">
            <Image
                alt="Property Image"
                className="w-full h-64 object-cover border-b-2 rounded-t-xl"
                height="256"
                src={property?.image || "/placeholder.svg"}
                style={{
                    aspectRatio: "256/256",
                    objectFit: "cover",
                }}
                width="256"
            />
            <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold line-clamp-2 h-[60px]">{property?.name}</CardTitle>
                <CardDescription className="text-gray-500">{property?.location}</CardDescription>
            </CardHeader>
            <CardContent className="px-4 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <p className="text-sm capitalize font-bold">{property.emirate?.toLocaleLowerCase().replaceAll("_", " ")}</p>
                    </div>
                    {property?.rentalAmount && (
                        <div className="flex items-center space-x-2">
                            <Tag className="w-4 h-4" />
                            <p className="text-sm font-bold">{currency.format(property.rentalAmount)} / {property?.paymentInterval}</p>
                        </div>
                    )}

                    {
                        property?.amount && (
                            <div className="flex items-center space-x-2">
                                <p className="text-sm font-bold">{currency.format(property.amount)}</p>
                            </div>
                        )
                    }
                </div>
                <div className="flex items-center justify-between">
                    {property?.numberOfBathRooms && property?.numberOfBedRooms && (
                        <>
                            <div className="flex items-center space-x-2">
                                <Bed className="w-4 h-4" />
                                <p className="text-sm font-bold">{property.numberOfBedRooms} Beds</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Bath className="w-4 h-4" />
                                <p className="text-sm">{property.numberOfBathRooms} Baths</p>
                            </div>
                        </>
                    )}
                    {property?.numberOfLavatory && (
                        <>
                            <div className="flex items-center space-x-2">
                                <Bath className="w-4 h-4" />
                                <p className="text-sm font-bold">{property.numberOfLavatory} Baths</p>
                            </div>
                        </>
                    )}
                </div>
                <p className="text-sm line-clamp-3">
                    This stylish apartment is located in the heart of the city, close to shopping centers, restaurants, and
                    parks. It&apos;s perfect for anyone looking to experience the city life.
                </p>
            </CardContent>
            <CardFooter className="p-4">
                <Link className='w-full' href={`/search/${property.id}`} >
                    <Button className="w-full">View More Details</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default PropertyCard
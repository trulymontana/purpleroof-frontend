import { Property } from '@/data/clients/propertiesClient'
import { Card, CardContent, CardHeader } from '../ui/card'

interface Props {
  data: Property
}

const AmenitiesCard = ({ data }: Props) => {
  return (
    <Card className="shadow-md shadow-primary/30">
      <CardHeader>
        <h3 className="text-2xl font-semibold">Features / Amenities</h3>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6">
        {data?.amenities?.length > 0 &&
          data?.amenities.map((amenity: any, i: number) => {
            return (
              <div
                key={i}
                className="h-fit rounded-xl bg-white p-2 text-center text-sm font-medium text-gray-700 shadow shadow-primary/30"
              >
                {amenity.name}
              </div>
            )
          })}
      </CardContent>
    </Card>
  )
}

export default AmenitiesCard

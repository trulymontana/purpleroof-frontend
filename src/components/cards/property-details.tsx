'use client'

import { Property } from '@/data/clients/propertiesClient'
import currency from '@/lib/currency'
import { formatString } from '@/lib/utils'
import { Bath, Bed, Grid, LandPlot, MapPin, TrendingUp } from 'lucide-react'
import CardField from './card-field'

interface Props {
  data: Property
}

const PropertyDetailsCard = ({ data }: Props) => {
  if (data) {
    return (
      <div className="w-full space-y-10">
        <div className="col-span-2">
          {data?.amount && (
            <h1 className="text-3xl font-semibold">
              <span className="text-5xl">{currency.format(data?.amount)}</span>
            </h1>
          )}
          {data?.rentalAmount && (
            <h1 className="text-3xl font-semibold">
              <span className="text-5xl">{currency.format(data?.rentalAmount)}</span> /
              {data?.paymentInterval && data?.paymentInterval}
            </h1>
          )}
          <p className="my-2 text-xl capitalize ">{data?.name}</p>
          <div className="my-4 flex items-center space-x-4">
            {data?.numberOfBathRooms && data?.numberOfBathRooms && (
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
            )}
            <p className="flex items-center">
              <Grid className="mr-2" />
              {data?.size ?? "-"} sqft
            </p>
          </div>
          <h2 className="my-2 text-2xl font-semibold capitalize">
            {' '}
            {formatString(data?.occupencyStatus)} | {' '}
            {formatString(data?.furnishingStatus)}
          </h2>
          <p className="my-4 text-gray-500">{data?.description}</p>
        </div>
        <div className="custom_card">
          <div className="w-full">
            <h3 className="custom_card_heading">
              <LandPlot className="font-semibold" /> Property Information
            </h3>
            <div className="custom_card_details">
              <CardField label='Type' value={formatString(data?.propertyCategory)} />
              <CardField label='Furnishing Status' value={formatString(data?.furnishingStatus)} />
              <CardField label='Purpose' value={`For ${formatString(data?.propertyFor)}`} />
              <CardField label='Deed Number' value={formatString(data?.deedNumber)} />
              {data?.createdAt && (
                <CardField label='Added on' value={new Date(data?.createdAt)?.toLocaleDateString()} />
              )}
            </div>
          </div>
        </div>
        <div className="custom_card">
          <div className="col-span-2">
            <h3 className="custom_card_heading">
              <MapPin className="font-semibold" /> Location Information
            </h3>
            <div className="custom_card_details">
              <CardField label='Emirate' value={formatString(data?.emirate)} />
              <CardField label='Location' value={formatString(data?.location?.name)} />
              {data?.cityName && <CardField label='City' value={formatString(data?.cityName)} />}
              <CardField label='Community Name' value={formatString(data?.communityName)} />
              <CardField label='Building Name' value={formatString(data?.buildingName)} />
              <CardField label='Floor' value={data?.floor} />
              <CardField label='Street' value={formatString(data?.street)} />
              <CardField label='Unit Number' value={data?.unitNumber} />
              <CardField label='Landmark' value={formatString(data?.landmark)} />
            </div>
          </div>
        </div>
        <div className="custom_card">
          <div className="col-span-2">
            <h3 className="custom_card_heading">
              <TrendingUp className="font-semibold" /> Project Status Information
            </h3>
            <div className="custom_card_details">
              <CardField label='Project Status' value={formatString(data?.projectStatus)} />

              {data?.occupencyStatus && (
                <CardField label='Occupency Status' value={formatString(data.occupencyStatus)} />
              )}

              {data?.completionDate && (
                <CardField label='Completion Date' value={new Date(data.completionDate).toLocaleDateString()} />
              )}

              {data?.noticePeriodProperty && (
                <CardField label='Notice Period' value={`${data.noticePeriodProperty} months`} />
              )}
            </div>
          </div>
        </div>
        <div className="custom_card">
          <div className="col-span-2">
            <h3 className="custom_card_heading">
              <Grid className="font-semibold" /> Other Details
            </h3>
            <div className="custom_card_details">
              <CardField label='Distance From Airport(in kms)' value={formatString(data?.airportDistance)} />
              <CardField label='Nearest Metro Station Distance(in kms)' value={formatString(data?.metroStation)} />
              <CardField label='Nearby Places' value={formatString(data?.nearbyPlaces)} />
              <CardField label='Other Main Features' value={formatString(data?.otherFeatures)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PropertyDetailsCard

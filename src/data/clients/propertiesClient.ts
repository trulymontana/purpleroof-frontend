import { QueryOptions, TOption } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import { EmirateEnum, OccupencyStatusEnum } from '@/constants/enums'

export interface CreatePropertyInput {
  name: string
  category: string
  typeOfProperty: string
  propertyOption: string
  phone: string
  propertyValue: string
  propertySize: string
  amenities: number[]
  numberOfBedRooms?: number
  numberOfBathRooms?: number
  deedNumber: string
  emirate: EmirateEnum
  locationId: string
  buildingName: string
  floor: string
  street: string
  unitNumber: string
  landmark: string
  propertyImage: string
  status: string
  propertyPhotos: any
  propertyType: string
  propertyFor: string
  parkingSpaces: string
  airportDistance: string
  metroStation: string
  nearbyPlaces: string
  otherFeatures: string
  projectStatus: string
  rentedOrVacant?: string
  rentalAmount?: string
  numberOfCheques?: string
  noticePeriodRent?: string
  noticePeriodProperty?: string
  completionDate?: string
  passportCopy: string
  visaCopy: string
  emiratesId: string
  titleDeedCopy: string
  ownerProofOfMobileNumber: string
  callPreference: string
  paymentInterval?: string
  minimumContract?: string
  lavatories?: string
  // documents: DocumentEnum
}

export interface Property extends CreatePropertyInput {
  emirate: EmirateEnum
  address: string
  amount: number
  occupencyStatus: OccupencyStatusEnum
  numberOfLavatory: number
  size: number
  noticePeriod: number
  description: string
  propertyCategory: string
}

export const propertiesClient = {
  ...crudFactory<Property, QueryOptions, CreatePropertyInput>(ApiEndpoints.PROPERTIES)
}

import { Property, QueryOptions, TOption } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'

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
  emirate: string
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

export const propertiesClient = {
  ...crudFactory<Property, QueryOptions, CreatePropertyInput>(ApiEndpoints.PROPERTIES)
}

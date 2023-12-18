import { Property, QueryOptions } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'

export interface CreatePropertyInput {
  advertTitle: string
  category: string
  typeOfProperty: string
  propertyOption: string
  phone: string
  propertyValue: string
  propertySize: string
  numberOfBedRooms?: number
  numberOfBathRooms?: number
  deedNumber: string
  emirate: string
  location: string
  buildingName: string
  floor: string
  street: string
  unitNumber: string
  landmark: string
  propertyImage: string
  propertyType: string
  status: string
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
}

export const propertiesClient = {
  ...crudFactory<Property, QueryOptions, CreatePropertyInput>(ApiEndpoints.PROPERTIES)
}

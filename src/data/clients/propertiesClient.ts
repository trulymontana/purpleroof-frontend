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
  floor: number
  street: string
  unitNumber: number
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
  rentalAmount?: number
  numberOfCheques?: number | null
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
  minimumContract?: number
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
  propertyTypeId: number
  propertyTypeCategoryId: number
  createdAt: Date
  updatedAt: Date
  emirateId: number
  status: string
  id: number
}

export const propertiesClient = {
  ...crudFactory<Property, QueryOptions, CreatePropertyInput>(ApiEndpoints.PROPERTIES)
}

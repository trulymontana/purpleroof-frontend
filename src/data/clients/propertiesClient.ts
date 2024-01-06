import { QueryOptions, TOption } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import { EmirateEnum, FurnishingStatusEnum, OccupencyStatusEnum, PropertySubmissionStatusEnum } from '@/constants/enums'
import HttpClient from '@/lib/http-client'
import { Agent } from './agentsClient'

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
  locationId: number
  buildingName: string
  floor: number
  street: string
  unitNumber: number
  landmark: string
  propertyImage: string
  furnishingStatus: FurnishingStatusEnum
  image: any
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
  id: number
  submissionStatus: PropertySubmissionStatusEnum
  documents: any
  agentId?: number
  agent?: Agent
  location: {
    name: string
  }
}

export const propertiesClient = {
  ...crudFactory<Property, QueryOptions, CreatePropertyInput>(ApiEndpoints.PROPERTIES),
  assignAgent: (data: any) => {
    return HttpClient.patch<any>(`${ApiEndpoints.PROPERTIES}/assign-agent/${data.id}/${data.agentId}`, data)
  }
}

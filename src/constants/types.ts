import { EmirateEnum, MortgageStatusEnum } from './enums'

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}
export interface QueryOptions {
  language: string
  limit?: number
  page?: number
  orderBy?: string
  sortedBy?: SortOrder
}

export interface SuccessResponse<T> {
  data: T
  message: string
  statusCode: number
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
  role: string
  isEmailConfirmed: boolean
}

export interface MortgageApplication {
  id: number
  residentialTypeId: number
  incomeProfileId: number
  loanTypeId: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  intendedProperty: string
  monthlyIncome: number
  createdAt: string
  updatedAt: string
  userId: number
  country: string
  actions: string
  status: MortgageStatusEnum
}

export interface RequirementApplication {
  id: number
  name: string
  requiredDocuments: any
  incomeProfile: string
  residenceType: string
}

export interface Property {
  id: number
  propertyTypeId: number
  propertyTypeCategoryId: number
  name: string
  description?: string | null
  phone: string
  amount: number
  size?: number | null
  numberOfBedRooms?: number | null
  numberOfBathRooms?: number | null
  maintenanceFee?: number | null
  address?: string | null
  landmark?: string | null
  createdAt: Date
  updatedAt: Date
  locationId?: number | null
  minimumContract?: number | null
  emirate: EmirateEnum
  noticePeriod?: number | null
  deedNumber?: string | null
  unitNumber?: number | null
  buildingName?: string | null
  floor?: number | null
  isApproved?: boolean | null
  // status: Properties_status;
  userId?: number | null
  draft?: string | null
  agentInfoId?: number | null
  paymentInterval?: string | null
  emirateId: number
  // projectStatus?: Properties_projectStatus | null;
  numberOfCheques?: number | null
  completionDate?: Date | null
  noticePeriodOfRemainingRentalAgreement?: number | null
  numberOfLavatory?: number | null
  rentalAmount?: number | null
  trakheesiPermitNo?: string
  lat?: number | null
  lng?: number | null
  // AdvertiseDocuments: AdvertiseDocuments[];
  // AgentInformations?: AgentInformations | null;
  // Emirates: Emirates;
  // PropertyTypes: PropertyTypes;
  // PropertyTypeCategories: PropertyTypeCategories;
  // PropertyLocations?: PropertyLocations | null;
  // Users?: Users | null;
  // PropertyAmenities: PropertyAmenities[];
  // PropertyDocuments: PropertyDocuments[];
}

export type TOption = {
  label: string
  value: string
}

export type PreSignedFile = {
  url: string
  expiry: number
}

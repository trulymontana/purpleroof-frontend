import { EmirateEnum, IncomeProfileEnum, MortgageStatusEnum, ResidenceTypeEnum, UserRoleEnum } from './enums'

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

// export interface User {
//   id: number
//   firstName: string
//   lastName: string
//   email: string
//   password: string
//   createdAt: string
//   updatedAt: string
//   role: string
//   isEmailConfirmed: boolean
// }

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
  requiredDocuments: { name: string; documentType: string }[]
  incomeProfile: IncomeProfileEnum
  residenceType: ResidenceTypeEnum
  createdAt: string
  updatedAt: string
  preApprovalFee: number
  processingFee: number
  lifeInsurance: number
  propertyInsurance: number
  rate: number
  valuationFee: number
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
  locationId?: string
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
  numberOfCheques?: number | null
  completionDate?: string | null
  noticePeriodOfRemainingRentalAgreement?: number | null
  numberOfLavatory?: number | null
  rentalAmount?: number | null
  trakheesiPermitNo?: string
  lat?: number | null
  lng?: number | null
  status: string
}

export type TOption = {
  label: string
  value: string
}

export type PreSignedFile = {
  url: string
  expiry: number
}

export type User = {
  email: string
  firstName: string
  lastName: string
  role: UserRoleEnum
  createdAt: string
  updatedAt: string
}

export type historyType = {
  id: number
  title: string
  description: string
  mortgageId: number
}

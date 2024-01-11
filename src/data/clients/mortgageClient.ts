import { QueryOptions, historyType } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import {
  CompletionStatusEnum,
  EducationEnum,
  EmirateEnum,
  IncomeProfileEnum,
  LoanTypeEnum,
  MaritalStatusEnum,
  MortgageStatusEnum,
  PropertyTypeEnum,
  RelationshipEnum,
  ResidenceTypeEnum
} from '@/constants/enums'

export interface CreateMortgageInput {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  intendedProperty: string
  monthlyIncome: number
  dialCode: string
  country: string
  status: MortgageStatusEnum
  residenceType: ResidenceTypeEnum
  incomeProfile: IncomeProfileEnum
  loanType: LoanTypeEnum
}

export interface Mortgage extends CreateMortgageInput {
  status: MortgageStatusEnum
  id: number
  residentialTypeId: number
  incomeProfileId: number
  loanTypeId: number
  createdAt: string
  updatedAt: string
  userId: number
  actions: string
  requirement: any // replace any with correct type
  history: historyType[]
  comments: { title: string; message: string; userId: number }[]
  valueOfProperty: number
  propertyType: PropertyTypeEnum
  completionStatus: CompletionStatusEnum
  emirate: EmirateEnum
  additionalDetail: string
  educationType: EducationEnum
  maritalStatus: MaritalStatusEnum
  favoriteCity: string
  familyMembersInUae: number
  yearsInUae: number
  annualRentalIncome: number
  uaeResidenceAddress: string
  homeCountryAddress: string
  references: { title: string; name: string; phone: string; relationship: RelationshipEnum }[]
}

export const mortgageClient = {
  ...crudFactory<Mortgage, QueryOptions, CreateMortgageInput>(ApiEndpoints.MORTGAGES)
}

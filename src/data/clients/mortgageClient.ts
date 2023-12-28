import { MortgageApplication, QueryOptions, User } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import { IncomeProfileEnum, LoanTypeEnum, MortgageStatusEnum, ResidenceTypeEnum } from '@/constants/enums'
import HttpClient from '@/lib/http-client'

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
}

export const mortgageClient = {
  ...crudFactory<Mortgage, QueryOptions, CreateMortgageInput>(ApiEndpoints.MORTGAGES),
  createMortgageTransaction: (mortgageId: number, mortgageTransaction: any) => {
    return HttpClient.post<any>(`${ApiEndpoints.MORTGAGE_TRANSACTION}/${mortgageId}`, mortgageTransaction)
  }
}

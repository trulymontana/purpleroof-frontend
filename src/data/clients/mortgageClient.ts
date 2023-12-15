import { MortgageApplication, QueryOptions, User } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import { IncomeProfileEnum, LoanTypeEnum, MortgageStatusEnum, ResidenceTypeEnum } from '@/constants/enums'

export interface CreateMortgageInput {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  intendedProperty?: string
  monthlyIncome: number
  dialCode: string
  country: string
  status: MortgageStatusEnum
  residenceType: ResidenceTypeEnum
  incomeProfile: IncomeProfileEnum
  loanType: LoanTypeEnum
}

export const mortgageClient = {
  ...crudFactory<MortgageApplication, QueryOptions, CreateMortgageInput>(ApiEndpoints.MORTGAGES)
}

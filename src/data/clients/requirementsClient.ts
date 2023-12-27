import { QueryOptions, RequirementApplication, User } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import { IncomeProfileEnum, ResidenceTypeEnum } from '@/constants/enums'

export interface CreateRequirementInput {
  name: string
  incomeProfile: IncomeProfileEnum
  residenceType: ResidenceTypeEnum
  preApprovalFee: number
  processingFee: number
  rate: number
  lifeInsurance: number
  propertyInsurance: number
  valuationFee: number
  requiredDocuments: {
    id?: number
    name: string
    documentType: any // Replace 'any' with the actual type for documentType
    isMandatory: boolean
  }[]
}

export const requirementsClient = {
  ...crudFactory<RequirementApplication, QueryOptions, CreateRequirementInput>(ApiEndpoints.REQUIREMENTS)
}

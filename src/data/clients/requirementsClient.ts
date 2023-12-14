import { QueryOptions, RequirementApplication, User } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'

export interface CreateRequirementInput {
  name: string
  incomeProfile: any // Replace 'any' with the actual type for incomeProfile
  residenceType: any // Replace 'any' with the actual type for residenceType
  requiredDocuments: {
    id: number
    name: string
    documentType: any // Replace 'any' with the actual type for documentType
    isMandatory: boolean
  }[]
}

export const requirementsClient = {
  ...crudFactory<RequirementApplication, QueryOptions, CreateRequirementInput>(ApiEndpoints.REQUIREMENTS)
}

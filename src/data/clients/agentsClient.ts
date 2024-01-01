import { QueryOptions } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import { ActiveStatusEnum, ApprovalStatusEnum } from '@/constants/enums'

export interface CreateAgentInput {
  agency: string
  contactNumber: string
  realEstateLicense: string
  locations?: any
  activeStatus?: ActiveStatusEnum
  approvalStatus?: ApprovalStatusEnum
}

export interface Agents extends CreateAgentInput {
  id: number
  createdAt: string
  updatedAt: string
}

export const agentsClient = {
  ...crudFactory<Agents, QueryOptions, CreateAgentInput>(ApiEndpoints.AGENTS)
}

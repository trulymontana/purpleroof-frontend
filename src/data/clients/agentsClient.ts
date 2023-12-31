import { QueryOptions } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'

export interface CreateAgentInput {
  agency: string
  contactNumber: string
  realEstateLicense: string
  locations?: any
}

export const agentsClient = {
  ...crudFactory<CreateAgentInput, QueryOptions, CreateAgentInput>(ApiEndpoints.AGENTS)
}

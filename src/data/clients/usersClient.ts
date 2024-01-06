import { QueryOptions, User } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import HttpClient from '@/lib/http-client'
import { Agent } from './agentsClient'

interface CreateUserInput {}

export const userClient = {
  ...crudFactory<User, QueryOptions, CreateUserInput>(ApiEndpoints.USERS),
  updateUserRole: (data: any) => {
    return HttpClient.patch<any>(`${ApiEndpoints.USERS}/update-role/${data.id}/${data.role}`, data)
  },
  getAgentApplication: () => {
    return HttpClient.get<Agent>(ApiEndpoints.AGENT_APPLICATION)
  },
}

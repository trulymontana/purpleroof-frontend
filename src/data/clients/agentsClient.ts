import { QueryOptions } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import { ActiveStatusEnum, ApprovalStatusEnum } from '@/constants/enums'
import HttpClient from '@/lib/http-client'

export interface CreateAgentInput {
  agency: string
  contactNumber: string
  realEstateLicense: string
  locations?: any
  activeStatus?: ActiveStatusEnum
  approvalStatus?: ApprovalStatusEnum
}

export interface Agent extends CreateAgentInput {
  id: number
  createdAt: string
  updatedAt: string
}

export const agentsClient = {
  ...crudFactory<Agent, QueryOptions, CreateAgentInput>(ApiEndpoints.AGENTS),
  updateApprovalStatus: (data: any) => {
    return HttpClient.patch<any>(
      `${ApiEndpoints.AGENTS}/${data.id}/update-approval-status/${data.approvalStatus}`,
      data
    )
  },
  updateActiveStatus: (data: any) => {
    return HttpClient.patch<any>(`${ApiEndpoints.AGENTS}/${data.id}/update-active-status/${data.activeStatus}`, data)
  }
}

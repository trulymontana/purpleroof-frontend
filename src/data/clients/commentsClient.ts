import { QueryOptions } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import HttpClient from '@/lib/http-client'

export interface CreateCommentInput {
  title: string
  mortgageId: number
  message?: string
  attachments?: string[]
}

export interface Comment extends CreateCommentInput {
  userId: number
}

export const commentsClient = {
  ...crudFactory<CreateCommentInput[], QueryOptions, CreateCommentInput>(ApiEndpoints.COMMENTS),
  getCommentsByMortgage: (mortgageId: number) => {
    return HttpClient.get<Comment[]>(`${ApiEndpoints.COMMENTS_BY_MORTGAGE}/${mortgageId}`)
  }
}

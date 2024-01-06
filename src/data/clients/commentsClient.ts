import { QueryOptions } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'

export interface CreateCommentInput {
  title: string
  mortgageId: number
  message: string
  attachments: string[]
}

export const commentsClient = {
  ...crudFactory<Comment, QueryOptions, CreateCommentInput>(ApiEndpoints.COMMENTS)
}

import { QueryOptions, User } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'

interface CreateUserInput {}

export const userClient = {
  ...crudFactory<User, QueryOptions, CreateUserInput>(ApiEndpoints.USERS)
}

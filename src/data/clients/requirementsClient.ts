import { QueryOptions, RequirementApplication, User } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'

interface CreateRequirementInput {}

export const requirementsClient = {
  ...crudFactory<RequirementApplication, QueryOptions, CreateRequirementInput>(
    ApiEndpoints.REQUIREMENTS,
  ),
}

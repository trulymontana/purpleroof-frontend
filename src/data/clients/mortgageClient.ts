import { MortgageApplication, QueryOptions, User } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'

interface CreateMortgageInput {}

export const mortgageClient = {
  ...crudFactory<MortgageApplication, QueryOptions, CreateMortgageInput>(ApiEndpoints.MORTGAGES)
}

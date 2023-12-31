import { QueryOptions } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'

export interface Location {
  id: number
  name: string
  emirate: string
  createdAt: string
  updatedAt: string
}

export const locationsClient = {
  ...crudFactory<Location, QueryOptions, Location>(ApiEndpoints.LOCATIONS)
}

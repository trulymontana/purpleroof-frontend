import { Property, QueryOptions } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'

interface CreatePropertyInput {}

export const propertiesClient = {
  ...crudFactory<Property, QueryOptions, CreatePropertyInput>(ApiEndpoints.PROPERTIES)
}

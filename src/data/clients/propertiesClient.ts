import { Property, QueryOptions } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'

interface CreatePropertyInput {
  advertTitle: string
  category: string,
  typeOfProperty: string
  propertyOption: string
}

export const propertiesClient = {
  ...crudFactory<Property, QueryOptions, CreatePropertyInput>(ApiEndpoints.PROPERTIES)
}

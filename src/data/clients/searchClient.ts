import { QueryOptions } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'

export interface SearchInput {
  minPrice: number
  maxPrice: number
  numberOfBedRooms: number
  numberOfBathRooms: number
  parkingSpaces: number
  amenities: number[]
  locations: string[]
  propertyFor: any
  propertyTypes: any
  propertyCategories: any
  emirates: any
}

export const searchClient = {
  ...crudFactory<SearchInput, QueryOptions, any>(ApiEndpoints.SEARCH)
}

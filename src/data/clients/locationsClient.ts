import { QueryOptions } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import HttpClient from '@/lib/http-client'
import { EmirateEnum } from '@/constants/enums'

export interface Location {
  id: number
  name: string
  emirate: EmirateEnum
  createdAt: string
  updatedAt: string
}

export const locationsClient = {
  ...crudFactory<Location, QueryOptions, Location>(ApiEndpoints.LOCATIONS),
  allByEmirates: (selectedEmirates: EmirateEnum[]) => {
    return HttpClient.get<Location[]>(`${ApiEndpoints.LOCATIONS}/${selectedEmirates.join(',')}`)
  }
}

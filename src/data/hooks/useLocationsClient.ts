import { useQuery } from '@tanstack/react-query'
import { ApiEndpoints } from '@/constants/api'
import { locationsClient } from '../clients/locationsClient'
import { EmirateEnum } from '@/constants/enums'

export function useGetLocations(selectedEmirates?: EmirateEnum[]) {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.LOCATIONS],
    queryFn: () => locationsClient.all()
  })

  const filteredData = data?.data.filter((location) => selectedEmirates?.includes(location.emirate))

  return { data: filteredData, loading: isLoading }
}

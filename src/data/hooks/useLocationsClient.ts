import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiEndpoints } from '@/constants/api'
import { locationsClient } from '../clients/locationsClient'

export function useGetLocations() {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.LOCATIONS],
    queryFn: () => locationsClient.all()
  })

  return { data: data?.data, loading: isLoading }
}

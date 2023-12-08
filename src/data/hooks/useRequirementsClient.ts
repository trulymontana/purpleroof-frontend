import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiEndpoints } from '@/constants/api'
import { requirementsClient } from '../clients/requirementsClient'

export function useGetRequirements() {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.REQUIREMENTS],
    queryFn: () => requirementsClient.all(),
  })

  return { data: data?.data, loading: isLoading }
}

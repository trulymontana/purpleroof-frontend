import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ApiEndpoints } from '@/constants/api'
import { toast } from '@/components/ui/use-toast'
import { searchClient } from '../clients/searchClient'
import { propertiesClient } from '../clients/propertiesClient'

export function useSearchProperties() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: searchClient.create,
    onSuccess: (data: any) => {
      queryClient.refetchQueries({ queryKey: [ApiEndpoints.SEARCH] })
    }
  })
}

export function useGetOnePublicProperty(id: number) {
  const { data, isFetching, isPending } = useQuery({
    queryKey: [`${ApiEndpoints.PROPERTIES}-${id}`],
    queryFn: () => propertiesClient.getByPublicId(id)
  })

  return { data: data?.data, loading: isPending, isFetching }
}

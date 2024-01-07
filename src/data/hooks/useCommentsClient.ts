import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { commentsClient } from '../clients/commentsClient'
import { ApiEndpoints } from '@/constants/api'

export function useCreateCommentMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: commentsClient.create,
    onSuccess: (response: any) => {
      queryClient.refetchQueries({ queryKey: [`${ApiEndpoints.COMMENTS_BY_MORTGAGE}`] })
    }
  })
}

export function useGetCommentsByMortgage(mortgageId: number) {
  const { isLoading, data } = useQuery({
    queryKey: [`${ApiEndpoints.COMMENTS_BY_MORTGAGE}`],
    queryFn: () => commentsClient.getCommentsByMortgage(mortgageId)
  })

  return { data: data?.data, isLoading: isLoading }
}

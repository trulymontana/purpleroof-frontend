import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Comment, commentsClient } from '../clients/commentsClient'
import { toast } from '@/components/ui/use-toast'
import { ApiEndpoints } from '@/constants/api'

export function useCreateCommentMutation(mortgageId: number) {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: commentsClient.create,
    onSuccess: (response: any) => {
      const { statusCode, data } = response
      if (statusCode === 200) {
        console.log({ success: data })
      }
      queryClient.refetchQueries({ queryKey: [`${ApiEndpoints.COMMENTS_BY_MORTGAGE}/${response.mortgageId}`] })
    }
    // onMutate: async (newComment) => {
    //   console.log({ newComment })
    //   // await queryClient.cancelQueries({ queryKey: [`${ApiEndpoints.COMMENTS_BY_MORTGAGE}/${mortgageId}`] })

    //   const previousComments = queryClient.getQueryData([`${ApiEndpoints.COMMENTS_BY_MORTGAGE}/${mortgageId}`])

    //   queryClient.setQueryData([`${ApiEndpoints.COMMENTS_BY_MORTGAGE}/${mortgageId}`], (old: Comment[]) => [
    //     ...old,
    //     newComment
    //   ])

    //   return { previousComments }
    // },
    // onError: (err, newTodo, context) => {
    //   queryClient.setQueryData([`${ApiEndpoints.COMMENTS_BY_MORTGAGE}/${mortgageId}`], context?.previousComments)
    // }
  })
}

export function useGetCommentsByMortgage(mortgageId: number) {
  const router = useRouter()
  const { isLoading, data } = useQuery({
    queryKey: [`${ApiEndpoints.COMMENTS_BY_MORTGAGE}/${mortgageId}`],
    queryFn: () => commentsClient.getCommentsByMortgage(mortgageId)
  })

  return { data: data?.data, isLoading: isLoading }
}

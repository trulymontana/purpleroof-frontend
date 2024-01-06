import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { commentsClient } from '../clients/commentsClient'
import { toast } from '@/components/ui/use-toast'
import { ApiEndpoints } from '@/constants/api'

export function useCreateCommentMutation() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: commentsClient.create,
    onSuccess: (response: any) => {
      const { statusCode, data } = response
      if (statusCode === 200) {
        console.log({ success: data })
      }
    //   queryClient.refetchQueries({ queryKey: [ApiEndpoints.COMMENTS] })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.response.data.message,
        description: error.response.data.details
      })
    }
  })
}

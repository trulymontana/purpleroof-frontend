import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiEndpoints } from '@/constants/api'
import { toast } from '@/components/ui/use-toast'
import { searchClient } from '../clients/searchClient'

export function useSearchProperties() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: searchClient.create,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.SEARCH] })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.message
      })
    }
  })
}

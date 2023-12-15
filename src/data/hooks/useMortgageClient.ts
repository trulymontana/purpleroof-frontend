import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiEndpoints } from '@/constants/api'
import { mortgageClient } from '../clients/mortgageClient'
import { toast } from '@/components/ui/use-toast'

export function useGetMortgages() {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.MORTGAGES],
    queryFn: () => mortgageClient.all()
  })

  return { data: data?.data, loading: isLoading }
}

export const useCreateMortgageMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: mortgageClient.create,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Mortgage created successfully'
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.MORTGAGES] })
    }
  })
}

// export const useUpdateOpinionMutation = () => {
//   const queryClient = useQueryClient()
//   const navigate = useNavigate()
//   return useMutation(opinionClient.update, {
//     onSuccess: () => {
//       toast.success('Opinion Successfully Updated')
//       navigate(AppRoutes.OPINION_EDITOR)
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries(ApiEndpoints.USERS)
//     },
//   })
// }

// export const useDeleteOpinionMutation = () => {
//   const queryClient = useQueryClient()
//   const navigate = useNavigate()
//   return useMutation(opinionClient.delete, {
//     onSuccess: (data) => {
//       toast.success('Opinion and its contents are successfully deleted!')
//       navigate(AppRoutes.OPINION_EDITOR)
//       queryClient.refetchQueries(ApiEndpoints.OPINION)
//     },
//     onSettled: async () => {
//       queryClient.invalidateQueries(ApiEndpoints.OPINION)
//     },
//   })
// }

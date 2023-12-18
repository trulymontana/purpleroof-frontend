import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userClient } from '../clients/usersClient'
import { ApiEndpoints } from '@/constants/api'
import { propertiesClient } from '../clients/propertiesClient'
import { toast } from '@/components/ui/use-toast'

export function useGetProperties() {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.PROPERTIES],
    queryFn: () => propertiesClient.all()
  })

  return { data: data?.data, loading: isLoading }
}

export const useCreatePropertyMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: propertiesClient.create,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Mortgage created successfully'
      })
      // localStorage.removeItem(PageRoutes.mortgage.PERSONAL_DETAILS)
      // localStorage.removeItem(PageRoutes.mortgage.INCOME_DETAILS)
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.PROPERTIES] })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.message
      })
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

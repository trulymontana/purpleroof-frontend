import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userClient } from '../clients/usersClient'
import { ApiEndpoints } from '@/constants/api'
import { propertiesClient } from '../clients/propertiesClient'

export function useGetProperties() {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.PROPERTIES],
    queryFn: () => propertiesClient.all()
  })

  return { data: data?.data, loading: isLoading }
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

// export const useCreateOpinionMutation = () => {
//   const queryClient = useQueryClient()
//   const navigate = useNavigate()
//   return useMutation(opinionClient.create, {
//     onSuccess: (data) => {
//       toast.success('Opinion Successfully Created')
//       navigate(AppRoutes.OPINION_EDITOR)
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries(ApiEndpoints.OPINION)
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

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiEndpoints } from '@/constants/api'
import { mortgageClient } from '../clients/mortgageClient'
import { toast } from '@/components/ui/use-toast'
import { PageRoutes } from '@/constants/page-routes'
import { useRouter } from 'next/navigation'
import { LocalStorageKeys } from '@/constants/local-storage-keys'

export function useGetMortgages() {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.MORTGAGES],
    queryFn: () => mortgageClient.all()
  })

  return { data: data?.data, loading: isLoading }
}

export function useGetOneMortgage(id: number) {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.MORTGAGES],
    queryFn: () => mortgageClient.getById({ id })
  })

  return { data: data?.data, loading: isLoading }
}

export const useCreateMortgageMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: mortgageClient.create,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Application submitted successfully'
      })
      localStorage.removeItem(PageRoutes.mortgage.PERSONAL_DETAILS)
      localStorage.removeItem(PageRoutes.mortgage.INCOME_DETAILS)
      queryClient.refetchQueries({ queryKey: [ApiEndpoints.MORTGAGES] })
      router.push(
        `${PageRoutes.mortgage.COMPLETE_APPLICATION}?email=${data.data.email}&firstName=${data.data.firstName}&lastName=${data.data.lastName}`
      )
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.message
      })
    }
  })
}

export const useDeleteMortgageMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: mortgageClient.delete,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Mortgage deleted successfully'
      })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.response.data.message
      })
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [ApiEndpoints.MORTGAGES] })
    }
  })
}

export const useUpdateMortgageMutation = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: mortgageClient.update,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Mortgage updated successfully'
      })
      queryClient.refetchQueries({ queryKey: [ApiEndpoints.MORTGAGES] })
      localStorage.removeItem(`${LocalStorageKeys.MORTGAGE_TRANSACTION_INFO}-${data.data.id}`)
      localStorage.removeItem(`${LocalStorageKeys.MORTGAGE_CUSTOMER_INFO}-${data.data.id}`)
      router.push(PageRoutes.dashboard.MORTGAGES)
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

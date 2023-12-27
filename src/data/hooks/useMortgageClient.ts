import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiEndpoints } from '@/constants/api'
import { mortgageClient } from '../clients/mortgageClient'
import { toast } from '@/components/ui/use-toast'
import { PageRoutes } from '@/constants/page-routes'
import { useRouter } from 'next/navigation'

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
        title: 'Mortgage created successfully'
      })
      localStorage.removeItem(PageRoutes.mortgage.PERSONAL_DETAILS)
      localStorage.removeItem(PageRoutes.mortgage.INCOME_DETAILS)
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.MORTGAGES] })
      router.push(PageRoutes.mortgage.COMPLETE_APPLICATION)
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.message
      })
    }
  })
}

export const useCreateMortgageTransactionMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: mortgageClient.createMortgageTransaction,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Mortgage Application Created Successfully'
      })
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.MORTGAGE_TRANSACTION] })
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

export const useDeleteMortgageMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: mortgageClient.delete,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Mortgage deleted successfully'
      })
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.MORTGAGES] })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.response.data.message
      })
    }
  })
}

export const useUpdateMortgageMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: mortgageClient.update,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Mortgage updated successfully'
      })
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.MORTGAGES] })
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

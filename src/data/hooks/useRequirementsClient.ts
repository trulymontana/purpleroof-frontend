import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiEndpoints } from '@/constants/api'
import { CreateRequirementInput, requirementsClient } from '../clients/requirementsClient'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { PageRoutes } from '@/constants/page-routes'

export function useGetRequirements() {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.REQUIREMENTS],
    queryFn: () => requirementsClient.all()
  })

  return { data: data?.data, loading: isLoading }
}

export function useGetOneRequirement(id: number) {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.REQUIREMENTS],
    queryFn: () => requirementsClient.getById({ id })
  })

  return { data: data?.data, loading: isLoading }
}

export const useCreateRequirementMutation = () => {
  const queryClient = useQueryClient()

  const router = useRouter()

  return useMutation({
    mutationFn: requirementsClient.create,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Requirement created successfully'
      })
      router.push(PageRoutes.dashboard.admin.REQUIREMENTS)
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.message
      })
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [ApiEndpoints.REQUIREMENTS] })
    }
  })
}

export const useUpdateRequirementMutation = () => {
  const queryClient = useQueryClient()

  const router = useRouter()

  return useMutation({
    mutationFn: requirementsClient.update,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Requirement updated successfully'
      })
      router.push(PageRoutes.dashboard.admin.REQUIREMENTS)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.REQUIREMENTS] })
    }
  })
}

export const useDeleteRequirementMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: requirementsClient.delete,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Requirement successfully deleted'
      })
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [ApiEndpoints.REQUIREMENTS] })
    }
  })
}

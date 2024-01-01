import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiEndpoints } from '@/constants/api'
import { toast } from '@/components/ui/use-toast'
import { agentsClient } from '../clients/agentsClient'
import { useRouter } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export function useGetAgents() {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.AGENTS],
    queryFn: () => agentsClient.all()
  })

  return { data: data?.data, loading: isLoading }
}

export const useCreateAgentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: agentsClient.create,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Applied for agent successfully'
      })
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.AGENTS] })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.message
      })
    }
  })
}

export const useUpdateAgentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: agentsClient.update,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Status updated successfully'
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.AGENTS] })
    }
  })
}

export const useDeleteRequirementMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: agentsClient.delete,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Requirement successfully deleted'
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.AGENTS] })
    }
  })
}

export function useUpdateApprovalStatus() {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: agentsClient.updateApprovalStatus,
    onSuccess: (response: any) => {
      const { statusCode, data } = response

      if (statusCode === 200) {
        toast({
          variant: 'default',
          title: 'Agent updated successfully'
        })
        router.refresh()
      }
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.message
      })
    }
  })
}

export function useUpdateActiveStatus() {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: agentsClient.updateActiveStatus,
    onSuccess: (response: any) => {
      const { statusCode, data } = response

      if (statusCode === 200) {
        toast({
          variant: 'default',
          title: 'Agent updated successfully'
        })
        router.refresh()
      }
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.message
      })
    }
  })
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiEndpoints } from '@/constants/api'
import { toast } from '@/components/ui/use-toast'
import { agentsClient } from '../clients/agentsClient'
import { useRouter } from 'next/navigation'
import { PageRoutes } from '@/constants/page-routes'

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
      location.reload()
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [ApiEndpoints.AGENTS] })
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
      queryClient.refetchQueries({ queryKey: [ApiEndpoints.AGENTS] })
    }
  })
}

export const useDeleteAgentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: agentsClient.delete,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Agent successfully deleted'
      })
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [ApiEndpoints.AGENTS] })
    }
  })
}

export function useUpdateApprovalStatusMutation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: agentsClient.updateApprovalStatus,
    onSuccess: (response: any) => {
      const { statusCode, data } = response

      if (statusCode === 200) {
        toast({
          variant: 'default',
          title: 'Agent approved successfully'
        })
        queryClient.refetchQueries({ queryKey: [ApiEndpoints.AGENTS] })
      }
    }
  })
}

export function useUpdateActiveStatusMutation() {
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
        queryClient.refetchQueries({ queryKey: [ApiEndpoints.AGENTS] })
      }
    }
  })
}

export const useSendEmailToAgentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: agentsClient.sendEmailToAgent,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Email sent successfully'
      })
      location.reload()
    }
  })
}

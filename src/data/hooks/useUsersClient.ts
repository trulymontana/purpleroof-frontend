import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userClient } from '../clients/usersClient'
import { ApiEndpoints } from '@/constants/api'
import { toast } from '@/components/ui/use-toast'

export function useGetUsers() {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.USERS],
    queryFn: () => userClient.all()
  })

  return { users: data?.data, loading: isLoading }
}

export function useGetAgentApplications() {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.AGENT_APPLICATION],
    queryFn: () => userClient.getAgentApplication()
  })

  return { data: data?.data, loading: isLoading }
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: userClient.updateUserRole,
    onSuccess: (response: any) => {
      toast({
        variant: 'default',
        title: 'User role updated successfully'
      })
      queryClient.refetchQueries({ queryKey: [ApiEndpoints.USERS] })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.message
      })
    }
  })
}

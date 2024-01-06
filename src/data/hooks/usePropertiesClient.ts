import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiEndpoints } from '@/constants/api'
import { propertiesClient } from '../clients/propertiesClient'
import { toast } from '@/components/ui/use-toast'
import { PageRoutes } from '@/constants/page-routes'
import { useRouter } from 'next/navigation'

export function useGetProperties() {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.PROPERTIES],
    queryFn: () => propertiesClient.all()
  })

  return { data: data?.data, loading: isLoading }
}

export function useGetLocations() {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.PROPERTIES],
    queryFn: () => propertiesClient.all()
  })

  return { data: data?.data, loading: isLoading }
}

export function useGetOneProperty(id: number) {
  const { data, isFetched, isPending } = useQuery({
    queryKey: [ApiEndpoints.PROPERTIES],
    queryFn: () => propertiesClient.getById({ id })
  })

  return { data: data?.data, loading: isPending, isFetched }
}

export const useCreatePropertyMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: propertiesClient.create,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Property created successfully'
      })
      localStorage.removeItem(PageRoutes.advertise.BASIC_DETAILS)
      localStorage.removeItem(PageRoutes.advertise.AMENITIES_DETAILS)
      localStorage.removeItem(PageRoutes.advertise.CALL_PREFERENCE)
      localStorage.removeItem(PageRoutes.advertise.LOCATION_DETAILS)
      localStorage.removeItem(PageRoutes.advertise.PROJECT_STATUS)
      localStorage.removeItem(PageRoutes.advertise.PROPERTY_DETAILS)
      localStorage.removeItem(PageRoutes.advertise.UPLOAD_PHOTOS)
      queryClient.refetchQueries({ queryKey: [ApiEndpoints.MORTGAGES] })
      router.push(`${PageRoutes.advertise.APPLICATION_COMPLETED}`)
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.message
      })
    }
  })
}

export const useDeletePropertyMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: propertiesClient.delete,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Property deleted successfully'
      })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.response.data.message
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.PROPERTIES] })
    }
  })
}

export const useUpdatePropertyMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: propertiesClient.update,
    onSuccess: (data: any) => {
      toast({
        variant: 'default',
        title: 'Property updated successfully'
      })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.message
      })
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [ApiEndpoints.PROPERTIES] })
    }
  })
}

export function useAssignAgentMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: propertiesClient.assignAgent,
    onSuccess: (response: any) => {
      const { statusCode, data } = response

      if (statusCode === 200) {
        toast({
          variant: 'default',
          title: 'Agent assigned successfully'
        })

        queryClient.refetchQueries({ queryKey: [ApiEndpoints.PROPERTIES] })
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

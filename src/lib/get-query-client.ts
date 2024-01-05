import { toast } from '@/components/ui/use-toast'
import { QueryCache, QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

const getQueryClient = cache(
  () =>
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error: any) =>
          toast({
            variant: 'destructive',
            title: error.response.data.message,
            description: error.response.data.details
          })
      })
    })
)
export default getQueryClient

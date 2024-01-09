import { toast } from '@/components/ui/use-toast'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

const getQueryClient = cache(
  () =>
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error: any) => {
          console.log(error)
          toast({
            variant: 'destructive',
            title: error.response.data.message,
            description: error.response.data.details
          })
          console.log({ error })
        }
      }),
      mutationCache: new MutationCache({
        onError: (error: any) => {
          console.log(error)
          toast({
            variant: 'destructive',
            title: error.response.data.message,
            description: error.response.data.details
          })
          console.log({ error })
        }
      }),
      defaultOptions: {
        mutations: {
          onError: (error: any) => {
            console.log(error)
            toast({
              variant: 'destructive',
              title: error.response.data.message,
              description: error.response.data.details
            })
            console.log({ error })
          }
        }
      }
    })
)
export default getQueryClient

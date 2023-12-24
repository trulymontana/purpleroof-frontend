'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authClient } from '../clients/authClient'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { PageRoutes } from '@/constants/page-routes'

export function useSignUp() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authClient.signUp,
    onSuccess: (response: any) => {
      const { statusCode, data } = response
      if (statusCode === 200) {
        toast({
          variant: 'default',
          title: 'Account created successfully'
        })

        const { jwtToken, user } = data

        const { firstName, lastName, email, role } = user

        localStorage.setItem('AUTH_TOKEN', jwtToken)
        const newUser = JSON.stringify({ firstName, lastName, email, role })
        localStorage.setItem('user', newUser)

        router.push(PageRoutes.dashboard.MORTGAGES)
      }

      // queryClient.invalidateQueries({ queryKey: [ApiEndpoints.PROPERTIES] })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.message
      })
    }
  })
}
export function useSignIn() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authClient.signIn,
    onSuccess: (response: any) => {
      const { statusCode, data } = response

      if (statusCode === 200) {
        toast({
          variant: 'default',
          title: 'Signed in successfully'
        })

        const { jwtToken, user } = data

        const { firstName, lastName, email, role } = user

        localStorage.setItem('AUTH_TOKEN', jwtToken)
        const newUser = JSON.stringify({ firstName, lastName, email, role })
        localStorage.setItem('user', newUser)

        router.push(PageRoutes.dashboard.MORTGAGES)
      }

      // queryClient.invalidateQueries({ queryKey: [ApiEndpoints.PROPERTIES] })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.message
      })
    }
  })
}

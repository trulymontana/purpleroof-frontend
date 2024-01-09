'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authClient } from '../clients/authClient'
import { toast } from '@/components/ui/use-toast'
import { usePathname, useRouter } from 'next/navigation'
import { PageRoutes } from '@/constants/page-routes'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import { ApiEndpoints } from '@/constants/api'
import { UserRoleEnum } from '@/constants/enums'

export function useSignUp() {
  const router = useRouter()
  // const queryClient = useQueryClient()
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

        localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, jwtToken)
        const newUser = JSON.stringify({ firstName, lastName, email, role })
        localStorage.setItem(LocalStorageKeys.USER, newUser)

        router.push(PageRoutes.dashboard.MORTGAGES)
      }
    },
    onError: (error: any) => {
      console.log({ toastError: error })
      toast({
        variant: 'destructive',
        title: error.message,
        description: error.message
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
      toast({
        variant: 'default',
        title: 'Signed in successfully'
      })
      const { jwtToken, user } = data
      const { firstName, lastName, email, role, id } = user
      localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, jwtToken)
      const newUser = JSON.stringify({ firstName, lastName, email, role, id })
      localStorage.setItem(LocalStorageKeys.USER, newUser)
      router.push(PageRoutes.dashboard.MORTGAGES)
      // queryClient.invalidateQueries({ queryKey: [ApiEndpoints.PROPERTIES] })
    }
  })
}

export function useGetUserDetails() {
  const pathName = usePathname()
  const router = useRouter()
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.USER],
    queryFn: () => authClient.getUserDetails(),
    throwOnError: (error: any) => {
      if (error.response.status === 401) {
        if (pathName.includes('dashboard')) {
          localStorage.removeItem(LocalStorageKeys.USER)
          localStorage.removeItem(LocalStorageKeys.AUTH_TOKEN)
          toast({
            variant: 'destructive',
            title: 'Session expired'
          })
          router.push(PageRoutes.SIGNIN)
        }
      }
      return false
    }
  })

  return {
    data: data?.data ?? {
      firstName: 'John',
      lastName: 'Wick',
      role: UserRoleEnum.GENERAL_USER,
      email: 'johnwick@gmail.com',
      id: 1
    },
    loading: isLoading
  }
}
export function useGetUserRole() {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.USER],
    queryFn: () => authClient.getUserDetails(),
    refetchInterval: 300000
  })

  return data?.data?.role ?? UserRoleEnum.GENERAL_USER
}

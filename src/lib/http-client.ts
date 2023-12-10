import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { LocalStorageKeys } from '@/constants/local-storage-keys'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_ENDPOINT,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use((config: any) => {
  const token = localStorage.getItem(LocalStorageKeys.AUTH_TOKEN ?? '')
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }
  return config
})

axiosClient.interceptors.response.use(
  (response: any) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (error: any) => {
    const { toast } = useToast()
    if (error.response) {
      console.error(error.response.data)
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.response.data?.message
      })
    } else if (error.request) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'No response was received.'
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'No response was received.',
        description: 'error.response.data?.message'
      })
    }
    return Promise.reject(error)
  }
)

export default class HttpClient {
  static async get<T>(url: string, params?: unknown) {
    const response = await axiosClient.get<T>(url, { params })
    return response
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const response = await axiosClient.post<T>(url, data, options)
    return response
  }

  static async put<T>(url: string, data: unknown) {
    const response = await axiosClient.put<T>(url, data)
    return response
  }

  static async patch<T>(url: string, data: unknown) {
    const response = await axiosClient.patch<T>(url, data)
    return response
  }

  static async delete<T>(url: string) {
    const response = await axiosClient.delete<T>(url)
    return response
  }
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userClient } from '../clients/usersClient'
import { ApiEndpoints } from '@/constants/api'

import { useEffect, useState } from 'react'
import { fileClient } from './../../data/clients/fileClient'
import { PreSignedFile } from '@/constants/types'

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || 'purpleroof'

export const useFileUploader = (folder: string, fileName: string) => {
  const [loading, setLoading] = useState(false)
  const uploadFile = async (file: File) => {
    setLoading(true)
    const uploadUrl: { data: PreSignedFile } = await fileClient.getPreSignedUrl(folder, `${fileName}-${file.name}`)
    const formData = new FormData()
    formData.append('file', file)
    await fetch(uploadUrl.data.url, {
      method: 'PUT',
      body: formData
    })
      .then((res) => console.log(res))
      .then((res) => {
        console.log('file uploaded successfully')
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
    const objectUrl = `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${folder}/${fileName}-${file.name}`
    return objectUrl
  }

  return { uploadFile, loading }
}

export const useFileDeleter = (folder: string, fileName: string) => {
  const [loading, setLoading] = useState(false)
  const deleteFile = async (file: File) => {
    setLoading(true)
    const response = await fileClient.deleteFile(folder, `${fileName}-${file.name}`)
    setLoading(false)
  }
  return { deleteFile, loading }
}

// export function useGetPreSignedUrl() {
//   const { isLoading, data } = useQuery({
//     queryKey: [ApiEndpoints.FILES],
//     queryFn: () => userClient.all()
//   })

//   return { users: data?.data, loading: isLoading }
// }

// export const useUpdateOpinionMutation = () => {
//   const queryClient = useQueryClient()
//   const navigate = useNavigate()
//   return useMutation(opinionClient.update, {
//     onSuccess: () => {
//       toast.success('Opinion Successfully Updated')
//       navigate(AppRoutes.OPINION_EDITOR)
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries(ApiEndpoints.USERS)
//     },
//   })
// }

// export const useCreateOpinionMutation = () => {
//   const queryClient = useQueryClient()
//   const navigate = useNavigate()
//   return useMutation(opinionClient.create, {
//     onSuccess: (data) => {
//       toast.success('Opinion Successfully Created')
//       navigate(AppRoutes.OPINION_EDITOR)
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries(ApiEndpoints.OPINION)
//     },
//   })
// }

// export const useDeleteOpinionMutation = () => {
//   const queryClient = useQueryClient()
//   const navigate = useNavigate()
//   return useMutation(opinionClient.delete, {
//     onSuccess: (data) => {
//       toast.success('Opinion and its contents are successfully deleted!')
//       navigate(AppRoutes.OPINION_EDITOR)
//       queryClient.refetchQueries(ApiEndpoints.OPINION)
//     },
//     onSettled: async () => {
//       queryClient.invalidateQueries(ApiEndpoints.OPINION)
//     },
//   })
// }

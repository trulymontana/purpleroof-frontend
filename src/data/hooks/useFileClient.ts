import { useState } from 'react'
import { fileClient } from './../../data/clients/fileClient'
import { PreSignedFile } from '@/constants/types'

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || 'purpleroof'

export const useFileUploader = (folder: string, fileName: string) => {
  const [loading, setLoading] = useState(false)
  const uploadFile = async (file: File) => {
    setLoading(true)
    const uploadUrl: { data: PreSignedFile } = await fileClient.getPreSignedUrl(
      folder,
      `${fileName}-${new Date().toISOString()}`
    )
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
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
      .finally(() => setLoading(false))

    const objectUrl = `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${folder}/${fileName}-${new Date().toISOString()}`
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

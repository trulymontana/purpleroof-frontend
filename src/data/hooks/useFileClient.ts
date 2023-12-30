import { useState } from 'react'
import { fileClient } from './../../data/clients/fileClient'
import { PreSignedFile } from '@/constants/types'
import axios from 'axios'

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || 'purpleroof'

export const useFileUploader = (folder: string, fileName: string) => {
  const [loading, setLoading] = useState(false)
  const uploadFile = async (file: File) => {
    setLoading(true)

    const fileNameAfterUpload = `${fileName}-${new Date().getTime()}-${file.name.split(' ').join('-')}`
    const uploadUrl: { data: PreSignedFile } = await fileClient.getPreSignedUrl(folder, fileNameAfterUpload)

    const presignedUrl = uploadUrl.data.url

    await axios.put(presignedUrl, file).catch((error) => console.error(error.response.data, { request: error.request }))

    setLoading(false)

    const objectUrl = `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${folder}/${fileNameAfterUpload}`
    console.log(objectUrl)

    return objectUrl
  }

  return { uploadFile, loading }
}

export const useFileDeleter = (folder: string, fileName: string) => {
  const [loading, setLoading] = useState(false)
  const deleteFile = async (file: File) => {
    setLoading(true)
    await fileClient.deleteFile(folder, `${fileName}-${file.name}`)
    setLoading(false)
  }
  return { deleteFile, loading }
}

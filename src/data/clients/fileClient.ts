import { MortgageApplication, PreSignedFile, QueryOptions, User } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import HttpClient from '@/lib/http-client'

interface UploadFileInput {}

export const fileClient = {
  ...crudFactory<PreSignedFile, QueryOptions, UploadFileInput>(ApiEndpoints.FILES),
  getPreSignedUrl: (folder: string, fileName: string) =>
    HttpClient.get<PreSignedFile>(`${ApiEndpoints.FILES}/pre-signed-url/${folder}/${fileName}`),
  deleteFile: (folder: string, fileName: string) =>
    HttpClient.delete<any>(`${ApiEndpoints.FILES}/${folder}/${fileName}`)
}

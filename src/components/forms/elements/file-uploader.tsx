'use client'
import { Input } from '@/components/ui/input'
import { useFileDeleter, useFileUploader } from '@/data/hooks/useFileClient'
import { FolderClosed, XSquare } from 'lucide-react'

import React, { useState } from 'react'

interface FileUploaderProps {
  form: any
  folder: string
  name: string
  label: string
}

const FileUploader: React.FC<FileUploaderProps> = ({ folder, name, label, form }) => {
  const [file, setFile] = useState<File | undefined>(undefined)
  const [fileUrl, setFileUrl] = useState<string>('')
  const { loading: isUploadLoading, uploadFile } = useFileUploader(folder, name)
  const { loading: isDeleteLoading, deleteFile } = useFileDeleter(folder, name)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setFile(file)

    if (file) {
      const objectUrl = await uploadFile(file)
      setFileUrl(objectUrl)
      form.setValue(name, objectUrl)
    }
  }

  const handleFileDelete = async () => {
    if (fileUrl && file) {
      const response = await deleteFile(file)
      console.log(response)
      setFile(undefined)
      setFileUrl('')
      form.setValue(name, '')
    }
  }

  const isLoading = isUploadLoading || isDeleteLoading

  return (
    <div className="flex flex-col items-start  gap-2 py-2">
      <div className="text-sm font-medium ">{label}</div>
      <div className='flex items-center gap-2'>
        <div className="justify-self-end">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input id="file-upload" type="file" onChange={handleFileUpload} />
          </div>
        </div>
        {isLoading && (
          <div className="flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-solid border-slate-600"></div>
          </div>
        )}
        {!isLoading && (
          <span className="cursor-pointer">{fileUrl ? <XSquare onClick={handleFileDelete} /> : <FolderClosed />}</span>
        )}
      </div>
    </div>
  )
}

export default FileUploader

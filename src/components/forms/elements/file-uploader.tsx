'use client'
import { Badge } from '@/components/ui/badge'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFileDeleter, useFileUploader } from '@/data/hooks/useFileClient'
import { FolderClosed, XSquare } from 'lucide-react'

import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface FileUploaderProps {
  form: any
  folder: string
  name: string
  label: string
}

const FileUploader: React.FC<FileUploaderProps> = ({ folder, name, label, form }) => {
  const { control } = useFormContext()

  const ref = useRef(null)

  const [isLoading, setIsLoading] = useState(false)
  const [fileNames, setFileNames] = useState<string[]>();
  const [files, setFiles] = useState<FileList | undefined>(undefined)
  const [fileUrls, setFileUrls] = useState<string[]>()
  const { loading: isUploadLoading, uploadFile } = useFileUploader(folder, name)
  const { loading: isDeleteLoading, deleteFile } = useFileDeleter(folder, name)

  useEffect(() => {
    const isLoading = isUploadLoading || isDeleteLoading
    setIsLoading(isLoading)
  }, [isUploadLoading, isDeleteLoading])


  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {

    const files = event.target.files
    files && setFiles(files)

    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      const fileNamesList: string[] = [];
      filesArray.forEach(file => {
        fileNamesList.push(file.name);
      })
      setFileNames(fileNamesList);
      const fileUrls = await Promise.all(filesArray.map((file) => uploadFile(file)))
      form.setValue(name, fileUrls)
      setFileUrls(fileUrls)
    }
  }

  const handleFileDelete = async () => {
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      await Promise.all(filesArray.map((file) => deleteFile(file)))
      form.resetField(name, [])
      setFileNames([])
      setFiles(undefined)
      setFileUrls([])
    }
  }

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="cursor-pointer">
            <FormLabel>{label}</FormLabel>
            <div className="flex flex-col gap-2">
              <div className='space-x-2 space-y-1'>{fileNames?.map((file, i) => <Badge variant="secondary" key={i}>{file}</Badge>)}</div>
              <div className='flex cursor-pointer items-center gap-2'>
                <FormControl>
                  <Input ref={ref} id="file-upload" type="file" onChange={handleFileUpload} className="cursor-pointer" multiple />
                </FormControl>
                {isLoading && (
                  <div className="flex items-center justify-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-solid border-slate-600"></div>
                  </div>
                )}
                {!isLoading && (
                  <span className="cursor-pointer">
                    {fileUrls && fileUrls.length > 0 ? (
                      <XSquare onClick={handleFileDelete} />
                    ) : (
                      //@ts-ignore
                      <FolderClosed onClick={() => ref?.current?.click()} />
                    )}
                  </span>
                )}
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export default FileUploader

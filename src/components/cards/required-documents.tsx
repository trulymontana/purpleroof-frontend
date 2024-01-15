'use client'

import { DownloadIcon, FileMinus2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import Link from 'next/link'

interface Props {
  data: any
}

const RequiredDocumentsCards = ({ data }: Props) => {
  return (
    <>
      {data?.documents && data?.documents?.length > 0 && (
        <Card className="shadow-md">
          <CardHeader className="">
            <h2 className="my-2 flex items-center gap-2 text-2xl font-semibold text-primary">
              <FileMinus2 /> Documents Uploaded
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {data?.documents?.map((document: any, i: number) => (
              <Card
                key={i}
                className="shadow-md shadow-primary/30 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <CardContent className="flex items-center justify-between p-4">
                  <h3 className="text-sm font-medium capitalize">
                    {document?.type?.toLocaleLowerCase().replaceAll('_', ' ')}
                  </h3>
                  <Link href={document.url}>
                    <Button className="flex items-center">
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  )
}
export default RequiredDocumentsCards

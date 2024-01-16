'use client'

import { PageRoutes } from '@/constants/page-routes'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Page = () => {
  const router = useRouter()
  useEffect(() => {
    router.push(PageRoutes.advertise.BASIC_DETAILS)
  }, [])

  return null
  return <section className="flex items-start gap-10 p-10">advertise page</section>
}

export default Page

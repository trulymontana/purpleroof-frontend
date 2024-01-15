'use client'

import { PageRoutes } from '@/constants/page-routes'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {
  const router = useRouter()
  useEffect(() => {
    router.push(PageRoutes.mortgage.PERSONAL_DETAILS)
  }, [])

  return null

  return <section className="flex gap-16 p-4">mortgage page</section>
}

export default Page

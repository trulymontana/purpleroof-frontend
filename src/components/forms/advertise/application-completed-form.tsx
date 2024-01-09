'use client'
import { Button } from '@/components/ui/button'
import { LocalStorageKeys } from '@/constants/local-storage-keys'

import { PageRoutes } from '@/constants/page-routes'
import { User } from '@/constants/types'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const ApplicationCompletedForm = () => {
  const storedValue = localStorage.getItem(LocalStorageKeys.USER)
  const user: User = storedValue !== null && JSON.parse(storedValue)

  const searchParams = useSearchParams()

  const email = searchParams.get('email')

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-3">
      <CheckCircle color="#6abf6f" size={80} />
      <p className=" text-start text-slate-700">Property application submitted successfully.</p>
      <p className="text-slate-700">
        If you want to see the property, click the button below to go to your dashboard and find all the properties you
        listed.
      </p>
      {user ? (
        <Link className="w-full" href={PageRoutes.dashboard.PROPERTIES}>
          <Button type="submit" className="flex w-full items-center gap-2">
            Dashboard <ArrowRight />
          </Button>
        </Link>
      ) : (
        <Link className="w-full" href={`${PageRoutes.SIGNUP}?email=${email}`}>
          <Button type="submit" className="flex w-full items-center gap-2">
            Dashboard <ArrowRight />
          </Button>
        </Link>
      )}
    </div>
  )
}

export default ApplicationCompletedForm

'use client'
import { Button } from '@/components/ui/button'
import { LocalStorageKeys } from '@/constants/local-storage-keys'

import { PageRoutes } from '@/constants/page-routes'
import { User } from '@/constants/types'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const CompleteApplicationForm = () => {
  const storedValue = localStorage.getItem(LocalStorageKeys.USER)
  const user: User = storedValue !== null && JSON.parse(storedValue)

  const searchParams = useSearchParams()

  const email = searchParams.get('email')
  const firstName = searchParams.get('firstName')
  const lastName = searchParams.get('lastName')

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-3">
      <CheckCircle color="#6abf6f" size={80} />
      <p className=" text-slate-700">
        Mortgage application submitted successfully. Kindly check your email for the detailed quotation proposal
        we&apos;ve prepared for you.
      </p>
      <p className="text-slate-700">
        You&apos;ll also find another email for your account verification with your login details.
      </p>
      <p className=" text-slate-700">
        If you like the proposal, click the button below to proceed with your application and fill in the necessary
        details.
      </p>
      {user ? (
        <Link className="w-full" href={PageRoutes.dashboard.MORTGAGES}>
          <Button type="submit" className="w-full">
            Complete application
          </Button>
        </Link>
      ) : (
        <Link
          className="w-full"
          href={`${PageRoutes.SIGNUP}?email=${email}&firstName=${firstName}&lastName=${lastName}`}
        >
          <Button type="submit" className="w-full">
            Complete application
          </Button>
        </Link>
      )}
    </div>
  )
}

export default CompleteApplicationForm

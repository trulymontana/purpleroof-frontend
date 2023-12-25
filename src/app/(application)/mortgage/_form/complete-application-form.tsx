'use client'
import { Button } from '@/components/ui/button'

import { PageRoutes } from '@/constants/page-routes'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

const CompleteApplicationForm = () => {
    return (
        <div className="flex flex-col gap-5 items-center justify-center p-3">
            <CheckCircle color="#6abf6f" size={80} />
            <p className=" text-slate-700">
                Mortgage application submitted successfully. Kindly check your email for
                the detailed quotation proposal we&apos;ve prepared for you.
            </p>
            <p className="text-slate-700">
                You&apos;ll also find another email for your account verification with
                your login details.
            </p>
            <p className=" text-slate-700">
                If you like the proposal, click the button below to proceed with your application and fill in the necessary details.
            </p>
            <Link className='w-full' href={PageRoutes.dashboard.MORTGAGES}>
                <Button type="submit" className="w-full">
                    Complete application
                </Button>
            </Link>
        </div>
    )
}

export default CompleteApplicationForm

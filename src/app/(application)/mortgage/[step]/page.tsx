'use client'

import { PageRoutes } from '@/constants/page-routes'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import IncomeDetailsForm from '@/components/forms/mortgage/income-details-form'
import PersonalDetailsForm from '@/components/forms/mortgage/personal-details-form'
import BoxStrokesIcon from '@/components/svgs/box-strokes'
import { useCreateMortgageMutation } from '@/data/hooks/useMortgageClient'
import { MortgageStatusEnum } from '@/constants/enums'
import { CreateMortgageInput } from '@/data/clients/mortgageClient'
import CompleteApplicationForm from '@/components/forms/mortgage/complete-application-form'
import BackgroundEffect from '@/components/BackgroundEffect'

const Page = () => {
  const pathName = usePathname()

  const { mutate: createMortgage, isPending } = useCreateMortgageMutation()

  const storeValues = (step: string, values: any) => {
    localStorage.setItem(step, JSON.stringify(values))
  }

  const handleSubmit = (values: any) => {
    const data = localStorage.getItem(PageRoutes.mortgage.PERSONAL_DETAILS)
    let result
    if (data !== null) {
      result = JSON.parse(data)
    }

    let mortgage: CreateMortgageInput = Object.assign({}, result, values)
    mortgage.dateOfBirth = new Date(mortgage.dateOfBirth).toISOString()
    mortgage.intendedProperty = ''
    mortgage.status = MortgageStatusEnum.SUBMITTED

    createMortgage({
      ...mortgage
    })
  }

  const subComponents: { [key: string]: React.ReactElement } = {
    [PageRoutes.mortgage.PERSONAL_DETAILS]: <PersonalDetailsForm onSave={storeValues} />,
    [PageRoutes.mortgage.INCOME_DETAILS]: <IncomeDetailsForm isLoading={isPending} handleSubmit={handleSubmit} />,
    [PageRoutes.mortgage.COMPLETE_APPLICATION]: <CompleteApplicationForm />
  }

  return (
    <section className="relative h-auto min-h-screen">
      <div className="absolute inset-0 -z-10 h-auto min-h-screen w-full bg-indigo-600 bg-opacity-25 bg-mortgage bg-cover backdrop-opacity-20" />
      <BackgroundEffect />
      <BoxStrokesIcon />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-start lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-shrink">
          <Image
            src={'/assets/logos/logo.png'}
            quality={100}
            width={1000}
            height={1000}
            alt=""
            className="h-24 w-auto"
          />
          <h1 className="mt-10 text-center text-4xl font-bold tracking-tight text-gray-200 sm:text-5xl lg:text-left">
            Your Home Loan is just a few steps away
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-100">
            {pathName === PageRoutes.mortgage.PERSONAL_DETAILS
              ? `Let's calculate your mortgage in 2 steps`
              : 'Please provide the following information'}
          </p>
          <hr className="my-2 w-1/4 text-muted shadow-md" />
          <p className="mt-6 text-lg leading-8 text-gray-100">
            Welcome to Sire Finance, we give you the best hassle-free mortgage solutions. Get a personalized estimation
            in a matter of seconds.
          </p>
        </div>
        <div className="mt-16 rounded-md pb-8 text-black sm:mt-24 md:pt-8 lg:mt-0 lg:flex-shrink-0 lg:flex-grow lg:pt-0">
          <div className="card ml-auto w-full max-w-[500px] rounded-xl border border-gray-200 bg-gray-50 px-4 py-5 shadow-lg sm:px-6">
            {subComponents[pathName]}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page

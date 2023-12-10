"use client";

import { PageRoutes } from '@/constants/page-routes';
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import IncomeDetailsForm from '../_form/income-details-form';
import PersonalDetailsForm from '../_form/personal-details-form';
import BoxStrokesIcon from '@/components/svgs/box-strokes';

const Page = () => {

    const pathName = usePathname()

    const storeValues = (step: string, values: any) => {
        localStorage.setItem(step, JSON.stringify(values))
    }

    const subComponents: { [key: string]: React.ReactElement } = {
        [PageRoutes.mortgage.PERSONAL_DETAILS]: <PersonalDetailsForm onSave={storeValues} />,
        [PageRoutes.mortgage.INCOME_DETAILS]: <IncomeDetailsForm onSave={storeValues} />,
    }

    return (
        <section className="relative">
            <div className="absolute inset-0 w-full h-full bg-indigo-600 bg-opacity-25 bg-cover backdrop-opacity-10 -z-10 bg-mortgage" />
            <div
                className="absolute top-0 w-full h-full opacity-75 t-0 -z-10"
                style={{
                    backgroundColor: `rgb(91, 55, 118)`,
                }}
            ></div>
            <BoxStrokesIcon />

            <div className="px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:flex lg:items-start lg:gap-x-10 lg:px-8 lg:py-40">
                <div className="max-w-2xl mx-auto lg:mx-0 lg:flex-shrink">
                    <Image
                        src={'/assets/logos/logo-only-white.png'}
                        quality={100}
                        width={1000}
                        height={1000}
                        alt=""
                        className="h-24 w-auto"
                    />
                    <h1 className="mt-10 text-4xl font-bold tracking-tight text-center text-gray-200 sm:text-5xl lg:text-left">
                        Your Home Loan is just a few steps away
                    </h1>
                    {/* <p className="mt-6 text-lg leading-8 text-gray-100">
                        {currentStep === 1
                            ? `Let's calculate your mortgage in 2 steps`
                            : 'Please provide the following information'}
                    </p> */}
                    <hr className="w-1/4 my-2 shadow-md text-muted" />
                    <p className="mt-6 text-lg leading-8 text-gray-100">
                        Welcome to Purple Roof, we give you the best hassle-free mortgage
                        solutions. Get a personalized estimation in a matter of seconds.
                    </p>
                </div>
                <div className="pb-8 mt-16 text-black rounded-md sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow md:pt-8 lg:pt-0">
                    <div className="card border border-gray-200 shadow-lg rounded-xl bg-gray-50 px-4 py-5 sm:px-6 w-full ml-auto max-w-[500px]">
                        {/* Form Here */}
                        {subComponents[pathName]}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Page
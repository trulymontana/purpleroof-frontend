"use client"

import { PageRoutes } from '@/constants/page-routes';
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react'
import PersonalDetailsForm from '../_form/PersonalDetailsForm';
import IncomeDetailsForm from '../_form/IncomeDetailsForm';

const Page = () => {

    const pathName = usePathname();

    const storeValues = (step: string, values: any) => {
        localStorage.setItem(step, JSON.stringify(values))
    }

    const subComponents: { [key: string]: React.ReactElement } = {
        [PageRoutes.mortgage.PERSONAL_DETAILS]: (
            <PersonalDetailsForm onSave={storeValues} />
        ),
        [PageRoutes.mortgage.INCOME_DETAILS]: <IncomeDetailsForm onSave={storeValues} />,
    }

    return (
        <section className="relative h-auto min-h-screen">
            <div className="absolute inset-0 h-auto min-h-screen w-full bg-indigo-600 bg-opacity-25 bg-cover backdrop-opacity-10 -z-10 bg-mortgage" />
            <div
                className="absolute top-0 w-full h-full opacity-75 t-0 -z-10"
                style={{
                    backgroundColor: `rgb(91, 55, 118)`,
                }}
            ></div>
            <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-gray-400 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                        width="200"
                        height="200"
                        x="50%"
                        y="-1"
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M100 200V.5M.5 .5H200" fill="none"></path>
                    </pattern>
                </defs>
                <svg x="50%" y="-1" className="overflow-visible fill-gray-600">
                    <path
                        d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                        strokeWidth="0"
                    ></path>
                </svg>
                <rect
                    width="100%"
                    height="100%"
                    strokeWidth="0"
                    fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                ></rect>
            </svg>

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
                        {subComponents[pathName]}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Page
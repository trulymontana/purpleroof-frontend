"use client"

import React from 'react'
import { AmenitiesForm, BasicDetailsForm, CallPreferenceForm, LocationDetailsForm, ProjectStatusForm, PropertyDetailsForm, RentPropertyDetailsForm } from '../_form'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'


const Page = ({ params: { step } }: { params: { step: string } }) => {

    const searchParams = useSearchParams();

    const categoryType = searchParams.get("categoryType")

    const storeValues = (step: string, values: any) => {
        localStorage.setItem(`advertise/${step}`, JSON.stringify(values))
    }

    const subComponents: { [key: string]: React.ReactElement } = {
        "basic-details": <BasicDetailsForm onSave={storeValues} />,
        "property-details": categoryType === 'rent' ? (
            <RentPropertyDetailsForm onSave={storeValues} />
        ) : categoryType === 'sell' ? (
            <PropertyDetailsForm onSave={storeValues} />
        ) : <div>Invalid Category</div>,
        "location-details": <LocationDetailsForm onSave={storeValues} />,
        "amenities-details": <AmenitiesForm onSave={storeValues} />,
        "project-status": <ProjectStatusForm onSave={storeValues} />,
        "call-preference": <CallPreferenceForm onSave={storeValues} />
    };

    return (
        <div>

            <section className="relative">
                <div className="absolute inset-0 w-full h-full bg-indigo-600 bg-opacity-25 bg-cover backdrop-opacity-10 -z-10 bg-advertise" />
                <div
                    className="absolute top-0 w-full h-full opacity-75 t-0 -z-10"
                    style={{
                        background: 'linear-gradient(to bottom, #795695 30%, #795695 70%)',
                    }}
                ></div>
                <svg
                    className="absolute inset-0 -z-10 h-full w-full stroke-slate-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
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
                    <rect
                        width="100%"
                        height="100%"
                        strokeWidth="0"
                        fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                    ></rect>
                </svg>
                <div className="px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:flex lg:items-start lg:gap-x-10 lg:px-8 lg:py-40">
                    <div className="max-w-2xl mx-auto lg:mx-0 lg:flex-shrink">
                        <Image src={'/assets/logos/logo-only-white.png'} quality={100} width={1000} height={1000} alt="" className="w-auto h-24" />
                        <h1 className="mt-10 text-4xl font-bold tracking-tight text-center text-gray-200 sm:text-5xl lg:text-left">
                            Advertise your property
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-100">
                            Place a free ad to sell or rent property.
                        </p>
                    </div>
                    <div className="pb-8 mt-16 text-black rounded-md sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow md:pt-8 lg:pt-0">
                        <div className="card border border-gray-200 shadow-lg rounded-xl bg-gray-50 px-4 py-5 sm:px-6 w-full ml-auto max-w-[500px]">
                            {subComponents[step]}
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default Page
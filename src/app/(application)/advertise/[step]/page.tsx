'use client'

import React from 'react'
import {
  AmenitiesForm,
  BasicDetailsForm,
  CallPreferenceForm,
  LocationDetailsForm,
  ProjectStatusForm,
  PropertyDetailsForm,
  RentPropertyDetailsForm,
} from '../_form'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

const Page = ({ params: { step } }: { params: { step: string } }) => {
  const searchParams = useSearchParams()

  const categoryType = searchParams.get('categoryType')

  const storeValues = (step: string, values: any) => {
    localStorage.setItem(`advertise/${step}`, JSON.stringify(values))
  }

  const subComponents: { [key: string]: React.ReactElement } = {
    'basic-details': <BasicDetailsForm onSave={storeValues} />,
    'property-details':
      categoryType === 'rent' ? (
        <RentPropertyDetailsForm onSave={storeValues} />
      ) : categoryType === 'sell' ? (
        <PropertyDetailsForm onSave={storeValues} />
      ) : (
        <div>Invalid Category</div>
      ),
    'location-details': <LocationDetailsForm onSave={storeValues} />,
    'amenities-details': <AmenitiesForm onSave={storeValues} />,
    'project-status': <ProjectStatusForm onSave={storeValues} />,
    'call-preference': <CallPreferenceForm onSave={storeValues} />,
  }

  return (
    <div>
      <section className="relative h-auto min-h-screen">
        <div className="absolute inset-0 -z-10 h-auto min-h-screen w-full bg-indigo-600 bg-opacity-25 bg-advertise bg-cover backdrop-opacity-10" />
        <div
          className="t-0 absolute top-0 -z-10 h-full w-full opacity-75"
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
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-start lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-shrink">
            <Image
              src={'/assets/logos/logo-only-white.png'}
              quality={100}
              width={1000}
              height={1000}
              alt=""
              className="h-24 w-auto"
            />
            <h1 className="mt-10 text-center text-4xl font-bold tracking-tight text-gray-200 sm:text-5xl lg:text-left">
              Advertise your property
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-100">
              Place a free ad to sell or rent property.
            </p>
          </div>
          <div className="mt-16 rounded-md pb-8 text-black sm:mt-24 md:pt-8 lg:mt-0 lg:flex-shrink-0 lg:flex-grow lg:pt-0">
            <div className="card ml-auto w-full max-w-[500px] rounded-xl border border-gray-200 bg-gray-50 px-4 py-5 shadow-lg sm:px-6">
              {subComponents[step]}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page

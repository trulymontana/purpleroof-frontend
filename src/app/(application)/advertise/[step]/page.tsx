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
import { usePathname, useSearchParams } from 'next/navigation'


import Image from 'next/image'
import WhiteStrokes from '@/components/svgs/white-strokes'
import { PageRoutes } from '@/constants/page-routes'

const Page = ({ params: { step } }: { params: { step: string } }) => {
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const categoryType = searchParams.get('categoryType');

    const storeValues = (step: string, values: any) => {
        localStorage.setItem(step, JSON.stringify(values))
    }

    const subComponents: { [key: string]: React.ReactElement } = {
        [PageRoutes.advertise.BASIC_DETAILS]: (
            <BasicDetailsForm onSave={storeValues} />
        ),
        [PageRoutes.advertise.PROPERTY_DETAILS]:
            categoryType === 'rent' ? (
                <RentPropertyDetailsForm onSave={storeValues} />
            ) : categoryType === 'sell' ? (
                <PropertyDetailsForm onSave={storeValues} />
            ) : (
                <div>Invalid Category</div>
            ),
        [PageRoutes.advertise.LOCATION_DETAILS]: <LocationDetailsForm onSave={storeValues} />,
        [PageRoutes.advertise.AMENITIES_DETAILS]: <AmenitiesForm onSave={storeValues} />,
        [PageRoutes.advertise.PROJECT_STATUS]: <ProjectStatusForm onSave={storeValues} />,
        [PageRoutes.advertise.CALL_PREFERENCE]: <CallPreferenceForm onSave={storeValues} />,
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
                <WhiteStrokes />

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
                            {subComponents[pathName]}
                        </div>
                    </div>
                </div>
            </section>
        </div>
      </section>
    </div>
  )
}

export default Page

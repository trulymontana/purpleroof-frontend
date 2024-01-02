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
  UploadDocumentsForm
} from '../_form'
import { usePathname, useSearchParams } from 'next/navigation'

import Image from 'next/image'
import WhiteStrokes from '@/components/svgs/white-strokes'
import { PageRoutes } from '@/constants/page-routes'
import { useCreatePropertyMutation } from '@/data/hooks/usePropertiesClient'
import { CreatePropertyInput } from '@/data/clients/propertiesClient'
import { nullCheckAndMerge } from '@/lib/utils'
import { PropertyForEnum } from '@/constants/enums'

const Page = () => {
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const { mutate: createProperty, isPending: isLoading } = useCreatePropertyMutation()

  const categoryType = searchParams.get('categoryType')

  const storeValues = (step: string, values: any) => {
    localStorage.setItem(step, JSON.stringify(values))
  }

  const handleSubmit = (values: any) => {
    const basicDetails = localStorage.getItem(PageRoutes.advertise.BASIC_DETAILS)
    const propertyDetails = localStorage.getItem(PageRoutes.advertise.PROPERTY_DETAILS)
    const locationDetails = localStorage.getItem(PageRoutes.advertise.LOCATION_DETAILS)
    const amenitiesDetails = localStorage.getItem(PageRoutes.advertise.AMENITIES_DETAILS)
    const projectStatus = localStorage.getItem(PageRoutes.advertise.PROJECT_STATUS)
    const documentDetails = localStorage.getItem(PageRoutes.advertise.UPLOAD_PHOTOS)
    const callPreferenceDetails = localStorage.getItem(PageRoutes.advertise.CALL_PREFERENCE)

    let result: any = {}

    nullCheckAndMerge(result, basicDetails)
    nullCheckAndMerge(result, propertyDetails)
    nullCheckAndMerge(result, locationDetails)
    nullCheckAndMerge(result, amenitiesDetails)
    nullCheckAndMerge(result, projectStatus)
    nullCheckAndMerge(result, documentDetails)
    nullCheckAndMerge(result, callPreferenceDetails)

    let property: CreatePropertyInput = Object.assign({}, result, values)

    if (property.amenities && property.amenities.length > 0) {
      let amenities_values: number[] = property.amenities.map((amenity: any) => amenity.value)
      property.amenities = amenities_values
    }

    createProperty({
      ...property
    })
  }

  const subComponents: { [key: string]: React.ReactElement } = {
    [PageRoutes.advertise.BASIC_DETAILS]: <BasicDetailsForm onSave={storeValues} />,
    [PageRoutes.advertise.PROPERTY_DETAILS]:
      categoryType === PropertyForEnum.RENT ? (
        <RentPropertyDetailsForm onSave={storeValues} />
      ) : categoryType === PropertyForEnum.SALE ? (
        <PropertyDetailsForm onSave={storeValues} />
      ) : (
        <div>Invalid Category</div>
      ),
    [PageRoutes.advertise.LOCATION_DETAILS]: <LocationDetailsForm onSave={storeValues} />,
    [PageRoutes.advertise.AMENITIES_DETAILS]: <AmenitiesForm onSave={storeValues} />,
    [PageRoutes.advertise.PROJECT_STATUS]: <ProjectStatusForm onSave={storeValues} />,
    [PageRoutes.advertise.UPLOAD_PHOTOS]: <UploadDocumentsForm onSave={storeValues} />,
    [PageRoutes.advertise.CALL_PREFERENCE]: <CallPreferenceForm handleSubmit={handleSubmit} isLoading={isLoading} />
  }

  return (
    <div>
      <section className="relative h-auto min-h-screen">
        <div className="absolute inset-0 -z-10 h-auto min-h-screen w-full bg-indigo-600 bg-opacity-25 bg-advertise bg-cover backdrop-opacity-10" />
        <div
          className="t-0 absolute top-0 -z-10 h-full w-full opacity-75"
          style={{
            background: 'linear-gradient(to bottom, #795695 30%, #795695 70%)'
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
            <p className="mt-6 text-lg leading-8 text-gray-100">Place a free ad to sell or rent property.</p>
          </div>
          <div className="mt-16 rounded-md pb-8 text-black sm:mt-24 md:pt-8 lg:mt-0 lg:flex-shrink-0 lg:flex-grow lg:pt-0">
            <div className="card ml-auto w-full max-w-[500px] rounded-xl border border-gray-200 bg-gray-50 px-4 py-5 shadow-lg sm:px-6">
              {subComponents[pathName]}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page

"use client"

import React from 'react'
import { AmenitiesForm, BasicDetailsForm, CallPreferenceForm, LocationDetailsForm, ProjectStatusForm, PropertyDetailsForm, RentPropertyDetailsForm } from '../_form'
import { useSearchParams } from 'next/navigation'

const Page = ({ params: { step } }: { params: { step: string } }) => {

    // @ts-ignore
    const searchParams = useSearchParams();

    const categoryType = searchParams.get("categoryType")

    const storeValues = (step: string, values: any) => {
        localStorage.setItem(`advertise${step}`, JSON.stringify(values))
    }

    const subComponents: { [key: string]: React.ReactElement } = {
        "basic-details": <BasicDetailsForm onSave={storeValues} />,
        "property-details": categoryType === 'rent' ? (
            <RentPropertyDetailsForm onSave={storeValues} />
        ) : categoryType === 'sell' ? (
            <PropertyDetailsForm onSave={storeValues} />
        ) : <div>Invalid Category</div>,
        "location-details": <LocationDetailsForm onSave={storeValues} />,
        "amenities": <AmenitiesForm onSave={storeValues} />,
        "project-status": <ProjectStatusForm onSave={storeValues} />,
        "call-preference": <CallPreferenceForm onSave={storeValues} />
    };

    return (
        <div>
            {subComponents[step]}
        </div>
    )
}

export default Page
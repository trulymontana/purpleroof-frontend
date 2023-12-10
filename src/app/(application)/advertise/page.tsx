"use client";

import React from 'react'
import { AmenitiesForm, BasicDetailsForm, CallPreferenceForm, LocationDetailsForm, ProjectStatusForm, PropertyDetailsForm, RentPropertyDetailsForm } from './_form';

const Page = () => {

    const storeValues = (step: string, values: any) => {
        localStorage.setItem(`advertise/${step}`, JSON.stringify(values))
    }

    const createAdvertisement = () => {
        let allData: any = {};
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                let value = localStorage.getItem(JSON.parse(i.toLocaleString()));
                allData[i] = value
            }
        }
    }


    return (
        <section className="flex p-10 items-start gap-10">
            <BasicDetailsForm onSave={storeValues} />
            <PropertyDetailsForm onSave={storeValues} />
            <RentPropertyDetailsForm onSave={storeValues} />
            <LocationDetailsForm onSave={storeValues} />
            <AmenitiesForm onSave={storeValues} />
            <ProjectStatusForm onSave={storeValues} />
            {/* TODO DOCUMENTS FORM */}
            <CallPreferenceForm onSave={storeValues} />
        </section>
    )
}

export default Page

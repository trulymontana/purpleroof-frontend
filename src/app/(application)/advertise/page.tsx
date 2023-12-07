"use client";

import React, { useEffect, useState } from 'react'
import { AmenitiesForm, BasicDetailsForm, LocationDetailsForm, ProjectStatusForm, PropertyDetailsForm } from './_form';

const Page = () => {

    const storeValues = (step: number, values: any) => {
        localStorage.setItem(`advertise-${step.toLocaleString()}`, JSON.stringify(values))
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
            <LocationDetailsForm onSave={storeValues} />
            <AmenitiesForm onSave={storeValues} />
            <ProjectStatusForm />
            {/* TODO DOCUMENTS FORM */}
        </section>
    )
}

export default Page

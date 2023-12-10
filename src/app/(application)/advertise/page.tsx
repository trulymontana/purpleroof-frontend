'use client'

import React from 'react'
import {
  AmenitiesForm,
  BasicDetailsForm,
  CallPreferenceForm,
  LocationDetailsForm,
  ProjectStatusForm,
  PropertyDetailsForm,
  RentPropertyDetailsForm
} from './_form'

const Page = () => {
  const storeValues = (step: string, values: any) => {
    localStorage.setItem(`advertise/${step}`, JSON.stringify(values))
  }

  return (
    <section className="flex items-start gap-10 p-10">
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

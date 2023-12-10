"use client";

import React from 'react'
import PersonalDetailsForm from './_form/PersonalDetailsForm'
import IncomeDetailsForm from './_form/IncomeDetailsForm'

const Page = () => {
  const storeValues = (values: any) => {
    localStorage.setItem('personalDetails', JSON.stringify(values))
  }

  return (
    <section className="flex gap-16 p-4">
      <PersonalDetailsForm onSave={storeValues} />
      <IncomeDetailsForm />
    </section>
  )
}

export default Page
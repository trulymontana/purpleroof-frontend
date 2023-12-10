import React from 'react'
import PersonalDetailsForm from './_form/personal-details-form'
import IncomeDetailsForm from './_form/income-details-form'

const Page = () => {
  const storeValues = (step: string, values: any) => {
    localStorage.setItem(step, JSON.stringify(values))
  }

  return (
    <section className="flex gap-16 p-4">
      <PersonalDetailsForm onSave={storeValues} />
      <IncomeDetailsForm onSave={storeValues} />
    </section>
  )
}

export default Page

"use client";

import React from 'react'
import PersonalDetailsForm from './_form/personal-details-form'
import IncomeDetailsForm from './_form/income-details-form'

const Page = () => {

  const storeValues = (step: number, values: any) => {
    localStorage.setItem(step.toLocaleString(), JSON.stringify(values))
  }

  const createMortgage = () => {
    let allData: any = {};
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key!);

        try {
          allData[key!] = JSON.parse(value!);
        } catch (e) {
          allData[key!] = value;
        }
      }
    }
  }

  return (
    <section className="flex p-10 items-start gap-10">
      <PersonalDetailsForm onFormSubmit={storeValues} />
      <IncomeDetailsForm onFormSubmit={storeValues} createMortgage={createMortgage} />
    </section>
  )
}

export default Page

'use client'
import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import RadioGroupElement from '@/components/forms/elements/radio-group-element'
import { conditions, documentTypeOptions } from '@/constants/requirements'
import MultiSelectCheckbox from '@/components/forms/elements/checkbox-element'
import { TOption } from '@/constants/types'
import { useCreateRequirementMutation } from '@/data/hooks/useRequirementsClient'

const formSchema = z.object({
  name: z.string({
    required_error: 'Please enter a Requirement Name!'
  }),
  pre_approval_fee: z.string({
    required_error: 'Please enter Pre Approval Fee!'
  }),
  processing_fee: z.string({
    required_error: 'Please enter Processing Fee!'
  }),
  rate: z.string({
    required_error: 'Please enter a Rate!'
  }),
  life_insurance: z.string({
    required_error: 'Please enter Life Insurance!'
  }),
  property_insurance: z.string({
    required_error: 'Please enter Property Insurance!'
  }),
  valuation_fee: z.string({
    required_error: 'Please enter Valuation Fee!'
  }),
  incomeProfile: z.string({
    required_error: 'Please select a Condition!'
  })
})

const AddRequirementsForm = () => {
  const [selectedDocuments, setSelectedDocuments] = useState<TOption[]>([])

  const { isPending: isLoading, mutate: createRequirement } = useCreateRequirementMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const handleChange = (value: string) => {
    form.setValue('incomeProfile', value)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log({ selectedDocuments })
    console.log({ values })
    createRequirement({
      name: values.name,
      incomeProfile: 'SALARIED',
      residenceType: 'UAE_NATIONAL',
      requiredDocuments: []
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10 px-10 py-16">
        <InputElement name="name" label={'Requirement Name'} placeholder="Enter Requirement Name" />

        <div className="flex w-full items-center gap-10">
          <div className="w-1/2">
            <InputElement
              name="pre_approval_fee"
              type="number"
              label={'Pre Approval Fee (AED)'}
              placeholder="Enter Pre Approval Fee"
            />
          </div>
          <div className="w-1/2">
            <InputElement
              name="processing_fee"
              type="number"
              label={'Processing Fee (%)'}
              placeholder="Enter Processing Fee"
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-10">
          <div className="w-1/2">
            <InputElement name="rate" type="number" label={'Rate (%)'} placeholder="Enter Rate" />
          </div>
          <div className="w-1/2">
            <InputElement
              name="life_insurance"
              type="number"
              label={'Life Insurance (%)'}
              placeholder="Enter Life Insurance"
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-10">
          <div className="w-1/2">
            <InputElement
              name="property_insurance"
              type="number"
              label={'Property Insurance (%)'}
              placeholder="Enter Property Insurance"
            />
          </div>
          <div className="w-1/2">
            <InputElement
              name="valuation_fee"
              type="number"
              label={'Valuation Fee (AED)'}
              placeholder="Enter Valuation Fee"
            />
          </div>
        </div>

        <RadioGroupElement
          name="incomeProfile"
          label={'Condition'}
          className="items-center gap-10"
          options={conditions}
          handleChange={handleChange}
        />

        <MultiSelectCheckbox
          name="requiredDocuments"
          classNames="grid-cols-2"
          options={documentTypeOptions}
          selectedBoxes={selectedDocuments}
          setSelectedBoxes={setSelectedDocuments}
        />

        <Button type="submit" className="w-full">
          {isLoading ? 'Loading...' : 'Save'}
        </Button>
      </form>
    </Form>
  )
}

export default AddRequirementsForm

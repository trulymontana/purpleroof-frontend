'use client'
import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import RadioGroupElement from '@/components/forms/elements/radio-group-element'
import { documentTypeOptions, incomeProfiles, residenceTypes } from '@/constants/requirements'
import MultiSelectCheckbox from '@/components/forms/elements/checkbox-element'
import { TOption } from '@/constants/types'
import { useCreateRequirementMutation } from '@/data/hooks/useRequirementsClient'
import NumberInputElement from '@/components/forms/elements/number-input-element'

const formSchema = z.object({
  name: z.string({
    required_error: 'Please enter a Requirement Name!'
  }),
  preApprovalFee: z.number({
    required_error: 'Please enter Pre Approval Fee!'
  }),
  processingFee: z.number({
    required_error: 'Please enter Processing Fee!'
  }),
  rate: z.number({
    required_error: 'Please enter a Rate!'
  }),
  lifeInsurance: z.number({
    required_error: 'Please enter Life Insurance!'
  }),
  propertyInsurance: z.number({
    required_error: 'Please enter Property Insurance!'
  }),
  valuationFee: z.number({
    required_error: 'Please enter Valuation Fee!'
  }),
  incomeProfile: z.string({
    required_error: 'Please select a Income Profile!'
  }),
  residenceType: z.string({
    required_error: 'Please select a Residence Type!'
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
    let formattedDocuments = selectedDocuments.map(document => (
      {
        "name": document.label,
        "documentType": document.value,
        "isMandatory": true,
      }
    ));
    createRequirement({
      ...values,
      requiredDocuments: formattedDocuments
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10 px-10 py-16">
        <InputElement name="name" label={'Requirement Name'} placeholder="Enter Requirement Name" />

        <div className="flex w-full items-center gap-10">
          <div className="w-1/2">
            <NumberInputElement
              name="preApprovalFee"
              label={'Pre Approval Fee (AED)'}
              placeholder="Enter Pre Approval Fee"
            />
          </div>
          <div className="w-1/2">
            <NumberInputElement
              name="processingFee"
              label={'Processing Fee (%)'}
              placeholder="Enter Processing Fee"
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-10">
          <div className="w-1/2">
            <NumberInputElement name="rate" label={'Rate (%)'} placeholder="Enter Rate" />
          </div>
          <div className="w-1/2">
            <NumberInputElement
              name="lifeInsurance"
              label={'Life Insurance (%)'}
              placeholder="Enter Life Insurance"
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-10">
          <div className="w-1/2">
            <NumberInputElement
              name="propertyInsurance"
              label={'Property Insurance (%)'}
              placeholder="Enter Property Insurance"
            />
          </div>
          <div className="w-1/2">
            <NumberInputElement
              name="valuationFee"
              label={'Valuation Fee (AED)'}
              placeholder="Enter Valuation Fee"
            />
          </div>
        </div>

        <RadioGroupElement
          name="incomeProfile"
          label={'Income Profile'}
          className="items-center gap-10"
          options={incomeProfiles}
          handleChange={handleChange}
        />

        <RadioGroupElement
          name="residenceType"
          label={'Residence Type'}
          className="items-center gap-10"
          options={residenceTypes}
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

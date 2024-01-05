'use client'
import React, { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import RadioGroupElement from '@/components/forms/elements/radio-group-element'
import { documentTypeOptions, incomeProfiles, residenceTypes } from '@/constants/requirements'
import MultiSelectCheckbox from '@/components/forms/elements/checkbox-element'
import { RequirementApplication, TOption } from '@/constants/types'
import { useCreateRequirementMutation } from '@/data/hooks/useRequirementsClient'
import NumberInputElement from '@/components/forms/elements/number-input-element'
import { IncomeProfileEnum, ResidenceTypeEnum } from '@/constants/enums'
import { Badge } from '@/components/ui/badge'

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
  incomeProfile: z.nativeEnum(IncomeProfileEnum, {
    required_error: "Please select a Income Profile"
  }),
  residenceType: z.nativeEnum(ResidenceTypeEnum, {
    required_error: 'Please select a Residence Type!'
  })
})

interface Props {
  data?: RequirementApplication
  isLoading: boolean
  mutate: any
  mode?: 'CREATE' | 'EDIT'
}

const RequirementsForm = ({ data, isLoading, mutate, mode = 'CREATE' }: Props) => {

  const [selectedDocuments, setSelectedDocuments] = useState<TOption[]>([])

  // const { isPending: isLoading, mutate: createRequirement } = useCreateRequirementMutation()

  const values = {
    incomeProfile: data?.incomeProfile,
    residenceType: data?.residenceType
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: values || {},
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    let formattedDocuments = selectedDocuments.map((document) => ({
      name: document.label,
      documentType: document.value,
      isMandatory: true
    }))
    if (data && data.id) {
      mutate({
        id: data.id,
        ...values,
        requiredDocuments: formattedDocuments
      })
    } else {
      mutate({
        ...values,
        requiredDocuments: formattedDocuments
      })
    }
  }

  useEffect(() => {
    if (data) {
      form.setValue("incomeProfile", data.incomeProfile)
      form.setValue("residenceType", data.residenceType)
      form.setValue("name", data.name)
      form.setValue("preApprovalFee", data.preApprovalFee)
      form.setValue("processingFee", data.processingFee)
      form.setValue("propertyInsurance", data.propertyInsurance)
      form.setValue("rate", data.rate)
      form.setValue("lifeInsurance", data.lifeInsurance)
      form.setValue("valuationFee", data.valuationFee)

      let unformattedDocuments = data?.requiredDocuments?.map((document) => ({
        label: document.name,
        value: document.documentType
      }))
      setSelectedDocuments(unformattedDocuments)
    }
  }, [data, form])

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
            <NumberInputElement name="processingFee" label={'Processing Fee (%)'} placeholder="Enter Processing Fee" />
          </div>
        </div>
        <div className="flex w-full items-center gap-10">
          <div className="w-1/2">
            <NumberInputElement name="rate" label={'Rate (%)'} placeholder="Enter Rate" />
          </div>
          <div className="w-1/2">
            <NumberInputElement name="lifeInsurance" label={'Life Insurance (%)'} placeholder="Enter Life Insurance" />
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
            <NumberInputElement name="valuationFee" label={'Valuation Fee (AED)'} placeholder="Enter Valuation Fee" />
          </div>
        </div>

        {
          mode === 'CREATE' ? (
            <>
              <RadioGroupElement
                name="incomeProfile"
                label={'Income Profile'}
                className="items-center gap-10"
                options={incomeProfiles}
              />

              <RadioGroupElement
                name="residenceType"
                label={'Residence Type'}
                className="items-center gap-10"
                options={residenceTypes}
              />
            </>
          ) : (
            <div className='flex gap-2 flex-col'>
              <span>Income Profile: <Badge>{data?.incomeProfile}</Badge></span>
              <span>Residence Type: <Badge>{data?.residenceType}</Badge></span>
            </div>
          )
        }

        <MultiSelectCheckbox
          name="requiredDocuments"
          classNames="grid-cols-2"
          options={documentTypeOptions}
          selectedBoxes={selectedDocuments}
          setSelectedBoxes={setSelectedDocuments}
        />

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? 'Loading...' : 'Save'}
        </Button>
      </form>
    </Form>
  )
}

export default RequirementsForm

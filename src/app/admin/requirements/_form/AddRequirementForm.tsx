'use client'
import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import SwitchElement from '@/components/forms/elements/switch-element'
import SelectElement from '@/components/forms/elements/select-element'
import RadioGroupElement from '@/components/forms/elements/radio-group-element'
import { Conditions, Documents } from '@/constants/requirements'
import MultiSelectCheckbox from '@/components/forms/elements/checkbox-element'
import { TOption } from '@/constants/types'

const formSchema = z.object({
    requirement_name: z.string({
        required_error: "Please enter a Requirement Name!"
    }),
    pre_approval_fee: z.string({
        required_error: 'Please enter Pre Approval Fee!',
    }),
    processing_fee: z.string({
        required_error: "Please enter Processing Fee!"
    }),
    rate: z.string({
        required_error: "Please enter a Rate!"
    }),
    life_insurance: z.string({
        required_error: "Please enter Life Insurance!"
    }),
    property_insurance: z.string({
        required_error: "Please enter Property Insurance!"
    }),
    valuation_fee: z.string({
        required_error: "Please enter Valuation Fee!"
    }),
    condition: z.string({
        required_error: "Please select a Condition!"
    })
})

const AddRequirementsForm = () => {

    const [selectedAmenities, setSelectedAmenities] = useState<TOption[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const handleChange = (value: string) => {
        form.setValue("condition", value)
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log({ selectedAmenities })
        console.log({ values })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-10 px-10 py-16"
            >
                <InputElement name="requirement_name" label={'Requirement Name'} placeholder='Enter Requirement Name' />

                <div className='flex items-center gap-10 w-full'>
                    <div className='w-1/2'>
                        <InputElement name="pre_approval_fee" type='number' label={'Pre Approval Fee (AED)'} placeholder='Enter Pre Approval Fee' />
                    </div>
                    <div className='w-1/2'>
                        <InputElement name="processing_fee" type='number' label={'Processing Fee (%)'} placeholder='Enter Processing Fee' />
                    </div>
                </div>
                <div className='flex items-center gap-10 w-full'>
                    <div className='w-1/2'>
                        <InputElement name="rate" type='number' label={'Rate (%)'} placeholder='Enter Rate' />
                    </div>
                    <div className='w-1/2'>
                        <InputElement name="life_insurance" type='number' label={'Life Insurance (%)'} placeholder='Enter Life Insurance' />
                    </div>
                </div>
                <div className='flex items-center gap-10 w-full'>
                    <div className='w-1/2'>
                        <InputElement name="property_insurance" type='number' label={'Property Insurance (%)'} placeholder='Enter Property Insurance' />
                    </div>
                    <div className='w-1/2'>
                        <InputElement name="valuation_fee" type='number' label={'Valuation Fee (AED)'} placeholder='Enter Valuation Fee' />
                    </div>
                </div>

                <RadioGroupElement
                    name="condition"
                    label={'Condition'}
                    className='items-center gap-10'
                    options={Conditions}
                    handleChange={handleChange}
                />

                <MultiSelectCheckbox name='documents' classNames='grid-cols-2' options={Documents} selectedBoxes={selectedAmenities} setSelectedBoxes={setSelectedAmenities} />

                <Button type="submit" className="w-full">
                    Save
                </Button>
            </form>
        </Form >
    )
}

export default AddRequirementsForm
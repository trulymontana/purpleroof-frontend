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
import { CommercialTypes, ResidentalTypes } from '@/constants/advertise'
import RadioGroupElement from '@/components/forms/elements/radio-group-element'

const formSchema = z.object({
    advert_title: z.string({
        required_error: 'Title should not be empty!',
    }),
    property_type: z.string({
        required_error: "Please select a property type!"
    }),
    property_option: z.string({
        required_error: "Please select a property option"
    })
})

const BasicDetailsForm = ({ onSave }: { onSave: (step: number, values: any) => void }) => {

    const [propertyType, setPropertyType] = useState("Residential");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const handleChange = (value: string) => {
        setPropertyType(value)
        form.setValue("property_type", value)
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log({ personalForm: values })
        onSave(1, values)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-96 space-y-4 p-4 shadow-md"
            >
                <InputElement name="advert_title" label={'Advert Title'} />

                <RadioGroupElement
                    name="property_type"
                    label={'Type of Property'}
                    handleChange={handleChange}
                    options={[
                        {
                            label: 'Residential',
                            value: 'Residential',
                        },
                        {
                            label: 'Commercial',
                            value: 'Commercial',
                        }
                    ]}
                />
                <SelectElement
                    // name={propertyType === "Residential" ? "residential" : "commercial"}
                    name='property_option'
                    label={propertyType}
                    options={propertyType === "Residential" ? ResidentalTypes : CommercialTypes}
                />

                <Button type="submit" className="w-full">
                    Save and Continue
                </Button>
            </form>
        </Form>
    )
}

export default BasicDetailsForm
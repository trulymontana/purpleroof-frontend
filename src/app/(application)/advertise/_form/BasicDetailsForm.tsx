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
import { CommercialTypes, ResidentalTypes, TypesOfProperties } from '@/constants/advertise'
import RadioGroupElement from '@/components/forms/elements/radio-group-element'

const formSchema = z.object({
    advert_title: z.string({
        required_error: 'Title should not be empty!',
    }),
    type_of_property: z.string({
        required_error: "Please select a property type!"
    }),
    property_option: z.string({
        required_error: "Please select a property option"
    })
})

const BasicDetailsForm = ({ onSave }: { onSave: (step: number, values: any) => void }) => {

    const [category, setCategory] = useState("sell");
    const [propertyType, setPropertyType] = useState("Residential");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const handleChange = (value: string) => {
        setPropertyType(value)
        form.setValue("type_of_property", value)
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        const data = values;
        // @ts-ignore
        data.category = category
        onSave(1, data)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[28rem] space-y-4 p-4 shadow-md"
            >
                <div className='flex items-center gap-2'>
                    <div onClick={() => setCategory("sell")} className={`cursor-pointer flex-1 ${category === 'sell' ? "bg-purple-600 text-white" : "text-black"} rounded-xl text-center py-2`}>I want to Sell</div>
                    <div onClick={() => setCategory("rent")} className={`cursor-pointer flex-1 ${category === 'rent' ? "bg-purple-600 text-white" : "text-black"} text-center py-2 rounded-xl px-1`}>I want a rental tenant</div>
                </div>
                <InputElement name="advert_title" label={'Advert Title'} />

                <RadioGroupElement
                    name="type_of_property"
                    label={'Type of Property'}
                    className='items-center gap-10'
                    handleChange={handleChange}
                    options={TypesOfProperties}
                />

                <SelectElement
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
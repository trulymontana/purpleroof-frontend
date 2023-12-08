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
import { CallPreferences, CommercialTypes, ResidentalTypes, TypesOfProperties } from '@/constants/advertise'
import RadioGroupElement from '@/components/forms/elements/radio-group-element'

const formSchema = z.object({
    call_preference: z.string({
        required_error: "Please select a call preference!"
    })
})

interface Props {
    onSave: (step: string, values: any) => void
    onNext?: () => void
    onPrevious?: () => void
}

const CallPreferenceForm = ({ onSave }: Props) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const handlePreferenceChange = (value: string) => {
        form.setValue("call_preference", value)
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        onSave("call-preference", values)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[28rem] space-y-4 p-4 shadow-md"
            >

                <RadioGroupElement
                    handleChange={handlePreferenceChange}
                    name="call_preference"
                    label={'How would you prefer to handle inquiries from potential leads interested in this advertisement?'}
                    className='items-start gap-4 flex-col'
                    options={CallPreferences}
                />

                <Button type="submit" className="w-full">
                    Save and Continue
                </Button>
            </form>
        </Form>
    )
}

export default CallPreferenceForm
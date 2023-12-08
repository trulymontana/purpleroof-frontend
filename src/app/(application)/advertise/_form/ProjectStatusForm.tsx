'use client'
import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import SwitchElement from '@/components/forms/elements/switch-element'
import SelectElement from '@/components/forms/elements/select-element'
import { CommercialTypes, ProjectStatuses, ResidentalTypes, TypesOfProperties, rentedOrVacantOptions } from '@/constants/advertise'
import RadioGroupElement from '@/components/forms/elements/radio-group-element'
import DatePickerElement from '@/components/forms/elements/date-picker-element'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import CustomSelectElement from '@/components/forms/elements/custom-select-element'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    project_status: z.string(),
    rented_or_vacant: z.string().optional(),
    rental_amount: z.string().optional(),
    number_of_cheques: z.string().optional(),
    notice_period_rent: z.string().optional(),
    notice_period_property: z.string().optional(),
    completion_date: z.date().optional(),
});

type TProjectStatus = z.infer<typeof formSchema>;

interface Props {
    onSave: (step: string, values: any) => void
}

const ProjectStatusForm = ({ onSave }: Props) => {

    const router = useRouter();

    // @ts-ignore
    const project_status_data: z.infer<typeof formSchema> = JSON.parse(localStorage.getItem("advertise/project-status"))

    const form = useForm<TProjectStatus>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            project_status: project_status_data?.project_status ?? "",
            notice_period_property: project_status_data?.notice_period_property ?? "",
            notice_period_rent: project_status_data?.notice_period_rent ?? "",
            rented_or_vacant: project_status_data?.rented_or_vacant ?? "",
            rental_amount: project_status_data?.rental_amount ?? "",
            // completion_date: project_status_data?.completion_date ?? new Date(),
            number_of_cheques: project_status_data?.number_of_cheques ?? ""
        }
    })

    function onSubmit(values: TProjectStatus) {
        onSave("project-status", values)
        router.push(`/advertise/call-preference`)
    }

    const project_status = form.watch("project_status")
    const rented_or_vacant = form.watch("rented_or_vacant")

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-96 space-y-4 p-4 shadow-md"
            >

                <SelectElement name='project_status' label='Project Status' options={ProjectStatuses} />

                {project_status === 'completed' && (
                    <>
                        <SelectElement name='rented_or_vacant' label='Rented or Vacant' options={rentedOrVacantOptions} />
                        {rented_or_vacant === 'rented' && (
                            <>
                                <InputElement name="rental_amount" label="Rental Amount (AED)" />
                                <InputElement name="number_of_cheques" label="Number of Cheques" />
                                <InputElement name="notice_period_rent" label="Notice Period of remaining rental agreement (in months)" />
                            </>
                        )}
                    </>
                )}

                {project_status === 'off plan/under construction' && (
                    <DatePickerElement name='completion_date' label='Completion Date' disabled={true} />
                )}

                <InputElement name="notice_period_property" label={'Notice Period to vacate the property (in months)'} />

                <Button type="submit" className="w-full">
                    Save and Continue
                </Button>
                <Button type='button' onClick={() => router.push(`/advertise/amenities-details`)} className="w-full">
                    Go Back
                </Button>
            </form>
        </Form>
    )
}

export default ProjectStatusForm
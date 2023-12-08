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

const formSchema = z.object({
    project_status: z.string(),
    rented_or_vacant: z.string().optional(),
    rental_amount: z.string().optional(),
    number_of_cheques: z.string().optional(),
    notice_period_rent: z.string().optional(),
    notice_period_property: z.string().optional(),
    completion_date: z.string().optional(),
});

type TProjectStatus = z.infer<typeof formSchema>;

const statusOptions = [
    { label: 'Completed', value: 'completed' },
    { label: 'Under Construction', value: 'underConstruction' },
    { label: 'Shell & Core', value: 'shellCore' },
];



const ProjectStatusForm = ({ onSave }: { onSave: (step: number, values: any) => void }) => {

    const form = useForm<TProjectStatus>({
        resolver: zodResolver(formSchema),
    })

    // const [values, setValues] = useState(form.getValues());

    // const handleStatusChange = (value: string) => {
    //     setValues({ ...values, project_status: value });
    //     form?.setValue("project_status", value)
    // }

    // const handleRentChange = (value: string) => {
    //     setValues({ ...values, rented_or_vacant: value });
    //     form?.setValue("rented_or_vacant", value)
    // }

    function onSubmit(values: TProjectStatus) {
        console.log({ ProjectStatusForm: values })
        onSave(5, values)
    }

    const project_status = form.watch("project_status")
    const rented_or_vacant = form.watch("rented_or_vacant")

    console.log({ project_status, rented_or_vacant })

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-96 space-y-4 p-4 shadow-md"
            >

                {/* <CustomSelectElement name='project_status' label='Project Status' options={ProjectStatuses}  /> */}

                <SelectElement name='project_status' label='Project Status' options={ProjectStatuses} />

                {project_status === 'completed' && (
                    <>
                        {/* <CustomSelectElement name='rented_or_vacant' label='Rented or Vacant' options={rentedOrVacantOptions} onChangeHandler={handleRentChange} /> */}
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
            </form>
        </Form>
    )
}

export default ProjectStatusForm
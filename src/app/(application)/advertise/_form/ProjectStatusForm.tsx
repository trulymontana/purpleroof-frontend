'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import SelectElement from '@/components/forms/elements/select-element'
import {  projectStatuses, rentedOrVacantOptions } from '@/constants/advertise'
import DatePickerElement from '@/components/forms/elements/date-picker-element'
import { useRouter } from 'next/navigation'
import { BackButton } from '@/components/navigation/back-button'
import { PageRoutes } from '@/constants/page-routes'

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

    const storedValue = localStorage.getItem(PageRoutes.advertise.PROJECT_STATUS);

    const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

    if (defaultValues.completion_date) {
        // @ts-ignore
        defaultValues.completion_date = new Date(defaultValues?.completion_date)
    }

    const form = useForm<TProjectStatus>({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    function onSubmit(values: TProjectStatus) {
        onSave(PageRoutes.advertise.PROJECT_STATUS, values)
        router.push(PageRoutes.advertise.CALL_PREFERENCE)
    }

    const project_status = form.watch("project_status")
    const rented_or_vacant = form.watch("rented_or_vacant")

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4 p-4"
            >

                <SelectElement name='project_status' label='Project Status' options={projectStatuses} />

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
                <BackButton route={PageRoutes.advertise.AMENITIES_DETAILS} />
            </form>
        </Form>
    )
}

export default ProjectStatusForm
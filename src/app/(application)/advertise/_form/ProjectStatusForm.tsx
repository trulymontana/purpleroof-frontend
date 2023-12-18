'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import SelectElement from '@/components/forms/elements/select-element'
import { projectStatuses, rentedOrVacantOptions } from '@/constants/advertise'
import DatePickerElement from '@/components/forms/elements/date-picker-element'
import { useRouter } from 'next/navigation'
import { BackButton } from '@/components/navigation/back-button'
import { PageRoutes } from '@/constants/page-routes'

const formSchema = z.object({
  projectStatus: z.string(),
  rentedOrVacant: z.string().optional(),
  rentalAmount: z.string().optional(),
  numberOfCheques: z.string().optional(),
  noticePeriodRent: z.string().optional(),
  noticePeriodProperty: z.string().optional(),
  completionDate: z.date().optional()
})

type TProjectStatus = z.infer<typeof formSchema>

interface Props {
  onSave: (step: string, values: any) => void
}

const ProjectStatusForm = ({ onSave }: Props) => {
  const router = useRouter()

  const storedValue = localStorage.getItem(PageRoutes.advertise.PROJECT_STATUS)

  const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  if (defaultValues.completionDate) {
    // @ts-ignore
    defaultValues.completionDate = new Date(defaultValues?.completionDate)
  }

  const form = useForm<TProjectStatus>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  function onSubmit(values: TProjectStatus) {
    onSave(PageRoutes.advertise.PROJECT_STATUS, values)
    router.push(PageRoutes.advertise.UPLOAD_PHOTOS)
  }

  const project_status = form.watch('projectStatus')
  const rented_or_vacant = form.watch('rentedOrVacant')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <SelectElement name="projectStatus" label="Project Status" options={projectStatuses} />

        {project_status === 'completed' && (
          <>
            <SelectElement name="rentedOrVacant" label="Rented or Vacant" options={rentedOrVacantOptions} />
            {rented_or_vacant === 'rented' && (
              <>
                <InputElement name="rentalAmount" label="Rental Amount (AED)" />
                <InputElement name="numberOfCheques" label="Number of Cheques" />
                <InputElement
                  name="noticePeriodRent"
                  label="Notice Period of remaining rental agreement (in months)"
                />
              </>
            )}
          </>
        )}

        {project_status === 'off plan/under construction' && (
          <DatePickerElement name="completionDate" label="Completion Date" disabled={true} />
        )}

        <InputElement name="noticePeriodProperty" label={'Notice Period to vacate the property (in months)'} />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
        <BackButton route={PageRoutes.advertise.AMENITIES_DETAILS} />
      </form>
    </Form>
  )
}

export default ProjectStatusForm

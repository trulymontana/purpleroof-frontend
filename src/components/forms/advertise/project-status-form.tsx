'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import SelectElement from '@/components/forms/elements/select-element'
import { holdingTypes, occupencyStatusOptions, projectStatuses } from '@/constants/advertise'
import DatePickerElement from '@/components/forms/elements/date-picker-element'
import { useRouter } from 'next/navigation'
import { BackButton } from '@/components/navigation/back-button'
import { PageRoutes } from '@/constants/page-routes'
import { HoldingTypeEnum, OccupencyStatusEnum, ProjectStatusesEnum } from '@/constants/enums'
import NumberInputElement from '@/components/forms/elements/number-input-element'

const formSchema = z.object({
  projectStatus: z.nativeEnum(ProjectStatusesEnum, {
    required_error: "Please select a project status"
  }),
  occupencyStatus: z.nativeEnum(OccupencyStatusEnum).optional(),
  rentalAmount: z.number().optional(),
  numberOfCheques: z.number().optional(),
  noticePeriodRent: z.number().optional(),
  noticePeriodProperty: z.number().optional(),
  completionDate: z.date().optional(),
  holdingType: z.nativeEnum(HoldingTypeEnum, {
    required_error: 'Please select a holding type!'
  }),
})

type TProjectStatus = z.infer<typeof formSchema>

interface Props {
  onSave: (step: string, values: any) => void
}

const ProjectStatusForm = ({ onSave }: Props) => {
  const router = useRouter();

  // @ts-ignore
  const basicDetails = JSON.parse(localStorage.getItem(PageRoutes.advertise.BASIC_DETAILS));
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
    router.push(PageRoutes.advertise.ADDITIONAL_DETAILS)
  }

  const projectStatus = form.watch('projectStatus')
  const occupencyStatus = form.watch('occupencyStatus')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <SelectElement name="projectStatus" label="Project Status" options={projectStatuses} />

        {projectStatus === ProjectStatusesEnum.COMPLETED && (
          <>
            <SelectElement name="occupencyStatus" label="Occupency Status  (optional)" options={occupencyStatusOptions} />
            {occupencyStatus === OccupencyStatusEnum.OCCUPIED && (
              <>
                <NumberInputElement name="rentalAmount" label="Rental Amount (AED) (optional)" />
                <NumberInputElement name="numberOfCheques" label="Number of Cheques (optional)" />
                <NumberInputElement
                  name="noticePeriodRent"
                  label="Notice Period of remaining rental agreement (in months) (optional)"
                />
                <NumberInputElement name="noticePeriodProperty" label={'Notice Period to vacate the property (in months) (optional)'} />
              </>
            )}
          </>
        )}

        {projectStatus === ProjectStatusesEnum.OFF_PLAN_UNDER_CONSTRUCTION && (
          <DatePickerElement name="completionDate" label="Completion Date (optional)" disabled={true} />
        )}

        <SelectElement
          name="holdingType"
          label={'Holding Type'}
          placeholder="Please select a holding type"
          options={holdingTypes}
        />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
        <BackButton route={`${PageRoutes.advertise.PROPERTY_DETAILS}?categoryType=${basicDetails?.propertyFor}`} />
      </form>
    </Form>
  )
}

export default ProjectStatusForm

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { emirateOptions } from '@/constants/advertise'
import MultiSelectElement from '@/components/forms/elements/multiselect-element'
import { TOption } from '@/constants/types'
import { getValuesFrom } from '@/lib/utils'
import { useGetLocations } from '@/data/hooks/useLocationsClient'
import { Separator } from '@/components/ui/separator'
import { useUpdateAgentMutation } from '@/data/hooks/useAgentsClient'
import { Agent } from '@/data/clients/agentsClient'

const formSchema = z.object({
  emirates: z.any().optional(),
  locations: z.any().optional()
})

interface Props {
  agentDetails: Agent
}

type TLocations = z.infer<typeof formSchema>
const UpdateLocationsForm = ({ agentDetails }: Props) => {
  const { mutate: updateLocations, isPending: isLoading } = useUpdateAgentMutation()

  const form = useForm<TLocations>({
    resolver: zodResolver(formSchema)
  })

  const emirates: TOption[] = form.watch('emirates')

  let emirateValues: any

  emirates?.length > 0 && (emirateValues = getValuesFrom(emirates))

  const { data: locationOptions } = useGetLocations(emirateValues)

  function onSubmit(values: TLocations) {
    delete values.emirates
    values?.locations?.length > 0 && (values.locations = getValuesFrom(values.locations))
    values?.locations?.length > 0 && (values.locations = values.locations.map((location: string) => Number(location)))

    updateLocations({
      id: agentDetails.id,
      ...values
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <MultiSelectElement
          label="Emirates"
          name="emirates"
          placeholder="Please select emirates"
          options={emirateOptions}
        />
        <MultiSelectElement
          label="Locations"
          disabled={!emirates || emirates.length === 0}
          name="locations"
          placeholder={
            !emirates || emirates?.length === 0 ? 'Please select atleast one emirate' : 'Please select locations'
          }
          options={locationOptions || [{ label: 'Dubai', value: '1' }]}
        />
        <Separator />
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  )
}

export default UpdateLocationsForm

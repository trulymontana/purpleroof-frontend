'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import { advertiseSteps, emiratesWithLocations } from '@/constants/advertise'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SelectElement from '@/components/forms/elements/select-element'
import { useRouter } from 'next/navigation'
import { AdvertiseKeys } from '@/constants/local-storage-keys'

const formSchema = z.object({
  emirate: z.string({
    required_error: 'Please select a Emirate!',
  }),
  location: z.string({
    required_error: 'Please select a Location!',
  }),
  building_name: z.string({
    required_error: "Please enter your Building name!"
  }),
  floor: z.string({
    required_error: "Please enter your floor"
  }),
  street: z.string({
    required_error: "Please enter Street number"
  }),
  unit_number: z.string({
    required_error: "Please enter Unit number"
  }),
  landmark: z.string({
    required_error: "Please enter a landmark"
  }),
})

interface Props {
  onSave: (step: string, values: any) => void
}

const LocationDetailsForm = ({ onSave }: Props) => {

  const router = useRouter();

  const storedValue = localStorage.getItem(AdvertiseKeys.LOCATION_DETAILS);

  const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(AdvertiseKeys.LOCATION_DETAILS, values)
    router.push(advertiseSteps.AMENITIES_DETAILS)
  }

  const Emirates = Object.keys(emiratesWithLocations)
  const selectedEmirate = form.watch("emirate")

  // @ts-ignore
  const locations = selectedEmirate ? emiratesWithLocations[selectedEmirate] : []

  // @ts-ignore
  const basicDetails = JSON.parse(localStorage.getItem(AdvertiseKeys.BASIC_DETAILS))

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 p-4"
      >

        <FormField
          name={"emirate"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emirate</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Please select a Emirate' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Emirates.map((option, i) => (
                    <SelectItem key={i} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <SelectElement name='location' label='Location' options={locations} placeholder={!selectedEmirate ? "Please select emirate first" : "Please select a location"} disabled={!selectedEmirate} />

        <InputElement name="building_name" placeholder='Please enter your building name' label={'Building / Cluster Name'} />
        <InputElement name="floor" placeholder='Please enter your floor' label={'Floor'} />
        <InputElement name="street" placeholder='Please enter your street name' label={'Street'} />
        <InputElement name="unit_number" placeholder='Please enter your unit number' label={'Unit Number'} />
        <InputElement name="landmark" placeholder='Please enter a landmark' label={'Landmark'} />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
        <Button type='button' variant="outline" onClick={() => router.push(`${advertiseSteps.PROPERTY_DETAILS}?categoryType=${basicDetails.category}`)} className="w-full">
          Go Back
        </Button>
      </form>
    </Form>
  )
}

export default LocationDetailsForm
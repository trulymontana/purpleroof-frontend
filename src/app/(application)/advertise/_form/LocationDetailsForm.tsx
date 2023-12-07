'use client'
import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import { EmiratesWithLocations } from '@/constants/advertise'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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

const LocationDetailsForm = ({ onSave }: { onSave: (step: number, values: any) => void }) => {

  const [emirate, setEmirate] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const handleEmirateChange = (value: string) => {
    setEmirate(value)
    form?.setValue("emirate", value)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ personalForm: values })
    onSave(3, values)
  }


  let locations: string[] = []

  if (emirate) {
    const data = EmiratesWithLocations.find((item) => item.emirate === emirate);
    if (data?.locations) {
      locations = data?.locations
    }
  }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-96 space-y-4 p-4 shadow-md"
      >

        <FormField
          name={"emirate"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emirate</FormLabel>
              <Select onValueChange={handleEmirateChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EmiratesWithLocations.map((option, i) => (
                    <SelectItem key={i} value={option.emirate}>
                      {option.emirate}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* <FormDescription>{description}</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name={"location"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select disabled={!form.getValues().emirate} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={!form.getValues().emirate ? "Please select emirate first" : "Please select a location"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent >
                  {locations && locations.map((option, i) => (
                    <SelectItem key={i} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* <FormDescription>{description}</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <InputElement name="building_name" label={'Building / Cluster Name'} />
        <InputElement name="floor" label={'Floor'} />
        <InputElement name="street" label={'Street'} />
        <InputElement name="unit_number" label={'Unit Number'} />
        <InputElement name="landmark" label={'Landmark'} />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
      </form>
    </Form>
  )
}

export default LocationDetailsForm
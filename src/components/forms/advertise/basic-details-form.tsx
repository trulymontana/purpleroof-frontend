'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import SelectElement from '@/components/forms/elements/select-element'
import { categories, commercialTypes, residentalTypes, typesOfProperties } from '@/constants/advertise'
import RadioGroupElement from '@/components/forms/elements/radio-group-element'
import TabRadioGroup from '@/components/forms/elements/tab-radio-group'
import { useRouter } from 'next/navigation'
import { PageRoutes } from '@/constants/page-routes'
import { PropertyTypeEnum, PropertyForEnum } from '@/constants/enums'

const formSchema = z.object({
  propertyFor: z
    .nativeEnum(PropertyForEnum, {
      required_error: 'Please select a category'
    }),
  propertyType: z.nativeEnum(PropertyTypeEnum, {
    required_error: 'Please select a property type!'
  }),
  propertyCategory: z.string({
    required_error: 'Please select a property option'
  })
})

interface Props {
  onSave: (step: string, values: any) => void
}

const BasicDetailsForm = ({ onSave }: Props) => {
  const router = useRouter()

  const storedValue = localStorage.getItem(PageRoutes.advertise.BASIC_DETAILS)
  const defaultValues: z.infer<typeof formSchema> =
    storedValue !== null
      ? JSON.parse(storedValue)
      : {
        propertyFor: PropertyForEnum.SALE,
        propertyType: PropertyTypeEnum.RESIDENTIAL
      }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(PageRoutes.advertise.BASIC_DETAILS, values)
    router.push(`${PageRoutes.advertise.PROPERTY_DETAILS}?categoryType=${form.getValues('propertyFor')}`)
  }

  const propertyType = form.watch('propertyType')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <TabRadioGroup name="propertyFor" options={categories} />

        <RadioGroupElement
          name="propertyType"
          label={'Type of Property'}
          className="items-center gap-10"
          options={typesOfProperties}
        />

        <SelectElement
          name="propertyCategory"
          label={propertyType === PropertyTypeEnum.RESIDENTIAL ? 'Residential' : 'Commercial'}
          options={propertyType === PropertyTypeEnum.RESIDENTIAL ? residentalTypes : commercialTypes}
        />

        <Button variant={'default'} type="submit" className="w-full">
          Save and Continue
        </Button>
      </form>
    </Form>
  )
}

export default BasicDetailsForm

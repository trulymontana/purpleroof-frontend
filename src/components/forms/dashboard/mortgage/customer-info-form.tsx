'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '../../elements/input-element'
import SelectElement from '../../elements/select-element'
import { educationOptions, maritalStatusOptions, relationshipOptions } from '@/constants/mortgage'
import PhoneNumberInputElement from '../../elements/phone-number-input'
import { BackButton } from '@/components/navigation/back-button'
import { PageRoutes } from '@/constants/page-routes'
import NumberInputElement from '@/components/forms/elements/number-input-element'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import { useRouter } from 'next/navigation'
import { Mortgage } from '@/data/clients/mortgageClient'
import { useEffect } from 'react'
import { EducationEnum, MaritalStatusEnum, RelationshipEnum } from '@/constants/enums'

const formSchema = z.object({
  firstName: z.string({
    required_error: 'Please enter your first name'
  }),
  lastName: z.string({
    required_error: 'Please enter your last name'
  }),
  email: z.string({
    required_error: 'Please enter your email'
  }),
  phoneNumber: z
    .string({
      required_error: 'Please enter a valid phone number.'
    })
    .min(10, {
      message: 'Phone number must be at least 10 characters.'
    }),
  educationType: z.nativeEnum(EducationEnum, {
    required_error: 'Please select your education qualification'
  }),
  maritalStatus: z.nativeEnum(MaritalStatusEnum, {
    required_error: 'Please select your marital status'
  }),
  favoriteCity: z.string({
    required_error: 'Please enter your favorite city'
  }),
  familyMembersInUae: z.number({
    required_error: 'Please enter your number of family member in UAE'
  }),
  yearsInUae: z.number({
    required_error: 'Please enter your number years in UAE'
  }),
  annualRentalIncome: z.number({
    required_error: 'Please enter your annual rental income'
  }),
  uaeResidenceAddress: z.string({
    required_error: 'Please enter your UAE residence address'
  }).optional(),
  homeCountryAddress: z.string({
    required_error: 'Please enter your home country address'
  }),
  references: z.array(
    z.object({
      title: z.string({
        required_error: 'Title not found!'
      }),
      name: z.string({
        required_error: 'This field is required!'
      }),
      phone: z.string({
        required_error: 'This field is required!'
      }),
      relationship: z.nativeEnum(RelationshipEnum, {
        required_error: 'This field is required!'
      })
    })
  )
})

interface Props {
  mortgageId: number
  onSave: (step: string, values: any) => void
  data?: Mortgage
}

const CustomerInfoForm = ({ mortgageId, onSave, data }: Props) => {
  const router = useRouter()

  const storedValue = localStorage.getItem(`${LocalStorageKeys.MORTGAGE_CUSTOMER_INFO}-${mortgageId}`)
  const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  useEffect(() => {
    if (data) {
      form.setValue('firstName', data?.firstName)
      form.setValue('lastName', data?.lastName)
      form.setValue('email', data?.email)
      form.setValue('phoneNumber', data?.phoneNumber)
    }
  }, [data])

  useEffect(() => {
    // @ts-ignore
    form.setValue('references[0].title', 'homeCountryReference1')
    // @ts-ignore
    form.setValue('references[1].title', 'homeCountryReference2')
    // @ts-ignore
    form.setValue('references[2].title', 'uaeReference1')
    // @ts-ignore
    form.setValue('references[3].title', 'uaeReference2')
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(`${LocalStorageKeys.MORTGAGE_CUSTOMER_INFO}-${mortgageId}`, values)
    router.push(PageRoutes.dashboard.COMPLETE_MORTGAGE_APPLICATION(mortgageId, LocalStorageKeys.MORTGAGE_DOCUMENTS))
  }

  return (
    <Form {...form}>
      <h1 className="text-4xl font-bold text-black/80">Customer Info</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="dashboard_form md:flex-row">
          <div className="w-full md:w-1/2">
            <InputElement name="firstName" label="First Name" />
          </div>
          <div className="w-full md:w-1/2">
            <InputElement name="lastName" label="Last Name" />
          </div>
        </div>
        <div className="dashboard_form md:flex-row">
          <div className="w-full md:w-1/2">
            <InputElement name="email" label="Email" />
          </div>
          <div className="w-full md:w-1/2">
            <SelectElement name="maritalStatus" label="Marital Status" options={maritalStatusOptions} />
          </div>
        </div>
        <div className="dashboard_form md:flex-row">
          <div className="w-full md:w-1/2">
            <PhoneNumberInputElement name="phoneNumber" label="Contact No." />
          </div>
          <div className="w-full md:w-1/2">
            <SelectElement name="educationType" label="Education" options={educationOptions} />
          </div>
        </div>
        <div className="dashboard_form md:flex-row">
          <div className="w-full md:w-1/2">
            <InputElement name="favoriteCity" label="Favorite City" />
          </div>
          <div className="w-full md:w-1/2">
            <NumberInputElement name="familyMembersInUae" label="Number of Family Members in UAE" />
          </div>
        </div>

        <div className="dashboard_form md:flex-row">
          <div className="w-full md:w-1/2">
            <NumberInputElement name="yearsInUae" label="Years in UAE" />
          </div>
          <div className="w-full md:w-1/2">
            <NumberInputElement name="annualRentalIncome" label="Annual Rental Income (AED)" />
          </div>
        </div>
        <div className="dashboard_form md:flex-row">
          <div className="w-full md:w-1/2">
            <InputElement name="uaeResidenceAddress" label="UAE Residence Address" />
          </div>
          <div className="w-full md:w-1/2">
            <InputElement name="homeCountryAddress" label="Home Country Address" />
          </div>
        </div>

        <h2 className="pt-5 text-xl font-bold">HOME COUNTRY REFERENCES</h2>

        <div className="dashboard_form md:flex-row">
          <div className="w-full md:w-1/2">
            <InputElement name="references[0].name" label="Name" />
          </div>
          <div className="w-full md:w-1/2">
            <SelectElement name="references[0].relationship" label="Relationship" options={relationshipOptions} />
          </div>
        </div>

        <PhoneNumberInputElement name="references[0].phone" label="Mobile" />

        <div className="mx-auto h-[3px] w-1/2 rounded-full bg-black/20" />

        <div className="dashboard_form md:flex-row">
          <div className="w-full md:w-1/2">
            <InputElement name="references[1].name" label="Name" />
          </div>
          <div className="w-full md:w-1/2">
            <SelectElement name="references[1].relationship" label="Relationship" options={relationshipOptions} />
          </div>
        </div>

        <PhoneNumberInputElement name="references[1].phone" label="Mobile" />

        <h2 className="pt-5 text-xl font-bold">PERSONAL REFERENCES IN UAE</h2>

        <div className="dashboard_form md:flex-row">
          <div className="w-full md:w-1/2">
            <InputElement name="references[2].name" label="Name" />
          </div>
          <div className="w-full md:w-1/2">
            <SelectElement name="references[2].relationship" label="Relationship" options={relationshipOptions} />
          </div>
        </div>

        <PhoneNumberInputElement name="references[2].phone" label="Mobile" />

        <div className="mx-auto h-[3px] w-1/2 rounded-full bg-black/20" />

        <div className="dashboard_form md:flex-row">
          <div className="w-full md:w-1/2">
            <InputElement name="references[3].name" label="Name" />
          </div>
          <div className="w-full md:w-1/2">
            <SelectElement name="references[3].relationship" label="Relationship" options={relationshipOptions} />
          </div>
        </div>

        <PhoneNumberInputElement name="references[3].phone" label="Mobile" />

        <Button type="submit" className="w-full">
          Next
        </Button>
        <BackButton
          route={PageRoutes.dashboard.COMPLETE_MORTGAGE_APPLICATION(
            mortgageId,
            LocalStorageKeys.MORTGAGE_TRANSACTION_INFO
          )}
        />
      </form>
    </Form>
  )
}

export default CustomerInfoForm

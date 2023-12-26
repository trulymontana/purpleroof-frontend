'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '../../../../components/forms/elements/input-element'
import SelectElement from '../../../../components/forms/elements/select-element'
import { educationOptions, maritalStatusOptions, relationshipOptions } from '@/constants/mortgage'
import PhoneNumberInputElement from '../../../../components/forms/elements/phone-number-input'
import { BackButton } from '@/components/navigation/back-button'
import { PageRoutes } from '@/constants/page-routes'
import NumberInputElement from '@/components/forms/elements/number-input-element'
import { LocalStorageKeys } from '@/constants/local-storage-keys'

const formSchema = z.object({
  name: z.string({
    required_error: 'Please enter your name'
  }),
  email: z.string({
    required_error: 'Please enter your email'
  }),
  contact: z
    .string({
      required_error: 'Please enter a valid phone number.'
    })
    .min(10, {
      message: 'Phone number must be at least 10 characters.'
    }),
  education: z.string({
    required_error: 'Please select your education qualification'
  }),
  marital_status: z.string({
    required_error: 'Please select your marital status'
  }),
  favorite_city: z.string({
    required_error: 'Please enter your favorite city'
  }),
  number_of_family_member_in_uae: z.string({
    required_error: 'Please enter your number of family member in UAE'
  }),
  years_in_uae: z.string({
    required_error: 'Please enter your number years in UAE'
  }),
  annual_rental_income: z.string({
    required_error: 'Please enter your annual rental income'
  }),
  uae_residence_address: z.string({
    required_error: 'Please enter your UAE residence address'
  }),
  home_country_address: z.string({
    required_error: 'Please enter your home country address'
  }),
  home_country_reference_1: z.object({
    name: z.string({
      required_error: 'Please enter name'
    }),
    relationship: z.string({
      required_error: 'Please enter relationship'
    }),
    mobile: z
      .string({
        required_error: 'Please enter mobile number'
      })
      .min(10, {
        message: 'Phone number must be at least 10 characters.'
      })
  }),
  home_country_reference_2: z.object({
    name: z.string({
      required_error: 'Please enter name'
    }),
    relationship: z.string({
      required_error: 'Please enter relationship'
    }),
    mobile: z
      .string({
        required_error: 'Please enter mobile number'
      })
      .min(10, {
        message: 'Phone number must be at least 10 characters.'
      })
  }),
  uae_reference_1: z.object({
    name: z.string({
      required_error: 'Please enter name'
    }),
    relationship: z.string({
      required_error: 'Please enter relationship'
    }),
    mobile: z
      .string({
        required_error: 'Please enter mobile number'
      })
      .min(10, {
        message: 'Phone number must be at least 10 characters.'
      })
  }),
  uae_reference_2: z.object({
    name: z.string({
      required_error: 'Please enter name'
    }),
    relationship: z.string({
      required_error: 'Please enter relationship'
    }),
    mobile: z
      .string({
        required_error: 'Please enter mobile number'
      })
      .min(10, {
        message: 'Phone number must be at least 10 characters.'
      })
  })
})

interface Props {
  mortgageId: string
  onSave: (step: string, values: any) => void
}

const CustomerInfoForm = ({ mortgageId, onSave }: Props) => {


  const storedValue = localStorage.getItem(LocalStorageKeys.MORTGAGE_CUSTOMER_INFO)
  const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(LocalStorageKeys.MORTGAGE_CUSTOMER_INFO, values)
  }

  return (
    <Form {...form}>
      <h1 className='text-4xl font-bold text-black/80'>Customer Info</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='flex items-center gap-2 w-full'>
          <div className='w-1/2'>
            <InputElement name='name' label='Name' />
          </div>
          <div className='w-1/2'>
            <InputElement name='email' label='Email' />
          </div>
        </div>
        <div className='flex items-center gap-2 w-full'>
          <div className='w-1/2'>
            <SelectElement name='marital_status' label='Marital Status' options={maritalStatusOptions} />
          </div>
          <div className='w-1/2'>
            <SelectElement name='education' label='Education' options={educationOptions} />
          </div>
        </div>
        <PhoneNumberInputElement name='contact' label='Contact No.' />
        <div className='flex items-center gap-2 w-full'>
          <div className='w-1/2'>
            <InputElement name='favorite_city' label='Favorite City' />
          </div>
          <div className='w-1/2'>
            <NumberInputElement name='number_of_family_member_in_uae' label='Number of Family Members in UAE' />
          </div>
        </div>

        <div className='flex items-center gap-2 w-full'>
          <div className='w-1/2'>
            <NumberInputElement name='years_in_uae' label='Years in UAE' />
          </div>
          <div className='w-1/2'>
            <NumberInputElement name='annual_rental_income' label='Annual Rental Income' />
          </div>
        </div>
        <div className='flex items-center gap-2 w-full'>
          <div className='w-1/2'>
            <InputElement name='uae_residence_address' label='UAE Residence Address' />
          </div>
          <div className='w-1/2'>
            <InputElement name='home_country_address' label='Home Country Address' />
          </div>
        </div>


        <h2 className='font-bold text-xl pt-5 '>HOME COUNTRY REFERENCES</h2>

        <div className='flex items-start gap-2 w-full'>
          <div className='w-1/2'>
            <InputElement name='home_country_reference_1.name' label='Name' />
          </div>
          <div className='w-1/2'>
            <SelectElement name='home_country_reference_1.relationship' label='Relationship' options={relationshipOptions} />
          </div>
        </div>

        <PhoneNumberInputElement name='home_country_reference_1.mobile' label='Mobile' />

        <div className='h-[3px] bg-black/20 w-1/2 mx-auto rounded-full' />

        <div className='flex items-start gap-2 w-full'>
          <div className='w-1/2'>
            <InputElement name='home_country_reference_2.name' label='Name' />
          </div>
          <div className='w-1/2'>
            <SelectElement name='home_country_reference_2.relationship' label='Relationship' options={relationshipOptions} />
          </div>
        </div>

        <PhoneNumberInputElement name='home_country_reference_2.mobile' label='Mobile' />

        <h2 className='font-bold text-xl pt-5'>PERSONAL REFERENCES IN UAE</h2>

        <div className='flex items-start gap-2 w-full'>
          <div className='w-1/2'>
            <InputElement name='uae_reference_1.name' label='Name' />
          </div>
          <div className='w-1/2'>
            <SelectElement name='uae_reference_1.relationship' label='Relationship' options={relationshipOptions} />
          </div>
        </div>

        <PhoneNumberInputElement name='uae_reference_1.mobile' label='Mobile' />

        <div className='h-[3px] bg-black/20 w-1/2 mx-auto rounded-full' />

        <div className='flex items-start gap-2 w-full'>
          <div className='w-1/2'>
            <InputElement name='uae_reference_2.name' label='Name' />
          </div>
          <div className='w-1/2'>
            <SelectElement name='uae_reference_2.relationship' label='Relationship' options={relationshipOptions} />
          </div>
        </div>

        <PhoneNumberInputElement name='uae_reference_2.mobile' label='Mobile' />

        <Button type="submit" className='w-full'>Next</Button>
        <BackButton route={`${PageRoutes.dashboard.MORTGAGES}/${mortgageId}/transaction-info`} />
      </form>
    </Form>
  )

}

export default CustomerInfoForm

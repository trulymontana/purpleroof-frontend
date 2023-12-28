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
import { useRouter } from 'next/navigation'
import { Mortgage } from '@/data/clients/mortgageClient'
import { useEffect } from 'react'

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
  maritalStatus: z.string({
    required_error: 'Please select your marital status'
  }),
  favoriteCity: z.string({
    required_error: 'Please enter your favorite city'
  }),
  numberOfFamilyMemberInUae: z.number({
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
  }),
  homeCountryAddress: z.string({
    required_error: 'Please enter your home country address'
  }),
  homeCountryReference1: z.object({
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
  homeCountryReference2: z.object({
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
  uaeReference1: z.object({
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
  uaeReference2: z.object({
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
  mortgageId: number
  onSave: (step: string, values: any) => void
  data?: Mortgage
}

const CustomerInfoForm = ({ mortgageId, onSave, data }: Props) => {

  const router = useRouter();

  const storedValue = localStorage.getItem(LocalStorageKeys.MORTGAGE_CUSTOMER_INFO)
  const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  useEffect(() => {
    if (data) {
      const fields = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email
      }

      form.setValue("firstName", data?.firstName)
      form.setValue("lastName", data?.lastName)
      form.setValue("email", data?.email)
    }
  }, [data])

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(LocalStorageKeys.MORTGAGE_CUSTOMER_INFO, values)
    router.push(PageRoutes.dashboard.COMPLETE_MORTGAGE_APPLICATION(mortgageId, LocalStorageKeys.MORTGAGE_DOCUMENTS))
  }

  return (
    <Form {...form}>
      <h1 className='text-4xl font-bold text-black/80'>Customer Info</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='flex flex-col md:flex-row items-center gap-2 w-full'>
          <div className='w-full md:w-1/2'>
            <InputElement name='firstName' label='First Name' />
          </div>
          <div className='w-full md:w-1/2'>
            <InputElement name='lastName' label='Last Name' />
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center gap-2 w-full'>
          <div className='w-full md:w-1/2'>
            <InputElement name='email' label='Email' />
          </div>
          <div className='w-full md:w-1/2'>
            <SelectElement name='maritalStatus' label='Marital Status' options={maritalStatusOptions} />
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center gap-2 w-full'>
          <div className='w-full md:w-1/2'>
            <PhoneNumberInputElement name='contact' label='Contact No.' />
          </div>
          <div className='w-full md:w-1/2'>
            <SelectElement name='education' label='Education' options={educationOptions} />
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center gap-2 w-full'>
          <div className='w-full md:w-1/2'>
            <InputElement name='favoriteCity' label='Favorite City' />
          </div>
          <div className='w-full md:w-1/2'>
            <NumberInputElement name='numberOfFamilyMemberInUae' label='Number of Family Members in UAE' />
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center gap-2 w-full'>
          <div className='w-full md:w-1/2'>
            <NumberInputElement name='yearsInUae' label='Years in UAE' />
          </div>
          <div className='w-full md:w-1/2'>
            <NumberInputElement name='annualRentalIncome' label='Annual Rental Income' />
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center gap-2 w-full'>
          <div className='w-full md:w-1/2'>
            <InputElement name='uaeResidenceAddress' label='UAE Residence Address' />
          </div>
          <div className='w-full md:w-1/2'>
            <InputElement name='homeCountryAddress' label='Home Country Address' />
          </div>
        </div>


        <h2 className='font-bold text-xl pt-5'>HOME COUNTRY REFERENCES</h2>

        <div className='flex flex-col md:flex-row items-start gap-2 w-full'>
          <div className='w-full md:w-1/2'>
            <InputElement name='homeCountryReference1.name' label='Name' />
          </div>
          <div className='w-full md:w-1/2'>
            <SelectElement name='homeCountryReference1.relationship' label='Relationship' options={relationshipOptions} />
          </div>
        </div>

        <PhoneNumberInputElement name='homeCountryReference1.mobile' label='Mobile' />

        <div className='h-[3px] bg-black/20 w-1/2 mx-auto rounded-full' />

        <div className='flex flex-col md:flex-row items-start gap-2 w-full'>
          <div className='w-full md:w-1/2'>
            <InputElement name='homeCountryReference2.name' label='Name' />
          </div>
          <div className='w-full md:w-1/2'>
            <SelectElement name='homeCountryReference2.relationship' label='Relationship' options={relationshipOptions} />
          </div>
        </div>

        <PhoneNumberInputElement name='homeCountryReference2.mobile' label='Mobile' />

        <h2 className='font-bold text-xl pt-5'>PERSONAL REFERENCES IN UAE</h2>

        <div className='flex flex-col md:flex-row items-start gap-2 w-full'>
          <div className='w-full md:w-1/2'>
            <InputElement name='uaeReference1.name' label='Name' />
          </div>
          <div className='w-full md:w-1/2'>
            <SelectElement name='uaeReference1.relationship' label='Relationship' options={relationshipOptions} />
          </div>
        </div>

        <PhoneNumberInputElement name='uaeReference1.mobile' label='Mobile' />

        <div className='h-[3px] bg-black/20 w-1/2 mx-auto rounded-full' />

        <div className='flex flex-col md:flex-row items-start gap-2 w-full'>
          <div className='w-full md:w-1/2'>
            <InputElement name='uaeReference2.name' label='Name' />
          </div>
          <div className='w-full md:w-1/2'>
            <SelectElement name='uaeReference2.relationship' label='Relationship' options={relationshipOptions} />
          </div>
        </div>

        <PhoneNumberInputElement name='uaeReference2.mobile' label='Mobile' />

        <Button type="submit" className='w-full'>Next</Button>
        <BackButton route={PageRoutes.dashboard.COMPLETE_MORTGAGE_APPLICATION(mortgageId, LocalStorageKeys.MORTGAGE_TRANSACTION_INFO)} />
      </form>
    </Form>
  )

}

export default CustomerInfoForm

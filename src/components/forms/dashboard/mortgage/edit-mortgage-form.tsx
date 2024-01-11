'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import * as z from 'zod'
import InputElement from '../../elements/input-element'
import PhoneNumberInputElement from '../../elements/phone-number-input'
import { Mortgage } from '@/data/clients/mortgageClient'
import SelectElement from '../../elements/select-element'
import { residenceTypes } from '@/constants/requirements'
import { completionStatus, educationOptions, emirate, incomeProfiles, maritalStatusOptions, propertyType } from '@/constants/mortgage'
import ComboboxElement from '../../elements/combobox-element'
import DatePickerElement from '../../elements/date-picker-element'
import NumberInputElement from '../../elements/number-input-element'
import { countries } from '@/constants/countries'
import { EducationEnum, MaritalStatusEnum } from '@/constants/enums'

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: 'First Name must be at least 2 characters.'
    }),
    lastName: z.string().min(2, {
        message: 'Last Name must be at least 2 characters.'
    }),
    email: z
        .string({
            required_error: 'Please enter a valid email.'
        })
        .email(),
    phoneNumber: z
        .string({
            required_error: 'Please enter a valid phone number.'
        })
        .min(10, {
            message: 'Phone number must be at least 10 characters.'
        }),
    residenceType: z.string({
        required_error: 'Please select a residential status.'
    }),
    incomeProfile: z.string({
        required_error: 'Please select an income profile.'
    }),
    country: z.string({
        required_error: 'Please select your country'
    }),
    dateOfBirth: z.date({
        required_error: 'Please enter your DOB'
    }),
    valueOfProperty: z.number({
        required_error: 'Please enter value of your property'
    }),
    monthlyIncome: z.number({
        required_error: 'Please enter your montly income'
    }),
    loanType: z.string({
        required_error: 'Please select a loan type'
    }),
    propertyType: z.string({
        required_error: 'Please select a property type.'
    }),
    completionStatus: z.string({
        required_error: 'Please select completion status.'
    }),
    emirate: z.string({
        required_error: 'Please select a emirate.'
    }),
    additionalDetail: z.string().optional(),
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
})

interface Props {
    data: Mortgage
}

const EditMortgageForm = ({ data }: Props) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log({ values })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full px-2 max-w-[90rem] mx-auto space-y-6 py-4">
                <div className="dashboard_form md:flex-row">
                    <div className="w-full md:w-1/2">
                        <InputElement name="firstName" label="First Name" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <InputElement name="lastName" label="Last Name" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <InputElement name="email" label="Email" />
                    </div>
                </div>
                <div className="dashboard_form md:flex-row">
                    <div className="w-full md:w-1/2">
                        <PhoneNumberInputElement name="phoneNumber" label="Phone Number" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <NumberInputElement name="valueOfProperty" label={'Approximate value of the intended property (AED)'} />
                    </div>
                    <div className="w-full md:w-1/2">
                        <SelectElement name="incomeProfile" label="Income Profile" options={incomeProfiles} />
                    </div>
                </div>
                <div className="dashboard_form md:flex-row">
                    <div className="w-full md:w-1/2">
                        <ComboboxElement name="country" label={'Country'} placeholder={'Select your country'} options={countries} />
                    </div>
                    <div className="w-full md:w-1/2">
                        <SelectElement name="residenceType" label="Residence Type" options={residenceTypes} />
                    </div>
                    <div className="w-full md:w-1/2">
                        <DatePickerElement custom name="dateOfBirth" label="Date of Birth" />
                    </div>
                </div>
                <div className="dashboard_form md:flex-row">
                    <div className="w-full md:w-1/2">
                        <SelectElement name="propertyType" label="Property Type" options={propertyType} />
                    </div>
                    <div className="w-full md:w-1/2">
                        <SelectElement name="completionStatus" label="Completion Status" options={completionStatus} />

                    </div>
                    <div className="w-full md:w-1/2">
                        <SelectElement name="emirate" label="Emirate" options={emirate} />
                    </div>
                </div>
                <InputElement name="additionalDetail" label="Additional Details" />
                <div className="dashboard_form md:flex-row">
                    <div className="w-full md:w-1/2">
                        <SelectElement name="maritalStatus" label="Marital Status" options={maritalStatusOptions} />
                    </div>
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
                    <div className="w-full md:w-1/2">
                        <InputElement name="uaeResidenceAddress" label="UAE Residence Address" />
                    </div>
                </div>
                <InputElement name="homeCountryAddress" label="Home Country Address" />
            </form>
        </Form>
    )
}

export default EditMortgageForm
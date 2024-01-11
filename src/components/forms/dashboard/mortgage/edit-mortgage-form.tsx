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
import { completionStatus, educationOptions, emirate, incomeProfiles, loanTypeOptions, maritalStatusOptions, propertyType } from '@/constants/mortgage'
import ComboboxElement from '../../elements/combobox-element'
import DatePickerElement from '../../elements/date-picker-element'
import NumberInputElement from '../../elements/number-input-element'
import { countries } from '@/constants/countries'
import { EducationEnum, MaritalStatusEnum } from '@/constants/enums'
import { Button } from '@/components/ui/button'

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
    valueOfProperty: z.number({
        required_error: 'Please enter value of your property'
    }),
    incomeProfile: z.string({
        required_error: 'Please select an income profile.'
    }),
    country: z.string({
        required_error: 'Please select your country'
    }),
    residenceType: z.string({
        required_error: 'Please select a residential status.'
    }),
    dateOfBirth: z.date({
        required_error: 'Please enter your DOB'
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
    additionalDetail: z.string().optional(),
    loanType: z.string({
        required_error: 'Please select a loan type'
    }),
    monthlyIncome: z.number({
        required_error: 'Please enter your montly income'
    }),
    educationType: z.nativeEnum(EducationEnum, {
        required_error: 'Please select your education qualification'
    }),
})

interface Props {
    data: Mortgage
}

const EditMortgageForm = ({ data }: Props) => {

    const { dateOfBirth, ...restData } = data;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { dateOfBirth: new Date(dateOfBirth), ...restData }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log({ values })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
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
                <div className="dashboard_form md:flex-row">
                    <div className="w-full md:w-1/2">
                        <InputElement name="homeCountryAddress" label="Home Country Address" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <SelectElement name="educationType" label="Education" options={educationOptions} />
                    </div>
                    <div className="w-full md:w-1/2">
                        <NumberInputElement name="monthlyIncome" label="Monthly Income" />

                    </div>
                </div>

                <SelectElement name="loanType" label={'Loan Type'} options={loanTypeOptions} />

                <InputElement name="additionalDetail" label="Additional Detail" />

                <Button type='submit' className='w-full'>Save Changes</Button>
            </form>
        </Form>
    )
}

export default EditMortgageForm
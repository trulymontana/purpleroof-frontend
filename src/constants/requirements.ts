import { IncomeProfileEnum, ResidenceTypeEnum } from './enums'

export const incomeProfiles = [
  {
    label: 'Rental Income',
    value: IncomeProfileEnum.RENTAL_INCOME
  },
  {
    label: 'Salaried',
    value: IncomeProfileEnum.SALARIED
  },
  {
    label: 'Self Employed',
    value: IncomeProfileEnum.SELF_EMPLOYED
  }
]

export const residenceTypes = [
  {
    label: 'UAE National',
    value: ResidenceTypeEnum.UAE_NATIONAL
  },
  {
    label: 'UAE Resident',
    value: ResidenceTypeEnum.UAE_RESIDENT
  },
  {
    label: 'Non-UAE Resident',
    value: ResidenceTypeEnum.NON_UAE_RESIDENT
  }
]

export const documentTypeOptions = [
  { label: 'Passport Copy', value: 'PASSPORT_COPY' },
  { label: 'Visa Copy', value: 'VISA_COPY' },
  { label: 'Emirates ID', value: 'EMIRATES_ID' },
  { label: 'Personal Bank Statement (For the past 6 months)', value: 'BANK_STATEMENT_6_MONTHS' },
  {
    label: 'Personal Bank Statement (For the past year. Rental cheques must be clear)',
    value: 'BANK_STATEMENT_1_YEAR'
  },
  { label: 'Salary Certificate', value: 'SALARY_CERTIFICATE' },
  { label: 'Company Trade License', value: 'TRADE_LICENSE' },
  { label: 'Memorandum with all Amendments', value: 'MEMORANDUM_WITH_AMENDMENTS' },
  {
    label: 'VAT Certificate, VAT Return, VAT Payment Receipts (For the past 4 quarters)',
    value: 'VAT_CERTIFICATE_RETURN_RECEIPTS'
  },
  { label: 'Office Tenancy Contract and Utility Bill Copy', value: 'OFFICE_TENANCY_CONTRACT_UTILITY_BILL' },
  { label: 'Company Profile of Website', value: 'COMPANY_PROFILE_WEBSITE' },
  { label: 'Title Deed Copy', value: 'TITLE_DEED_COPY' },
  { label: 'Tenancy Contract Copy', value: 'TENANCY_CONTRACT_COPY' },
  { label: 'Rental Cheque Copy', value: 'RENTAL_CHEQUE_COPY' },
  {
    label:
      'Personal Bank Statement (For the past 3 months, where you save an equivalent of AED 25,000 from home country or country of residence)',
    value: 'BANK_STATEMENT_3_MONTHS_EQUIVALENT_AED_25000'
  },
  { label: 'Proof of Residence', value: 'PROOF_OF_RESIDENCE' },
  { label: 'Proof of Income (Salary Certificate or Company Registration Form)', value: 'PROOF_OF_INCOME' },
  { label: 'Company Bank Statement (For the past 6 months)', value: 'COMPANY_BANK_STATEMENT_6_MONTHS' },
  { label: 'Ownership Proof of Mobile Number', value: 'OWNERSHIP_PROOF_MOBILE_NUMBER' }
]

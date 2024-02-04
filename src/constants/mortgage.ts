import {
  CompletionStatusEnum,
  EducationEnum,
  EmirateEnum,
  FinanceTypeEnum,
  IncomeProfileEnum,
  LoanTypeEnum,
  MaritalStatusEnum,
  MortgageStatusEnum,
  PropertyTypeEnum,
  RelationshipEnum,
  ResidenceTypeEnum
} from './enums'

export const mortgageSubmissionStatuses = [
  {
    label: 'Submitted',
    value: MortgageStatusEnum.SUBMITTED
  },
  {
    label: 'Under Documentation Stage',
    value: MortgageStatusEnum.UNDER_DOCUMENTATION_STAGE
  },
  {
    label: 'Submitted to Bank',
    value: MortgageStatusEnum.SUBMITTED_TO_BANK
  },
  {
    label: 'Approved',
    value: MortgageStatusEnum.APPROVED
  },
  {
    label: 'Valuation Stage',
    value: MortgageStatusEnum.VALUATION_STAGE
  },
  {
    label: 'Final Offer Letter',
    value: MortgageStatusEnum.FINAL_OFFER_LETTER
  },
  {
    label: 'Case Disbursed',
    value: MortgageStatusEnum.CASE_DISBURSED
  },
  {
    label: 'Property Transfer',
    value: MortgageStatusEnum.PROPERTY_TRANSFER
  },
  {
    label: 'Transaction Completed',
    value: MortgageStatusEnum.TRANSACTION_COMPLETED
  },
  {
    label: 'Case Closed',
    value: MortgageStatusEnum.CASE_CLOSED
  },
  {
    label: 'Case Declined',
    value: MortgageStatusEnum.CASE_DECLINED
  }
]

export const residentialTypes = [
  {
    label: 'Non Resident of UAE',
    value: ResidenceTypeEnum.NON_UAE_RESIDENT
  },
  {
    label: 'UAE National',
    value: ResidenceTypeEnum.UAE_NATIONAL
  },
  {
    label: 'UAE Resident',
    value: ResidenceTypeEnum.UAE_RESIDENT
  }
]

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

export const propertyType = [
  {
    label: 'Apartment / Townhouse / Villa',
    value: PropertyTypeEnum.COMMERCIAL
  },
  {
    label: 'Residential Land',
    value: PropertyTypeEnum.RESIDENTIAL
  }
]

export const completionStatus = [
  {
    label: 'Completed',
    value: CompletionStatusEnum.COMPLETED
  },
  {
    label: 'Off plan/Under construction',
    value: CompletionStatusEnum.UNDER_CONSTRUCTION
  }
]

export const emirate = [
  {
    label: 'Abu Dhabi',
    value: EmirateEnum.ABU_DHABI
  },
  {
    label: 'Ajman',
    value: EmirateEnum.AJMAN
  },
  {
    label: 'Dubai',
    value: EmirateEnum.DUBAI
  },
  {
    label: 'Fujairah',
    value: EmirateEnum.FUJAIRAH
  },
  {
    label: 'Ras Al Khaimah',
    value: EmirateEnum.RAS_AL_KHAIMAH
  },
  {
    label: 'Sharjah',
    value: EmirateEnum.SHARJAH
  },
  {
    label: 'Umm al Quwain',
    value: EmirateEnum.UMM_AL_QUWAIN
  }
]

export const financeTypes = [
  {
    label: 'Islamic Financing',
    value: FinanceTypeEnum.ISLAMIC
  },
  {
    label: 'Conventional Financing',
    value: FinanceTypeEnum.CONVENTIONAL
  }
]

export const loanTypeOptions = [
  { label: 'I want to Buy Property from a Seller', value: LoanTypeEnum.BUY_PROPERTY_FROM_SELLER },
  { label: 'I want to Buy Property from a Developer', value: LoanTypeEnum.BUY_PROPERTY_FROM_DEVELOPER },
  { label: 'I want to move Property Loan from One Bank to another Bank', value: LoanTypeEnum.SHIFT_PROPERTY_LOAN },
  {
    label: 'I want to get Cash (Property Loan) against existing property',
    value: LoanTypeEnum.GET_CASH_AGAINST_EXISTING_PROPERTY
  }
]

export const educationOptions = [
  {
    label: 'Elementary School',
    value: EducationEnum.ELEMENTARY_SCHOOL
  },
  {
    label: 'Middle School',
    value: EducationEnum.MIDDLE_SCHOOL
  },
  {
    label: 'High School',
    value: EducationEnum.HIGH_SCHOOL
  },
  {
    label: 'College / University',
    value: EducationEnum.COLLEGE
  },
  {
    label: 'Vocational / Technical School',
    value: EducationEnum.VOCATIONAL_SCHOOL
  },
  {
    label: 'Graduate School / Postgraduate Studies',
    value: EducationEnum.GRADUATE_SCHOOL
  },
  {
    label: 'Online Courses / E-Learning',
    value: EducationEnum.ONLINE_COURSES
  },
  {
    label: 'Continuing Education / Professional Development',
    value: EducationEnum.PROFESSIONAL_DEVELOPMENT
  },
  {
    label: 'Homeschooling',
    value: EducationEnum.HOMESCHOOLING
  },
  {
    label: 'Adult Education / Lifelong Learning',
    value: EducationEnum.LIFELONG_LEARNING
  },
  {
    label: 'Specialized Training Programs',
    value: EducationEnum.SPECIALIZED_TRAINING_PROGRAMS
  },
  {
    label: 'Language Courses / ESL',
    value: EducationEnum.LANGUAGE_COURSES
  },
  {
    label: 'Certificate Programs',
    value: EducationEnum.CERTIFICATE_PROGRAMS
  },
  {
    label: 'Trade Schools / Apprenticeships',
    value: EducationEnum.TRADE_SCHOOLS
  }
]

export const maritalStatusOptions = [
  {
    label: 'Single',
    value: MaritalStatusEnum.SINGLE
  },
  {
    label: 'Married',
    value: MaritalStatusEnum.MARRIED
  },
  {
    label: 'Widowed',
    value: MaritalStatusEnum.WIDOWED
  },
  {
    label: 'Separated',
    value: MaritalStatusEnum.SEPARATED
  }
]

export const relationshipOptions = [
  {
    label: 'Parent',
    value: RelationshipEnum.PARENT
  },
  {
    label: 'Sibling',
    value: RelationshipEnum.SIBLING
  },
  {
    label: 'Grandparent',
    value: RelationshipEnum.GRANDPARENT
  },
  {
    label: 'Child',
    value: RelationshipEnum.CHILD
  },
  {
    label: 'Spouse',
    value: RelationshipEnum.SPOUSE
  },
  {
    label: 'Cousin',
    value: RelationshipEnum.COUSIN
  },
  {
    label: 'Aunt',
    value: RelationshipEnum.AUNT
  },
  {
    label: 'Uncle',
    value: RelationshipEnum.UNCLE
  },
  {
    label: 'Niece',
    value: RelationshipEnum.NIECE
  },
  {
    label: 'Nephew',
    value: RelationshipEnum.NEPHEW
  },
  {
    label: 'In-Law',
    value: RelationshipEnum.IN_LAW
  },
  {
    label: 'Guardian',
    value: RelationshipEnum.GUARDIAN
  },
  {
    label: 'Foster Parent',
    value: RelationshipEnum.FOSTER_PARENT
  },
  {
    label: 'Step-Parent',
    value: RelationshipEnum.STEP_PARENT
  },
  {
    label: 'Step-Sibling',
    value: RelationshipEnum.STEP_SIBLING
  }
]

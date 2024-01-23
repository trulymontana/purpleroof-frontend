export enum PropertyForEnum {
  SALE = 'SALE',
  RENT = 'RENT'
}

export enum IncomeProfileEnum {
  SALARIED = 'SALARIED',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
  RENTAL_INCOME = 'RENTAL_INCOME'
}

export enum ResidenceTypeEnum {
  UAE_NATIONAL = 'UAE_NATIONAL',
  UAE_RESIDENT = 'UAE_RESIDENT',
  NON_UAE_RESIDENT = 'NON_UAE_RESIDENT'
}

export enum MortgageStatusEnum {
  SUBMITTED = 'SUBMITTED',
  UNDER_DOCUMENTATION_STAGE = 'UNDER_DOCUMENTATION_STAGE',
  SUBMITTED_TO_BANK = 'SUBMITTED_TO_BANK',
  APPROVED = 'APPROVED',
  VALUATION_STAGE = 'VALUATION_STAGE',
  FINAL_OFFER_LETTER = 'FINAL_OFFER_LETTER',
  CASE_DISBURSED = 'CASE_DISBURSED',
  PROPERTY_TRANSFER = 'PROPERTY_TRANSFER',
  TRANSACTION_COMPLETED = 'TRANSACTION_COMPLETED',
  CASE_CLOSED = 'CASE_CLOSED',
  CASE_DECLINED = 'CASE_DECLINED'
}

export enum PropertySubmissionStatusEnum {
  SUBMITTED = 'SUBMITTED',
  UNDER_VERIFICATION = 'UNDER_VERIFICATION',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum LoanTypeEnum {
  BUY_PROPERTY_FROM_SELLER = 'BUY_PROPERTY_FROM_SELLER',
  BUY_PROPERTY_FROM_DEVELOPER = 'BUY_PROPERTY_FROM_DEVELOPER',
  SHIFT_PROPERTY_LOAN = 'SHIFT_PROPERTY_LOAN',
  GET_CASH_AGAINST_EXISTING_PROPERTY = 'GET_CASH_AGAINST_EXISTING_PROPERTY'
}

export enum PropertyTypeEnum {
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL'
}

export enum CompletionStatusEnum {
  COMPLETED = 'COMPLETED',
  UNDER_CONSTRUCTION = 'UNDER_CONSTRUCTION'
}

export enum FinanceTypeEnum {
  ISLAMIC = 'ISLAMIC',
  CONVENTIONAL = 'CONVENTIONAL'
}

export enum EmirateEnum {
  DUBAI = 'DUBAI',
  ABU_DHABI = 'ABU_DHABI',
  RAS_AL_KHAIMAH = 'RAS_AL_KHAIMAH',
  SHARJAH = 'SHARJAH',
  FUJAIRAH = 'FUJAIRAH',
  AJMAN = 'AJMAN',
  UMM_AL_QUWAIN = 'UMM_AL_QUWAIN'
}

export enum HoldingTypeEnum {
  FREE_HOLD = 'FREE_HOLD',
  LEASE_HOLD = 'LEASE_HOLD'
}

export enum EducationEnum {
  ELEMENTARY_SCHOOL = 'ELEMENTARY_SCHOOL',
  MIDDLE_SCHOOL = 'MIDDLE_SCHOOL',
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  COLLEGE = 'COLLEGE',
  VOCATIONAL_SCHOOL = 'VOCATIONAL_SCHOOL',
  GRADUATE_SCHOOL = 'GRADUATE_SCHOOL',
  ONLINE_COURSES = 'ONLINE_COURSES',
  PROFESSIONAL_DEVELOPMENT = 'PROFESSIONAL_DEVELOPMENT',
  HOMESCHOOLING = 'HOMESCHOOLING',
  LIFELONG_LEARNING = 'LIFELONG_LEARNING',
  SPECIALIZED_TRAINING_PROGRAMS = 'SPECIALIZED_TRAINING_PROGRAMS',
  LANGUAGE_COURSES = 'LANGUAGE_COURSES',
  CERTIFICATE_PROGRAMS = 'CERTIFICATE_PROGRAMS',
  TRADE_SCHOOLS = 'TRADE_SCHOOLS'
}

export enum MaritalStatusEnum {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  WIDOWED = 'WIDOWED',
  SEPARATED = 'SEPARATED'
}

export enum RelationshipEnum {
  PARENT = 'PARENT',
  SIBLING = 'SIBLING',
  GRANDPARENT = 'GRANDPARENT',
  CHILD = 'CHILD',
  SPOUSE = 'SPOUSE',
  COUSIN = 'COUSIN',
  AUNT = 'AUNT',
  UNCLE = 'UNCLE',
  NIECE = 'NIECE',
  NEPHEW = 'NEPHEW',
  IN_LAW = 'IN_LAW',
  GUARDIAN = 'GUARDIAN',
  FOSTER_PARENT = 'FOSTER_PARENT',
  STEP_PARENT = 'STEP_PARENT',
  STEP_SIBLING = 'STEP_SIBLING'
}

export enum CommercialPropertyCategoryEnum {
  BULK_UNIT = 'BULK_UNIT',
  COMMERCIAL_BUILDING = 'COMMERCIAL_BUILDING',
  COMMERCIAL_FLOOR = 'COMMERCIAL_FLOOR',
  COMMERCIAL_VILLA = 'COMMERCIAL_VILLA',
  COMMERCIAL_PLOT = 'COMMERCIAL_PLOT',
  FACTORY = 'FACTORY',
  INDUSTRIAL_UNIT_FOR_SALE = 'INDUSTRIAL_UNIT_FOR_SALE',
  INDUSTRIAL_LAND = 'INDUSTRIAL_LAND',
  MIXED_USED_SAND = 'MIXED_USED_SAND',
  OFFICE_FOR_SALE = 'OFFICE_FOR_SALE',
  RETAIL_FOR_SALE = 'RETAIL_FOR_SALE',
  SHOP = 'SHOP',
  STAFF_ACCOMMODATION_FOR_SALE = 'STAFF_ACCOMMODATION_FOR_SALE',
  WAREHOUSE = 'WAREHOUSE',
  SELL_COMMERCIAL_LAND = 'SELL_COMMERCIAL_LAND',
  OTHER = 'OTHER'
}

export enum ResidentialPropertyCategoryEnum {
  APARTMENT = 'APARTMENT',
  TOWNHOUSE = 'TOWNHOUSE',
  VILLA = 'VILLA',
  DUPLEX = 'DUPLEX',
  PENTHOUSE = 'PENTHOUSE',
  RESIDENTIAL_LAND = 'RESIDENTIAL_LAND',
  VILLA_COMPOUND = 'VILLA_COMPOUND',
  RESIDENTIAL_FULL_BUILDING = 'RESIDENTIAL_FULL_BUILDING',
  BULK_UNITS='BULK_UNITS',
  BUNGALOW='BUNGALOW',
}

export enum PaymentIntervalsEnum {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export enum FurnishingStatusEnum {
  FULLY_FURNISHED = 'FULLY_FURNISHED',
  SEMI_FURNISHED = 'SEMI_FURNISHED',
  UNFURNISHED = 'UNFURNISHED'
}

export enum ProjectStatusesEnum {
  COMPLETED = 'COMPLETED',
  OFF_PLAN_UNDER_CONSTRUCTION = 'OFF_PLAN_UNDER_CONSTRUCTION',
  SHELL_AND_CORE = 'SHELL_AND_CORE'
}

export enum PropertyCompletionStatusEnum {
  READY_SECONDARY='READY_SECONDARY',
  OFF_PLAN_SECONDARY='OFF_PLAN_SECONDARY',
  READY_PRIMARY='READY_PRIMARY',
  OFF_PLAN_PRIMARY='OFF_PLAN_PRIMARY',
}

export enum RentedOrVacantEnum {
  VACANT = 'VACANT',
  RENTED = 'RENTED'
}

export enum OccupencyStatusEnum {
  VACANT = 'VACANT',
  OCCUPIED = 'OCCUPIED'
}

export enum DocumentTypeEnum {
  PASSPORT_COPY = 'PASSPORT_COPY',
  VISA_COPY = 'VISA_COPY',
  EMIRATES_ID = 'EMIRATES_ID',
  BANK_STATEMENT_6_MONTHS = 'BANK_STATEMENT_6_MONTHS',
  BANK_STATEMENT_1_YEAR = 'BANK_STATEMENT_1_YEAR',
  SALARY_CERTIFICATE = 'SALARY_CERTIFICATE',
  TRADE_LICENSE = 'TRADE_LICENSE',
  MEMORANDUM_WITH_AMENDMENTS = 'MEMORANDUM_WITH_AMENDMENTS',
  VAT_CERTIFICATE_RETURN_RECEIPTS = 'VAT_CERTIFICATE_RETURN_RECEIPTS',
  OFFICE_TENANCY_CONTRACT_UTILITY_BILL = 'OFFICE_TENANCY_CONTRACT_UTILITY_BILL',
  COMPANY_PROFILE_WEBSITE = 'COMPANY_PROFILE_WEBSITE',
  TITLE_DEED_COPY = 'TITLE_DEED_COPY',
  TENANCY_CONTRACT_COPY = 'TENANCY_CONTRACT_COPY',
  RENTAL_CHEQUE_COPY = 'RENTAL_CHEQUE_COPY',
  BANK_STATEMENT_3_MONTHS_EQUIVALENT_AED_25000 = 'BANK_STATEMENT_3_MONTHS_EQUIVALENT_AED_25000',
  PROOF_OF_RESIDENCE = 'PROOF_OF_RESIDENCE',
  PROOF_OF_INCOME = 'PROOF_OF_INCOME',
  COMPANY_BANK_STATEMENT_6_MONTHS = 'COMPANY_BANK_STATEMENT_6_MONTHS',
  OWNERSHIP_PROOF_MOBILE_NUMBER = 'OWNERSHIP_PROOF_MOBILE_NUMBER',
  MOBILE_BILL_COPY = 'MOBILE_BILL_COPY'
}

export enum UserRoleEnum {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  GENERAL_USER = 'GENERAL_USER',
  AGENT = 'AGENT'
}

export enum PropertiesStatusEnum {
  SALE = 'SALE',
  RENT = 'RENT'
}

export enum AmenityTypeEnum {
  PROPERTY = 'PROPERTY',
  BUILDING = 'BUILDING',
  COMMUNITY = 'COMMUNITY'
}

export enum ApprovalStatusEnum {
  APPROVED = 'APPROVED',
  NOT_APPROVED = 'NOT_APPROVED'
}

export enum ActiveStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum CallPreferenceEnum {
  PURPLEROOF = 'PURPLEROOF',
  PERSONAL = 'PERSONAL'
}

export const PageRoutes = {
  dashboard: {
    admin: {
      AGENTS: '/dashboard/admin/agents',
      USERS: '/dashboard/admin/users',
      REQUIREMENTS: '/dashboard/admin/requirements',
      REQUIREMENTS_ADD: '/dashboard/admin/requirements/add',
      REQUIREMENTS_EDIT: (requirementId: number) => `/dashboard/admin/requirements/edit/${requirementId}`
    },
    MORTGAGES: '/dashboard/mortgages',
    MORTGAGE_DETAILS: (mortgageId: number) => `/dashboard/mortgages/${mortgageId}`,
    EDIT_MORTGAGE: (mortgageId: number) => `/dashboard/mortgages/edit/${mortgageId}`,
    MORTGAGE_TIMELINE: (mortgageId: number) => `/dashboard/mortgages/${mortgageId}/timeline`,
    COMPLETE_MORTGAGE_APPLICATION: (mortgageId: number, step: string) => `/dashboard/mortgages/${mortgageId}/${step}`,
    PROPERTIES: '/dashboard/properties',
    PROPERTY_DETAILS: (propertyId: number) => `/dashboard/properties/${propertyId}`,
    EDIT_PROPERTY: (propertyId: number) => `/dashboard/properties/edit/${propertyId}`,
    PROFILE: '/dashboard/profile'
  },
  admin: {
    MORTGAGES: '/admin/mortgages',
    PROPERTIES: '/admin/properties',
    AGENTS: '/admin/agents',
    USERS: '/admin/users',
    REQUIREMENTS: '/admin/requirements'
  },
  mortgage: {
    PERSONAL_DETAILS: '/mortgage/personal-details',
    INCOME_DETAILS: '/mortgage/income-details',
    COMPLETE_APPLICATION: '/mortgage/complete-application'
  },
  advertise: {
    BASIC_DETAILS: '/advertise/basic-details',
    PROPERTY_DETAILS: '/advertise/property-details',
    LOCATION_DETAILS: '/advertise/location-details',
    AMENITIES_DETAILS: '/advertise/amenities-details',
    UPLOAD_PHOTOS: '/advertise/upload-photos',
    PROJECT_STATUS: '/advertise/project-status',
    CALL_PREFERENCE: '/advertise/call-preference',
    APPLICATION_COMPLETED: '/advertise/application-completed'
  },
  mortgage_transaction: {
    TRANSACTION_INFO: 'mortgage-transaction-info',
    DOCUMENTS: 'mortgage-documents',
    CUSTOMER_INFO: 'mortgage-customer-info'
  },
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  FORGOT_PASSWORD: '/forgot-password',
  SEARCH: '/search'
}

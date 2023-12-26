export const PageRoutes = {
  dashboard: {
    admin: {
      AGENTS: '/dashboard/admin/agents',
      USERS: '/dashboard/admin/users',
      REQUIREMENTS: '/dashboard/admin/requirements',
      REQUIREMENTS_ADD: '/dashboard/admin/requirements/add'
    },
    MORTGAGES: '/dashboard/mortgages',
    MORTGAGE_DETAILS: (mortgageId: number) => `/dashboard/mortgages/${mortgageId}/transaction-info`,
    PROPERTIES: '/dashboard/properties',
    PROPERTY_DETAILS: (propertyId: number) => `/dashboard/properties/${propertyId}`,
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
    CALL_PREFERENCE: '/advertise/call-preference'
  },
  mortgage_transaction: {
    TRANSACTION_INFO: 'transaction-info',
    CUSTOMER_INFO: 'customer-info'
  },
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  FORGOT_PASSWORD: '/forgot-password'
}

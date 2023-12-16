export const PageRoutes = {
  dashboard: {
    admin: {
      AGENTS: '/dashboard/admin/agents',
      USERS: '/dashboard/admin/users',
      REQUIREMENTS: '/dashboard/admin/requirements',
      REQUIREMENTS_ADD: '/dashboard/admin/requirements/add'
    },
    MORTGAGES: '/dashboard/mortgages',
    PROPERTIES: '/dashboard/properties',
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
    INCOME_DETAILS: '/mortgage/income-details'
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
  CONTACT: '/contact'
}

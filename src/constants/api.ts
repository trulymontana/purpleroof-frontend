export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT || 'http://localhost:4000/api/v1'

export const ApiEndpoints = {
  MORTGAGES: API_ROOT + '/mortgages',
  MORTGAGE_TRANSACTION: API_ROOT + '/mortgage-transactions',
  USERS: API_ROOT + '/users',
  PROPERTIES: API_ROOT + '/properties',
  REQUIREMENTS: API_ROOT + '/requirements',
  SEARCH: API_ROOT + '/properties/search',
  FILES: API_ROOT + '/files',
  SIGNIN: API_ROOT + '/auth/sign-in',
  SIGNUP: API_ROOT + '/auth/sign-up',
  AGENTS: API_ROOT + '/agents'
}

export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT || 'http://localhost:4000/api/v1'

export const ApiEndpoints = {
  MORTGAGES: API_ROOT + '/mortgages',
  USERS: API_ROOT + '/users',
  PROPERTIES: API_ROOT + '/properties',
  REQUIREMENTS: API_ROOT + '/requirements',
  FILES: API_ROOT + '/files',
  SIGNIN: API_ROOT + '/auth/sign-in',
  SIGNUP: API_ROOT + '/auth/sign-up'
}

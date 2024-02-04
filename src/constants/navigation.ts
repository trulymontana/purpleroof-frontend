import { PageRoutes } from './page-routes'

export const WEBSITE_BASE_URL = 'https://www.sirefinance.com/'

export const headerLinks = [
  {
    label: 'Home',
    link: WEBSITE_BASE_URL
  },
  {
    label: 'About Us',
    link: WEBSITE_BASE_URL + 'about-us'
  },
  {
    label: 'Home Loans',
    link: PageRoutes.mortgage.PERSONAL_DETAILS
  },
  {
    label: 'Careers',
    link: WEBSITE_BASE_URL + 'careers'
  },
  {
    label: 'Contact Us',
    link: WEBSITE_BASE_URL + 'contact-us'
  }
]

export const requirements = [
  {
    label: 'Salaried',
    link: WEBSITE_BASE_URL + 'careers'
  },
  {
    label: 'Self-Employed',
    link: WEBSITE_BASE_URL + 'careers'
  },
  {
    label: 'Non-Resident',
    link: WEBSITE_BASE_URL + 'careers'
  }
]

export const services = [
  {
    label: 'Apply for Home Loan',
    link: PageRoutes.mortgage.PERSONAL_DETAILS
  }
]

export const socialLinks = {
  INSTAGRAM: 'https://www.instagram.com/sirefinancial',
  FACEBOOK: 'https://www.facebook.com/sirefinancial',
  TWITTER: 'https://twitter.com/sirefinancial',
  YOUTUBE: 'https://www.youtube.com/@sirefinancial',
  LINKEDIN: 'http://linkedin.com/in/sirefinancial'
}

export const otherLinks = {
  BASE_URL: '/',
  TERMS: '/',
  PRIVACY_POLICY: '/',
  CARRERS: '/',
  BENEFITS_OF_HOME_LOAN: '/',
  CONTACT_US: WEBSITE_BASE_URL + 'contact-us'
}

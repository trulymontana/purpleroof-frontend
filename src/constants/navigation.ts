import { PageRoutes } from './page-routes'

export const headerLinks = [
  {
    label: 'Home',
    // link: 'https://purpleroof.com/'
    link: '/'
  },
  {
    label: 'About Us',
    // link: 'https://purpleroof.com/about-us'
    link: '/'
  },
  {
    label: 'Home Loans',
    link: PageRoutes.mortgage.PERSONAL_DETAILS
  },
  {
    label: 'Careers',
    // link: 'https://purpleroof.com/careers/'
    link: '/'
  },
  // {
  //   label: 'Blog',
  // link: 'https://purpleroof.com/blog/'
  //   link: '/'
  // },
  {
    label: 'Contact Us',
    // link: 'https://purpleroof.com/contact-us'
    link: '/'
  }
]

export const requirements = [
  {
    label: 'Salaried',
    // link: 'https://purpleroof.com/careers'
    link: '/'
  },
  {
    label: 'Self-Employed',
    // link: 'https://purpleroof.com/careers'
    link: '/'
  },
  {
    label: 'Non-Resident',
    // link: 'https://purpleroof.com/careers'
    link: '/'
  }
]

export const services = [
  {
    label: 'Apply for Home Loan',
    link: PageRoutes.mortgage.PERSONAL_DETAILS
  }
  // {
  //   label: 'Property Search',
  //   link: PageRoutes.SEARCH
  // },
  // {
  //   label: 'Advertise Your Property',
  //   link: PageRoutes.advertise.BASIC_DETAILS
  // }
]

export const socialLinks = {
  INSTAGRAM: '/',
  FACEBOOK: '/',
  TWITTER: '/',
  YOUTUBE: '/',
  LINKEDIN: '/'
}

export const otherLinks = {
  PURPLEROOF: '/',
  TERMS: '/',
  PRIVACY_POLICY: '/',
  CARRERS: '/',
  BENEFITS_OF_HOME_LOAN: '/',
  CONTACT_US: '/'
}

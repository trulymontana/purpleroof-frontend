import React from 'react'
import { Button } from './ui/button'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import { headerLinks, otherLinks, requirements, services, socialLinks } from '@/constants/navigation'
import Link from 'next/link'
import BackgroundEffect from './BackgroundEffect'

const Footer = () => {
  return (
    <footer className="relative z-10 bg-background bg-footer bg-center text-white">
      <div className="absolute inset-0 -z-10 h-auto w-full bg-indigo-600 bg-opacity-25 bg-search bg-cover backdrop-opacity-10" />
      <div
        className="t-0 absolute top-0 -z-10 h-full w-full opacity-75"
        style={{
          background: 'linear-gradient(to bottom, #4D6842 30%, #4D6842 70%)'
        }}
      ></div>
      {/* <BackgroundEffect /> */}
      <div className="z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h5 className="mb-4 text-sm font-semibold">EXPLORE</h5>
            <ul className="space-y-3">
              {headerLinks.map(({ label, link }, i) => (
                <li key={i}>
                  <Link href={link} className="text-white hover:text-gray-300">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/" className="text-white hover:text-gray-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-4 text-sm font-semibold">REQUIREMENTS</h5>
            <ul className="space-y-3">
              {requirements.map(({ label, link }, i) => (
                <li key={i}>
                  <Link href={link} className="text-white hover:text-gray-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="mb-4 text-sm font-semibold">SERVICES</h5>
            <ul className="space-y-3">
              {services.map(({ label, link }, i) => (
                <li key={i}>
                  <Link href={link} className="text-white hover:text-gray-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="mb-4 text-sm font-semibold">WANT TO GET IN TOUCH?</h5>
            <Link href={otherLinks.CONTACT_US}>
              <Button className="border border-white bg-transparent text-white hover:bg-white hover:text-[#4c2a85]">
                Contact Us
              </Button>
            </Link>
            <h5 className="mb-4 mt-6 text-sm font-semibold">FOLLOW US ON</h5>
            <div className="flex space-x-3">
              <Link href={socialLinks.INSTAGRAM}>
                <Instagram className="text-white hover:text-gray-300" />
              </Link>
              <Link href={socialLinks.FACEBOOK}>
                <Facebook className="text-white hover:text-gray-300" />
              </Link>
              <Link href={socialLinks.TWITTER}>
                <Twitter className="text-white hover:text-gray-300" />
              </Link>
              <Link href={socialLinks.YOUTUBE}>
                <Youtube className="text-white hover:text-gray-300" />
              </Link>
              <Link href={socialLinks.LINKEDIN}>
                <Linkedin className="text-white hover:text-gray-300" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white pt-6 text-sm">
          <div className="flex items-center justify-between">
            <div>
              <Link href={otherLinks.TERMS} className="hover:text-gray-300">
                Terms of use
              </Link>
              <span className="mx-3 hover:text-gray-300">|</span>
              <Link href={otherLinks.PRIVACY_POLICY} className="hover:text-gray-300">
                Privacy Policy
              </Link>
              <span className="mx-3 hover:text-gray-300">|</span>
              <Link href={otherLinks.CARRERS} className="hover:text-gray-300">
                Staff Application
              </Link>
              <span className="mx-3 hover:text-gray-300">|</span>
              <Link href={otherLinks.BENEFITS_OF_HOME_LOAN} className="hover:text-gray-300">
                Benefits of Sire Finance Home Loan
              </Link>
            </div>
            <div>
              <p>© 2023 Sire Finance, Inc. All rights reserved.</p>
              <p>
                Sire Finance are mortgage experts. Rely on us for expert mortgage services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

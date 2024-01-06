import React from 'react'
import { Button } from './ui/button'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import { headerLinks, requirements, services } from '@/constants/navigation'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="relative z-10 bg-background bg-footer bg-center text-white">
      <div className="absolute inset-0 -z-10 h-auto w-full bg-indigo-600 bg-opacity-25 bg-search bg-cover backdrop-opacity-10" />
      <div
        className="t-0 absolute top-0 -z-10 h-full w-full opacity-75"
        style={{
          background: 'linear-gradient(to bottom, #795695 30%, #795695 70%)'
        }}
      ></div>
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
            <Button className="border border-white bg-transparent text-white hover:bg-white hover:text-[#4c2a85]">
              Contact Us
            </Button>
            <h5 className="mb-4 mt-6 text-sm font-semibold">FOLLOW US ON</h5>
            <div className="flex space-x-3">
              <Instagram className="text-white hover:text-gray-300" />
              <Facebook className="text-white hover:text-gray-300" />
              <Twitter className="text-white hover:text-gray-300" />
              <Youtube className="text-white hover:text-gray-300" />
              <Linkedin className="text-white hover:text-gray-300" />
              <Youtube className="text-white hover:text-gray-300" />
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white pt-6 text-sm">
          <div className="flex items-center justify-between">
            <div>
              <Link href={'/'} className="hover:text-gray-300">
                Terms of use
              </Link>
              <Link href={'/'} className="mx-3 hover:text-gray-300">
                |
              </Link>
              <Link href={'/'} className="hover:text-gray-300">
                Privacy Policy
              </Link>
              <Link href={'/'} className="mx-3 hover:text-gray-300">
                |
              </Link>
              <Link href={'/'} className="hover:text-gray-300">
                Staff Application
              </Link>
              <Link href={'/'} className="mx-3 hover:text-gray-300">
                |
              </Link>
              <Link href={'/'} className="hover:text-gray-300">
                Benefits of Purple Roof Home Loan
              </Link>
            </div>
            <div>
              <p>© 2023 Purple Roof, Inc. All rights reserved.</p>
              <p>
                Purple Roof are the property and mortgage experts. Rely on us for free property advertising and search,
                and for expert mortgage services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

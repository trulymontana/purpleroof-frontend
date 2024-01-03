import React from 'react'
import { Button } from './ui/button'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="relative bg-background bg-center z-10 bg-footer text-white">
            <div className="absolute inset-0 -z-10 h-auto w-full bg-indigo-600 bg-opacity-25 bg-search bg-cover backdrop-opacity-10" />
            <div
                className="t-0 absolute top-0 -z-10 h-full w-full opacity-75"
                style={{
                    background: 'linear-gradient(to bottom, #795695 30%, #795695 70%)'
                }}
            ></div>
            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h5 className="text-sm font-semibold mb-4">EXPLORE</h5>
                        <ul className="space-y-3">
                            <li>
                                <a className="text-white hover:text-gray-300" href="#">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-300" href="#">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-300" href="#">
                                    Home Loans
                                </a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-300" href="#">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-300" href="#">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-300" href="#">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-sm font-semibold mb-4">REQUIREMENTS</h5>
                        <ul className="space-y-3">
                            <li>
                                <a className="text-white hover:text-gray-300" href="#">
                                    Salaried
                                </a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-300" href="#">
                                    Self-Employed
                                </a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-300" href="#">
                                    Non-Resident
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-sm font-semibold mb-4">SERVICES</h5>
                        <ul className="space-y-3">
                            <li>
                                <a className="text-white hover:text-gray-300" href="#">
                                    Apply for Home Loan
                                </a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-300" href="#">
                                    Property Search
                                </a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-300" href="#">
                                    Advertise your Property
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-sm font-semibold mb-4">WANT TO GET IN TOUCH?</h5>
                        <Button className="text-white bg-transparent border border-white hover:bg-white hover:text-[#4c2a85]">
                            Contact Us
                        </Button>
                        <h5 className="text-sm font-semibold mt-6 mb-4">FOLLOW US ON</h5>
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
                <div className="border-t border-white mt-10 pt-6 text-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <span>Terms of use</span>
                            <span className="mx-3">|</span>
                            <span>Privacy Policy</span>
                            <span className="mx-3">|</span>
                            <span>Staff Application</span>
                            <span className="mx-3">|</span>
                            <span>Benefits of Purple Roof Home Loan</span>
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
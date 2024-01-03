'use client'

import { ArrowRight, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

const Header = () => {
    return (
        <nav className="bg-primary/90 py-5 px-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <Home className="text-white h-6 w-6" />
                <span className="text-white font-bold uppercase">Purple Roof</span>
            </div>
            <div className="flex items-center space-x-14">
                <Link className="text-white hover:text-opacity-75" href="#">
                    Home
                </Link>
                <Link className="text-white hover:text-opacity-75" href="#">
                    About Us
                </Link>
                <Link className="text-white hover:text-opacity-75" href="#">
                    Home Loan
                </Link>
                <Link className="text-white hover:text-opacity-75" href="#">
                    Careers
                </Link>
                <Link className="text-white hover:text-opacity-75" href="#">
                    Contact Us
                </Link>
            </div>
            <Button className="text-white bg-transparent border border-white hover:bg-white hover:text-[#6B4E90]">
                Dashboard
                <ArrowRight className="ml-2" />
            </Button>
        </nav>
    )
}

export default Header
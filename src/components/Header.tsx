'use client'

import { ArrowRight, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { headerLinks } from "@/constants/navigation"

const Header = () => {
    return (
        <nav className="bg-primary/90 py-5 px-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <Home className="text-white h-6 w-6" />
                <span className="text-white font-bold uppercase">Purple Roof</span>
            </div>
            <div className="flex items-center space-x-14">
                {
                    headerLinks.map(({ link, label }, i) => (
                        <Link key={i} className="text-white hover:text-opacity-75" href={link}>
                            {label}
                        </Link>
                    ))
                }
            </div>
            <Button variant="outline" className="text-white hover:text-primary">
                Dashboard
                <ArrowRight className="ml-2" />
            </Button>
        </nav>
    )
}

export default Header
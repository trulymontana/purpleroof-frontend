'use client'

import { ArrowRight, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { headerLinks } from "@/constants/navigation"
import Image from "next/image"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"

const Header = () => {
    return (
        <nav className="bg-primary/90 py-5 px-10 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
                <Image
                    src={'/assets/logos/logo-only-white.png'}
                    quality={100}
                    width={1000}
                    height={1000}
                    alt=""
                    className="h-6 w-auto"
                />
                <span className="text-white font-bold uppercase">Purple Roof</span>
            </Link>
            <div className="hidden xl:flex items-center space-x-14">
                {
                    headerLinks.map(({ link, label }, i) => (
                        <Link key={i} className="text-white hover:text-opacity-75" href={link}>
                            {label}
                        </Link>
                    ))
                }
            </div>
            <Button variant="outline" className="hidden xl:flex text-white hover:text-primary">
                Dashboard
                <ArrowRight className="ml-2" />
            </Button>
            <Sheet>
                <SheetTrigger asChild>
                    <Menu className="text-white xl:hidden" />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Purpleroof Inc.</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-5 mt-10">
                        {
                            headerLinks.map(({ link, label }, i) => (
                                <Link key={i} href={link}>
                                    {label}
                                </Link>
                            ))
                        }
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button className="text-white hover:text-primary w-full mt-10">
                                Dashboard
                                <ArrowRight className="ml-2" />
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </nav>
    )
}

export default Header
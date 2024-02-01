'use client'

import { ArrowRight, Menu } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { headerLinks, otherLinks } from '@/constants/navigation'
import Image from 'next/image'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { PageRoutes } from '@/constants/page-routes'

const Header = () => {
  return (
    <nav className="flex items-center justify-between p-5 opacity-90" style={{
      background: 'linear-gradient(to bottom, #4D6842 30%, #4D6842 70%)'
    }}>
      <Link href={otherLinks.PURPLEROOF} className="flex items-center space-x-1">
        <Image
          src={'/assets/logos/logo.png'}
          quality={100}
          width={1000}
          height={1000}
          alt=""
          className="h-9 w-auto"
        />
        <span className="font-bold uppercase text-white">Sire Finance</span>
      </Link>
      <div className="hidden items-center space-x-14 xl:flex">
        {headerLinks.map(({ link, label }, i) => (
          <Link key={i} className="text-white hover:text-opacity-75" href={link}>
            {label}
          </Link>
        ))}
      </div>
      <Link href={PageRoutes.dashboard.MORTGAGES}>
        <Button variant="outline" className="hidden text-white hover:text-primary xl:flex">
          Dashboard
          <ArrowRight className="ml-2" />
        </Button>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="text-white xl:hidden" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Purpleroof Inc.</SheetTitle>
          </SheetHeader>
          <div className="mt-10 grid gap-5">
            {headerLinks.map(({ link, label }, i) => (
              <Link key={i} href={link}>
                {label}
              </Link>
            ))}
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button className="mt-10 w-full text-white hover:text-primary">
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

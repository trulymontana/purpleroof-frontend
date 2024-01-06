"use client"

import { Button } from '@/components/ui/button'
import { PageRoutes } from '@/constants/page-routes'
import Link from 'next/link'

export default function Home() {

  return (
    <section className="overflow-x-hidden">
      <div className="relative h-auto min-h-screen">
        <div className="absolute inset-0 -z-10 h-auto min-h-screen w-full bg-indigo-600 bg-opacity-25 bg-search bg-cover backdrop-opacity-10" />
        <div
          className="t-0 absolute top-0 -z-10 h-full w-full opacity-75"
          style={{
            background: 'linear-gradient(to bottom, #795695 30%, #795695 70%)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative min-h-screen flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="mb-10 text-5xl font-bold text-white">Place a FREE Advertisement to Sell or Rent Your Property</h1>
          <div className='flex items-center gap-10 justify-center'>
            <Link href={PageRoutes.mortgage.PERSONAL_DETAILS}>
              <Button className='' size="lg">Apply for a Mortgage</Button>
            </Link>
            <Link href={PageRoutes.advertise.BASIC_DETAILS}>
              <Button size="lg">Advertise your Property</Button>
            </Link>
            <Link href={PageRoutes.SEARCH}>
              <Button size="lg">Search a Property</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

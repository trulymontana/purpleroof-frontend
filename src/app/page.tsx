'use client'

import MapComponent from '@/components/MapPicker'
import { Button } from '@/components/ui/button'
import { otherLinks } from '@/constants/navigation'
import { PageRoutes } from '@/constants/page-routes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  // const router = useRouter()
  // useEffect(() => {
  //   router.push(otherLinks.PURPLEROOF)
  // }, [])

  // return null

  return <MapComponent onSelectLocation={() => console.log('test')} />

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
        <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-10">
            <Link href={PageRoutes.SIGNIN}>
              <Button className="p-8 text-lg" size="lg">
                Login
              </Button>
            </Link>
            <Link href={PageRoutes.SIGNUP}>
              <Button className="p-8 text-lg" size="lg">
                Signup
              </Button>
            </Link>
          </div>
          <h1 className="-leading-10 mb-10 rounded-xl bg-purple-300/25 p-20 text-5xl font-bold text-white md:mx-40">
            Place a FREE Advertisement to Sell or Rent Your Property
          </h1>
          <div className="flex items-center justify-center gap-10">
            <Link href={PageRoutes.mortgage.PERSONAL_DETAILS}>
              <Button className="p-8 text-lg" size="lg">
                Apply for a Mortgage
              </Button>
            </Link>
            <Link href={PageRoutes.advertise.BASIC_DETAILS}>
              <Button className="p-8 text-lg" size="lg">
                Advertise your Property
              </Button>
            </Link>
            <Link href={PageRoutes.SEARCH}>
              <Button className="p-8 text-lg" size="lg">
                Search a Property
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

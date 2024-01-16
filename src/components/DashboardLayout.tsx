'use client'

import React from "react"

interface Props {
  heading: string
  children: React.ReactNode
}

const DashboardLayout = ({ heading, children }: Props) => {
  return (
    <>
      <header className="dashboard_header dark:bg-gray-800/40 lg:h-[60px]">
        <h1 className="text-lg font-semibold">{heading}</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="rounded-lg border p-2 shadow-sm">
          {children}
        </div>
      </main>
    </>
  )
}

export default DashboardLayout
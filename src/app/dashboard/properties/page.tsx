'use client'

import PropertiesTable from '@/components/tables/properties-table'
import React from 'react'

const Users = () => {
  return (
    <>
      <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
        <h1 className="text-lg font-semibold">Properties</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="rounded-lg border p-2 shadow-sm">
          <PropertiesTable />
        </div>
      </main>
    </>
  )
}

export default Users

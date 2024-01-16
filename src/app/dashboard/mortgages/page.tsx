'use client'

import DashboardLayout from '@/components/DashboardLayout'
import MortgagesTable from '@/components/tables/mortgage-table'
import React from 'react'

const Page = () => {
  return (
    <DashboardLayout heading='Mortgages'><MortgagesTable /></DashboardLayout>
  )
}

export default Page

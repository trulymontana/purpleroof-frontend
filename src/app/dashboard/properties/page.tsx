'use client'

import DashboardLayout from '@/components/DashboardLayout'
import PropertiesTable from '@/components/tables/properties-table'
import React from 'react'

const Users = () => {
  return (
    <DashboardLayout heading='Properties'><PropertiesTable /></DashboardLayout>
  )
}

export default Users

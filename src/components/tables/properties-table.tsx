'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { Property } from '@/constants/types'
import { useGetProperties } from '@/data/hooks/usePropertiesClient'

export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'propertyTypeId',
    header: 'Property Type ID'
  },
  {
    accessorKey: 'propertyTypeCategoryId',
    header: 'Property Type Category ID'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  },
  {
    accessorKey: 'size',
    header: 'Size'
  },
  {
    accessorKey: 'numberOfBedRooms',
    header: 'Number of Bedrooms'
  },
  {
    accessorKey: 'numberOfBathRooms',
    header: 'Number of Bathrooms'
  },
  {
    accessorKey: 'maintenanceFee',
    header: 'Maintenance Fee'
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    accessorKey: 'landmark',
    header: 'Landmark'
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At'
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At'
  },
  {
    accessorKey: 'locationId',
    header: 'Location ID'
  },
  {
    accessorKey: 'minimumContract',
    header: 'Minimum Contract'
  },
  {
    accessorKey: 'noticePeriod',
    header: 'Notice Period'
  },
  {
    accessorKey: 'deedNumber',
    header: 'Deed Number'
  },
  {
    accessorKey: 'unitNumber',
    header: 'Unit Number'
  },
  {
    accessorKey: 'buildingName',
    header: 'Building Name'
  },
  {
    accessorKey: 'floor',
    header: 'Floor'
  },
  {
    accessorKey: 'isApproved',
    header: 'Is Approved'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'userId',
    header: 'User ID'
  },
  {
    accessorKey: 'draft',
    header: 'Draft'
  },
  {
    accessorKey: 'agentInfoId',
    header: 'Agent Info ID'
  },
  {
    accessorKey: 'paymentInterval',
    header: 'Payment Interval'
  },
  {
    accessorKey: 'emirateId',
    header: 'Emirate ID'
  },
  {
    accessorKey: 'projectStatus',
    header: 'Project Status'
  },
  {
    accessorKey: 'numberOfCheques',
    header: 'Number of Cheques'
  },
  {
    accessorKey: 'completionDate',
    header: 'Completion Date'
  },
  {
    accessorKey: 'noticePeriodOfRemainingRentalAgreement',
    header: 'Notice Period of Remaining Rental Agreement'
  },
  {
    accessorKey: 'numberOfLavatory',
    header: 'Number of Lavatory'
  },
  {
    accessorKey: 'rentalAmount',
    header: 'Rental Amount'
  },
  {
    accessorKey: 'trakheesiPermitNo',
    header: 'Trakheesi Permit No'
  },
  {
    accessorKey: 'lat',
    header: 'Latitude'
  },
  {
    accessorKey: 'lng',
    header: 'Longitude'
  }
]

export default function PropertiesTable() {
  const { loading, data } = useGetProperties()
  return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}

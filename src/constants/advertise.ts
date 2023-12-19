import {
  CommercialPropertyCategoryEnum,
  EmirateEnum,
  HoldingTypeEnum,
  OccupencyStatusEnum,
  PaymentIntervalsEnum,
  ProjectStatusesEnum,
  PropertyTypeEnum,
  RentedOrVacantEnum,
  ResidentialPropertyCategoryEnum,
  StatusesEnum,
  categoryEnum
} from './enums'

export const categories = [
  {
    label: 'I want to Sell',
    value: categoryEnum.SALE
  },
  {
    label: 'I want a rental tenant',
    value: categoryEnum.RENT
  }
]

export const typesOfProperties = [
  {
    label: 'Residential',
    value: PropertyTypeEnum.RESIDENTIAL
  },
  {
    label: 'Commercial',
    value: PropertyTypeEnum.COMMERCIAL
  }
]

export const commercialTypes = [
  {
    label: 'Bulk Unit',
    value: CommercialPropertyCategoryEnum.BULK_UNIT
  },
  {
    label: 'Commercial Building',
    value: CommercialPropertyCategoryEnum.COMMERCIAL_BUILDING
  },
  {
    label: 'Commercial Floor',
    value: CommercialPropertyCategoryEnum.COMMERCIAL_FLOOR
  },
  {
    label: 'Commercial Villa',
    value: CommercialPropertyCategoryEnum.COMMERCIAL_VILLA
  },
  {
    label: 'Commercial Plot',
    value: CommercialPropertyCategoryEnum.COMMERCIAL_PLOT
  },
  {
    label: 'Factory',
    value: CommercialPropertyCategoryEnum.FACTORY
  },
  {
    label: 'Industrial Unit For Sale',
    value: CommercialPropertyCategoryEnum.INDUSTRIAL_UNIT_FOR_SALE
  },
  {
    label: 'Industrial Land',
    value: CommercialPropertyCategoryEnum.INDUSTRIAL_LAND
  },
  {
    label: 'Mixed Used Sand',
    value: CommercialPropertyCategoryEnum.BULK_UNIT
  },
  {
    label: 'Office For Sale',
    value: CommercialPropertyCategoryEnum.OFFICE_FOR_SALE
  },
  {
    label: 'Retail For Sale',
    value: CommercialPropertyCategoryEnum.RETAIL_FOR_SALE
  },
  {
    label: 'Shop',
    value: CommercialPropertyCategoryEnum.SHOP
  },
  {
    label: 'Staff Accommodation for Sale',
    value: CommercialPropertyCategoryEnum.STAFF_ACCOMMODATION_FOR_SALE
  },
  {
    label: 'Warehouse',
    value: CommercialPropertyCategoryEnum.WAREHOUSE
  },
  {
    label: 'Sell Commercial Land',
    value: CommercialPropertyCategoryEnum.SELL_COMMERCIAL_LAND
  },
  {
    label: 'Other',
    value: CommercialPropertyCategoryEnum.OTHER
  }
]

export const residentalTypes = [
  {
    label: 'Apartment & Unit',
    value: ResidentialPropertyCategoryEnum.APARTMENT_AND_UNIT
  },
  {
    label: 'Villa',
    value: ResidentialPropertyCategoryEnum.VILLA
  },
  {
    label: 'Acreage',
    value: ResidentialPropertyCategoryEnum.ACREAGE
  },
  {
    label: 'Block of Units',
    value: ResidentialPropertyCategoryEnum.BLOCKS_OF_UNITS
  },
  {
    label: 'House',
    value: ResidentialPropertyCategoryEnum.HOUSE
  },
  {
    label: 'Townhouse',
    value: ResidentialPropertyCategoryEnum.TOWNHOUSE
  },
  {
    label: 'Land',
    value: ResidentialPropertyCategoryEnum.LAND
  }
]

export const paymentIntervals = [
  {
    label: 'Weekly',
    value: PaymentIntervalsEnum.WEEKLY
  },
  {
    label: 'Monthly',
    value: PaymentIntervalsEnum.MONTHLY
  },
  {
    label: 'Yearly',
    value: PaymentIntervalsEnum.YEARLY
  }
]

export const bedRooms = [
  {
    label: 'Studio',
    value: 'Studio'
  },
  {
    label: '1',
    value: '1'
  },
  {
    label: '2',
    value: '2'
  },
  {
    label: '3',
    value: '3'
  },
  {
    label: '4',
    value: '4'
  },
  {
    label: '5',
    value: '5'
  },
  {
    label: '6',
    value: '6'
  },
  {
    label: '7',
    value: '7'
  },
  {
    label: '8',
    value: '8'
  },
  {
    label: '9',
    value: '9'
  },
  {
    label: '10',
    value: '10'
  },
  {
    label: '11',
    value: '11'
  },
  {
    label: '12',
    value: '12'
  },
  {
    label: '13',
    value: '13'
  },
  {
    label: '14',
    value: '14'
  },
  {
    label: '15',
    value: '15'
  },
  {
    label: '16',
    value: '16'
  },
  {
    label: '17',
    value: '17'
  },
  {
    label: '18',
    value: '18'
  },
  {
    label: '19',
    value: '19'
  },
  {
    label: '20',
    value: '20'
  }
]

export const bathRooms = [
  {
    label: '1',
    value: '1'
  },
  {
    label: '2',
    value: '2'
  },
  {
    label: '3',
    value: '3'
  },
  {
    label: '4',
    value: '4'
  },
  {
    label: '5',
    value: '5'
  },
  {
    label: '6',
    value: '6'
  },
  {
    label: '7',
    value: '7'
  },
  {
    label: '8',
    value: '8'
  },
  {
    label: '9',
    value: '9'
  },
  {
    label: '10',
    value: '10'
  },
  {
    label: '11',
    value: '11'
  },
  {
    label: '12',
    value: '12'
  },
  {
    label: '13',
    value: '13'
  },
  {
    label: '14',
    value: '14'
  },
  {
    label: '15',
    value: '15'
  },
  {
    label: '16',
    value: '16'
  },
  {
    label: '17',
    value: '17'
  },
  {
    label: '18',
    value: '18'
  },
  {
    label: '19',
    value: '19'
  },
  {
    label: '20',
    value: '20'
  }
]

export const lavatories = [
  {
    label: '1',
    value: '1'
  },
  {
    label: '2',
    value: '2'
  },
  {
    label: '3',
    value: '3'
  },
  {
    label: '4',
    value: '4'
  },
  {
    label: '5',
    value: '5'
  },
  {
    label: '6',
    value: '6'
  },
  {
    label: '7',
    value: '7'
  },
  {
    label: '8',
    value: '8'
  },
  {
    label: '9',
    value: '9'
  },
  {
    label: '10',
    value: '10'
  },
  {
    label: '11',
    value: '11'
  },
  {
    label: '12',
    value: '12'
  },
  {
    label: '13',
    value: '13'
  },
  {
    label: '14',
    value: '14'
  },
  {
    label: '15',
    value: '15'
  },
  {
    label: '16',
    value: '16'
  },
  {
    label: '17',
    value: '17'
  },
  {
    label: '18',
    value: '18'
  },
  {
    label: '19',
    value: '19'
  },
  {
    label: '20',
    value: '20'
  }
]

export const emirateOptions = [
  {
    label: 'Dubai',
    value: EmirateEnum.DUBAI
  },
  {
    label: 'Abu Dhabi',
    value: EmirateEnum.ABU_DHABI
  },
  {
    label: 'Ras Al Khaimah',
    value: EmirateEnum.RAS_AL_KHAIMAH
  },
  {
    label: 'Sharjah',
    value: EmirateEnum.SHARJAH
  },
  {
    label: 'Fujairah',
    value: EmirateEnum.FUJAIRAH
  },
  {
    label: 'Ajman',
    value: EmirateEnum.AJMAN
  },
  {
    label: 'Umm al Quwain',
    value: EmirateEnum.UMM_AL_QUWAIN
  }
]

export const emiratesWithLocations = {
  [EmirateEnum.DUBAI]: [
    {
      label: 'Al Barsha',
      value: 'Al Barsha'
    },
    {
      label: 'Al Barsha 1',
      value: 'Al Barsha 1'
    },
    {
      label: 'Al Furjan',
      value: 'Al Furjan'
    },
    {
      label: 'Al Jaddaf',
      value: 'Al Jaddaf'
    },
    {
      label: 'Al Mankhool',
      value: 'Al Mankhool'
    },
    {
      label: 'Al Nahda (Dubai)',
      value: 'Al Nahda (Dubai)'
    },
    {
      label: 'Al Nahda 2',
      value: 'Al Nahda 2'
    },
    {
      label: 'Al Quoz',
      value: 'Al Quoz'
    },
    {
      label: 'Al Qusais',
      value: 'Al Qusais'
    },
    {
      label: 'Al Wasl',
      value: 'Al Wasl'
    },
    {
      label: 'Arabian Ranches 3',
      value: 'Arabian Ranches 3'
    },
    {
      label: 'Arjan',
      value: 'Arjan'
    },
    {
      label: 'Azizi Riviera',
      value: 'Azizi Riviera'
    },
    {
      label: 'Bur Dubai',
      value: 'Bur Dubai'
    },
    {
      label: 'Business Bay',
      value: 'Business Bay'
    },
    {
      label: 'DAMAC Hills',
      value: 'DAMAC Hills'
    },
    {
      label: 'DAMAC Hills 2 (Akoya by DAMAC)',
      value: 'DAMAC Hills 2 (Akoya by DAMAC)'
    },
    {
      label: 'Damac Lagoons',
      value: 'Damac Lagoons'
    },
    {
      label: 'Deira',
      value: 'Deira'
    },
    {
      label: 'Downtown Dubai',
      value: 'Downtown Dubai'
    },
    {
      label: 'Dubai Creek Harbour',
      value: 'Dubai Creek Harbour'
    },
    {
      label: 'Dubai Harbour',
      value: 'Dubai Harbour'
    },
    {
      label: 'Dubai Hills Estate',
      value: 'Dubai Hills Estate'
    },
    {
      label: 'Dubai Marina',
      value: 'Dubai Marina'
    },
    {
      label: 'Dubai Silicon Oasis',
      value: 'Dubai Silicon Oasis'
    },
    {
      label: 'Dubai South',
      value: 'Dubai South'
    },
    {
      label: 'Dubai Sports City',
      value: 'Dubai Sports City'
    },
    {
      label: 'Dubailand',
      value: 'Dubailand'
    },
    {
      label: 'Elan',
      value: 'Elan'
    },
    {
      label: 'Emaar Beachfront',
      value: 'Emaar Beachfront'
    },
    {
      label: 'International City',
      value: 'International City'
    },
    {
      label: 'Jebel Ali',
      value: 'Jebel Ali'
    },
    {
      label: 'Jumeirah',
      value: 'Jumeirah'
    },
    {
      label: 'Jumeirah Beach Residence (JBR)',
      value: 'Jumeirah Beach Residence (JBR)'
    },
    {
      label: 'Jumeirah Lake Towers (JLT)',
      value: 'Jumeirah Lake Towers (JLT)'
    },
    {
      label: 'Jumeirah Village Circle (JVC)',
      value: 'Jumeirah Village Circle (JVC)'
    },
    {
      label: 'Jumeirah Village Triangle (JVT)',
      value: 'Jumeirah Village Triangle (JVT)'
    },
    {
      label: 'JVC District 10',
      value: 'JVC District 10'
    },
    {
      label: 'JVC District 11',
      value: 'JVC District 11'
    },
    {
      label: 'JVC District 12',
      value: 'JVC District 12'
    },
    {
      label: 'JVC District 13',
      value: 'JVC District 13'
    },
    {
      label: 'JVC District 14',
      value: 'JVC District 14'
    },
    {
      label: 'JVC District 15',
      value: 'JVC District 15'
    },
    {
      label: 'Meydan City',
      value: 'Meydan City'
    },
    {
      label: 'Meydan One',
      value: 'Meydan One'
    },
    {
      label: 'Mohammed Bin Rashid City',
      value: 'Mohammed Bin Rashid City'
    },
    {
      label: 'Palm Jumeirah',
      value: 'Palm Jumeirah'
    },
    {
      label: 'Sheikh Zayed Road',
      value: 'Sheikh Zayed Road'
    },
    {
      label: 'Sobha Hartland',
      value: 'Sobha Hartland'
    },
    {
      label: 'Tilal Al Ghaf',
      value: 'Tilal Al Ghaf'
    }
  ],
  [EmirateEnum.ABU_DHABI]: [
    {
      label: 'Al Bateen',
      value: 'Al Bateen'
    },
    {
      label: 'Al Ghadeer',
      value: 'Al Ghadeer'
    },
    {
      label: 'Al Khalidiyah',
      value: 'Al Khalidiyah'
    },
    {
      label: 'Al Matar',
      value: 'Al Matar'
    },
    {
      label: 'Al Muneera',
      value: 'Al Muneera'
    },
    {
      label: 'Al Muroor',
      value: 'Al Muroor'
    },
    {
      label: 'Al Mushrif',
      value: 'Al Mushrif'
    },
    {
      label: 'Al Nahyan',
      value: 'Al Nahyan'
    },
    {
      label: 'Al Raha Beach',
      value: 'Al Raha Beach'
    },
    {
      label: 'Al Raha Gardens',
      value: 'Al Raha Gardens'
    },
    {
      label: 'Al Reef',
      value: 'Al Reef'
    },
    {
      label: 'Al Reef Downtown',
      value: 'Al Reef Downtown'
    },
    {
      label: 'Al Reef Villas',
      value: 'Al Reef Villas'
    },
    {
      label: 'Al Reem Island',
      value: 'Al Reem Island'
    },
    {
      label: 'Al Shamkha',
      value: 'Al Shamkha'
    },
    {
      label: 'Baniyas',
      value: 'Baniyas'
    },
    {
      label: 'Bloom Gardens',
      value: 'Bloom Gardens'
    },
    {
      label: 'City of Lights',
      value: 'City of Lights'
    },
    {
      label: 'Corniche Area',
      value: 'Corniche Area'
    },
    {
      label: 'Corniche Road',
      value: 'Corniche Road'
    },
    {
      label: 'Electra Street',
      value: 'Electra Street'
    },
    {
      label: 'Hamdan Street',
      value: 'Hamdan Street'
    },
    {
      label: 'Khalifa City',
      value: 'Khalifa City'
    },
    {
      label: 'Madinat Al Riyadh',
      value: 'Madinat Al Riyadh'
    },
    {
      label: 'Makers District',
      value: 'Makers District'
    },
    {
      label: 'Marina Square',
      value: 'Marina Square'
    },
    {
      label: 'Masdar City',
      value: 'Masdar City'
    },
    {
      label: 'Mayan',
      value: 'Mayan'
    },
    {
      label: 'Mohammed Bin Zayed City',
      value: 'Mohammed Bin Zayed City'
    },
    {
      label: 'Mussafah',
      value: 'Mussafah'
    },
    {
      label: 'Mussafah Community',
      value: 'Mussafah Community'
    },
    {
      label: 'Mussafah Industrial Area',
      value: 'Mussafah Industrial Area'
    },
    {
      label: 'Najmat Abu Dhabi',
      value: 'Najmat Abu Dhabi'
    },
    {
      label: 'Noya',
      value: 'Noya'
    },
    {
      label: 'Pixel',
      value: 'Pixel'
    },
    {
      label: 'Reem Hills',
      value: 'Reem Hills'
    },
    {
      label: 'Saadiyat Beach',
      value: 'Saadiyat Beach'
    },
    {
      label: 'Saadiyat Cultural District',
      value: 'Saadiyat Cultural District'
    },
    {
      label: 'Saadiyat Island',
      value: 'Saadiyat Island'
    },
    {
      label: 'Shakhbout City',
      value: 'Shakhbout City'
    },
    {
      label: 'Shams Abu Dhabi',
      value: 'Shams Abu Dhabi'
    },
    {
      label: 'Shams Gate District',
      value: 'Shams Gate District'
    },
    {
      label: 'Tamouh',
      value: 'Tamouh'
    },
    {
      label: 'The Bridges',
      value: 'The Bridges'
    },
    {
      label: 'The Gate Tower',
      value: 'The Gate Tower'
    },
    {
      label: 'Tourist Club Area (TCA)',
      value: 'Tourist Club Area (TCA)'
    },
    {
      label: "Water's Edge",
      value: "Water's Edge"
    },
    {
      label: 'Yas Acres',
      value: 'Yas Acres'
    },
    {
      label: 'Yas Island',
      value: 'Yas Island'
    },
    {
      label: 'Zone 18',
      value: 'Zone 18'
    }
  ],
  [EmirateEnum.RAS_AL_KHAIMAH]: [
    {
      label: 'Al Dhait',
      value: 'Al Dhait'
    },
    {
      label: 'Al Dhait South',
      value: 'Al Dhait South'
    },
    {
      label: 'Al Hamra Village',
      value: 'Al Hamra Village'
    },
    {
      label: 'Al Hamra Village Golf Apartments',
      value: 'Al Hamra Village Golf Apartments'
    },
    {
      label: 'Al Mairid',
      value: 'Al Mairid'
    },
    {
      label: 'Al Mamourah',
      value: 'Al Mamourah'
    },
    {
      label: 'Al Marjan Island',
      value: 'Al Marjan Island'
    },
    {
      label: 'Al Nakheel',
      value: 'Al Nakheel'
    },
    {
      label: 'Al Qurm',
      value: 'Al Qurm'
    },
    {
      label: 'Al Qusaidat',
      value: 'Al Qusaidat'
    },
    {
      label: 'Al Refaa',
      value: 'Al Refaa'
    },
    {
      label: 'Al Seer',
      value: 'Al Seer'
    },
    {
      label: 'Al Uraibi',
      value: 'Al Uraibi'
    },
    {
      label: 'Aljazeera Al Hamra',
      value: 'Aljazeera Al Hamra'
    },
    {
      label: 'Bab Al Bahr Residences',
      value: 'Bab Al Bahr Residences'
    },
    {
      label: 'Bay Residences',
      value: 'Bay Residences'
    },
    {
      label: 'Bayviews',
      value: 'Bayviews'
    },
    {
      label: 'Dafan Al Khor',
      value: 'Dafan Al Khor'
    },
    {
      label: 'Dafan Al Nakheel',
      value: 'Dafan Al Nakheel'
    },
    {
      label: 'Danah Bay',
      value: 'Danah Bay'
    },
    {
      label: 'ENI Mangrove',
      value: 'ENI Mangrove'
    },
    {
      label: 'Gateway II Residences',
      value: 'Gateway II Residences'
    },
    {
      label: 'Julphar Towers',
      value: 'Julphar Towers'
    },
    {
      label: 'Kahraman Building',
      value: 'Kahraman Building'
    },
    {
      label: 'Khuzam',
      value: 'Khuzam'
    },
    {
      label: 'Marbella',
      value: 'Marbella'
    },
    {
      label: 'Marjan Island Resort & Spa',
      value: 'Marjan Island Resort & Spa'
    },
    {
      label: 'Mina Al Arab',
      value: 'Mina Al Arab'
    },
    {
      label: 'Mudfak',
      value: 'Mudfak'
    },
    {
      label: 'Oceano',
      value: 'Oceano'
    },
    {
      label: 'Pacific',
      value: 'Pacific'
    },
    {
      label: 'Pacific Bora Bora',
      value: 'Pacific Bora Bora'
    },
    {
      label: 'Pacific Samoa',
      value: 'Pacific Samoa'
    },
    {
      label: 'RAK Tower',
      value: 'RAK Tower'
    },
    {
      label: 'Royal Breeze 1',
      value: 'Royal Breeze 1'
    },
    {
      label: 'Royal Breeze 2',
      value: 'Royal Breeze 2'
    },
    {
      label: 'Royal Breeze 3',
      value: 'Royal Breeze 3'
    },
    {
      label: 'Royal Breeze 4',
      value: 'Royal Breeze 4'
    },
    {
      label: 'Royal Breeze 5',
      value: 'Royal Breeze 5'
    },
    {
      label: 'Royal Breeze Apartment',
      value: 'Royal Breeze Apartment'
    },
    {
      label: 'Seih Al Burairat',
      value: 'Seih Al Burairat'
    },
    {
      label: 'Sidroh',
      value: 'Sidroh'
    },
    {
      label: 'Suhaim',
      value: 'Suhaim'
    },
    {
      label: 'The Cove Rotana',
      value: 'The Cove Rotana'
    },
    {
      label: 'The Lagoons',
      value: 'The Lagoons'
    },
    {
      label: 'Union Tower',
      value: 'Union Tower'
    },
    {
      label: 'Yakout Building',
      value: 'Yakout Building'
    },
    {
      label: 'Yasmin Village',
      value: 'Yasmin Village'
    },
    {
      label: 'Yasmin Village',
      value: 'Yasmin Village'
    },
    {
      label: 'Yasmin Village Building 4',
      value: 'Yasmin Village Building 4'
    }
  ],
  [EmirateEnum.SHARJAH]: [
    {
      label: '5208 Muweilah Building',
      value: '5208 Muweilah Building'
    },
    {
      label: 'Abu Shagara',
      value: 'Abu Shagara'
    },
    {
      label: 'Ajmal Makan',
      value: 'Ajmal Makan'
    },
    {
      label: 'Al Ghuwair',
      value: 'Al Ghuwair'
    },
    {
      label: 'Al Khan',
      value: 'Al Khan'
    },
    {
      label: 'Al Mahatah',
      value: 'Al Mahatah'
    },
    {
      label: 'Al Majaz',
      value: 'Al Majaz'
    },
    {
      label: 'Al Majaz 1',
      value: 'Al Majaz 1'
    },
    {
      label: 'Al Majaz 2',
      value: 'Al Majaz 2'
    },
    {
      label: 'Al Majaz 3',
      value: 'Al Majaz 3'
    },
    {
      label: 'Al Mamsha',
      value: 'Al Mamsha'
    },
    {
      label: 'Al Mamzar',
      value: 'Al Mamzar'
    },
    {
      label: 'Al Nabba',
      value: 'Al Nabba'
    },
    {
      label: 'Al Nahda (Sharjah)',
      value: 'Al Nahda (Sharjah)'
    },
    {
      label: 'Al Nahda Complex Towers',
      value: 'Al Nahda Complex Towers'
    },
    {
      label: 'Al Nahda Towers',
      value: 'Al Nahda Towers'
    },
    {
      label: 'Al Nud',
      value: 'Al Nud'
    },
    {
      label: 'Al Qasimia',
      value: 'Al Qasimia'
    },
    {
      label: 'Al Rahmaniya',
      value: 'Al Rahmaniya'
    },
    {
      label: 'Al Sajaa',
      value: 'Al Sajaa'
    },
    {
      label: 'Al Sajaa Industrial',
      value: 'Al Sajaa Industrial'
    },
    {
      label: 'Al Suyoh',
      value: 'Al Suyoh'
    },
    {
      label: 'Al Taawun',
      value: 'Al Taawun'
    },
    {
      label: 'Al Tai',
      value: 'Al Tai'
    },
    {
      label: 'Al Zahia',
      value: 'Al Zahia'
    },
    {
      label: 'Aljada',
      value: 'Aljada'
    },
    {
      label: 'Amber Tower',
      value: 'Amber Tower'
    },
    {
      label: 'Barashi',
      value: 'Barashi'
    },
    {
      label: 'Bu Tina',
      value: 'Bu Tina'
    },
    {
      label: 'Hayyan',
      value: 'Hayyan'
    },
    {
      label: 'Hoshi',
      value: 'Hoshi'
    },
    {
      label: 'Industrial Area',
      value: 'Industrial Area'
    },
    {
      label: 'Industrial Area 14',
      value: 'Industrial Area 14'
    },
    {
      label: 'Industrial Area 6',
      value: 'Industrial Area 6'
    },
    {
      label: 'Maryam Island',
      value: 'Maryam Island'
    },
    {
      label: 'Masaar',
      value: 'Masaar'
    },
    {
      label: 'Muwaileh',
      value: 'Muwaileh'
    },
    {
      label: 'Muwaileh 3 Building',
      value: 'Muwaileh 3 Building'
    },
    {
      label: 'Muwaileh Building',
      value: 'Muwaileh Building'
    },
    {
      label: 'Muwailih Commercial',
      value: 'Muwailih Commercial'
    },
    {
      label: 'Naseej District',
      value: 'Naseej District'
    },
    {
      label: 'Nasma Residence',
      value: 'Nasma Residence'
    },
    {
      label: 'Robinia',
      value: 'Robinia'
    },
    {
      label: 'Rove Home Aljada',
      value: 'Rove Home Aljada'
    },
    {
      label: 'Sequoia',
      value: 'Sequoia'
    },
    {
      label: 'Sharjah Garden City',
      value: 'Sharjah Garden City'
    },
    {
      label: 'Sharjah Sustainable City',
      value: 'Sharjah Sustainable City'
    },
    {
      label: 'Sharjah Waterfront City',
      value: 'Sharjah Waterfront City'
    },
    {
      label: 'Shoumous Residential Complex',
      value: 'Shoumous Residential Complex'
    },
    {
      label: 'Tilal City',
      value: 'Tilal City'
    }
  ],
  [EmirateEnum.FUJAIRAH]: [
    {
      label: 'Address Fujairah Beach Resort',
      value: 'Address Fujairah Beach Resort'
    },
    {
      label: 'Address Fujairah Beach Resort',
      value: 'Address Fujairah Beach Resort'
    },
    {
      label: 'Address Residences Fujairah Resort',
      value: 'Address Residences Fujairah Resort'
    },
    {
      label: 'Al Aqah',
      value: 'Al Aqah'
    },
    {
      label: 'Al Bidya',
      value: 'Al Bidya'
    },
    {
      label: 'Al Dana Island',
      value: 'Al Dana Island'
    },
    {
      label: 'Al Fanar 2',
      value: 'Al Fanar 2'
    },
    {
      label: 'Al Fanar Towers',
      value: 'Al Fanar Towers'
    },
    {
      label: 'Al Faseel Area',
      value: 'Al Faseel Area'
    },
    {
      label: 'Al Hayl',
      value: 'Al Hayl'
    },
    {
      label: 'Al Jaber Tower',
      value: 'Al Jaber Tower'
    },
    {
      label: 'Al Taif Business Center',
      value: 'Al Taif Business Center'
    },
    {
      label: 'Corniche Al Fujairah',
      value: 'Corniche Al Fujairah'
    },
    {
      label: 'Dibba',
      value: 'Dibba'
    },
    {
      label: 'Fujairah Freezone',
      value: 'Fujairah Freezone'
    },
    {
      label: 'Gurfah Area',
      value: 'Gurfah Area'
    },
    {
      label: 'Ishwais',
      value: 'Ishwais'
    },
    {
      label: 'Kalba',
      value: 'Kalba'
    },
    {
      label: 'Mattar Complex',
      value: 'Mattar Complex'
    },
    {
      label: 'Mattar Residence',
      value: 'Mattar Residence'
    },
    {
      label: 'Mattar Residence 2',
      value: 'Mattar Residence 2'
    },
    {
      label: 'Mattar Residence 3',
      value: 'Mattar Residence 3'
    },
    {
      label: 'Mattar Residence 4',
      value: 'Mattar Residence 4'
    },
    {
      label: 'Mattar Residence 5',
      value: 'Mattar Residence 5'
    },
    {
      label: 'Mattar Residence Mirbah',
      value: 'Mattar Residence Mirbah'
    },
    {
      label: 'Mattar Tower',
      value: 'Mattar Tower'
    },
    {
      label: 'Merashid Area',
      value: 'Merashid Area'
    },
    {
      label: 'Mirbah',
      value: 'Mirbah'
    },
    {
      label: 'Naseem Al Bahr Villas',
      value: 'Naseem Al Bahr Villas'
    },
    {
      label: 'Platinum Time Residence',
      value: 'Platinum Time Residence'
    },
    {
      label: 'Qidfa',
      value: 'Qidfa'
    },
    {
      label: 'Sakamkam',
      value: 'Sakamkam'
    },
    {
      label: 'Saniaya',
      value: 'Saniaya'
    },
    {
      label: 'Sharm',
      value: 'Sharm'
    },
    {
      label: 'The White Village',
      value: 'The White Village'
    },
    {
      label: 'Thoban',
      value: 'Thoban'
    },
    {
      label: 'Town Centre',
      value: 'Town Centre'
    },
    {
      label: 'UNB Building Apartments',
      value: 'UNB Building Apartments'
    }
  ],
  [EmirateEnum.AJMAN]: [
    {
      label: 'Ajman Corniche Residence',
      value: 'Ajman Corniche Residence'
    },
    {
      label: 'Ajman Downtown',
      value: 'Ajman Downtown'
    },
    {
      label: 'Ajman Industrial',
      value: 'Ajman Industrial'
    },
    {
      label: 'Ajman Industrial 2',
      value: 'Ajman Industrial 2'
    },
    {
      label: 'Ajman One Towers',
      value: 'Ajman One Towers'
    },
    {
      label: 'Ajman Pearl Towers',
      value: 'Ajman Pearl Towers'
    },
    {
      label: 'Al Alia',
      value: 'Al Alia'
    },
    {
      label: 'Al Amerah',
      value: 'Al Amerah'
    },
    {
      label: 'Al Bustan',
      value: 'Al Bustan'
    },
    {
      label: 'Al Hamidiya 1',
      value: 'Al Hamidiya 1'
    },
    {
      label: 'Al Hamidiyah',
      value: 'Al Hamidiyah'
    },
    {
      label: 'Al Helio',
      value: 'Al Helio'
    },
    {
      label: 'Al Jurf',
      value: 'Al Jurf'
    },
    {
      label: 'Al Jurf 2',
      value: 'Al Jurf 2'
    },
    {
      label: 'Al Jurf Industrial 3',
      value: 'Al Jurf Industrial 3'
    },
    {
      label: 'Al Jurf Industrial Area',
      value: 'Al Jurf Industrial Area'
    },
    {
      label: 'Al Khor Towers',
      value: 'Al Khor Towers'
    },
    {
      label: 'Al Mowaihat',
      value: 'Al Mowaihat'
    },
    {
      label: 'Al Mowaihat 1',
      value: 'Al Mowaihat 1'
    },
    {
      label: 'Al Mowaihat 2',
      value: 'Al Mowaihat 2'
    },
    {
      label: 'Al Mowaihat 3',
      value: 'Al Mowaihat 3'
    },
    {
      label: 'Al Nakhil',
      value: 'Al Nakhil'
    },
    {
      label: 'Al Nuaimiya',
      value: 'Al Nuaimiya'
    },
    {
      label: 'Al Nuaimiya 1',
      value: 'Al Nuaimiya 1'
    },
    {
      label: 'Al Nuaimiya 2',
      value: 'Al Nuaimiya 2'
    },
    {
      label: 'Al Nuaimiya 3',
      value: 'Al Nuaimiya 3'
    },
    {
      label: 'Al Nuaimiya Towers',
      value: 'Al Nuaimiya Towers'
    },
    {
      label: 'Al Rashidiya',
      value: 'Al Rashidiya'
    },
    {
      label: 'Al Rashidiya 1',
      value: 'Al Rashidiya 1'
    },
    {
      label: 'Al Rashidiya 2',
      value: 'Al Rashidiya 2'
    },
    {
      label: 'Al Rashidiya 3',
      value: 'Al Rashidiya 3'
    },
    {
      label: 'Al Rawda',
      value: 'Al Rawda'
    },
    {
      label: 'Al Rawda 1',
      value: 'Al Rawda 1'
    },
    {
      label: 'Al Rawda 2',
      value: 'Al Rawda 2'
    },
    {
      label: 'Al Rawda 3',
      value: 'Al Rawda 3'
    },
    {
      label: 'Al Rumaila',
      value: 'Al Rumaila'
    },
    {
      label: 'Al Sawan',
      value: 'Al Sawan'
    },
    {
      label: 'Al Yasmeen',
      value: 'Al Yasmeen'
    },
    {
      label: 'Al Zahra',
      value: 'Al Zahra'
    },
    {
      label: 'Al Zahya',
      value: 'Al Zahya'
    },
    {
      label: 'Al Zorah',
      value: 'Al Zorah'
    },
    {
      label: 'City Tower',
      value: 'City Tower'
    },
    {
      label: 'Conqueror Tower',
      value: 'Conqueror Tower'
    },
    {
      label: 'Corniche Ajman',
      value: 'Corniche Ajman'
    },
    {
      label: 'Corniche Tower',
      value: 'Corniche Tower'
    },
    {
      label: 'Emirates City',
      value: 'Emirates City'
    },
    {
      label: 'Gulfa Towers',
      value: 'Gulfa Towers'
    },
    {
      label: 'Horizon Tower',
      value: 'Horizon Tower'
    },
    {
      label: 'Paradise Lakes',
      value: 'Paradise Lakes'
    },
    {
      label: 'Sheikh Maktoum Bin Rashid Street',
      value: 'Sheikh Maktoum Bin Rashid Street'
    }
  ],
  [EmirateEnum.UMM_AL_QUWAIN]: [
    {
      label: 'ADIB Building',
      value: 'ADIB Building'
    },
    {
      label: 'Al Aahad',
      value: 'Al Aahad'
    },
    {
      label: 'Al Abraq 1',
      value: 'Al Abraq 1'
    },
    {
      label: 'Al Butain',
      value: 'Al Butain'
    },
    {
      label: 'Al Dar Al Baida',
      value: 'Al Dar Al Baida'
    },
    {
      label: 'Al Haditha',
      value: 'Al Haditha'
    },
    {
      label: 'Al Hawiyah',
      value: 'Al Hawiyah'
    },
    {
      label: 'Al Huboob 1',
      value: 'Al Huboob 1'
    },
    {
      label: 'Al Huboob 2',
      value: 'Al Huboob 2'
    },
    {
      label: 'Al Humrah',
      value: 'Al Humrah'
    },
    {
      label: 'Al Khor',
      value: 'Al Khor'
    },
    {
      label: 'Al Maidan',
      value: 'Al Maidan'
    },
    {
      label: 'Al Maqtaa',
      value: 'Al Maqtaa'
    },
    {
      label: 'Al Ramlah',
      value: 'Al Ramlah'
    },
    {
      label: 'Al Rass',
      value: 'Al Rass'
    },
    {
      label: 'Al Raudah',
      value: 'Al Raudah'
    },
    {
      label: 'Al Riqqah',
      value: 'Al Riqqah'
    },
    {
      label: 'Al Salam City',
      value: 'Al Salam City'
    },
    {
      label: 'Al Salamah',
      value: 'Al Salamah'
    },
    {
      label: 'Al Serra',
      value: 'Al Serra'
    },
    {
      label: 'Al Shareiah',
      value: 'Al Shareiah'
    },
    {
      label: 'Defence Camp',
      value: 'Defence Camp'
    },
    {
      label: 'Emirates Modern Industrial Area',
      value: 'Emirates Modern Industrial Area'
    },
    {
      label: 'Falaj Al Mualla',
      value: 'Falaj Al Mualla'
    },
    {
      label: 'Falaj Al Sheikh',
      value: 'Falaj Al Sheikh'
    },
    {
      label: 'Green Belt',
      value: 'Green Belt'
    },
    {
      label: 'Industrial Area',
      value: 'Industrial Area'
    },
    {
      label: 'Kabir',
      value: 'Kabir'
    },
    {
      label: 'Khalifah City',
      value: 'Khalifah City'
    },
    {
      label: 'Khalifah City 1',
      value: 'Khalifah City 1'
    },
    {
      label: 'Khalifah City 2',
      value: 'Khalifah City 2'
    },
    {
      label: 'Mallah',
      value: 'Mallah'
    },
    {
      label: 'Masjid Al Mazroui',
      value: 'Masjid Al Mazroui'
    },
    {
      label: 'Old Town Area',
      value: 'Old Town Area'
    },
    {
      label: 'Umm Al Quwain Marina',
      value: 'Umm Al Quwain Marina'
    },
    {
      label: 'Umm Dera',
      value: 'Umm Dera'
    }
  ]
}

export const propertyTypes = [
  {
    label: 'Free Hold',
    value: HoldingTypeEnum.FREE_HOLD
  },
  {
    label: 'Lease Hold',
    value: HoldingTypeEnum.LEASE_HOLD
  }
]

export const statuses = [
  {
    label: 'Fully Furnished',
    value: StatusesEnum.FULLY_FURNISHED
  },
  {
    label: 'Semi Furnished',
    value: StatusesEnum.SEMI_FURNISHED
  },
  {
    label: 'Unfurnished',
    value: StatusesEnum.UNFURNISHED
  }
]

export const amenities = [
  {
    label: 'Property Type',
    value: 1
  },
  {
    label: 'Completion status',
    value: 2
  },
  {
    label: 'Balcony/ Terrace',
    value: 3
  },
  {
    label: 'Double Glazed Windows',
    value: 4
  },
  {
    label: 'Centrally Air-Conditioned',
    value: 5
  },
  {
    label: 'Central Heating',
    value: 6
  },
  {
    label: 'Electricity Backup',
    value: 7
  },
  {
    label: 'Storage Areas',
    value: 8
  },
  {
    label: 'Study Room',
    value: 9
  },
  {
    label: 'Maid Room',
    value: 10
  },
  {
    label: 'Driver Room',
    value: 11
  },
  {
    label: 'Laundry Room',
    value: 12
  },
  {
    label: 'Private Swimming Pool',
    value: 13
  },
  {
    label: 'Number of Parking Spaces',
    value: 14
  },
  {
    label: 'Recreation and Family',
    value: 15
  },
  {
    label: 'Barbeque Area',
    value: 16
  },
  {
    label: 'Day Care Center',
    value: 17
  },
  {
    label: 'Kids Play Area',
    value: 18
  },
  {
    label: 'Lawn or Garden',
    value: 19
  },
  {
    label: 'Cafeteria or Canteen',
    value: 20
  },
  {
    label: 'Laundry and Kitchen',
    value: 21
  },
  {
    label: 'Laundry Facility',
    value: 22
  },
  {
    label: 'Shared Kitchen',
    value: 23
  },
  {
    label: 'Lobby in Building',
    value: 24
  },
  {
    label: 'Elevators in Building',
    value: 25
  },
  {
    label: 'Service Elevators',
    value: 26
  },
  {
    label: 'Prayer Room',
    value: 27
  },
  {
    label: 'Reception/Waiting Room',
    value: 28
  },
  {
    label: 'Health and Fitness',
    value: 29
  },
  {
    label: 'First Aid Medical Center',
    value: 30
  },
  {
    label: 'Jacuzzi',
    value: 31
  },
  {
    label: 'Sauna',
    value: 32
  },
  {
    label: 'Steam Room',
    value: 33
  },
  {
    label: 'Swimming Pool',
    value: 34
  },
  {
    label: 'Facilities for Disabled',
    value: 35
  },
  {
    label: 'Security Staff',
    value: 36
  },
  {
    label: 'Business Center',
    value: 37
  },
  {
    label: 'Pet Allowed',
    value: 38
  },
  {
    label: 'Cleaning and Maintenance',
    value: 39
  },
  {
    label: 'ATM Facility',
    value: 40
  },
  {
    label: 'Nearby Schools',
    value: 41
  },
  {
    label: 'Nearby Hospitals',
    value: 42
  },
  {
    label: 'Nearby Mosque',
    value: 43
  },
  {
    label: 'Nearby Shopping Malls',
    value: 44
  },
  {
    label: 'Distance from Airport',
    value: 45
  },
  {
    label: 'Nearby Metro Station',
    value: 46
  },
  {
    label: 'Other Nearby Places',
    value: 47
  },
  {
    label: 'Other Main Features',
    value: 48
  }
]

export const projectStatuses = [
  {
    label: 'Completed',
    value: ProjectStatusesEnum.COMPLETED
  },
  {
    label: 'Off plan/Under construction',
    value: ProjectStatusesEnum.OFF_PLAN_UNDER_CONSTRUCTION
  },
  {
    label: 'Shell & Core',
    value: ProjectStatusesEnum.SHELL_AND_CORE
  }
]

export const rentedOrVacantOptions = [
  {
    label: 'Vacant',
    value: RentedOrVacantEnum.VACANT
  },
  {
    label: 'Rented',
    value: RentedOrVacantEnum.RENTED
  }
]

export const occupencyStatusOptions = [
  {
    label: 'Vacant',
    value: OccupencyStatusEnum.VACANT
  },
  {
    label: 'Rented',
    value: OccupencyStatusEnum.OCCUPIED
  }
]

export const callPreferences = [
  {
    label: "Ask Purple Roof's staff to handle and address the calls",
    value: 'purpleroof'
  },
  {
    label: 'Personally respond to the calls myself',
    value: 'personally'
  }
]

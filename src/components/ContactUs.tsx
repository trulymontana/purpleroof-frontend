import { otherLinks } from '@/constants/navigation'
import Link from 'next/link'
import React from 'react'

const ContactUs = () => {
    return (
        <div><span className='text-sm'>Having trouble?</span> <Link href={otherLinks.CONTACT_US} className='text-primary underline underline-offset-2 text-md'>Contact us</Link> </div>
    )
}

export default ContactUs
import React from 'react'
import PhoneIcon from '../icons/PhoneIcon'

export default function Footer({ className }: { className?: string }) {
    return (
        <section className='w-full'>
            <div className={`bg-sky-900 xl:text-lg lg:flex hidden flex-row justify-between ${className} w-full text-white xl:px-16 px-10 py-2.5`}>
                <p className='font-semibold'>Contact Center</p>
                <p>Bank BTN KC PALANGKARAYA</p>
                <p>EXT : TELLER / HEAD TELLER </p>
                <p className='inline-flex items-center'><PhoneIcon /> (0536) 3220602</p>
                <p className='inline-flex items-center'><PhoneIcon /> (0536) 3223975</p>
            </div>
            <div className={`bg-sky-900 xl:text-lg lg:hidden flex md:flex-row flex-col md:justify-between md:items-start items-center w-full text-white px-16 py-2.5 md:gap-0 gap-2 ${className}`}>
                <p className='font-semibold md:mb-0 mb-4'>Contact Center</p>
                <div className='flex flex-col md:gap-2 gap-1'>
                    <p>Bank BTN KC PALANGKARAYA</p>
                    <p>EXT : TELLER / HEAD TELLER </p>
                </div>
                <div className='flex flex-col md:gap-2 gap-1'>
                    <p className='inline-flex items-center'><PhoneIcon /> (0536) 3220602</p>
                    <p className='inline-flex items-center'><PhoneIcon /> (0536) 3223975</p>
                </div>
            </div>
        </section>
    )
}

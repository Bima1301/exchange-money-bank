
import React from 'react'
import BigTriangelVector from '../atoms/BigTriangelVector'
import SmallTriangleVector from '../atoms/SmallTriangleVector'
import Image from 'next/image'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'
import Link from 'next/link'

export default function Layout({ children, className, isTopLogo }: { children: React.ReactNode, className?: string, isTopLogo?: boolean }) {
    return (
        <main className={className}>
            <Toaster />
            {isTopLogo && (
                <Link href={'/'} className="absolute md:left-16 left-4 md:top-4 top-2 z-50 md:max-w-none max-w-[100px]">
                    <Image
                        src="/images/btnLogo.png"
                        alt="Bank BTN"
                        width={180}
                        height={180}
                    />
                </Link>
            )}
            {children}
            <BigTriangelVector className={`absolute md:bottom-0 ${isTopLogo ? "-bottom-4" : "-bottom-24"}  right-0`} />
            <SmallTriangleVector className={`absolute md:bottom-0 ${isTopLogo ? "bottom-20" : "-bottom-10"}  right-0 z-10`} />
            {isTopLogo && (
                <Footer
                    className='w-full md:mt-36 mt-10 relative z-50'
                />
            )}
        </main>
    )
}

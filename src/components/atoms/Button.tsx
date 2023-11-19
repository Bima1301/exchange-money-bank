import React from 'react'
import ArrowRight from '../icons/ArrowRight'

type ButtonProps = {
    children: React.ReactNode
    isArrow?: boolean
    disabled?: boolean
    className?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    type?: "button" | "submit" | "reset" | undefined,
}

export default function Button({ children, isArrow, disabled, className, onClick, type }: ButtonProps) {
    return (
        <button onClick={onClick} className={`md:px-8 px-6 md:py-4 py-2 ${disabled ? "bg-red-600/60" : "bg-red-600"}  rounded-lg shadow justify-center items-center gap-4 inline-flex text-white lg:text-2xl md:text-xl font-medium ${className}`} disabled={disabled} type={type}>
            {children}
            {isArrow && <ArrowRight />}
        </button>
    )
}

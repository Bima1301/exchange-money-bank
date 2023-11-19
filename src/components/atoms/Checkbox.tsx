'use client'
import React from 'react'

export default function Checkbox(
    { label, className, onChange }: { label: string, className?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }
) {
    return (
        <div className={`inline-flex items-center ${className}`}>
            <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                htmlFor='ripple-on'
            >
                <input
                    onChange={onChange}
                    id="ripple-on"
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-600 checked:bg-red-600 checked:before:bg-red-600 hover:before:opacity-10"
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>
            </label>
            <label
                className="mt-px cursor-pointer font-normal text-slate-500 text-base"
                htmlFor="ripple-on"
            >
                {label}
            </label>
        </div>
    )
}

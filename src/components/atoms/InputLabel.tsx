import { Input } from 'antd'
import React from 'react'

type InputLabelProps = {
    label: string
    className?: string
    id: string
    type?: string
    placeholder?: string
    value?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    defaultValue?: string,
    errorMessage?: string
}
export default function InputLabel(
    { label, className, id, type, placeholder, value, onChange, errorMessage }: InputLabelProps
) {
    return (
        <div className={`flex flex-col gap-2 ${className} text-gray-600 w-full`}>
            <label className='text-opacity-90 font-semibold md:text-base text-sm' htmlFor={id}>{label}</label>
            <Input
                type={type || "text"} placeholder={placeholder} value={value} onChange={onChange} id={id} defaultValue={value}
                className='h-[53.6px] rounded-md border border-gray-300 px-4 py-2 text-base w-full'
            />
            {errorMessage && (
                <small className='text-red-500 text-opacity-90 text-xs'>{errorMessage}</small>
            )}
        </div>
    )
}

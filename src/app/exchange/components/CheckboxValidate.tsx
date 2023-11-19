'use client'
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import Link from "next/link";
import { useState } from "react";

const CheckboxValidate = () => {
    const [isCheck, setIsCheck] = useState(false);
    return (
        <div className=' z-30 flex flex-col max-w-screen-md lg:px-0 px-5'>
            <p className=' text-zinc-800 md:text-lg text-base font-semibold mb-3'>Syarat dan ketentuan :</p>
            <ol className='text-gray-600 text-opacity-90 md:text-lg text-base font-normal px-5'>
                <li>Penukaran uang baru berlaku khusus untuk nasabah BANK BTN</li>
                <li>Penukaran uang baru dapat dipesan selama persediaan masih tersedia sesuai dengan stok pada tabel ketersediaan uang diatas.</li>
                <li>Penukaran uang dilakukan di KC PALANGKARAYA
                </li>
            </ol>
            <Checkbox
                className=' mt-6 mb-16 w-full '
                label='Saya menyetujui Syarat dan Ketentuan yang berlaku'
                onChange={() => setIsCheck(!isCheck)}
            />
            <div className='w-full flex justify-center max-w-[598px]s'>

                <p className='text-center w-full   text-zinc-800 text-lg font-semibold px-4 md:leading-[28.80px] mb-16'>Jika anda belum menjadi nasabah BANK BTN Anda dapat mengakses{" "}
                    <Link className='underline' target='_blank' href="https://virtualbranch.btn.co.id/">https://virtualbranch.btn.co.id/</Link> {" "}
                    Untuk pembuatan rek online atau hub Customer Service BANK BTN Terdekat</p>
            </div>
            <Link href={'/exchange/form'} className='flex justify-center'>
                <Button isArrow disabled={!isCheck} >
                    PESAN SEKARANG
                </Button>
            </Link>
        </div>
    );
}

export default CheckboxValidate;
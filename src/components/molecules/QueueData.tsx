'use client'
import { getURL } from "@/libs/utils";
import { QRCode } from "antd";
import { use, useEffect, useState } from "react";

export default function QueueData({ data }: any) {
    const [currentUrl, setCurrentUrl] = useState('');
    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, [data])
    return (
        <div className='w-full max-w-3xl flex flex-col md:gap-12 gap-8 justify-center items-center'>
            <p className="lg:text-4xl md:text-2xl text-xl font-semibold text-center uppercase">Anda mendapat nomor antrian</p>
            <div className="flex flex-col justify-center items-center">
                <p className="text-sky-900 lg:text-[80px] text-[64px]  font-semibold ">{
                    //convert to hundred if 1 become 001, if 23 become 023, if 123 become 123
                    data?.queue?.toString().length === 1 ? `00${data?.queue}` :
                        data?.queue?.toString().length === 2 ? `0${data?.queue}` : data?.queue
                }</p>
                <div className='bg-white md:p-5 p-3'>
                    <QRCode value={currentUrl} />
                </div>
            </div>

            <p className="lg:text-2xl md:text-xl text-lg font-semibold text-center">Silahkan tunjukkan nomor antrian ini ke petugas bank BTN KC PALANGKARAYA</p>
            <div className='flex flex-col gap-9 py-9 w-full'>
                <div className='grid grid-cols-2 md:gap-12 gap-5'>
                    <div className=" flex-col justify-start items-start gap-2 inline-flex">
                        <p className="text-base font-semibold ">Nama Nasabah</p>
                        <div className="text-xl font-normal capitalize">{data.name}</div>
                    </div>
                    <div className=" flex-col justify-start items-start gap-2 inline-flex">
                        <p className="text-base font-semibold ">Nomor Rekening</p>
                        <div className="text-xl font-normal ">{data.accountNumber}</div>
                    </div>
                </div>
                <div className='grid grid-cols-2 md:gap-12 gap-5'>
                    <div className=" flex-col justify-start items-start gap-2 inline-flex">
                        <p className="text-base font-semibold ">Keperluan</p>
                        <div className="text-xl font-normal ">{data.purpose}</div>
                    </div>
                    <div className=" flex-col justify-start items-start gap-2 inline-flex">
                        <p className="text-base font-semibold ">No. Hp</p>
                        <div className="text-xl font-normal ">{data.phoneNumber}</div>
                    </div>
                </div>
                <div className=" flex-col justify-start items-start gap-2 inline-flex">
                    <p className="text-base font-semibold ">Jumlah Penukaran</p>
                    {data.totalExchange.map((item: any, index: number) => (
                        <div key={index} className="inline-flex gap-6  text-xl">
                            <p>{
                                //convert item.fraction to Rp. 1.000,00 add ,00 if not have decimal
                                new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.fraction).replace(',00', '') + ",00-"
                            }</p>
                            <p>{item.total + " " + item.type}</p>
                        </div>
                    ))}
                </div>
                <div className=" flex-col justify-start items-start gap-2 inline-flex">
                    <p className="text-base font-semibold ">Waktu Pengambilan</p>
                    <p className='text-xl'>{
                        //convert item.datePickUp to 12/12/2021
                        new Date(data.datePickUp).toLocaleDateString()
                    } Pukul {
                            //convert item.timePickUp from 12:00 to 12.00
                            data.timePickUp.replace(':', '.')
                        }</p>
                </div>
            </div>
            <p className="text-center md:text-2xl text-lg">Terimakasih telah menggunakan layanan kami</p>
        </div>
    )
}

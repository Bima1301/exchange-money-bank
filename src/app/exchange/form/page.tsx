
'use client'
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs';
import { DatePicker, Input, Select, TimePicker } from 'antd';
import toast from 'react-hot-toast';
import { validateTotalExchange } from '@/libs/utils';
import { useRouter } from 'next/navigation';
import InputLabel from '@/components/atoms/InputLabel';
import Layout from '@/components/molecules/Layout';
import AlertIcon from '@/components/icons/AlertIcon';
import axios from 'axios';

export default function Home() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>(null);
    const [totalExchangeErrors, setTotalExchangeErrors] = useState<any>(null);
    const [data, setData] = useState<any>({
        name: '',
        accountNumber: '',
        purpose: '',
        phoneNumber: '',
        totalExchange: [
            {
                id: '',
                fraction: '',
                total: '',
                type: ''
            }
        ],
        datePickUp: '',
        timePickUp: ''
    })
    const [options, setOptions] = useState<any>([])

    const getStock = async () => {
        await axios.get('/api/stock').then((res) => {
            if (res.status !== 200) {
                toast.error('Terjadi kesalahan')
                return
            }
            const data = res.data
            let newOptions = data?.stock?.map((item: any) => ({
                label: `${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.fraction).replace(',00', '')} ${item.type == "Koin" ? "(Koin)" : ""}`,
                value: `${item.type == "Koin" ? `${item.fraction} Koin` : `${item.fraction} Lembar`} ${item.id}`
            }))
            setOptions(newOptions)
        }).catch((err) => {
            console.log(err);
            toast.error('Terjadi kesalahan')
        })
    }
    useEffect(() => {
        getStock()
    }, [])

    const handleChanges = (e: any) => {
        setData((prev: any) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleTotalExchangeChange = (index: number, value: any, name: string) => {
        let newData = [...data.totalExchange]
        newData[index].type = name == "fraction" ? value.split(" ")[1] : newData[index].type
        newData[index][name] = name == "fraction" ? Number(value.split(" ")[0]) : Number(value)
        newData[index].id = name == "fraction" ? value.split(" ")[2] : newData[index].id
        // setData({ ...data, totalExchange: newData })
        setData((prev: any) => ({ ...prev, totalExchange: newData }));

        if (index == newData.length - 1 && newData[index].fraction && newData[index].total) {
            if (newData.length == 11) {
                return
            }
            newData.push({ fraction: '', total: '' })
            setData((prev: any) => ({ ...prev, totalExchange: newData }));
        }

        if (index == newData.length - 2 && !newData[index].total) {
            newData.pop()
            setData((prev: any) => ({ ...prev, totalExchange: newData }));
        }

        if (index != newData.length - 1 && (!newData[index].total || !newData[index].fraction)) {
            setTotalExchangeErrors({
                ...totalExchangeErrors,
                totalExchange: {
                    ...totalExchangeErrors?.totalExchange,
                    [index]: "Tidak boleh kosong"
                }
            })
        } else {
            setTotalExchangeErrors({
                ...totalExchangeErrors,
                totalExchange: {
                    ...totalExchangeErrors?.totalExchange,
                    [index]: ""
                }
            })
        }
    };


    const handleSubmitForm = async (e: SyntheticEvent) => {
        e.preventDefault();
        toast.loading("Mengirim data...");
        setIsLoading(true);
        // VALIDATE TOTAL EXCHANGE
        if (data.totalExchange[0]?.fraction === '' || data.totalExchange[0]?.total === '') {
            setTotalExchangeErrors({
                ...totalExchangeErrors,
                totalExchange: {
                    ...totalExchangeErrors?.totalExchange,
                    0: "Tidak boleh kosong"
                }
            })
            toast.error("Terdapat kesalahan pada jumlah penukaran");
            setIsLoading(false);
            toast.dismiss();
            return
        }
        if (data.totalExchange.length > 1) {
            let newError = validateTotalExchange(data.totalExchange);
            if (newError.length > 0) {
                setTotalExchangeErrors({
                    ...totalExchangeErrors,
                    totalExchange: newError.reduce((acc: any, curr: any) => {
                        acc[curr.key] = curr.value;
                        return acc;
                    }, {})
                });
                toast.error("Terdapat kesalahan pada jumlah penukaran");
                setIsLoading(false);
                toast.dismiss();
                return
            }
        };
        // END VALIDATE TOTAL EXCHANGE

        await axios.post('/api/exchange', data).then((res) => {
            localStorage.setItem("exchange_id", res?.data?.data?.id || '');
            toast.dismiss();
            setIsLoading(false);
            formRef.current?.reset();
            setData({
                name: '',
                accountNumber: '',
                purpose: '',
                phoneNumber: '',
                totalExchange: [
                    {
                        fraction: '',
                        total: '',
                        type: ''
                    }
                ],
                datePickUp: '',
                timePickUp: ''
            })
            toast.success(res.data.message);
            router.push(`/queue/${res?.data.data?.id}`);
            toast.loading("Mengalihkan ke halaman antrian...");
            setErrors(null);
        }).catch((err) => {
            console.log(err);
            toast.dismiss();
            toast.error("Terjadi kesalahan");
            setIsLoading(false);
            if (err.response.data.type === "validation") {
                setErrors(err.response.data.errors);
                return;
            } else {
                toast.error(err.response.data.message);
                return;
            }
        })
        // if (response.status === "error") {
        //     setIsLoading(false);
        //     if (response.type === "validation") {
        //         setErrors(response.errors);
        //         return;
        //     } else {
        //         toast.error(response.message);
        //         return;
        //     }
        // }
        // if (response.status === "success") {
        //     localStorage.setItem("exchange_id", response?.data?.id || '');
        //     setIsLoading(false);
        //     formRef.current?.reset();
        //     setData({
        //         name: '',
        //         accountNumber: '',
        //         purpose: '',
        //         phoneNumber: '',
        //         totalExchange: [
        //             {
        //                 fraction: '',
        //                 total: '',
        //                 type: ''
        //             }
        //         ],
        //         datePickUp: '',
        //         timePickUp: ''
        //     })
        //     toast.success(response.message);
        //     toast.loading("Mengalihkan ke halaman antrian...");
        //     router.push(`/queue/${response?.data?.id}`);
        //     setErrors(null);
        // }
    };
    return (
        <Layout isTopLogo className='h-full relative overflow-hidden'>
            <div className="w-full h-full relative flex flex-col justify-center items-center lg:px-0 px-5 md:pt-28 pt-20 overflow-hidden z-30">
                <p className="text-zinc-800 lg:text-4xl md:text-2xl text-xl font-semibold text-center mb-10">PECAHAN UANG YANG TERSEDIA</p>
                {options.length > 0 ? (
                    <form ref={formRef} onSubmit={handleSubmitForm}
                        className='w-full max-w-3xl flex flex-col gap-3'>
                        <InputLabel
                            label='Nama Nasabah'
                            type='text'
                            placeholder='Nama Anda'
                            id='name'
                            value={data.name}
                            onChange={handleChanges}
                            errorMessage={errors?.name}
                        />
                        <InputLabel
                            label='Nomor Rekening'
                            type='text'
                            placeholder='Nomor Rekening Anda'
                            id='accountNumber'
                            value={data.accountNumber}
                            onChange={(e) => {
                                if (isNaN(Number(e.target.value))) {
                                    return
                                }
                                setData((prev: any) => ({ ...prev, accountNumber: e.target.value }));
                            }}
                            errorMessage={errors?.accountNumber}
                        />
                        <InputLabel
                            label='Keperluan'
                            type='text'
                            placeholder='Keperluan penukaran uang Anda'
                            id='purpose'
                            value={data.purpose}
                            onChange={handleChanges}
                            errorMessage={errors?.purpose}
                        />
                        <InputLabel
                            label='No. Hp'
                            type='text'
                            placeholder='Nomor Hp Anda'
                            id='phoneNumber'
                            value={data.phoneNumber}
                            onChange={(e) => {
                                if (isNaN(Number(e.target.value))) {
                                    return
                                }
                                setData((prev: any) => ({ ...prev, phoneNumber: e.target.value }));
                            }}
                            errorMessage={errors?.phoneNumber}
                        />
                        <div className='flex flex-col gap-2 text-gray-600'>
                            <p className='text-opacity-90 font-semibold md:text-base text-sm'>Jumlah Penukaran</p>
                            {data.totalExchange.map((item: any, index: number) => (
                                <div key={index} className='flex w-full md:flex-row flex-col md:gap-6 gap-3 md:max-w-[70%]' >
                                    <Select
                                        placeholder="Pilih Pecahan"
                                        style={{ height: "53.6px" }} className='w-full'
                                        options={options}
                                        id='fraction'
                                        value={item.fraction || null}
                                        showSearch
                                        onChange={(e) => handleTotalExchangeChange(index, e, "fraction")}
                                    />
                                    <div className=' w-full flex flex-col'>
                                        <Input type="number" placeholder="Tulis jumlah lembar/koin"
                                            className='w-full' style={{ height: "53.6px" }}
                                            id='total'
                                            value={item.total}
                                            onChange={(e) => {
                                                if (data.totalExchange[index].fraction === '') {
                                                    setTotalExchangeErrors({
                                                        ...totalExchangeErrors,
                                                        totalExchange: {
                                                            ...totalExchangeErrors?.totalExchange,
                                                            [index]: "Mohon isi pecahan terlebih dahulu"
                                                        }
                                                    })
                                                    return
                                                }
                                                handleTotalExchangeChange(index, e.target.value, "total");
                                            }}
                                        />
                                        {
                                            totalExchangeErrors?.totalExchange && totalExchangeErrors?.totalExchange[index] && (
                                                <small className='text-red-500 text-opacity-90 text-xs'>{totalExchangeErrors.totalExchange[index]}</small>
                                            )
                                        }
                                    </div>

                                </div>
                            ))}
                            <small className='text-gray-600 text-opacity-70'>*Maksimal penukaran 1 nasabah 200 lembar per denom</small>
                        </div>
                        <div className='flex flex-col gap-2 text-gray-600'>
                            <p className='text-opacity-90 font-semibold md:text-base text-sm'>Waktu Pengambilan</p>
                            <div className='flex md:flex-row flex-col md:gap-6 gap-3 md:max-w-[70%] w-full'>
                                <div className='flex flex-col w-full'>
                                    <DatePicker
                                        style={{ height: "53.6px" }}
                                        className='w-full focus:ring-0 focus: outline-0'
                                        placeholder='Tanggal'
                                        format={'DD/MM/YYYY'}
                                        value={data.datePickUp && dayjs(data.datePickUp, "YYYY-MM-DD")}
                                        onChange={(e) => {
                                            setData((prev: any) => ({ ...prev, datePickUp: dayjs(e).format("YYYY-MM-DD") }));
                                        }}
                                    />
                                    {errors?.datePickUp && (
                                        <small className='text-red-500 text-opacity-90 text-xs'>{errors.datePickUp}</small>

                                    )}
                                </div>
                                <div className='flex flex-col w-full'>
                                    <TimePicker
                                        style={{ height: "53.6px" }}
                                        className='w-full'
                                        format={'HH:mm'}
                                        placeholder='Pukul'
                                        value={data.timePickUp && dayjs(data.timePickUp, "HH:mm")}
                                        onChange={(e) => {
                                            setData((prev: any) => ({ ...prev, timePickUp: dayjs(e).format("HH:mm") }));
                                        }}
                                        popupClassName='timePicker'
                                    />
                                    {errors?.timePickUp && (
                                        <small className='text-red-500 text-opacity-90 text-xs'>{errors.timePickUp}</small>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='mt-9 bg-red-100 flex flex-row justify-center md:items-center gap-6 px-8 py-4 text-red-500 md:text-lg'>
                            <div className=''>
                                <AlertIcon />
                            </div>
                            <div className='flex flex-col'>
                                <p>Untuk pemesanan lebih dari 200 lembar harus konfirmasi 1 hari sebelumnya</p>
                                <ul className='pl-5'>
                                    <li>Untuk kertas min 100 lembar max 200 lembar</li>
                                    <li>Untuk koin min 250 koin max 500koin</li>
                                </ul>
                            </div>
                        </div>
                        <button
                            className={`md:px-8 px-6 md:py-4 py-2 ${isLoading ? "bg-red-600/60" : "bg-red-600"} rounded-lg shadow justify-center items-center gap-4 inline-flex text-white `}
                            onClick={() => setIsLoading(true)}
                            type="submit"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white rounded-full animate-spin" />
                            ) : null}
                            <p className="lg:text-2xl md:text-xl font-medium ">
                                KIRIM
                            </p>
                        </button>
                    </form>
                ) : (
                    <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
            </div >
        </Layout >
    )
}
function checkNonEmptyValues(data: any) {
    for (let key in data) {
        if (data[key] === 'Tidak boleh kosong') {
            return true;
        }
    }
    return false;
}
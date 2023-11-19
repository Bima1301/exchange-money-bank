import Layout from '@/components/molecules/Layout'
import { PrismaClient } from "@prisma/client";
import CheckboxValidate from './components/CheckboxValidate';

const prisma = new PrismaClient();

const getStock = async () => {
    const dateNow = new Date();
    const getLatestExchange = await prisma.exchange.findFirst({
        orderBy: {
            createdAt: "desc"
        }
    });

    if (getLatestExchange && getLatestExchange.createdAt.getDate() !== dateNow.getDate()) {
        await prisma.stock.updateMany({
            data: {
                quantity: 2000
            }
        });
    }
    const res = await prisma.stock.findMany({
        orderBy: {
            number: 'asc'
        }

    });

    return res;
}


const Exchange = async () => {
    const [data] = await Promise.all([getStock()]);
    return (
        <Layout isTopLogo className='h-full relative overflow-hidden w-full'>
            <div className="w-full flex flex-col justify-center items-center  md:px-0 px-5 md:pt-28 pt-20 overflow-hidden">
                <p className="text-zinc-800 lg:text-4xl md:text-2xl text-xl font-semibold text-center mb-10">PECAHAN UANG YANG TERSEDIA</p>
                {data ? (
                    <>
                        <div className='flex flex-col w-full md:max-w-[480px] max-w-[330px] relative z-30 mb-16'>
                            {data?.length > 0 ? data?.map((item: any, index: number) => (
                                <div key={index} className={`${index % 2 == 0 && "bg-blue-50"} grid grid-cols-2 md:text-lg text-base `}>
                                    <p className=" text-gray-600 font-medium md:px-10 md:py-4 px-7 py-3 text-end">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.fraction).replace(',00', '')}
                                    </p>
                                    <p className=" text-sky-900 font-semibold md:px-10 md:py-4 px-5 py-3">{item.quantity} <span className='text-gray-600 md:text-lg text-base font-normal'>{item.type}</span></p>
                                </div>
                            )) : (
                                <p className='font-bold text-center text-red-300'>Tidak ada stock</p>
                            )}
                        </div>
                        <CheckboxValidate />
                    </>
                ) :
                    (
                        <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}


            </div>
        </Layout>
    )
}

export default Exchange
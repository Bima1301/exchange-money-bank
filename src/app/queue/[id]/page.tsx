
import Layout from '@/components/molecules/Layout'
import QueueData from '@/components/molecules/QueueData'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const getExchange = async (id: string) => {
    const res = await prisma.exchange.findUnique({
        where: {
            id: id,
        },
        include: {
            totalExchange: true,
        }
    });
    return res;
}

export default async function Home({ params }: { params: any }) {
    const { id } = params;
    const [data] = await Promise.all([getExchange(id)]);
    return (
        <Layout isTopLogo className='h-full relative overflow-hidden'>
            <div className={`w-full ${data ? "h-full" : "h-screen"}  relative flex flex-col justify-center items-center lg:px-0 px-5 md:pt-28 pt-20 overflow-hidden z-30 text-zinc-800`}>
                {data ? (
                    <QueueData
                        data={data}
                    />
                ) : (
                    <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
            </div>
        </Layout>
    )
}

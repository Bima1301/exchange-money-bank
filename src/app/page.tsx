import Button from '@/components/atoms/Button'
import Layout from '@/components/molecules/Layout'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout className="w-full min-h-screen relative flex flex-col justify-center items-center overflow-hidden">
      <div className='md:w-[576px] md:px-0 px-5 flex flex-col justify-center items-center relative z-30'>
        <Image
          src="/images/btnLogo.png"
          alt="Bank BTN"
          width={236}
          height={236}
          className="relative z-10"
        />
        <p className='text-zinc-800 lg:text-[40px] md:text-[32px] font-semibold text-center md:leading-[56px] mb-6'>Selamat datang di Antrian Penukaran Uang Baru</p>
        <p className=" text-center text-zinc-800 lg:text-[32px] md:text-[24px] font-medium mb-12">Bank BTN KC Palangkaraya</p>
        <Link href={'/exchange'} >
          <Button isArrow={true}>
            Masuk
          </Button>
        </Link>
      </div>
    </Layout>
  )
}

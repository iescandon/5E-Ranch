// import Image from 'next/image'
// import { Inter } from 'next/font/google'
import Hero from '@/components/hero';
import Nav from '@/components/nav';
import getContent from '@/utils/getContent'

// const inter = Inter({ subsets: ['latin'] })

export default function Home({content}) {
  return (
    <main>
      <Nav content={content} />
      <Hero content={content} />
      {/* <div className='flex flex-row justify-center h-[400px]'> */}
      <div className='relative flex flex-col-reverse md:flex-row justify-center w-full px-4 py-8 md:p-6 lg:p-8'>
        <div className='w-full pt-8 md:pt-0 md:w-1/2'>
          <img src={content[0].fields.otherPics[24].fields.file.url} className=""/>
        </div>
        <div className='relative w-full md:w-1/2 md:pl-8'>
          <p className='text-xl md:text-2xl lg:text-3xl font-bold font-jakarta pb-2'>Naturally Better</p>
          <p className='text-sm font-jakarta'>The best option for beef for your family, comes from a fresh locally grown farm. 5E Ranch provides the best in beef and wagyu beef in Texas.</p>
          {/* <div className="absolute border-b-[16px] border-r-[16px] border-black w-2/3 h-2/3 right-0 bottom-0 hidden md:block"></div> */}
        </div>
      </div>
      {/* <div className='bg-black h-[150px] w-full flex flex-row justify-center'>
        <img src={content[0].fields.logos[7].fields.file.url} className='h-full p-6'/>
      </div> */}
      {/* <div className='p-4 md:p-6 lg:p-8'>
        <p className='text-xl md:text-2xl lg:text-3xl font-bold font-jakarta pb-2'>Our Story</p>
        <p className='text-sm font-jakarta'>The best option for beef for your family, comes from a fresh locally grown farm. 5E Ranch provides the best in beef and wagyu beef in Texas.</p>
      </div> */}
    </main>
  )
}

Home.getInitialProps = async () => {
  const content = await getContent("homePageContent");
  return { content };
};

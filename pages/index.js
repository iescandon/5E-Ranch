// import Image from 'next/image'
// import { Inter } from 'next/font/google'
import getContent from '@/utils/getContent'

// const inter = Inter({ subsets: ['latin'] })

export default function Home({content}) {
  return (
    <main>
      <div className='relative top-0 left-0 sm:h-[250px] md:h-[350px] lg:h-[550px]'>
        <img src={content[0].fields.heroImage.fields.file.url} className='h-full w-full object-cover'/>
        {/* <div className='absolute inset-0 flex flex-row items-end justify-start'> */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black from-40% flex flex-row items-center justify-center'>
          {/* <img src={content[0].fields.logos[5].fields.file.url} className='h-[150px] md:h-[250px] lg:h-[250px] drop-shadow-2xl'/> */}
        </div>
      </div>
      <div className='flex flex-row justify-center h-[400px] bg-black'>
        {/* <img src={content[0].fields.logos[5].fields.file.url} className='h-[150px] md:h-[250px] lg:h-[350px] opacity-70'/> */}
      </div>
    </main>
  )
}

Home.getInitialProps = async () => {
  const content = await getContent("homePageContent");
  return { content };
};

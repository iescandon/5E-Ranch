// import Image from 'next/image'
// import { Inter } from 'next/font/google'
import getContent from '@/utils/getContent'

// const inter = Inter({ subsets: ['latin'] })

export default function Home({content}) {
  return (
    <main>
      <div className='relative top-0 left-0 sm:h-[250px] md:h-[350px] lg:h-[450px]'>
      {/* {content[0].fields.heroImage.fields.file.url} */}
      {/* {content[0].fields.otherPics[0].fields.file.url} */}
        <img src={content[0].fields.otherPics[0].fields.file.url} className='h-full w-full object-cover object-center'/>
        {/* <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black from-5%'> */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black flex flex-row items-center justify-center'>
          <img src={content[0].fields.logos[7].fields.file.url} className='h-[100px] md:h-[200px] lg:h-[300px] drop-shadow-2xl opacity-50'/>
        </div>
      </div>
      <div className='h-[600px] bg-black'></div>
      {/* <div className="h-[400px] bg-white bg-gradient-to-b from-black to-white"></div> */}
    </main>
  )
}

Home.getInitialProps = async () => {
  const content = await getContent("homePageContent");
  return { content };
};

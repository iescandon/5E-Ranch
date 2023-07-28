import Hero from '@/components/hero';
import Nav from '@/components/nav';
import getContent from '@/utils/getContent'

export default function Home({content}) {
  return (
    <main>
      {/* <Nav content={content} /> */}
      <Hero content={content} />
      <div className='relative flex flex-col-reverse md:flex-row justify-center w-full px-4 py-8 md:p-6 lg:p-8'>
        <div className='w-full pt-8 md:pt-0 md:w-1/2'>
          <img src={content[0].fields.otherPics[24].fields.file.url} className=""/>
        </div>
        <div className='relative w-full md:w-1/2 md:pl-8'>
          <h3 className='text-xs lg:text-sm font-jakarta'>JAPANESE WAGYU BEEF</h3>
          <h2 className='text-xl md:text-2xl lg:text-3xl font-bold font-jakarta pb-4'>Naturally Better</h2>
          <p className='text-sm font-jakarta pb-6'>The best option for beef for your family, comes from a fresh locally grown farm. 5E Ranch provides the best in beef and wagyu beef in Texas.</p>
          <button className="bg-black text-white p-3">LEARN MORE</button>
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


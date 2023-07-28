import Hero from '@/components/hero';
// import Nav from '@/components/nav';
import getContent from '@/utils/getContent'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function Home({content}) {
  return (
    <main>
      {/* <Nav content={content} /> */}
      <Hero content={content} />
      {/* intro */}
      <div className='relative flex flex-col-reverse md:flex-row justify-center w-full px-4 py-8 md:p-6 lg:p-8'>
        <div className='w-full pt-8 md:pt-0 md:w-1/2'>
          <img src={content[0].fields.otherPics[24].fields.file.url} className=""/>
        </div>
        <div className='relative w-full md:w-1/2 md:pl-8'>
          <h4 className='text-xs lg:text-sm font-jakarta'>WHO WE ARE</h4>
          <h3 className='text-xl md:text-2xl lg:text-3xl font-bold font-jakarta pb-4'>Naturally Better</h3>
          <p className='text-sm font-jakarta pb-6'>The best option for beef for your family, comes from a fresh locally grown farm. 5E Ranch provides the best in beef and wagyu beef in Texas.</p>
          <p className='pb-6'>Located near Guthrie, Texas, the ranch is dedicated to the production of the finest American Quarter Horses and Angus cattle in the country, as well as providing state-of-the-art veterinary and reproductive services.</p>
          <button className="bg-black text-white p-3">LEARN MORE</button>
        </div>
      </div>
      {/* line break photos */}
      {/* <div className='relative w-full flex flex-row'>
        <img src={content[0].fields.otherPics[13].fields.file.url} className='h-[16.666667vw] w-1/6 object-cover'/>
        <img src={content[0].fields.otherPics[15].fields.file.url} className='h-[16.666667vw] w-1/6 object-cover'/>
        <img src={content[0].fields.otherPics[17].fields.file.url} className='h-[16.666667vw] w-1/6 object-cover'/>
        <img src={content[0].fields.otherPics[19].fields.file.url} className='h-[16.666667vw] w-1/6 object-cover'/>
        <img src={content[0].fields.otherPics[17].fields.file.url} className='h-[16.666667vw] w-1/6 object-cover'/>
        <img src={content[0].fields.otherPics[18].fields.file.url} className='h-[16.666667vw] w-1/6 object-cover'/>
      </div> */}
      {/* our products */}
      <div className='flex flex-row justify-center p-4 md:p-6 lg:p-8 bg-slate-200'>
        <div className='relative flex flex-col items-center max-w-[1100px]'>
          {/* <img src='/images/cattle.png' className='h-[200px] w-[300px]'/> */}
          <div className='h-[250px]'>
            <img src={content[0].fields.logos[2].fields.file.url} className='h-full'/>
          </div>
          <h2 className='text-xl md:text-2xl lg:text-3xl font-extrabold font-jakarta pb-4 text-center'>A historic Texas ranch built on a legacy of people with passion, quarter horses with pedigree and cattle with heritage</h2>
          <div className="border border-slate-400 w-1/3 m-4"></div>
          <p className='p-4'>Located near Guthrie, Texas, the ranch is dedicated to the production of the finest American Quarter Horses and Angus cattle in the country, as well as providing state-of-the-art veterinary and reproductive services.</p>
          <div className='flex flex-row flex-wrap justify-center'>
            {/* card */}
            <div className='w-[300px] h-[350px] rounded-lg shadow-lg m-4 bg-cover bg-center' style={{ backgroundImage: `url(/images/wagyu.png)` }} >
              <div className='flex flex-col h-full justify-end p-8'>
                <h5 className='text-xl font-bold pt-2 text-white pb-2 drop-shadow-md'>Beef</h5>
                <button className="border-white border-2 text-white p-3 drop-shadow-md bg-black bg-opacity-30">SHOP NOW</button>
              </div>
            </div>
            {/* card */}
            <div className='w-[300px] h-[350px] rounded-lg shadow-lg m-4 bg-cover bg-center' style={{ backgroundImage: `url(${content[0].fields.otherPics[16].fields.file.url})` }} >
              <div className='flex flex-col h-full justify-end p-8'>
                <h5 className='text-xl font-bold pt-2 text-white pb-2 drop-shadow-md'>Cattle</h5>
                <button className="border-white border-2 text-white p-3 drop-shadow-md bg-black bg-opacity-30">SHOP NOW</button>
              </div>
            </div>
          {/* card */}
            <div className='w-[300px] h-[350px] rounded-lg shadow-lg m-4 bg-cover bg-center' style={{ backgroundImage: `url(${content[0].fields.otherPics[12].fields.file.url})` }} >
              <div className='flex flex-col h-full justify-end p-8'>
                <h5 className='text-xl font-bold pt-2 text-white pb-2'>Merch</h5>
                <button className="border-white border-2 text-white p-3 bg-black bg-opacity-30">SHOP NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='h-[500px] hidden md:block'></div>
      {/* contact and map */}
      <div className='relative flex flex-col md:flex-row'>
        {/* <div className='relative w-full md:w-[55%] px-4 py-8 md:p-6 lg:p-8'>
          <h4 className='text-xs lg:text-sm font-jakarta'>WHO WE ARE</h4>
          <h3 className='text-xl md:text-2xl lg:text-3xl font-bold font-jakarta pb-4'>Naturally Better</h3>
          <p className='text-sm font-jakarta pb-6'>The best option for beef for your family, comes from a fresh locally grown farm. 5E Ranch provides the best in beef and wagyu beef in Texas.</p>
          <div className='flex flex-col'>
            <input
              className="p-2 border rounded"
              id="name"
              type="name"
              name="name"
              placeholder="your name"
              required
            />
            <input
              className="mt-2 md:mt-4 p-2 border rounded"
              id="email"
              type="email"
              name="email"
              placeholder="your e-mail"
              required
            />
            <textarea
              className="mt-2 md:mt-4 p-2 border rounded"
              id="message"
              name="message"
              placeholder="your message"
            ></textarea>
          </div>
          <div className="flex flex-row justify-end mt-4">
            <button className="bg-black text-white p-3 mt-2 md:mt-4">LEARN MORE</button>
          </div>
        </div> */}
        <div className='absolute top-0 left-0 w-full md:w-[55%] px-4 py-8 md:p-6 lg:p-8'>
          <h4 className='text-xs lg:text-sm font-jakarta'>WHO WE ARE</h4>
          <h3 className='text-xl md:text-2xl lg:text-3xl font-bold font-jakarta pb-4'>Naturally Better</h3>
          <p className='text-sm font-jakarta pb-6'>The best option for beef for your family, comes from a fresh locally grown farm. 5E Ranch provides the best in beef and wagyu beef in Texas.</p>
          <div className='flex flex-col'>
            <input
              className="p-2 border rounded"
              id="name"
              type="name"
              name="name"
              placeholder="your name"
              required
            />
            <input
              className="mt-2 md:mt-4 p-2 border rounded"
              id="email"
              type="email"
              name="email"
              placeholder="your e-mail"
              required
            />
            <textarea
              className="mt-2 md:mt-4 p-2 border rounded"
              id="message"
              name="message"
              placeholder="your message"
            ></textarea>
          </div>
          <div className="flex flex-row justify-end mt-4">
            <button className="bg-black text-white p-3 mt-2 md:mt-4">LEARN MORE</button>
          </div>
        </div>
        <div className='w-full h-800px md:h-[450px] border-t-2 border-slate-200 md:border-t-0'>
          <img src={`https://api.mapbox.com/styles/v1/iescandon/clkn0f2yo009301ql1px22n78/static/pin-s+000(-98.259440,26.281840)/-114.145047,31.436473,4/1000x450?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`} className="w-full h-full object-cover hidden md:block" alt=""></img>
          <img src={`https://api.mapbox.com/styles/v1/iescandon/clkn0f2yo009301ql1px22n78/static/pin-s+000(-98.259440,26.281840)/-99.777608,39.203330,4/500x800?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`} className="w-full h-full object-cover md:hidden" alt=""></img>
        </div>
        {/* <div className='w-full md:w-[45%]'>
          <img src={`https://api.mapbox.com/styles/v1/iescandon/clkn0f2yo009301ql1px22n78/static/pin-s+000(-98.259440,26.281840)/-99.1707,31.3915,4/500x400?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`} className="w-full h-full object-cover" alt=""></img>
        </div> */}
      </div>
      {/* footer */}
      <footer className="px-4 md:px-8 lg:px-12 py-8 md:py-6 bg-black text-white ">
        <div className="md:h-[50px] font-light text-sm flex flex-row justify-between md:space-y-0">
          {/* follow */}
          <div className="flex flex-col justify-center">
            <h4 className="font-bold uppercase">Follow</h4>
            <div className="flex flex-row">
              <a
                href="/"
                aria-label="facebook page link"
              >
                <FontAwesomeIcon
                  className="cursor-pointer text-4xl md:text-2xl py-2 pr-6 md:pr-3"
                  icon={faFacebook}
                />
              </a>
              <a
                href="/"
                aria-label="instagram page link"
              >
                <FontAwesomeIcon
                  className="cursor-pointer text-4xl md:text-2xl py-2 pr-6 md:pr-3"
                  icon={faInstagram}
                />
              </a>
              <a
                href="/"
                aria-label="linked in page link"
              >
                <FontAwesomeIcon
                  className="cursor-pointer text-4xl md:text-2xl py-2 pr-6 md:pr-3"
                  icon={faLinkedinIn}
                />
              </a>
            </div>
          </div>
          {/* about */}
          {/* <div className="flex flex-col">
            <h4 className="font-bold uppercase">About</h4>
            <a href="/about">About H Town for Humanity</a>
            <a href="/help/faqs">Help for Refugees</a>
          </div> */}
          {/* contact */}
          {/* <div className="flex flex-col">
            <h4 className="font-bold uppercase">Contact</h4>
            <a href="mailto:donations@htownforhumanity.org">
              donations@htownforhumanity.org
            </a>
            <a href="mailto:help@htownforhumanity.org">
              help@htownforhumanity.org
            </a>
            <a href="mailto:admin@htownforhumanity.org" className="mb-3">
              admin@htownforhumanity.org
            </a>
            <a href="tel:8326302396">832-630-2396</a>
          </div> */}
          {/* logo */}
          <div className="flex flex-col space-y-2 h-full md:pb-0">
            <img src={content[0].fields.logos[7].fields.file.url} className='max-h-[70px] h-full'/>
          </div>
          {/* add copyright stuff */}
        </div>
      </footer>
    </main>
  )
}

Home.getInitialProps = async () => {
  const content = await getContent("homePageContent");
  return { content };
};


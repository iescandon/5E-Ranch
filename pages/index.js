import { useState, useEffect } from 'react';
import Hero from '@/components/hero';
import getContent from '@/utils/getContent'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import Card from '@/components/card';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Home({ content }) {
    const [pageContent, setPageContent] = useState(content[0].fields);

    useEffect(() => {
      setPageContent(content[0].fields);
      console.log(pageContent);
    }, [content]);

  return (
    <main>
      {/* hero */}
      <Hero content={pageContent} />
      {/* 5E about */}
      <section className='relative flex flex-col-reverse md:flex-row w-full px-4 py-8 md:p-6 lg:p-8'>
        <div className='w-full pt-8 md:pt-0 md:w-1/2'>
          <img src={pageContent.aboutImage.fields.file.url} className=""/>
        </div>
        <div className='relative w-full md:w-1/2 md:pl-8 max-w-[540px]'>
          <h3 className='text-xs lg:text-sm uppercase'>{pageContent.aboutSubtitle ? pageContent.aboutSubtitle : undefined}</h3>
          <h2 className='text-xl md:text-2xl lg:text-3xl font-bold pb-4'>{pageContent.aboutTitle}</h2>
          <div className="space-y-4 pb-6">
            {documentToReactComponents(pageContent.aboutText)}
          </div>          
          <button className="bg-black text-white p-3 uppercase">{pageContent.aboutButtonText ? pageContent.aboutButtonText : "Learn more"}</button>
        </div>
      </section>
      {/* 5E products */}
      <section className='flex justify-center p-4 md:p-6 lg:p-8 bg-slate-200'>
        <div className='relative flex flex-col items-center max-w-[1100px]'>
          <div className='h-[200px] md:h-[250px]'>
            <img src={pageContent.productsIcon.fields.file.url} className='h-full'/>
          </div>
          <h2 className='text-xl md:text-2xl lg:text-3xl font-bold pb-4 text-center'>{pageContent.productsTitle}</h2>
          <div className="border-[2.5px] border-black w-1/3 m-4"></div>
          <p className='p-4'>{pageContent.productsText.content[0].content[0].value}</p>
          <div className='flex flex-wrap justify-center'>
          {/* cards */}
            {
              pageContent.productsCards?.map((card) => {
                return (
                  <Card card={card} buttonText={pageContent.productsCardsButtonText} key={card.fields.title} />
                )
              })
            }
          </div>
        </div>
      </section>
      {/* 5E quality */}
      <section className="md:h-[450px] lg:h-[500px] w-full flex flex-col md:flex-row px-4 py-8 md:p-6 lg:p-8 items-center">
        <div className='w-full md:w-1/2 flex justify-center md:justify-end pb-6 md:pr-12 md:pb-0'>
          <img src={pageContent.infoIcon.fields.file.url} className='h-[250px] w-[250px] border-[15px] border-black rounded-full flex items-center'/>
        </div>
        <div className='w-full md:w-1/2 flex flex-col items-center md:items-start'>
          <div>
            <h3 className='text-xs lg:text-sm uppercase'>{pageContent.infoSubtitle ? pageContent.infoSubtitle : undefined}</h3>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold'>{pageContent.infoTitle}</h2>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold'>{pageContent.infoTitle2 ? pageContent.infoTitle2 : undefined}</h2>
            <div className='pt-4 infoText'>{documentToReactComponents(pageContent.infoText)}</div>
          </div>
        </div>
      </section>
      {/* 5E photos carousel */}
      <section>
          <Carousel swipeable={true}>
            { pageContent.carouselImages.map((img) => {
              return (
                <div className="h-full md:h-[500px] lg:h-[700px] w-full" key={`div-${img.fields.title}`}>
                  <img src={img.fields.file.url} className='h-full w-full object-cover object-center'/>
                </div>
              )
            })}
          </Carousel>
      </section>
      {/* 5E contact */}
      <section className='relative flex flex-col md:flex-row h-800px md:h-[450px]'>
        <div className='absolute top-0 left-0 w-full md:w-[60%] px-4 py-8 md:p-6 lg:p-8 max-w-[700px]'>
          <h3 className='text-xs lg:text-sm uppercase'>{pageContent.contactSubtitle ? pageContent.contactSubtitle : undefined}</h3>
          <h2 className='text-xl md:text-2xl lg:text-3xl font-bold pb-4'>{pageContent.contactTitle}</h2>
          <p className='pb-6'>{pageContent.contactText.content[0].content[0].value}</p>
          <div className='flex flex-col'>
            <input
              className="p-2 border border-slate-300 rounded"
              id="name"
              type="name"
              name="name"
              placeholder="your name"
              required
            />
            <input
              className="mt-2 md:mt-4 p-2 border border-slate-300 rounded"
              id="email"
              type="email"
              name="email"
              placeholder="your e-mail"
              required
            />
            <textarea
              className="mt-2 md:mt-4 p-2 border border-slate-300 rounded"
              id="message"
              name="message"
              placeholder="your message"
            ></textarea>
          </div>
          <div className="flex justify-end mt-4">
            <button className="bg-black text-white p-3 mt-2 md:mt-4 uppercase">{pageContent.contactButtonText ? pageContent.contactButtonText : "Send it"}</button>
          </div>
        </div>
        <div className='w-full'>
          <img src={`https://api.mapbox.com/styles/v1/iescandon/clkn0f2yo009301ql1px22n78/static/pin-s+000(-98.259440,26.281840)/-114.145047,31.436473,4/1000x450?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`} className="w-full h-full object-cover hidden md:block" alt=""></img>
          <img src={`https://api.mapbox.com/styles/v1/iescandon/clkn0f2yo009301ql1px22n78/static/pin-s+000(-98.259440,26.281840)/-99.777608,39.203330,4/500x800?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`} className="w-full h-full object-cover md:hidden" alt=""></img>
        </div>
      </section>
      {/* footer */}
      <footer className="px-4 md:px-8 lg:px-12 py-8 md:py-6 bg-black text-white text-xs">
        <div className="font-light flex justify-between md:space-y-0">
          {/* follow */}
          <div className="flex flex-col justify-center">
            <h4 className="font-bold uppercase">{pageContent.footerTitle ? pageContent.footerTitle : "Follow"}</h4>
            <div className="flex">
              <a
                href={pageContent.footerSocialMediaLinks.facebookUrl}
                aria-label="facebook page link"
              >
                <FontAwesomeIcon
                  className="cursor-pointer text-4xl md:text-2xl pt-2 pr-6 md:pr-3"
                  icon={faFacebook}
                />
              </a>
              <a
                href={pageContent.footerSocialMediaLinks.instagramUrl}
                aria-label="instagram page link"
              >
                <FontAwesomeIcon
                  className="cursor-pointer text-4xl md:text-2xl pt-2 pr-6 md:pr-3"
                  icon={faInstagram}
                />
              </a>
              <a
                href={pageContent.footerSocialMediaLinks.tiktokUrl}
                aria-label="tiktok page link"
              >
                <FontAwesomeIcon
                  className="cursor-pointer text-4xl md:text-2xl pt-2 pr-6 md:pr-3"
                  icon={faTiktok}
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
            <img src={pageContent.footerIcon.fields.file.url} className='h-[70px]'/>
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


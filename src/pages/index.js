import Link from "next/link";
import Hero from "@/components/hero";
import Card from "@/components/card";
import Form from "@/components/form";
import getContent from "@/utils/getContent";
import { useContext } from "react";
import { NotificationsContext } from "@/contexts/notifications";
import { setCurrentPage } from "@/contexts/notifications/reducer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home({ content, products }) {
  const [notificationsState, notificationsDispatch] =
    useContext(NotificationsContext);

  return (
    <main>
      {/* hero */}
      <Hero content={content} />
      {/* 5E about */}
      <section className="relative flex flex-col-reverse md:flex-row w-full px-4 py-8 md:p-6 lg:p-8">
        <div className="w-full pt-8 md:pt-0 md:w-1/2">
          <img
            src={content.aboutImage.fields.file.url}
            className=""
            alt={content.aboutImage.fields.description}
          />
        </div>
        <div className="relative w-full md:w-1/2 md:pl-8 max-w-[540px]">
          <h4>{content.aboutSubtitle ? content.aboutSubtitle : undefined}</h4>
          <h2 className="pb-4">{content.aboutTitle}</h2>
          <div className="space-y-4 pb-6">
            {documentToReactComponents(content.aboutText)}
          </div>
          <Link
            href="/about"
            onClick={() => {
              notificationsDispatch(setCurrentPage("about"));
            }}
          >
            <button className="bg-black text-white p-4 uppercase">
              {content.aboutButtonText ? content.aboutButtonText : "Learn more"}
            </button>
          </Link>
        </div>
      </section>
      {/* 5E products */}
      <section className="flex justify-center p-4 md:p-6 lg:p-8 bg-slate-200">
        <div className="relative flex flex-col items-center max-w-[1100px]">
          <div className="h-[200px] md:h-[250px]">
            <img
              src={content.productsIcon.fields.file.url}
              className="h-full"
              alt={content.productsIcon.fields.description}
            />
          </div>
          <h2 className="pb-4 text-center">{content.productsTitle}</h2>
          <div className="border-[2.5px] border-black w-1/3 m-4"></div>
          <p className="p-4">
            {content.productsText.content[0].content[0].value}
          </p>
          <div className="flex flex-wrap justify-center">
            {/* cards */}
            {products.productsCategories?.map((category, i) => {
              return (
                <Card
                  category={category}
                  img={products.productsImages[i].fields.file.url}
                  buttonText={content.productsCardsButtonText}
                  key={category}
                />
              );
            })}
          </div>
        </div>
      </section>
      {/* 5E quality */}
      <section className="md:h-[450px] lg:h-[500px] w-full flex flex-col md:flex-row px-4 py-8 md:p-6 lg:p-8 items-center">
        <div className="w-full md:w-1/2 flex justify-center md:justify-end pb-6 md:pr-12 md:pb-0">
          <img
            src={content.infoIcon.fields.file.url}
            className="h-[250px] w-[250px] border-[15px] border-black rounded-full flex items-center"
            alt={content.infoIcon.fields.description}
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <div>
            <h4>{content.infoSubtitle ? content.infoSubtitle : undefined}</h4>
            <h2>{content.infoTitle}</h2>
            <h2>{content.infoTitle2 ? content.infoTitle2 : undefined}</h2>
            <div className="pt-4 infoText">
              {documentToReactComponents(content.infoText)}
            </div>
          </div>
        </div>
      </section>
      {/* 5E photos carousel */}
      <section>
        <Carousel swipeable={true}>
          {content.carouselImages.map((img) => {
            return (
              <div
                className="h-[300px] md:h-[500px] lg:h-[700px] w-full"
                key={`div-${img.fields.title}`}
              >
                <img
                  src={img.fields.file.url}
                  className="h-full w-full object-cover object-center"
                  alt={img.fields.description}
                />
              </div>
            );
          })}
        </Carousel>
      </section>
      {/* 5E contact */}
      <section className="relative flex flex-col md:flex-row">
        <div className="absolute top-0 left-0 w-full md:w-[60%] px-4 py-8 md:p-6 lg:p-8 max-w-[700px]">
          <Form content={content} />
        </div>
        <div className="w-full h-[625px] md:h-[475px]">
          <img
            src={`https://api.mapbox.com/styles/v1/iescandon/clkn0f2yo009301ql1px22n78/static/pin-s+000(-98.259440,26.281840)/-114.145047,31.436473,4/1100x450?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
            className="w-full h-full object-cover hidden md:block"
            alt="map of texas with black marker on McAllen, TX"
          ></img>
          <img
            src={`https://api.mapbox.com/styles/v1/iescandon/clkn0f2yo009301ql1px22n78/static/pin-s+000(-98.259440,26.281840)/-99.777608,39.203330,4/500x800?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
            className="w-full h-full object-cover md:hidden"
            alt="map of texas with black marker on McAllen, TX"
          ></img>
        </div>
      </section>
      {/* footer */}
      <footer className="px-4 md:px-8 lg:px-12 py-8 md:py-6 bg-black text-white text-xs">
        <div className="font-light flex justify-between md:space-y-0">
          {/* follow */}
          <div className="flex flex-col justify-center">
            <p className="font-bold uppercase">
              {content.footerTitle ? content.footerTitle : "Follow"}
            </p>
            <div className="flex">
              <a
                href={content.footerSocialMediaLinks.facebookUrl}
                aria-label="facebook page link"
              >
                <FontAwesomeIcon
                  className="cursor-pointer text-4xl md:text-2xl pt-2 pr-6 md:pr-3"
                  icon={faFacebook}
                />
              </a>
              <a
                href={content.footerSocialMediaLinks.instagramUrl}
                aria-label="instagram page link"
              >
                <FontAwesomeIcon
                  className="cursor-pointer text-4xl md:text-2xl pt-2 pr-6 md:pr-3"
                  icon={faInstagram}
                />
              </a>
              <a
                href={content.footerSocialMediaLinks.tiktokUrl}
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
            <img
              src={content.footerIcon.fields.file.url}
              className="h-[60px]"
              alt={content.footerIcon.fields.description}
            />
          </div>
          {/* add copyright stuff */}
        </div>
      </footer>
      <style jsx global>{`
        .carousel .thumbs-wrapper,
        .carousel-status {
          display: none !important;
        }
      `}</style>
    </main>
  );
}

export const getStaticProps = async () => {
  const content = await getContent({
    content_type: "homePageContent",
  });

  const products = await getContent({
    content_type: "productsPageContent",
  });

  return {
    props: { content: content[0].fields, products: products[0].fields },
    revalidate: 1,
  };
};

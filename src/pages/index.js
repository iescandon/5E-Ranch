import Link from "next/link";
import Hero from "@/components/hero";
import Card from "@/components/card";
import Form from "@/components/form";
import getContent from "@/utils/getContent";
import { useContext, useEffect } from "react";
import { NotificationsContext } from "@/contexts/notifications";
import { setCurrentPage } from "@/contexts/notifications/reducer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "@/components/footer";

export default function Home({ content, products }) {
  const [notificationsState, notificationsDispatch] =
    useContext(NotificationsContext);

  useEffect(() => {
    const arrows = document.querySelectorAll(".control-arrow");
    arrows.forEach((arrow) => {
      arrow.setAttribute("tabIndex", "-1");
    });
  }, []);

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
          <div className="bg-black text-white p-4 w-max">
            <Link
              href="/about"
              onClick={() => {
                notificationsDispatch(setCurrentPage("about"));
              }}
              className="uppercase"
            >
              {content.aboutButtonText ? content.aboutButtonText : "Learn more"}
            </Link>
          </div>
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
      <Footer content={content} />
      <style jsx global>{`
        .carousel .thumbs-wrapper,
        .carousel-status {
          display: none;
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

// .carousel.carousel-slider button.control-arrow

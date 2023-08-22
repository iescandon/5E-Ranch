import getContent from "@/utils/getContent";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/contexts/cart";
import { addToCart } from "@/contexts/cart/reducer";
import Navbar from "@/components/navbar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../../../styles/ProductDetail.module.css";

export default function ProductDetail({ content }) {
  const [state, dispatch] = useContext(CartContext);
  const [item, setItem] = useState(undefined);
  const [quantity, setQuantity] = useState(1);

  // if (!content && state.selectedItem.fields) return <p>loading...</p>;

  useEffect(() => {
    // if (content && state.selectedItem.fields) {
    if (state) {
      setItem(state.selectedItem.fields);
      // const product = state.items.filter((item) => item.name.toLowerCase() === content.slug)
      // if (product.length > 0) {
      //   setQuantity(product[0].quantity)
      // }
    }
  }, [state]);

  return (
    <>
      <Navbar isBlack={true} />
      <div className="flex flex-col lg:flex-row pt-2 pb-10 px-10">
        {item ? (
          <Carousel swipeable={true} className="flex flex-col lg:flex-row-reverse lg:w-[55%]">
            <div className="h-[300px] md:h-[500px]">
              <img src={item.file.url} className="w-full h-full object-cover" />
            </div>
          </Carousel>
        ) : null}
        <div className="lg:w-[45%] flex flex-col pt-8 md:p-8 space-y-8">
          <div>
          {/* <div className="flex justify-between items-center"> */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold pb-1">Bruce</h2>
            <h3 className="text-md lg:text-lg uppercase">$100</h3>
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius
            ac metus ac pulvinar. Ut hendrerit semper tincidunt. Aliquam non sem
            tellus.
            <br></br>
            <br></br>
            Aenean rhoncus sed lacus vel ornare. Sed placerat eget eros eget
            rutrum. Nunc nec diam quis felis pulvinar bibendum suscipit nec
            urna. Mauris posuere congue libero vel bibendum. Nullam eu hendrerit
            sem. Cras et enim sit amet purus bibendum mollis sit amet ac ex.
          </div>
          <div className="w-full">
            <div className="border w-max">
              <button
                className="p-4"
                onClick={() => {
                  if (quantity !== 1) {
                    const newQuantity = quantity - 1;
                    setQuantity(newQuantity);
                  }
                }}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="p-4"
                onClick={() => {
                  const newQuantity = quantity + 1;
                  setQuantity(newQuantity);
                }}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <button
              className="bg-black text-white p-4 w-full uppercase"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: 1,
                    category: "Cattle",
                    name: "Bruce",
                    quantity,
                  })
                )
              }
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .carousel .thumb {
          height: 80px !important;
        }

        .carousel-status,
        .control-dots {
          display: none !important;
        }

        .carousel .thumbs-wrapper {
          width: max-content !important;
          margin: 0px !important;
          padding-top: 1rem !important;
        }

        @media (min-width: 1024px) {
          .carousel {
            width: max-content !important;
          }

          .carousel .thumbs-wrapper {
            padding-top: 0 !important;
            padding-right: 1rem !important;
          }
      }
      `}</style>
    </>
  );
}

export const getStaticPaths = async () => {
  const content = await getContent({
    content_type: "productDetailPageContent",
  });

  const paths = content.map((item) => {
    return {
      params: { slug: item.fields.productCategorySlug, id: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const content = await getContent({
    content_type: "productDetailPageContent",
    "fields.slug": params.id,
  });

  if (!content.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { content: content[0].fields },
    revalidate: 1,
  };
};

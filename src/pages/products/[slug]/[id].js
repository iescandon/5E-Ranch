import getContent from "@/utils/getContent";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/contexts/cart";
import { addToCart } from "@/contexts/cart/reducer";
import Navbar from "@/components/navbar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { formatAmountForDisplay } from "@/utils/stripeHelpers";
import { getPrice, getProduct, getProducts } from "@/utils/getStripe";

export default function ProductDetail({ productObj, slug }) {
  const [state, dispatch] = useContext(CartContext);
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productObj !== undefined) {
      setProduct(productObj);
    }
  }, [productObj]);

  return (
    <>
      <Navbar isBlack={true} />
      {product ? (
        <div className="flex flex-col lg:flex-row pt-2 pb-20 px-10">
          <Carousel
            swipeable={true}
            className="flex flex-col lg:flex-row-reverse lg:w-[55%]"
          >
            {product?.images?.map((img) => {
              return (
                <div className="h-[300px] md:h-[500px]">
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              );
            })}
          </Carousel>
          <div className="lg:w-[45%] flex flex-col pt-4 lg:p-8 space-y-6 lg:space-y-8">
            <div className="flex w-full justify-between">
              <div className="flex flex-col">
                <h2 className="pb-1">{product.name}</h2>
                <h3>
                  {formatAmountForDisplay(
                    product.price.unit_amount,
                    product.price.currency
                  )}
                </h3>
              </div>
              <div className="lg:hidden">
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
            </div>
            <div>{product.metadata.long_description}</div>
            <div className="hidden lg:block w-full">
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
                      id: product.id,
                      url: `/products/${slug}/${product.id}`,
                      name: product.name,
                      price: {
                        unit_amount: product.price.unit_amount,
                        currency: product.price.currency,
                      },
                      priceId: product.default_price,
                      img: product.images[0],
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
      ) : null}
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
            display: flex;
            flex-direction: column;
          }

          .carousel .thumbs-wrapper ul {
            display: flex;
            flex-direction: column;
            transform: none !important;
          }

          .carousel .thumbs-wrapper ul li.thumb {
            margin-bottom: 6px;
          }
        }
      `}</style>
    </>
  );
}

export const getStaticPaths = async () => {
  const products = await getProducts(`active:\'true\'`);

  // FIXME: Handle if no paths found or path entered does not match available paths
  const paths = await products.data.map((product) => {
    return {
      params: { slug: product.metadata.category, id: product.id },
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
    "fields.stripeId": params.id,
  });

  // if (!content.length) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  const product = await getProduct(params.id);
  const price = await getPrice(product.default_price);

  const secondaryImages = !content.length
    ? []
    : content[0].fields.secondaryPhotos.map((img) => {
        return img.fields.file.url;
      });

  const productObj = {
    ...product,
    images: [...product.images, ...secondaryImages],
    price: {
      currency: price.currency,
      unit_amount: price.unit_amount,
    },
  };

  return {
    props: { productObj, slug: params.slug },
    revalidate: 1,
  };
};

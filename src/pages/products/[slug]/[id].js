import getContent from "@/utils/getContent";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/contexts/cart";
import { addToCart } from "@/contexts/cart/reducer";
import Navbar from "@/components/navbar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
        <div className="flex flex-col lg:flex-row pt-2 pb-10 px-10">
          <Carousel
            swipeable={true}
            className="flex flex-col lg:flex-row-reverse lg:w-[55%]"
          >
            <div className="h-[300px] md:h-[500px]">
              <img
                src={product.images[0]}
                className="w-full h-full object-cover"
              />
            </div>
          </Carousel>
          <div className="lg:w-[45%] flex flex-col pt-8 md:p-8 space-y-8">
            <div>
              <h2 className="pb-1">{product.name}</h2>
              <h3>${product.price.unit_amount / 100}</h3>
            </div>
            <div>{product.description}</div>
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
                      id: product.id,
                      url: `/products/${slug}/${product.id}`,
                      name: product.name,
                      price: `$${product.price.unit_amount / 100}`,
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
          }
        }
      `}</style>
    </>
  );
}

export const getStaticPaths = async () => {
  // const content = await getContent({
  //   content_type: "productDetailPageContent",
  // });

  // const paths = content.map((item) => {
  //   return {
  //     params: { slug: item.fields.productCategorySlug, id: item.fields.slug },
  //   };
  // });

  const products = await stripe.products.list();

  const paths = await products.data.map((product) => {
    return {
      params: { slug: "cattle", id: product.id },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  // const content = await getContent({
  //   content_type: "productDetailPageContent",
  //   "fields.slug": params.id,
  // });

  // if (!content.length) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  const product = await stripe.products.retrieve(params.id);
  const price = await stripe.prices.retrieve(product.default_price);

  const productObj = {
    ...product,
    price: {
      currency: price.currency,
      unit_amount: price.unit_amount,
      unit_amount_decimal: price.unit_amount_decimal,
    },
  };

  return {
    props: { productObj, slug: params.slug },
    revalidate: 1,
  };
};

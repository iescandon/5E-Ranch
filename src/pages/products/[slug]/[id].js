import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { formatAmountForDisplay } from "@/utils/stripeHelpers";
import { getPrice, getProduct, getProducts } from "@/utils/getStripe";
import AddToCartBtn from "@/components/buttons/addToCart";

export default function ProductDetail({ productObj, slug }) {
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productObj !== undefined) {
      setProduct(productObj);
      console.log(productObj);
    }
  }, [productObj]);

  return (
    <>
      <Navbar isBlack={true} />
      {product ? (
        <div className="flex flex-col lg:flex-row pt-2 pb-20 px-10">
          {/* product image */}
          <div className="flex flex-col lg:w-1/2 lg:flex-row-reverse h-[300px] md:h-[500px] ">
            <img
              src={product.images[0]}
              className="w-full h-full object-cover"
            />
          </div>
          {/* product detail */}
          <div className="flex flex-col lg:w-1/2 pt-4 lg:p-8 space-y-6 lg:space-y-8">
            <div className="flex w-full justify-between">
              <div className="flex flex-col">
                <h2 className="pb-1">{product.name}</h2>
                <h3>
                  {product.price.unit_amount > 0
                    ? formatAmountForDisplay(
                        product.price.unit_amount,
                        product.price.currency
                      )
                    : "COMING SOON"}
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
              <AddToCartBtn data={product} slug={slug} quantity={quantity} />
            </div>
          </div>
        </div>
      ) : null}
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
  const product = await getProduct(params.id);
  const price = await getPrice(product.default_price);

  // if (!product.id) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  const productObj = {
    ...product,
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

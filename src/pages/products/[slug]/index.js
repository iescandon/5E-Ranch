import getContent from "@/utils/getContent";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import ProductCard from "@/components/productCard";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default function Products({ productList, slug }) {
  const [products, setProducts] = useState();

  useEffect(() => {
    if (productList[0] !== undefined) {
      setProducts(productList);
    }
  }, [productList]);

  return (
    <>
      <Navbar isBlack={true} />
      <div className="flex flex-col items-center">
        {!products ? (
          <p>Products coming soon.</p>
        ) : (
          <div className="flex flex-wrap justify-center md:space-x-4 p-2">
            {products?.map((product) => {
              return (
                <ProductCard data={product} slug={slug} key={product.id} />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export const getStaticPaths = async () => {
  // FIXME: Figure out how to get this from contentful or maybe state
  const paths = [
    { params: { slug: "cattle" } },
    { params: { slug: "merch" } },
    { params: { slug: "beef" } },
  ];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const products = await stripe.products.search({
    query: `active:\'true\' AND metadata[\'category\']:\'${params.slug}\'`,
  });
  const prices = await stripe.prices.list();

  let productList = [];
  if (products) {
    products.data.map((product) => {
      prices.data.map((price) => {
        if (product.default_price === price.id) {
          productList.push({
            ...product,
            price: {
              currency: price.currency,
              unit_amount: price.unit_amount,
            },
          });
        }
      });
    });
  }

  return {
    props: {
      productList,
      slug: params.slug,
    },
    revalidate: 1,
  };
};

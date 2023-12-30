import getContent from "@/utils/getContent";
// import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import ProductCard from "@/components/productCard";
import { getProducts, getPrices } from "@/utils/getStripe";

export default function Products({ productList, slug }) {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   setProducts(productList);
  //   console.log("dom loaded", productList);
  // }, [productList]);

  return (
    <>
      <Navbar isBlack={true} />
      <div className="flex flex-col items-center">
        {productList.length === 0 ? (
          <p>Products coming soon.</p>
        ) : (
          <div className="flex flex-wrap justify-center md:space-x-4 px-2">
            {productList?.map((product) => {
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
  const products = await getContent({
    content_type: "productsPageContent",
  });

  const paths = products[0].fields.productsCategories.map((category) => {
    return {
      params: { slug: category },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const products = await getProducts(
    `active:\'true\' AND metadata[\'category\']:\'${params.slug}\'`
  );

  const prices = await getPrices();

  let productList = [];
  if (products && prices) {
    await products.data.map(async (product) => {
      await prices.data.map((price) => {
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

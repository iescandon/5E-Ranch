import getContent from '@/utils/getContent'
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Link from 'next/link';
import ProductCard from '@/components/productCard';

export default function Products({ content }) {
  const [category, setCategory] = useState();
  const [products, setProducts] = useState();

  if (!content) return <p>loading...</p>;

  useEffect(()=>{
   if (content) {
    setCategory(content.slug)
    setProducts(content.productsCards)
   }
  },[content])

console.log(content)

  return (
    <>
    <Navbar isBlack={true} />
    <div className='flex flex-col items-center'>
    {/* <li className='flex justify-around w-screen'>
      <Link href="/products/beef"><ul className={`uppercase hover:underline ${category === 'beef' && 'underline'}`}>Beef</ul></Link>
      <Link href="/products/cattle"><ul className={`uppercase hover:underline ${category === 'cattle' && 'underline'}`}>Cattle</ul></Link>
      <Link href="/products/merch"><ul className={`uppercase hover:underline ${category === 'merch' && 'underline'}`}>Merch</ul></Link>
    </li> */}
    { !products ? (
          <p>Products coming soon.</p>
        ) : (
      <div className='flex flex-wrap'>
        {
          products?.map((card) => {
            const product = content.productsData.find((product) => card.fields.title.toLowerCase() === product.name.toLowerCase());
            return (
              <ProductCard card={card} data={product} slug={content.slug} key={card.fields.title} />
            )
          })
        }
      </div>
        )}
    </div>
    </>
  );
}

export const getStaticPaths = async () => {
    const content = await getContent({
        content_type: "productsPageContent",
      });

    const paths = content.map(item => {
      return {
        params: { slug: item.fields.slug }
      }
    })
  
    return {
      paths,
      fallback: true
    }
  }

  export const getStaticProps = async ({ params }) => {
    const content = await getContent({
        content_type: 'productsPageContent',
        'fields.slug': params.slug
      });
  
    if (!content.length) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
  
    return {
      props: { content: content[0].fields },
      revalidate: 1
    }
  }

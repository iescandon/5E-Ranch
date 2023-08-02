import getContent from '@/utils/getContent'
import {  useContext } from "react";
import { CartContext } from "../../contexts/cart"
import { addToCart, incrementItem, decrementItem } from "@/contexts/cart/reducer";
import Hero from "@/components/hero";

export default function Products({ content }) {
  const [ state, dispatch ] = useContext(CartContext)

  if (!content) return <p>loading...</p>;

  return (
    <>
    <Hero content={content} />
    <h1 className="p-4">{content.slug} page coming soon</h1>
    <button className="ml-4 bg-black text-white p-4" onClick={() => dispatch(addToCart({ id: "1", category: "Cattle", name: "Bruce", quantity: 1 }))}>add to cart</button>
    <button className="ml-4 bg-black text-white p-4" onClick={() => dispatch(incrementItem({ id: "1" }))}>+</button>
    <button className="ml-4 bg-black text-white p-4" onClick={() => dispatch(decrementItem({ id: "1"}))}>-</button>
    </>
  );
}

export const getStaticPaths = async () => {
    const content = await getContent({
        content_type: "productPageContent",
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
        content_type: 'productPageContent',
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

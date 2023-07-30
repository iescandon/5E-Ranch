import { useState, useEffect } from "react";
import getContent from '@/utils/getContent'

export default function Products({ content }) {
  return (
    <h1 className="p-16">{content.slug} page coming soon</h1>
  );
}

export const getStaticPaths = async () => {
    const content = await getContent({
        content_type: "productContent",
      });
  
    const paths = content?.map(item => {
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
        content_type: 'productContent',
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

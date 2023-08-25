import getContent from "@/utils/getContent";
import Navbar from "@/components/navbar";

export default function About({ content }) {
  return (
    <>
      <Navbar isBlack={true} />
      <section className="p-16">About page coming soon!</section>
    </>
  );
}

export const getStaticProps = async () => {
  const content = await getContent({
    content_type: "aboutPageContent",
  });

  return {
    props: { content: content[0].fields },
    revalidate: 1,
  };
};

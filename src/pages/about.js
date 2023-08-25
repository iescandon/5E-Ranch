import getContent from "@/utils/getContent";
import Navbar from "@/components/navbar";

export default function About({ content }) {
  return (
    <>
      <Navbar isBlack={true} />
      <div className="flex flex-col items-center">
        <p>About page coming soon.</p>
      </div>
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

import getContent from "@/utils/getContent";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Footer from "@/components/footer";

export default function About({ content, footer }) {
  return (
    <>
      {/* <div className="min-h-screen flex flex-col justify-between"> */}
      {/* <Hero content={content} />
      <div className="bg-slate-100 h-[600px] flex"></div>
      <div className=" h-[250px] flex"></div>
      <Footer content={footer} /> */}
      <Navbar isBlack={true} />
      <div className="flex flex-col items-center">
        <p>About page coming soon.</p>
      </div>
      {/* <div className="">
        <Footer content={footer} />
      </div> */}
      {/* </div> */}
    </>
  );
}

export const getStaticProps = async () => {
  const content = await getContent({
    content_type: "aboutPageContent",
  });

  const footer = await getContent({
    content_type: "homePageContent",
  });

  return {
    props: { content: content[0].fields, footer: footer[0].fields },
    revalidate: 1,
  };
};

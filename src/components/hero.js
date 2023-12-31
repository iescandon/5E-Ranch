import Navbar from "./navbar";

export default function Hero({ content }) {
  return (
    <section>
      <div
        className="h-[500px] md:h-[550px] lg:h-[650px] bg-cover bg-center"
        style={{ backgroundImage: `url(${content.heroImage.fields.file.url})` }}
      >
        <div className="bg-gradient-to-b from-transparent to-black from-30% flex flex-col items-center h-full w-full">
          <Navbar />
          <div className="h-1/3 w-[350px] md:w-[600px] lg:w-[800px] flex justify-center items-center">
            <h1>{content.heroTitle ? content.heroTitle : null}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}

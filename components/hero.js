export default function Hero({ content }) {
  return (
    <section>
      <div className='relative top-0 left-0 h-[500px] md:h-[450px] lg:h-[600px]'>
        <img src={content.heroImage.fields.file.url} className='h-full w-full object-cover'/>
        <div className="absolute inset-0 flex flex-row justify-center m-4">
          <img src={content.heroIcon.fields.file.url}  alt="" className="absolute h-[80px] lg:h-[100px]"/>
        </div>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black from-30% flex flex-col items-center justify-center'>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-extrabold text-center drop-shadow-md !leading-[1.25] w-[350px] md:w-[600px] lg:w-[800px]">{content.heroTitle}</h1>
        </div>
      </div>
    </section>
  )
}